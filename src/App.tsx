import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DashboardView } from './components/DashboardView';
import { ScheduleView } from './components/ScheduleView';
import { HistoryView } from './components/HistoryView';
import { SettingsView } from './components/SettingsView';
import { UpgradeView } from './components/UpgradeView';
import { ReminderPopupModal } from './components/ReminderPopupModal';
import { ToastNotice } from './components/ToastNotice';
import { OnboardingModal } from './components/OnboardingModal';

import { HydrationItem, UserSettings, Language, ThemeMode, DailyHistoryRecord } from './types';
import {
  loadSettings,
  saveSettings,
  loadTodaySchedule,
  saveTodaySchedule,
  loadHistory,
} from './services/storage';
import {
  generateSchedule,
  evaluateItemStates,
  canCompleteItem,
  markItemCompleted,
  snoozeItem,
} from './services/scheduler';
import {
  getNotificationPermission,
  requestNotificationPermission,
  sendBrowserNotification,
  playWaterChime,
} from './services/notifications';
import { getISTTodayString } from './utils/time';

export default function App() {
  // 1. Settings & State Initialization
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [scheduleItems, setScheduleItems] = useState<HydrationItem[]>([]);
  const [historyRecords, setHistoryRecords] = useState<DailyHistoryRecord[]>(() => loadHistory());

  // Notifications State
  const [notifPermission, setNotifPermission] = useState<NotificationPermission | 'unsupported'>(
    getNotificationPermission()
  );

  // Active Reminder Modal State
  const [activeReminderItem, setActiveReminderItem] = useState<HydrationItem | null>(null);
  const [reminderModalOpen, setReminderModalOpen] = useState(false);

  // Warning Toast State (for early completion attempts)
  const [warningToast, setWarningToast] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: '',
    message: '',
  });

  // Track notified slots to avoid repeating popups
  const notifiedSlotsRef = useRef<Set<string>>(new Set());

  // 2. Theme Management Effect
  useEffect(() => {
    const applyTheme = (mode: ThemeMode) => {
      const root = document.documentElement;
      if (mode === 'dark') {
        root.classList.add('dark');
      } else if (mode === 'light') {
        root.classList.remove('dark');
      } else {
        // System preference
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSystemDark) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme(settings.theme);
  }, [settings.theme]);

  // 3. Load & Synchronize Today's Schedule
  const refreshSchedule = useCallback(() => {
    const todayStr = getISTTodayString();
    const stored = loadTodaySchedule(todayStr);

    if (stored && stored.length > 0) {
      const evaluated = evaluateItemStates(stored, settings.intervalMinutes, settings.endTime);
      setScheduleItems(evaluated);
      saveTodaySchedule(evaluated, todayStr);
    } else {
      const newlyGenerated = generateSchedule(settings);
      setScheduleItems(newlyGenerated);
      saveTodaySchedule(newlyGenerated, todayStr);
    }
  }, [settings]);

  useEffect(() => {
    refreshSchedule();
  }, [refreshSchedule]);

  // 4. Timer & Visibility Engine for IST Reminder Checks
  useEffect(() => {
    const checkReminders = () => {
      const todayStr = getISTTodayString();
      setScheduleItems((prevItems) => {
        if (prevItems.length === 0) return prevItems;

        const updated = evaluateItemStates(prevItems, settings.intervalMinutes, settings.endTime);

        // Check if any item just turned 'ready'
        const readyItem = updated.find(
          (item) => item.status === 'ready' && !notifiedSlotsRef.current.has(item.id)
        );

        if (readyItem) {
          notifiedSlotsRef.current.add(readyItem.id);
          setActiveReminderItem(readyItem);
          setReminderModalOpen(true);

          // Play soothing water chime
          playWaterChime();

          // Trigger browser notification if permitted
          if (notifPermission === 'granted') {
            sendBrowserNotification(
              '💧 Hydration Reminder!',
              `It's time to drink ${readyItem.amountMl} ml of water (${readyItem.displayTime} IST).`
            );
          }
        }

        saveTodaySchedule(updated, todayStr);
        return updated;
      });
    };

    checkReminders();
    const interval = setInterval(checkReminders, 10000); // Check every 10 sec

    // Recalculate on tab focus / page visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkReminders();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [settings, notifPermission]);

  // 5. Handlers
  const handleUpdateSettings = (newSettingsPartial: Partial<UserSettings>) => {
    const updatedSettings = { ...settings, ...newSettingsPartial };
    setSettings(updatedSettings);
    saveSettings(updatedSettings);

    // Regenerate schedule dynamically with new settings
    const newSchedule = generateSchedule(updatedSettings);
    setScheduleItems(newSchedule);
    saveTodaySchedule(newSchedule);
  };

  const handleSetLanguage = (lang: Language) => {
    handleUpdateSettings({ language: lang });
  };

  const handleSetTheme = (themeMode: ThemeMode) => {
    handleUpdateSettings({ theme: themeMode });
  };

  const handleRequestNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotifPermission(granted ? 'granted' : 'denied');
    handleUpdateSettings({ notificationsEnabled: granted });
  };

  const handleCompleteItem = (itemId: string) => {
    const targetItem = scheduleItems.find((i) => i.id === itemId);
    if (!targetItem) return;

    // Check strict completion validation!
    const validation = canCompleteItem(targetItem);

    if (!validation.allowed) {
      setWarningToast({
        open: true,
        title: 'Cannot Complete Early',
        message: validation.reason || 'You can mark it complete when the scheduled time arrives.',
      });
      return;
    }

    const updated = markItemCompleted(scheduleItems, itemId);
    setScheduleItems(updated);
    saveTodaySchedule(updated);
    setHistoryRecords(loadHistory());
  };

  const handleSnoozeItem = (itemId: string, minutes: number) => {
    const updated = snoozeItem(scheduleItems, itemId, minutes);
    setScheduleItems(updated);
    saveTodaySchedule(updated);
  };

  const handleTryEarlyComplete = (item: HydrationItem) => {
    const validation = canCompleteItem(item);
    if (!validation.allowed) {
      setWarningToast({
        open: true,
        title: 'Cannot Complete Early',
        message: validation.reason || 'You can mark it complete when the scheduled time arrives.',
      });
    }
  };

  return (
    <div className="min-w-[320px] min-h-screen bg-gradient-to-br from-[#1e40af] via-[#3b82f6] to-[#0d9488] dark:from-[#090d16] dark:via-[#0f172a] dark:to-[#042f2e] text-slate-50 transition-colors flex flex-col font-sans relative overflow-x-hidden selection:bg-teal-300 selection:text-teal-950">
      {/* Background Frosted Ambient Glow Spheres */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[130px]" />
        <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-300/20 blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-400/20 blur-[130px]" />
      </div>

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={settings.language}
        setLanguage={handleSetLanguage}
        theme={settings.theme}
        setTheme={handleSetTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12 z-10 relative">
        {/* Hero Banner when on Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="mb-6 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <HeroBanner language={settings.language} onNavigate={setActiveTab} />
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'dashboard' && (
          <DashboardView
            items={scheduleItems}
            settings={settings}
            language={settings.language}
            onCompleteItem={handleCompleteItem}
            onRequestNotifications={handleRequestNotifications}
            notificationStatus={notifPermission}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView
            items={scheduleItems}
            settings={settings}
            language={settings.language}
            onUpdateSettings={handleUpdateSettings}
            onCompleteItem={handleCompleteItem}
            onSnoozeItem={handleSnoozeItem}
            onTryEarlyComplete={handleTryEarlyComplete}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView records={historyRecords} language={settings.language} />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            settings={settings}
            language={settings.language}
            theme={settings.theme}
            onUpdateSettings={handleUpdateSettings}
            onSetLanguage={handleSetLanguage}
            onSetTheme={handleSetTheme}
            onRequestNotifications={handleRequestNotifications}
            notificationStatus={notifPermission}
          />
        )}

        {activeTab === 'upgrade' && <UpgradeView language={settings.language} />}
      </main>

      {/* Active Reminder In-App Popup Modal */}
      <ReminderPopupModal
        isOpen={reminderModalOpen}
        item={activeReminderItem}
        language={settings.language}
        onComplete={handleCompleteItem}
        onSnooze={handleSnoozeItem}
        onClose={() => setReminderModalOpen(false)}
      />

      {/* Early Completion Toast Warning */}
      <ToastNotice
        isOpen={warningToast.open}
        title={warningToast.title}
        message={warningToast.message}
        onClose={() => setWarningToast({ ...warningToast, open: false })}
      />

      {/* First Time Onboarding Wizard */}
      <OnboardingModal
        isOpen={!settings.onboardingCompleted}
        language={settings.language}
        onComplete={(newSettings) => handleUpdateSettings(newSettings)}
        onSkip={() => handleUpdateSettings({ onboardingCompleted: true })}
      />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-2xl py-6 text-center text-xs text-teal-100/70 z-10 relative">
        <p>© 2026 HydraIST • India Standard Time (IST) Hydration Scheduler</p>
      </footer>
    </div>
  );
}
