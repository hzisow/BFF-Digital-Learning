import type { IconName } from './icons'
// Achievement badges, computed client-side from local progress + streaks.
// Purely celebratory — no backend required.

import type { ActivityProgress } from './progress'
import { LESSON_SLUGS } from './activities'
import { getStreak } from './streak'

export interface BadgeDef {
  id: string
  icon: IconName
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  earned: (progress: Record<string, ActivityProgress>) => boolean
}

function completed(progress: Record<string, ActivityProgress>, slug: string): boolean {
  return progress[slug]?.status === 'completed'
}

function completedCount(progress: Record<string, ActivityProgress>, slugs: readonly string[]): number {
  return slugs.filter((s) => completed(progress, s)).length
}

const WEEK_SLUGS: readonly (readonly string[])[] = [
  ['earning-income', 'spending-budgeting'],
  ['saving-investing', 'credit-debt'],
  ['risk-insurance', 'financial-decision-making'],
  ['financial-planning', 'consumer-protection'],
]

export const BADGES: BadgeDef[] = [
  {
    id: 'first-lesson',
    icon: 'sprout',
    title: 'First Steps',
    titleEs: 'Primeros pasos',
    description: 'Complete your first lesson.',
    descriptionEs: 'Completa tu primera lección.',
    earned: (p) => completedCount(p, LESSON_SLUGS) >= 1,
  },
  ...WEEK_SLUGS.map((slugs, i) => ({
    id: `week-${i + 1}`,
    icon: (['medal', 'medal', 'medal', 'award'] as const)[i],
    title: `Week ${i + 1} Done`,
    titleEs: `Semana ${i + 1} lista`,
    description: `Finish both Week ${i + 1} lessons.`,
    descriptionEs: `Termina las dos lecciones de la semana ${i + 1}.`,
    earned: (p: Record<string, ActivityProgress>) => slugs.every((s) => completed(p, s)),
  })),
  {
    id: 'all-lessons',
    icon: 'trophy',
    title: 'Academy Graduate',
    titleEs: 'Graduado de la Academia',
    description: 'Complete all 8 BFF Academy lessons.',
    descriptionEs: 'Completa las 8 lecciones de BFF Academy.',
    earned: (p) => completedCount(p, LESSON_SLUGS) === LESSON_SLUGS.length,
  },
  {
    id: 'perfect-quiz',
    icon: 'perfect',
    title: 'Perfect Score',
    titleEs: 'Puntaje perfecto',
    description: 'Score 100% on any lesson quiz.',
    descriptionEs: 'Saca 100% en cualquier examen de lección.',
    earned: (p) => LESSON_SLUGS.some((s) => (p[s]?.score ?? 0) >= 100),
  },
  {
    id: 'market-survivor',
    icon: 'market',
    title: 'Market Survivor',
    titleEs: 'Sobreviviente del mercado',
    description: 'Finish Market Movers with a profit.',
    descriptionEs: 'Termina Market Movers con ganancia.',
    earned: (p) => {
      const wolf = p['market-movers']
      return wolf?.status === 'completed' && Number(wolf.data?.gain ?? -1) > 0
    },
  },
  {
    id: 'first-game',
    icon: 'gamepad',
    title: 'Game On',
    titleEs: 'A jugar',
    description: 'Finish any game or challenge.',
    descriptionEs: 'Termina cualquier juego o desafío.',
    earned: (p) =>
      Object.entries(p).some(
        ([slug, v]) => v.status === 'completed' && !(LESSON_SLUGS as readonly string[]).includes(slug),
      ),
  },
  {
    id: 'streak-3',
    icon: 'flame',
    title: 'On a Roll',
    titleEs: 'En racha',
    description: 'Learn 3 days in a row.',
    descriptionEs: 'Aprende 3 días seguidos.',
    earned: () => getStreak().best >= 3,
  },
  {
    id: 'streak-7',
    icon: 'zap',
    title: 'Unstoppable',
    titleEs: 'Imparable',
    description: 'Learn 7 days in a row.',
    descriptionEs: 'Aprende 7 días seguidos.',
    earned: () => getStreak().best >= 7,
  },
]

export function earnedBadges(progress: Record<string, ActivityProgress>): BadgeDef[] {
  return BADGES.filter((b) => b.earned(progress))
}
