import type { IconName } from './icons'
// XP + levels — the connective tissue across every activity. XP is derived
// from completed work (never stored separately), so it always agrees with a
// student's real progress and with the server leaderboard, which computes the
// SAME formula in SQL (see migration 0012):
//   completed with a score : 10 + floor(score * 9 / 10)   giving 10 (weak) up to 100 (perfect)
//   completed, no score     : 50
// XP is weighted toward mastery on purpose: finishing alone earns little, so
// levels track how *well* you play, not just how much you click through.

import type { ActivityProgress } from './progress'

/** XP earned for one activity. Mastery-weighted: a weak pass earns ~10, a
 *  perfect score earns 100. A completed but unscored activity is worth 50. */
export function xpForActivity(entry: ActivityProgress | undefined): number {
  if (!entry || entry.status !== 'completed') return 0
  if (entry.score == null) return 50
  const score = Math.max(0, Math.min(100, entry.score))
  return 10 + Math.floor((score * 9) / 10)
}

/** Total XP across a progress map. */
export function totalXp(progress: Record<string, ActivityProgress>): number {
  return Object.values(progress).reduce((sum, e) => sum + xpForActivity(e), 0)
}

export interface LevelTier {
  name: string
  /** Spanish and Simplified Chinese rank names. See `tierName`. */
  es: string
  zh: string
  icon: IconName
  /** Cumulative XP needed to reach this tier. */
  minXp: number
}

// Financial-journey ranks. Thresholds curve upward with widening gaps, so early
// levels hook and later ones demand sustained mastery. Calibrated to the ~21
// activities in the catalog (perfect play ≈ 2100 XP): Broker takes near-total
// completion, and Tycoon is reserved for excellent scores across the board.
export const LEVELS: LevelTier[] = [
  { name: 'Penny Starter', es: 'Aprendiz del Centavo', zh: '攒钱新手', icon: 'egg', minXp: 0 },
  { name: 'Budgeter', es: 'Presupuestador', zh: '预算达人', icon: 'pie', minXp: 150 },
  { name: 'Saver', es: 'Ahorrador', zh: '储蓄能手', icon: 'piggy', minXp: 400 },
  { name: 'Investor', es: 'Inversionista', zh: '投资新星', icon: 'growth', minXp: 720 },
  { name: 'Dealmaker', es: 'Negociador', zh: '交易高手', icon: 'handshake', minXp: 1100 },
  { name: 'Broker', es: 'Corredor', zh: '经纪人', icon: 'briefcase', minXp: 1500 },
  { name: 'Tycoon', es: 'Magnate', zh: '理财大亨', icon: 'trophy', minXp: 1900 },
]

/**
 * A rank in the reader's language.
 *
 * These are the one piece of student-facing copy that never got translated:
 * a Chinese-reading student levelled up and was told, in English, that they
 * were now a "Penny Starter". They are game ranks rather than finance terms,
 * so they are localised rather than transliterated.
 */
export function tierName(tier: LevelTier, lang: string): string {
  if (lang === 'es') return tier.es
  if (lang === 'zh') return tier.zh
  return tier.name
}

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
