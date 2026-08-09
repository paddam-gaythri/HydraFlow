export type PlanType = 'free' | 'pro' | 'annual';

export interface UserSubscription {
  plan: PlanType;
  paymentId?: string;
  orderId?: string;
  verifiedAt?: string;
}

const STORAGE_KEY_SUB = 'hydraist_user_subscription';

export function loadSubscription(): UserSubscription {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUB);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.plan === 'pro' || parsed.plan === 'annual' || parsed.plan === 'free')) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error loading subscription from localStorage:', e);
  }
  return { plan: 'free' };
}

export function saveSubscription(sub: UserSubscription): void {
  try {
    localStorage.setItem(STORAGE_KEY_SUB, JSON.stringify(sub));
  } catch (e) {
    console.warn('Error saving subscription to localStorage:', e);
  }
}
