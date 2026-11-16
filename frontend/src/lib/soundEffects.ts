/**
 * Smart Campus AI - Native Web Audio API Sound Synthesizer
 * Generates lag-free, zero-dependency procedural audio chimes for micro-interactions.
 */

let isAudioMuted = false;

// Check localStorage for persisted sound preference
if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('smart_campus_sound_enabled');
  if (saved !== null) {
    isAudioMuted = saved === 'false';
  }
}

export function isSoundMuted(): boolean {
  return isAudioMuted;
}

export function toggleSound(muted?: boolean): boolean {
  isAudioMuted = muted !== undefined ? muted : !isAudioMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('smart_campus_sound_enabled', String(!isAudioMuted));
  }
  return isAudioMuted;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined' || isAudioMuted) return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  try {
    return new AudioCtx();
  } catch {
    return null;
  }
}

/**
 * Gentle 2-tone ping chime for message responses and alerts
 */
export function playNotificationSound() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.08, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, now + 0.08); // A5
    gain2.gain.setValueAtTime(0.08, now + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.35);
  } catch {
    // Graceful fallback if user hasn't interacted with DOM yet
  }
}

/**
 * Pleasant 3-tone harmonic major chime for successful payment or assignment submission
 */
export function playSuccessChime() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + idx * 0.07;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.07, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch {
    // Ignore audio permission restrictions
  }
}

/**
 * Ultra-short subtle click tick for UI toggle buttons
 */
export function playClickTick() {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Ignore
  }
}
