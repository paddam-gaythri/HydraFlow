import React, { useState, useEffect } from 'react';
import {
  Droplet,
  Clock,
  CheckCircle2,
  Lock,
  AlertTriangle,
  Bell,
  Award,
  Zap,
} from 'lucide-react';
import { HydrationItem, UserSettings, Language } from '../types';
import { getTranslation } from '../i18n/translations';
import { getISTCountdown } from '../utils/time';

interface DashboardViewProps {
  items: HydrationItem[];
  settings: UserSettings;
  language: Language;
  onCompleteItem: (itemId: string) => void;
  onRequestNotifications: () => void;
  notificationStatus: NotificationPermission | 'unsupported';
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  items,
  settings,
  language,
  onCompleteItem,
  onRequestNotifications,
  notificationStatus,
}) => {
  const t = (key: string, params?: Record<string, string>) => getTranslation(language, key, params);

  // Find next upcoming / ready reminder
  const nextReminder = items.find((item) => item.status === 'ready' || item.status === 'upcoming');
  const readyReminder = items.find((item) => item.status === 'ready');

  // Countdown state
  const [countdownText, setCountdownText] = useState<string>('');

  useEffect(() => {
    if (!nextReminder) {
      setCountdownText('All done!');
      return;
    }

    const updateCountdown = () => {
      const { text } = getISTCountdown(nextReminder.time);
      setCountdownText(text);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [nextReminder]);

  // Calculated Stats
  const completedItems = items.filter((i) => i.status === 'completed');
  const remainingItems = items.filter((i) => i.status !== 'completed');
  const consumedWaterMl = completedItems.reduce((sum, item) => sum + item.amountMl, 0);
  const goalMl = settings.dailyGoalMl;
  const progressPercent = goalMl > 0 ? Math.min(100, Math.round((consumedWaterMl / goalMl) * 100)) : 0;

  return (
    <div className="space-y-8 animate-fade-in text-white" id="dashboard-view-container">
      {/* Notifications Banner if disabled */}
      {notificationStatus !== 'granted' && (
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-white/20 text-teal-300 border border-white/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                {t('notificationsDisabledMsg')}
              </p>
            </div>
          </div>
          <button
            onClick={onRequestNotifications}
            className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold text-xs rounded-xl shadow-lg transition-colors shrink-0"
            id="enable-notifications-banner-btn"
          >
            {t('enableNotificationsBtn')}
          </button>
        </div>
      )}

      {/* Main Hydration Progress Card & Next Reminder Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-6 sm:p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                <Droplet className="w-5 h-5 text-teal-300 fill-teal-300" />
                <span>{t('todaysHydration')}</span>
              </h2>
              <p className="text-xs text-white/70 mt-1">
                {t('istNotice')}
              </p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-teal-200">
                {consumedWaterMl.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-white/70">
                {' '}
                / {goalMl.toLocaleString()} ml
              </span>
            </div>
          </div>

          {/* Progress Bar & Glow */}
          <div className="space-y-3 my-4">
            <div className="flex justify-between text-xs font-semibold text-white/90">
              <span>{progressPercent}% {t('completedReminders')}</span>
              <span>{goalMl - consumedWaterMl > 0 ? `${(goalMl - consumedWaterMl).toLocaleString()} ml ${t('remainingReminders').toLowerCase()}` : t('allDoneToday')}</span>
            </div>
            <div className="w-full bg-black/20 h-4 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="bg-teal-300 h-full rounded-full transition-all duration-700 relative overflow-hidden shadow-[0_0_20px_rgba(45,212,191,0.5)]"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Banner for current ready reminder if active */}
          {readyReminder ? (
            <div className="mt-6 p-4 bg-teal-500/30 border-2 border-teal-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-glow backdrop-blur-md animate-pulse-slow">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-400 text-teal-950 flex items-center justify-center font-bold shrink-0 shadow-md">
                  <Droplet className="w-5 h-5 fill-teal-950" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {t('readyToDrinkBanner')} ({readyReminder.displayTime} IST)
                  </h4>
                  <p className="text-xs text-teal-100">
                    Target: {readyReminder.amountMl} ml
                  </p>
                </div>
              </div>
              <button
                onClick={() => onCompleteItem(readyReminder.id)}
                className="w-full sm:w-auto px-5 py-2.5 bg-white text-teal-950 hover:bg-teal-100 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
                id="dash-complete-ready-btn"
              >
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                <span>{t('markCompleteBtn')}</span>
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span>Optimal Pace Tracker</span>
              <span className="text-teal-200 font-semibold">IST Synchronized</span>
            </div>
          )}
        </div>

        {/* Next Reminder Countdown Card */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-6 sm:p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden text-white" id="dash-next-reminder-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-300 flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{t('nextReminder')}</span>
            </span>
            <span className="text-[10px] font-bold bg-white/10 text-teal-200 border border-white/20 px-2.5 py-1 rounded-full">
              IST
            </span>
          </div>

          <div className="my-6">
            {nextReminder ? (
              <div>
                <div className="text-4xl font-extrabold tracking-tight text-white">
                  {nextReminder.displayTime} <span className="text-sm font-semibold opacity-70">IST</span>
                </div>
                <div className="text-sm text-teal-200 font-medium mt-2 flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>💧 {t('countdownLabel')}: <strong className="text-white font-mono text-base ml-1">{countdownText}</strong></span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-white/70">
                <Award className="w-10 h-10 text-teal-300 mx-auto mb-2" />
                <p className="text-base font-bold text-white">{t('allDoneToday')}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <span>Interval: {settings.intervalMinutes} min</span>
            <span>Target: {nextReminder ? `${nextReminder.amountMl} ml` : '-'}</span>
          </div>
        </div>
      </div>

      {/* Progress Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-teal-300 text-xs font-semibold mb-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('completedReminders')}</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {completedItems.length} <span className="text-xs font-normal text-white/60">/ {items.length}</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-teal-200 text-xs font-semibold mb-1">
            <Clock className="w-4 h-4" />
            <span>{t('remainingReminders')}</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {remainingItems.length}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-cyan-300 text-xs font-semibold mb-1">
            <Droplet className="w-4 h-4" />
            <span>{t('waterConsumed')}</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {consumedWaterMl} <span className="text-xs font-normal text-white/60">ml</span>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-xl">
          <div className="flex items-center space-x-2 text-amber-200 text-xs font-semibold mb-1">
            <Award className="w-4 h-4" />
            <span>{t('completionRate')}</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* Quick Timeline Overview */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 p-6 sm:p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg text-white">
            Today's Timeline Overview (IST)
          </h3>
          <span className="text-xs px-3 py-1 bg-white/10 rounded-full border border-white/10 text-teal-100">
            {settings.intervalMinutes}-min intervals
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border text-center transition-all ${
                item.status === 'completed'
                  ? 'bg-white/20 border-teal-300/40 text-teal-100 backdrop-blur-md'
                  : item.status === 'ready'
                  ? 'bg-teal-500/30 border-2 border-teal-300 text-white font-bold shadow-glow animate-pulse-slow'
                  : item.status === 'missed'
                  ? 'bg-amber-500/20 border border-amber-300/40 text-amber-200'
                  : 'bg-black/20 border border-white/10 text-white/60'
              }`}
            >
              <div className="text-xs font-extrabold">{item.displayTime}</div>
              <div className="text-[10px] mt-1.5 flex items-center justify-center space-x-1">
                {item.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />}
                {item.status === 'ready' && <Droplet className="w-3.5 h-3.5 text-teal-300 fill-teal-300" />}
                {item.status === 'upcoming' && <Lock className="w-3.5 h-3.5 text-white/40" />}
                {item.status === 'missed' && <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />}
                <span className="capitalize">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
