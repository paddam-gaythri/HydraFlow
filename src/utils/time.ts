/**
 * India Standard Time (IST) Timezone Utilities
 * Timezone: Asia/Kolkata (UTC+05:30)
 * All calculations, comparisons, countdowns, and completion logic strictly enforce IST.
 */

export const IST_TIMEZONE = 'Asia/Kolkata';

/**
 * Get current date/time parts in IST
 */
export function getISTParts(date: Date = new Date()): {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hours: number; // 0-23
  minutes: number; // 0-59
  seconds: number; // 0-59
  formattedDate: string; // YYYY-MM-DD
  formattedTime12: string; // 10:42 AM
  formattedTime24: string; // 10:42
} {
  const formatter24 = new Intl.DateTimeFormat('en-US', {
    timeZone: IST_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formatter12 = new Intl.DateTimeFormat('en-US', {
    timeZone: IST_TIMEZONE,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const parts = formatter24.formatToParts(date);
  const partMap: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== 'literal') {
      partMap[part.type] = part.value;
    }
  }

  const year = parseInt(partMap.year || '2026', 10);
  const month = parseInt(partMap.month || '1', 10);
  const day = parseInt(partMap.day || '1', 10);
  let hours = parseInt(partMap.hour || '0', 10);
  if (hours === 24) hours = 0; // standard 24hr fix if needed
  const minutes = parseInt(partMap.minute || '0', 10);
  const seconds = parseInt(partMap.second || '0', 10);

  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const formattedTime24 = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  const formattedTime12 = formatter12.format(date);

  return {
    year,
    month,
    day,
    hours,
    minutes,
    seconds,
    formattedDate,
    formattedTime12,
    formattedTime24,
  };
}

/**
 * Returns current date string in IST format "YYYY-MM-DD"
 */
export function getISTTodayString(): string {
  return getISTParts().formattedDate;
}

/**
 * Returns total minutes from midnight for current IST time
 */
export function getISTNowMinutes(): number {
  const parts = getISTParts();
  return parts.hours * 60 + parts.minutes;
}

/**
 * Convert 24-hour "HH:mm" time string to total minutes from midnight
 */
export function timeStringToMinutes(timeStr: string): number {
  if (!timeStr || !timeStr.includes(':')) return 0;
  const [h, m] = timeStr.split(':').map((v) => parseInt(v, 10));
  return (isNaN(h) ? 0 : h) * 60 + (isNaN(m) ? 0 : m);
}

/**
 * Convert minutes from midnight back to 24-hour "HH:mm"
 */
export function minutesToTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60) % 24;
  const m = Math.floor(minutes % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

/**
 * Format a 24-hour time string ("08:20") to 12-hour AM/PM string ("08:20 AM")
 */
export function format12HourTime(time24: string): string {
  const mins = timeStringToMinutes(time24);
  const hours24 = Math.floor(mins / 60) % 24;
  const minutes = mins % 60;

  const period = hours24 >= 12 ? 'PM' : 'AM';
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  return `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

/**
 * Calculate countdown string (e.g. "18 min 32 sec") from current IST time to a target "HH:mm" IST time
 */
export function getISTCountdown(targetTime24: string): {
  text: string;
  totalSecondsRemaining: number;
  isPast: boolean;
} {
  const nowParts = getISTParts();
  const nowTotalSeconds = nowParts.hours * 3600 + nowParts.minutes * 60 + nowParts.seconds;

  const targetMinutes = timeStringToMinutes(targetTime24);
  const targetTotalSeconds = targetMinutes * 60;

  const diffSeconds = targetTotalSeconds - nowTotalSeconds;

  if (diffSeconds <= 0) {
    return {
      text: '00 min 00 sec',
      totalSecondsRemaining: 0,
      isPast: true,
    };
  }

  const hours = Math.floor(diffSeconds / 3600);
  const mins = Math.floor((diffSeconds % 3600) / 60);
  const secs = diffSeconds % 60;

  let text = '';
  if (hours > 0) {
    text = `${hours}h ${mins}m ${secs}s`;
  } else {
    text = `${mins} min ${String(secs).padStart(2, '0')} sec`;
  }

  return {
    text,
    totalSecondsRemaining: diffSeconds,
    isPast: false,
  };
}

/**
 * Formats full current IST timestamp string for display: e.g. "10:42 AM IST"
 */
export function getISTDisplayClock(): string {
  const parts = getISTParts();
  return `${parts.formattedTime12} IST`;
}

/**
 * Helper to check if end time is logically after start time
 */
export function isValidTimeRange(start24: string, end24: string): boolean {
  const startMins = timeStringToMinutes(start24);
  const endMins = timeStringToMinutes(end24);
  return endMins > startMins;
}
