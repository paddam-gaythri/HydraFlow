import React from 'react';
import { History as HistoryIcon, Calendar, CheckCircle2, AlertTriangle, Droplet } from 'lucide-react';
import { DailyHistoryRecord, Language } from '../types';
import { getTranslation } from '../i18n/translations';

interface HistoryViewProps {
  records: DailyHistoryRecord[];
  language: Language;
}

export const HistoryView: React.FC<HistoryViewProps> = ({ records, language }) => {
  const t = (key: string, params?: Record<string, string>) => getTranslation(language, key, params);

  return (
    <div className="space-y-8 animate-fade-in text-white" id="history-view-container">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white flex items-center space-x-2">
            <HistoryIcon className="w-6 h-6 text-teal-300" />
            <span>{t('historyTitle')}</span>
          </h2>
          <p className="text-xs text-white/70 mt-1">
            Past daily completion records saved in local browser storage (IST)
          </p>
        </div>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 shadow-2xl">
          <Droplet className="w-12 h-12 text-teal-300/60 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-white">{t('noHistoryYet')}</h3>
          <p className="text-xs text-white/70 max-w-sm mx-auto mt-1">
            Complete your daily scheduled hydration reminders to see your logs and habit progress build up here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="history-records-grid">
          {records.map((record) => {
            const percent = record.goalMl > 0 ? Math.min(100, Math.round((record.consumedMl / record.goalMl) * 100)) : 0;

            return (
              <div
                key={record.date}
                className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-6 shadow-xl hover:border-white/30 transition-all text-white"
                id={`history-card-${record.date}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-white font-bold text-base">
                    <Calendar className="w-4 h-4 text-teal-300" />
                    <span>{record.date}</span>
                  </div>
                  <span className="text-xs font-black text-teal-200 bg-teal-950/60 border border-teal-300/30 px-3 py-1 rounded-full">
                    {percent}% Goal
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs font-semibold text-white/80">
                    <span>{t('consumedOfGoal', { consumed: record.consumedMl.toString(), goal: record.goalMl.toString() })}</span>
                    <span>{record.completedCount} / {record.totalCount} {t('completedReminders').toLowerCase()}</span>
                  </div>
                  <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div
                      className="bg-teal-300 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(45,212,191,0.5)]"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-white/70 pt-3 border-t border-white/10">
                  <span className="flex items-center space-x-1 text-teal-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-300" />
                    <span>{record.completedCount} Completed</span>
                  </span>
                  <span className="flex items-center space-x-1 text-amber-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                    <span>{record.missedCount} Missed</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
