import React, { useState } from 'react';
import {
  Clock,
  Droplet,
  CheckCircle2,
  Lock,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  Check,
} from 'lucide-react';
import { HydrationItem, UserSettings, Language, IntervalOption } from '../types';
import { getTranslation } from '../i18n/translations';
import { isValidTimeRange } from '../utils/time';

interface ScheduleViewProps {
  items: HydrationItem[];
  settings: UserSettings;
  language: Language;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onCompleteItem: (itemId: string) => void;
  onSnoozeItem: (itemId: string, minutes: number) => void;
  onTryEarlyComplete: (item: HydrationItem) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  items,
  settings,
  language,
  onUpdateSettings,
  onCompleteItem,
  onSnoozeItem,
  onTryEarlyComplete,
}) => {
  const t = (key: string, params?: Record<string, string>) => getTranslation(language, key, params);

  // Form local state
  const [startTime, setStartTime] = useState(settings.startTime);
  const [endTime, setEndTime] = useState(settings.endTime);
  const [interval, setInterval] = useState<IntervalOption>(settings.intervalMinutes);
  const [waterGoal, setWaterGoal] = useState<number>(settings.dailyGoalMl);
  const [filter, setFilter] = useState<'all' | 'ready' | 'upcoming' | 'completed' | 'missed'>('all');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<boolean>(false);

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!startTime) {
      setValidationError(t('errStartTimeRequired'));
      return;
    }
    if (!endTime) {
      setValidationError(t('errEndTimeRequired'));
      return;
    }
    if (!isValidTimeRange(startTime, endTime)) {
      setValidationError(t('errEndTimeBeforeStart'));
      return;
    }
    if (!waterGoal || waterGoal <= 0) {
      setValidationError(t('errGoalInvalid'));
      return;
    }

    onUpdateSettings({
      startTime,
      endTime,
      intervalMinutes: interval,
      dailyGoalMl: waterGoal,
    });

    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const filteredItems = items.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const intervalOptions: IntervalOption[] = [10, 15, 20, 30, 45, 60];
  const quickGoalOptions = [1500, 2000, 2500, 3000];

  return (
    <div className="space-y-8 animate-fade-in text-white" id="schedule-view-container">
      {/* Schedule Configuration Card */}
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl" id="schedule-config-card">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/15">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-teal-300" />
              <span>{t('setupTitle')}</span>
            </h2>
            <p className="text-xs text-white/70 mt-1">
              All times strictly synchronized with {t('istNotice')}
            </p>
          </div>

          {saveSuccessMsg && (
            <span className="text-xs font-bold text-teal-950 bg-teal-300 px-3.5 py-1.5 rounded-full flex items-center space-x-1 shadow-glow animate-pulse">
              <Check className="w-4 h-4" />
              <span>Schedule Updated!</span>
            </span>
          )}
        </div>

        <form onSubmit={handleCreateSchedule} className="space-y-6">
          {validationError && (
            <div className="p-3 bg-red-500/20 border border-red-300/40 text-red-200 rounded-xl text-xs font-semibold flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{validationError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Start Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>{t('startTimeLabel')} (IST)</span>
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/40"
                id="start-time-input"
              />
            </div>

            {/* End Time */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90 flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-teal-300" />
                <span>{t('endTimeLabel')} (IST)</span>
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/40"
                id="end-time-input"
              />
            </div>

            {/* Reminder Interval */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90 flex items-center space-x-1">
                <RotateCcw className="w-3.5 h-3.5 text-teal-300" />
                <span>{t('intervalLabel')}</span>
              </label>
              <select
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value) as IntervalOption)}
                className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/40"
                id="interval-select"
              >
                {intervalOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-900 text-white">
                    Every {opt} minutes {opt === 20 ? '(Default)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Daily Water Goal */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/90 flex items-center space-x-1">
                <Droplet className="w-3.5 h-3.5 text-teal-300 fill-teal-300" />
                <span>{t('waterGoalLabel')}</span>
              </label>
              <input
                type="number"
                step="50"
                min="500"
                max="10000"
                value={waterGoal}
                onChange={(e) => setWaterGoal(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-black/20 border border-white/20 rounded-xl text-sm font-semibold text-white focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-300/40"
                id="water-goal-input"
              />
            </div>
          </div>

          {/* Quick Goal Options */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-xs font-semibold text-white/80 mr-2">
              {t('quickOptions')}:
            </span>
            {quickGoalOptions.map((goal) => (
              <button
                key={goal}
                type="button"
                onClick={() => setWaterGoal(goal)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  waterGoal === goal
                    ? 'bg-teal-400 text-teal-950 font-bold border-teal-300 shadow-glow'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
                id={`quick-goal-${goal}`}
              >
                {goal} ml
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-teal-400 hover:bg-teal-300 text-teal-950 font-extrabold text-sm rounded-xl shadow-lg shadow-teal-500/30 transition-all"
            id="recalculate-schedule-btn"
          >
            {t('recalculateBtn')}
          </button>
        </form>
      </div>

      {/* Schedule Timeline Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Clock className="w-5 h-5 text-teal-300" />
              <span>Today's Hydration Schedule Timeline</span>
            </h3>
            <p className="text-xs text-white/70 mt-1">
              Total {items.length} scheduled reminders ({Math.round(settings.dailyGoalMl / Math.max(1, items.length))} ml each)
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/20 p-1.5 rounded-2xl border border-white/15">
            {(['all', 'ready', 'upcoming', 'completed', 'missed'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  filter === f
                    ? 'bg-white/25 text-white font-bold border border-white/20 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
                id={`filter-tab-${f}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Items List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-6 text-white">
            <Droplet className="w-10 h-10 text-teal-300/60 mx-auto mb-3" />
            <h4 className="font-bold text-white text-base">{t('noScheduleTitle')}</h4>
            <p className="text-xs text-white/70 mt-1">{t('noScheduleSubtitle')}</p>
          </div>
        ) : (
          <div className="space-y-3" id="timeline-cards-list">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl ${
                  item.status === 'completed'
                    ? 'bg-white/15 border-teal-300/40 text-white shadow-lg'
                    : item.status === 'ready'
                    ? 'bg-teal-500/30 border-2 border-teal-300 text-white shadow-glow animate-pulse-slow'
                    : item.status === 'missed'
                    ? 'bg-amber-500/20 border-amber-300/40 text-amber-100'
                    : 'bg-white/10 border-white/15 text-white'
                }`}
                id={`timeline-card-${item.id}`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                      item.status === 'completed'
                        ? 'bg-teal-300 text-teal-950 border-teal-200'
                        : item.status === 'ready'
                        ? 'bg-teal-400 text-teal-950 font-bold border-teal-300 shadow-glow'
                        : item.status === 'missed'
                        ? 'bg-amber-500/30 text-amber-200 border-amber-300/40'
                        : 'bg-black/20 text-white/50 border-white/10'
                    }`}
                  >
                    {item.status === 'completed' && <CheckCircle2 className="w-6 h-6" />}
                    {item.status === 'ready' && <Droplet className="w-6 h-6 fill-teal-950" />}
                    {item.status === 'missed' && <AlertTriangle className="w-6 h-6" />}
                    {item.status === 'upcoming' && <Lock className="w-6 h-6" />}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-base font-extrabold text-white">
                        {item.displayTime} IST
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border ${
                          item.status === 'completed'
                            ? 'bg-teal-950/60 text-teal-200 border-teal-300/30'
                            : item.status === 'ready'
                            ? 'bg-teal-400 text-teal-950 font-extrabold border-teal-300'
                            : item.status === 'missed'
                            ? 'bg-amber-950/60 text-amber-200 border-amber-300/30'
                            : 'bg-black/30 text-white/70 border-white/20'
                        }`}
                      >
                        {t(`status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`)}
                      </span>
                    </div>

                    <p className="text-xs text-white/80 mt-1">
                      Target: <strong className="text-teal-200 font-bold">{item.amountMl} ml</strong>
                      {item.completedAt && ` • Completed at ${item.completedAt}`}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-full sm:w-auto flex items-center space-x-2 shrink-0">
                  {item.status === 'completed' ? (
                    <span className="text-xs font-bold text-teal-200 flex items-center space-x-1 bg-white/20 px-4 py-2 rounded-xl border border-teal-300/30">
                      <Check className="w-4 h-4 text-teal-300" />
                      <span>{t('statusCompleted')}</span>
                    </span>
                  ) : item.status === 'ready' ? (
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                      <button
                        onClick={() => onCompleteItem(item.id)}
                        className="flex-1 sm:flex-initial px-5 py-2.5 bg-white text-teal-950 hover:bg-teal-100 font-extrabold text-xs rounded-xl shadow-lg transition-all"
                        id={`mark-complete-btn-${item.id}`}
                      >
                        {t('markCompleteBtn')}
                      </button>
                      <button
                        onClick={() => onSnoozeItem(item.id, 10)}
                        className="px-3.5 py-2.5 bg-black/20 hover:bg-black/30 text-teal-200 font-semibold text-xs rounded-xl border border-white/15 transition-colors"
                        id={`snooze-btn-${item.id}`}
                      >
                        {t('snoozeBtn')}
                      </button>
                    </div>
                  ) : item.status === 'missed' ? (
                    <button
                      onClick={() => onCompleteItem(item.id)}
                      className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-extrabold text-xs rounded-xl shadow-lg transition-all"
                      id={`complete-now-btn-${item.id}`}
                    >
                      {t('completeNowBtn')}
                    </button>
                  ) : (
                    <button
                      onClick={() => onTryEarlyComplete(item)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center space-x-1.5"
                      id={`try-complete-early-btn-${item.id}`}
                    >
                      <Lock className="w-3.5 h-3.5 text-teal-300" />
                      <span>{t('statusUpcoming')}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Medical Disclaimer Note */}
      <div className="p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl flex items-start space-x-3 text-xs text-white/80 shadow-lg">
        <Info className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
        <p>{t('medicalDisclaimer')}</p>
      </div>
    </div>
  );
};
