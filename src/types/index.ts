export type Language = 'en' | 'hi' | 'gu' | 'te';

export type ThemeMode = 'light' | 'dark' | 'system';

export type IntervalOption = 10 | 15 | 20 | 30 | 45 | 60;

export type ItemStatus = 'completed' | 'ready' | 'upcoming' | 'missed';

export interface HydrationItem {
  id: string;
  time: string; // "HH:mm" in 24-hour format
  displayTime: string; // "08:20 AM"
  amountMl: number;
  status: ItemStatus;
  completedAt: string | null; // IST timestamp ISO or formatted
  snoozedUntil: number | null; // epoch timestamp ms
}

export interface UserSettings {
  startTime: string; // "08:00"
  endTime: string; // "18:00"
  intervalMinutes: IntervalOption;
  dailyGoalMl: number; // e.g. 2000
  language: Language;
  theme: ThemeMode;
  notificationsEnabled: boolean;
  customAmounts: Record<string, number>; // slot time -> amount in ml
  onboardingCompleted: boolean;
}

export interface DailyHistoryRecord {
  date: string; // "YYYY-MM-DD" in IST
  goalMl: number;
  consumedMl: number;
  completedCount: number;
  missedCount: number;
  totalCount: number;
  items: HydrationItem[];
}

export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  id: string;
  nameKey: string;
  priceKey: string;
  periodKey: string;
  popular?: boolean;
  featuresKeys: string[];
}
