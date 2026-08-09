import React, { useState } from 'react';
import { Droplet, Clock, RotateCcw, ArrowRight, X } from 'lucide-react';
import { UserSettings, Language, IntervalOption } from '../types';
import { getTranslation } from '../i18n/translations';

interface OnboardingModalProps {
  isOpen: boolean;
  language: Language;
  onComplete: (settings: Partial<UserSettings>) => void;
  onSkip: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  language,
  onComplete,
  onSkip,
}) => {
  if (!isOpen) return null;

  const t = (key: string) => getTranslation(language, key);

  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('18:00');
  const [interval, setInterval] = useState<IntervalOption>(20);
  const [dailyGoal, setDailyGoal] = useState<number>(2000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      startTime,
      endTime,
      intervalMinutes: interval,
      dailyGoalMl: dailyGoal,
      onboardingCompleted: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md" id="onboarding-modal-backdrop">
      <div className="relative w-full max-w-lg bg-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        <button
          onClick={onSkip}
          className="absolute top-5 right-5 text-white/60 hover:text-white p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all"
          id="onboarding-skip-btn"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-teal-400 text-teal-950 flex items-center justify-center mb-4 shadow-glow font-bold">
            <Droplet className="w-9 h-9 fill-teal-950" />
          </div>

          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {t('onboardingStep1Title')}
          </h2>
          <p className="text-xs text-white/70 mt-1 max-w-sm">
            {t('onboardingStep1Sub')}
          </p>

          <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4 text-left">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-white/90 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-300" />
                  <span>{t('startTimeLabel')}</span>
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/20 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-300"
                  id="onboarding-start-time"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-white/90 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-teal-300" />
                  <span>{t('endTimeLabel')}</span>
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2.5 bg-black/20 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-300"
                  id="onboarding-end-time"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/90 flex items-center space-x-1">
                <RotateCcw className="w-3.5 h-3.5 text-teal-300" />
                <span>{t('intervalLabel')}</span>
              </label>
              <select
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value) as IntervalOption)}
                className="w-full px-3 py-2.5 bg-slate-900/90 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-300"
                id="onboarding-interval"
              >
                {[10, 15, 20, 30, 45, 60].map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-900 text-white">
                    Every {opt} minutes {opt === 20 ? '(Recommended)' : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-white/90 flex items-center space-x-1">
                <Droplet className="w-3.5 h-3.5 text-teal-300 fill-teal-300" />
                <span>{t('waterGoalLabel')} (ml)</span>
              </label>
              <input
                type="number"
                step="50"
                min="500"
                max="10000"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-black/20 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:border-teal-300"
                id="onboarding-goal"
                required
              />
            </div>

            <div className="pt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onSkip}
                className="px-4 py-3 text-xs font-semibold text-white/60 hover:text-white"
                id="onboarding-skip-link"
              >
                {t('skipBtn')}
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-400 hover:bg-teal-300 text-teal-950 font-extrabold text-xs rounded-xl shadow-lg shadow-teal-500/30 flex items-center space-x-2"
                id="onboarding-get-started-btn"
              >
                <span>{t('getStartedBtn')}</span>
                <ArrowRight className="w-4 h-4 text-teal-950" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
