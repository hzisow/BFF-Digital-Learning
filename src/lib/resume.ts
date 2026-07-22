// "Continue where you left off": find the lesson a student should jump back to.

import { ACTIVITIES } from './activities'
import { loadLocalProgress } from './progress'

export interface ResumePoint {
  slug: string
  path: string
  title: string
  /** true = pick up an in-progress lesson; false = start the next unlocked one. */
  inProgress: boolean
}

/**
 * Returns the best lesson to resume, or null if the student hasn't started the
 * course yet (so we don't show a "continue" button before there's anything to
 * continue). Prefers an in-progress lesson; otherwise the next lesson after the
 * ones already completed.
 */
export function resumeLesson(): ResumePoint | null {
  const progress = loadLocalProgress()
  const lessons = ACTIVITIES.filter((a) => a.kind === 'lesson').sort(
    (a, b) => a.sortKey - b.sortKey,
  )

  const started = lessons.find((l) => progress[l.slug]?.status === 'started')
  if (started) {
    return { slug: started.slug, path: started.path, title: started.title, inProgress: true }
  }

  const anyCompleted = lessons.some((l) => progress[l.slug]?.status === 'completed')
  if (!anyCompleted) return null

  const next = lessons.find((l) => progress[l.slug]?.status !== 'completed')
  if (!next) return null // whole course done
  return { slug: next.slug, path: next.path, title: next.title, inProgress: false }
}
