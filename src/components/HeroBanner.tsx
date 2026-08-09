import React from 'react';
import { Droplets, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface HeroBannerProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ language, onNavigate }) => {
  const t = (key: string) => getTranslation(language, key);

  return (
    <div className="relative overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 shadow-2xl text-white rounded-[2.5rem]">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/20 text-teal-200 text-xs font-semibold border border-white/30 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-teal-300" />
            <span>{t('istNotice')} • {t('timezoneInfo')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            💧 {t('heroTitle')}
          </h1>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            <button
              onClick={() => onNavigate('schedule')}
              className="px-6 py-3.5 bg-teal-400 hover:bg-teal-300 text-teal-950 font-bold rounded-2xl shadow-lg shadow-teal-500/30 transition-all flex items-center space-x-2 group"
              id="hero-create-schedule-btn"
            >
              <span>{t('createScheduleBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-2xl border border-white/30 backdrop-blur-md shadow-sm transition-all"
              id="hero-view-dashboard-btn"
            >
              {t('viewDashboardBtn')}
            </button>
          </div>
        </div>

        {/* Visual Water Progress Card Graphic */}
        <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative" id="hero-feature-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-teal-300" />
              <span className="font-bold text-sm text-white">{t('todaysHydration')}</span>
            </div>
            <span className="text-xs font-semibold text-teal-200 bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-300/30 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
              <span>IST Verified</span>
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium text-white/80">
              <span>1,400 ml / 2,000 ml</span>
              <span className="font-bold text-teal-200">70%</span>
            </div>
            <div className="w-full bg-black/20 h-3.5 rounded-full overflow-hidden p-0.5">
              <div className="bg-teal-300 h-full rounded-full transition-all duration-1000 w-[70%] shadow-[0_0_15px_rgba(45,212,191,0.5)]" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
            <span>Interval: 20 min</span>
            <span className="text-teal-200 font-semibold">Every 20 Minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};
