import { HydrationItem, UserSettings, ItemStatus } from '../types';
import {
  getISTNowMinutes,
  timeStringToMinutes,
  minutesToTimeString,
  format12HourTime,
  getISTParts,
  getISTTodayString,
} from '../utils/time';

/**
 * Generate a complete hydration schedule dynamically based on settings
 */
export function generateSchedule(settings: UserSettings, existingItems?: HydrationItem[] | null): HydrationItem[] {
  const startMins = timeStringToMinutes(settings.startTime);
  const endMins = timeStringToMinutes(settings.endTime);
  const interval = settings.intervalMinutes || 20;

  // Validate range
  if (endMins <= startMins || interval <= 0) {
    return [];
  }

  // Calculate time slots
  const timeSlots24: string[] = [];
  let currentMins = startMins;

  while (currentMins <= endMins) {
    const timeStr = minutesToTimeString(currentMins);
    if (!timeSlots24.includes(timeStr)) {
      timeSlots24.push(timeStr);
    }
    currentMins += interval;
  }

  if (timeSlots24.length === 0) return [];

  // Calculate water per reminder
  const defaultAmountPerSlot = Math.max(50, Math.round(settings.dailyGoalMl / timeSlots24.length));

  // Map existing completion states if recalculating settings
  const existingMap = new Map<string, HydrationItem>();
  if (existingItems) {
    existingItems.forEach((item) => {
      existingMap.set(item.time, item);
    });
  }

  const nowMins = getISTNowMinutes();

  const generatedItems: HydrationItem[] = timeSlots24.map((time24, index) => {
    const slotMins = timeStringToMinutes(time24);
    const existing = existingMap.get(time24);

    // Custom amount per slot or default calculated
    const amountMl = settings.customAmounts[time24] || existing?.amountMl || defaultAmountPerSlot;

    let status: ItemStatus = 'upcoming';

    if (existing && existing.completedAt) {
      status = 'completed';
    } else {
      // Evaluate status against IST current time
      const nextSlotMins = index < timeSlots24.length - 1 ? timeStringToMinutes(timeSlots24[index + 1]) : endMins + interval;

      if (nowMins < slotMins) {
        status = 'upcoming';
      } else if (nowMins >= slotMins && nowMins < nextSlotMins) {
        status = 'ready';
      } else {
        status = 'missed';
      }
    }

    return {
      id: existing?.id || `slot_${time24.replace(':', '_')}`,
      time: time24,
      displayTime: format12HourTime(time24),
      amountMl,
      status,
      completedAt: existing?.completedAt || null,
      snoozedUntil: existing?.snoozedUntil || null,
    };
  });

  return generatedItems;
}

/**
 * Re-evaluate dynamic states of items based on current IST time without overriding completed tasks
 */
export function evaluateItemStates(items: HydrationItem[], intervalMinutes: number, endTime24: string): HydrationItem[] {
  const nowMins = getISTNowMinutes();
  const endMins = timeStringToMinutes(endTime24);

  return items.map((item, index) => {
    if (item.completedAt || item.status === 'completed') {
      return { ...item, status: 'completed' as ItemStatus };
    }

    const slotMins = timeStringToMinutes(item.time);
    const nextSlotMins =
      index < items.length - 1 ? timeStringToMinutes(items[index + 1].time) : endMins + intervalMinutes;

    let status: ItemStatus = 'upcoming';
    if (nowMins < slotMins) {
      status = 'upcoming';
    } else if (nowMins >= slotMins && nowMins < nextSlotMins) {
      status = 'ready';
    } else {
      status = 'missed';
    }

    return {
      ...item,
      status,
    };
  });
}

/**
 * Validates if an item can be completed right now.
 * Strict Rule: Must NOT complete before its scheduled time!
 */
export function canCompleteItem(item: HydrationItem): {
  allowed: boolean;
  reason?: string;
} {
  if (item.status === 'completed') {
    return { allowed: true };
  }

  const nowMins = getISTNowMinutes();
  const slotMins = timeStringToMinutes(item.time);

  if (nowMins < slotMins) {
    return {
      allowed: false,
      reason: `Your hydration reminder is scheduled for ${item.displayTime}. You can mark it complete when the scheduled time arrives.`,
    };
  }

  return { allowed: true };
}

/**
 * Mark item as completed using IST timestamp
 */
export function markItemCompleted(items: HydrationItem[], itemId: string): HydrationItem[] {
  const istNow = getISTParts();
  const timestampStr = `${istNow.formattedDate} ${istNow.formattedTime12} IST`;

  return items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        status: 'completed' as ItemStatus,
        completedAt: timestampStr,
        snoozedUntil: null,
      };
    }
    return item;
  });
}

/**
 * Snooze a reminder for X minutes
 */
export function snoozeItem(items: HydrationItem[], itemId: string, snoozeMinutes: number): HydrationItem[] {
  const snoozedUntil = Date.now() + snoozeMinutes * 60 * 1000;
  return items.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        snoozedUntil,
      };
    }
    return item;
  });
}
