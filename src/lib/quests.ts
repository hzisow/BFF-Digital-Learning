import type { IconName } from './icons'
// Daily quests — small, resettable goals that turn the streak from a passive
// counter into a directed nudge. Derived entirely from existing progress + the
// streak, so there's nothing new to store: a quest is "done" when today's
// progress already satisfies it.

import type { ActivityProgress } from './progress'
import { getStreak } from './streak'
import { ACTIVITIES } from './activities'

function isToday(iso: string): boolean {
  const d = new Date(iso)
  const n = new Date()
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  )
}

export interface Quest {
  id: string
  icon: IconName
  en: string
  es: string
  zh: string
  done: boolean
}

const LESSON_SLUGS = new Set(
  ACTIVITIES.filter((a) => a.kind === 'lesson').map((a) => a.slug),
)

/** Today's three quests and whether each is already satisfied. */
export function dailyQuests(progress: Record<string, ActivityProgress>): Quest[] {
  const completedToday = Object.entries(progress).filter(
    ([, e]) => e.status === 'completed' && isToday(e.updatedAt),
  )
  const lessonToday = completedToday.some(([slug]) => LESSON_SLUGS.has(slug))
  const aceToday = completedToday.some(([, e]) => (e.score ?? 0) >= 90)
  const anyToday = getStreak().activeToday

  return [
    {
      id: 'warmup',
      icon: 'sun',
      en: 'Warm up, do any activity',
      es: 'Calienta, haz cualquier actividad',
      zh: '热身，做任意一个活动',
      done: anyToday,
    },
    {
      id: 'lesson',
      icon: 'book',
      en: 'Finish a lesson today',
      es: 'Termina una lección hoy',
      zh: '今天完成一节课',
      done: lessonToday,
    },
    {
      id: 'ace',
      icon: 'target',
      en: 'Score 90+ on anything',
      es: 'Consigue 90+ en algo',
      zh: '任意项目拿到 90 分以上',
      done: aceToday,
    },
  ]
}
