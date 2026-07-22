// Tiny sound-effects layer built on the Web Audio API — no audio files to ship.
// OFF by default (a classroom of laptops all dinging would be chaos); students
// opt in with the speaker toggle in the header. The preference persists locally.

const KEY = 'bff_sound'

export function isSoundOn(): boolean {
  try {
    return localStorage.getItem(KEY) === 'on'
  } catch {
    return false
  }
}

export function setSoundOn(on: boolean): void {
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    // private mode — in-memory only
  }
}

let ctx: AudioContext | null = null
function audioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    if (!ctx) ctx = new Ctor()
    return ctx
  } catch {
    return null
  }
}

export type Sound = 'correct' | 'wrong' | 'levelup' | 'complete' | 'click'

// Each sound is a little sequence of note frequencies (Hz).
const NOTES: Record<Sound, number[]> = {
  correct: [660, 880],
  wrong: [200, 150],
  levelup: [523, 659, 784, 1047],
  complete: [523, 659, 784],
  click: [520],
}

/** Play a short sound, if the student has enabled sound. Safe to call anywhere. */
export function playSound(sound: Sound): void {
  if (!isSoundOn()) return
  const ac = audioCtx()
  if (!ac) return
  if (ac.state === 'suspended') void ac.resume()
  const notes = NOTES[sound]
  const now = ac.currentTime
  notes.forEach((freq, i) => {
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = 'triangle'
    osc.frequency.value = freq
    const t = now + i * 0.11
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.18, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2)
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.start(t)
    osc.stop(t + 0.22)
  })
}
