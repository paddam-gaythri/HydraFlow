import { UserSettings, HydrationItem, DailyHistoryRecord } from '../types';
import { getISTTodayString } from '../utils/time';

const SETTINGS_KEY = 'hydra_ist_settings_v1';
const SCHEDULE_PREFIX = 'hydra_ist_schedule_';
const HISTORY_KEY = 'hydra_ist_history_v1';

export const DEFAULT_SETTINGS: UserSettings = {
  startTime: '08:00',
  endTime: '18:00',
  intervalMinutes: 20,
  dailyGoalMl: 2000,
  language: 'en',
  theme: 'system',
  notificationsEnabled: false,
  customAmounts: {},
  onboardingCompleted: false,
};

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
    };
  } catch (e) {
    console.warn('Corrupted settings in localStorage, resetting to defaults.', e);
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings to localStorage:', e);
  }
}

export function loadTodaySchedule(dateStr: string = getISTTodayString()): HydrationItem[] | null {
  try {
    const raw = localStorage.getItem(`${SCHEDULE_PREFIX}${dateStr}`);
    if (!raw) return null;
    return JSON.parse(raw) as HydrationItem[];
  } catch (e) {
    console.warn('Corrupted schedule data in localStorage for date:', dateStr, e);
    return null;
  }
}

export function saveTodaySchedule(items: HydrationItem[], dateStr: string = getISTTodayString()): void {
  try {
    localStorage.setItem(`${SCHEDULE_PREFIX}${dateStr}`, JSON.stringify(items));
    updateHistoryRecord(dateStr, items);
  } catch (e) {
    console.error('Failed to save schedule to localStorage:', e);
  }
}

export function loadHistory(): DailyHistoryRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as DailyHistoryRecord[];
  } catch (e) {
    console.warn('Corrupted history in localStorage, resetting to empty array.', e);
    return [];
  }
}

export function saveHistory(records: DailyHistoryRecord[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
  } catch (e) {
    console.error('Failed to save history to localStorage:', e);
  }
}

export function updateHistoryRecord(dateStr: string, items: HydrationItem[]): void {
  const history = loadHistory();
  const settings = loadSettings();

  const completed = items.filter((i) => i.status === 'completed');
  const missed = items.filter((i) => i.status === 'missed');
  const consumedMl = completed.reduce((sum, item) => sum + item.amountMl, 0);

  const newRecord: DailyHistoryRecord = {
    date: dateStr,
    goalMl: settings.dailyGoalMl,
    consumedMl,
    completedCount: completed.length,
    missedCount: missed.length,
    totalCount: items.length,
    items,
  };

  const existingIdx = history.findIndex((r) => r.date === dateStr);
  if (existingIdx >= 0) {
    history[existingIdx] = newRecord;
  } else {
    history.unshift(newRecord);
  }

  // Keep last 60 days of history
  saveHistory(history.slice(0, 60));
}
