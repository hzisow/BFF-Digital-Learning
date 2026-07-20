// XP + levels — the connective tissue across every activity. XP is derived
// from completed work (never stored separately), so it always agrees with a
// student's real progress and with the server leaderboard, which computes the
// SAME formula in SQL: 50 base + floor(score / 2) per completed activity.

import type { ActivityProgress } from './progress'

/** XP earned for one activity. Completing = 50; a perfect score adds 50 more. */
export function xpForActivity(entry: ActivityProgress | undefined): number {
  if (!entry || entry.status !== 'completed') return 0
  return 50 + Math.floor((entry.score ?? 0) / 2)
}

/** Total XP across a progress map. */
export function totalXp(progress: Record<string, ActivityProgress>): number {
  return Object.values(progress).reduce((sum, e) => sum + xpForActivity(e), 0)
}

export interface LevelTier {
  name: string
  emoji: string
  /** Cumulative XP needed to reach this tier. */
  minXp: number
}

// Financial-journey ranks. Thresholds curve upward so later levels feel earned.
export const LEVELS: LevelTier[] = [
  { name: 'Penny Starter', emoji: '🐣', minXp: 0 },
  { name: 'Budgeter', emoji: '📊', minXp: 150 },
  { name: 'Saver', emoji: '🏦', minXp: 350 },
  { name: 'Investor', emoji: '📈', minXp: 650 },
  { name: 'Dealmaker', emoji: '🤝', minXp: 1000 },
  { name: 'Broker', emoji: '💼', minXp: 1500 },
  { name: 'Tycoon', emoji: '🏆', minXp: 2200 },
]

export interface LevelInfo {
  /** 1-based level number. */
  level: number
  tier: LevelTier
  /** The next tier, or null if maxed out. */
  next: LevelTier | null
  /** XP accumulated inside the current tier. */
  intoTier: number
  /** XP span of the current tier (null at max level). */
  tierSpan: number | null
  /** 0–100 progress toward the next tier (100 at max level). */
  pct: number
  /** XP remaining to the next tier (0 at max level). */
  toNext: number
}

/** Resolve an XP total into a level, rank name, and progress to the next rank. */
export function levelInfo(xp: number): LevelInfo {
  let idx = 0
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp >= LEVELS[i].minXp) idx = i
  }
  const tier = LEVELS[idx]
  const next = idx + 1 < LEVELS.length ? LEVELS[idx + 1] : null
  const intoTier = xp - tier.minXp
  const tierSpan = next ? next.minXp - tier.minXp : null
  const pct = next && tierSpan ? Math.min(100, Math.round((intoTier / tierSpan) * 100)) : 100
  const toNext = next ? Math.max(0, next.minXp - xp) : 0
  return { level: idx + 1, tier, next, intoTier, tierSpan, pct, toNext }
}
