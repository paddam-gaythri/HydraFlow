import React, { useState } from 'react';
import {
  Settings,
  Sun,
  Moon,
  Laptop,
  Globe,
  Bell,
  Clock,
  Droplet,
  Check,
  RotateCcw,
} from 'lucide-react';
import { UserSettings, Language, ThemeMode, IntervalOption } from '../types';
import { getTranslation } from '../i18n/translations';

interface SettingsViewProps {
  settings: UserSettings;
  language: Language;
  theme: ThemeMode;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onSetLanguage: (lang: Language) => void;
  onSetTheme: (theme: ThemeMode) => void;
  onRequestNotifications: () => void;
  notificationStatus: NotificationPermission | 'unsupported';
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  language,
  theme,
  onUpdateSettings,
  onSetLanguage,
  onSetTheme,
  onRequestNotifications,
  notificationStatus,
}) => {
  const t = (key: string) => getTranslation(language, key);

  const [startTime, setStartTime] = useState(settings.startTime);
  const [endTime, setEndTime] = useState(settings.endTime);
  const [interval, setInterval] = useState<IntervalOption>(settings.intervalMinutes);
  const [dailyGoal, setDailyGoal] = useState<number>(settings.dailyGoalMl);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveDefaults = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      startTime,
      endTime,
      intervalMinutes: interval,
      dailyGoalMl: dailyGoal,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in text-white" id="settings-view-container">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center space-x-2">
            <Settings className="w-6 h-6 text-teal-300" />
            <span>{t('settingsTitle')}</span>
          </h2>
          <p className="text-xs text-white/70 mt-1">
            Configure your personalized schedule, theme, language, and notifications.
          </p>
        </div>

        {savedNotice && (
          <span className="text-xs font-bold text-teal-950 bg-teal-300 px-3.5 py-1.5 rounded-full flex items-center space-x-1 shadow-glow animate-pulse">
            <Check className="w-4 h-4" />
            <span>Settings Saved!</span>
          </span>
        )}
      </div>

      {/* Group 1: Hydration Schedule Defaults */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl space-y-6">
        <h3 className="font-bold text-base text-white flex items-center space-x-2 pb-4 border-b border-white/15">
          <Droplet className="w-5 h-5 text-teal-300 fill-teal-300" />
          <span>{t('hydrationSettingsGroup')}</span>
        </h3>

        <form onSubmit={handleSaveDefaults} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90">
                {t('startTimeLabel')} (IST)
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300"
                id="settings-start-time"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90">
                {t('endTimeLabel')} (IST)
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300"
                id="settings-end-time"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90">
                {t('intervalLabel')}
              </label>
              <select
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value) as IntervalOption)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300"
                id="settings-interval"
              >
                {[10, 15, 20, 30, 45, 60].map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-900 text-white">
                    Every {opt} minutes
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90">
                {t('waterGoalLabel')} (ml)
              </label>
              <input
                type="number"
                step="50"
                min="500"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300"
                id="settings-goal"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-teal-400 hover:bg-teal-300 text-teal-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/30 transition-all"
            id="settings-save-btn"
          >
            {t('saveSettingsBtn')}
          </button>
        </form>
      </div>

      {/* Group 2: Language & Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language Selection */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
          <h3 className="font-bold text-base text-white flex items-center space-x-2 pb-3 border-b border-white/15">
            <Globe className="w-5 h-5 text-teal-300" />
            <span>{t('languageGroup')}</span>
          </h3>

          <div className="space-y-2">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => onSetLanguage(l.code)}
                className={`w-full text-left p-3.5 rounded-2xl border text-xs font-extrabold transition-all flex items-center justify-between ${
                  language === l.code
                    ? 'bg-teal-400 text-teal-950 border-teal-300 shadow-glow'
                    : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
                }`}
                id={`settings-lang-${l.code}`}
              >
                <span>{l.name}</span>
                {language === l.code && <Check className="w-4 h-4 text-teal-950 font-black" />}
              </button>
            ))}
          </div>
        </div>

        {/* Theme Mode */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
          <h3 className="font-bold text-base text-white flex items-center space-x-2 pb-3 border-b border-white/15">
            <Sun className="w-5 h-5 text-teal-300" />
            <span>{t('appearanceGroup')}</span>
          </h3>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onSetTheme('light')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all flex flex-col items-center justify-center space-y-2 ${
                theme === 'light'
                  ? 'bg-teal-400 text-teal-950 border-teal-300 shadow-glow'
                  : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
              }`}
              id={`settings-theme-light`}
            >
              <Sun className={`w-5 h-5 ${theme === 'light' ? 'text-teal-950' : 'text-amber-300'}`} />
              <span>{t('themeLight')}</span>
            </button>

            <button
              onClick={() => onSetTheme('dark')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all flex flex-col items-center justify-center space-y-2 ${
                theme === 'dark'
                  ? 'bg-teal-400 text-teal-950 border-teal-300 shadow-glow'
                  : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
              }`}
              id={`settings-theme-dark`}
            >
              <Moon className={`w-5 h-5 ${theme === 'dark' ? 'text-teal-950' : 'text-amber-200'}`} />
              <span>{t('themeDark')}</span>
            </button>

            <button
              onClick={() => onSetTheme('system')}
              className={`p-3.5 rounded-2xl border text-xs font-bold text-center transition-all flex flex-col items-center justify-center space-y-2 ${
                theme === 'system'
                  ? 'bg-teal-400 text-teal-950 border-teal-300 shadow-glow'
                  : 'bg-white/10 border-white/15 text-white hover:bg-white/20'
              }`}
              id={`settings-theme-system`}
            >
              <Laptop className={`w-5 h-5 ${theme === 'system' ? 'text-teal-950' : 'text-teal-200'}`} />
              <span>{t('themeSystem')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Group 3: Notifications & Timezone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
          <h3 className="font-bold text-base text-white flex items-center space-x-2 pb-3 border-b border-white/15">
            <Bell className="w-5 h-5 text-teal-300" />
            <span>{t('notificationsGroup')}</span>
          </h3>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">
                Browser Notifications
              </p>
              <p className="text-[11px] text-white/70 mt-0.5">
                {notificationStatus === 'granted' ? t('notificationsEnabledMsg') : t('notificationsDisabledMsg')}
              </p>
            </div>

            <button
              onClick={onRequestNotifications}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                notificationStatus === 'granted'
                  ? 'bg-teal-400 text-teal-950 border border-teal-300 shadow-glow'
                  : 'bg-white text-teal-950 hover:bg-teal-100 font-extrabold'
              }`}
              id="settings-notification-btn"
            >
              {notificationStatus === 'granted' ? 'Enabled' : t('enableNotificationsBtn')}
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 shadow-2xl space-y-4">
          <h3 className="font-bold text-base text-white flex items-center space-x-2 pb-3 border-b border-white/15">
            <Clock className="w-5 h-5 text-teal-300" />
            <span>{t('timezoneGroup')}</span>
          </h3>

          <div className="p-3.5 bg-black/20 border border-white/15 rounded-2xl space-y-1">
            <div className="text-xs font-extrabold text-teal-200">
              {t('istNotice')}
            </div>
            <p className="text-[11px] text-white/80 leading-relaxed">
              {t('timezoneReadOnlyNote')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
