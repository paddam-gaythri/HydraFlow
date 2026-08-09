/**
 * Notification Service & Web Audio Chime
 */

export function checkNotificationSupport(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export function getNotificationPermission(): NotificationPermission {
  if (!checkNotificationSupport()) return 'denied';
  return Notification.permission;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!checkNotificationSupport()) return false;
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (e) {
    console.error('Error requesting notification permission:', e);
    return false;
  }
}

export function sendBrowserNotification(title: string, body: string): boolean {
  if (!checkNotificationSupport() || Notification.permission !== 'granted') {
    return false;
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="%230ea5e9"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
      tag: 'hydra-ist-reminder',
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return true;
  } catch (e) {
    console.error('Failed to trigger browser notification:', e);
    return false;
  }
}

/**
 * Play a soothing 2-tone water-drop chime using Web Audio API
 */
export function playWaterChime(): void {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    
    // Tone 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc1.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.15); // C6 drop
    gain1.gain.setValueAtTime(0.3, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.3);

    // Tone 2
    setTimeout(() => {
      if (ctx.state === 'closed') return;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc2.frequency.exponentialRampToValueAtTime(1318.5, ctx.currentTime + 0.2); // E6
      gain2.gain.setValueAtTime(0.4, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime);
      osc2.stop(ctx.currentTime + 0.4);
    }, 180);
  } catch (e) {
    console.warn('Web Audio playback failed or blocked by autoplay policy:', e);
  }
}
