// "Continue where you left off": find the lesson a student should jump back to.

import { ACTIVITIES } from './activities'
import { loadLocalProgress } from './progress'
import { mostRecentPosition } from './lessonPosition'

export interface ResumePoint {
  slug: string
  path: string
  title: string
  /** true = pick up an in-progress lesson; false = start the next unlocked one. */
  inProgress: boolean
  /** Exact place inside the lesson, when one was saved on this device. */
  step?: number
  totalSteps?: number
}

/**
 * Returns the best lesson to resume, or null if the student hasn't started the
 * course yet (so we don't show a "continue" button before there's anything to
 * continue).
 *
 * Order of preference:
 *  1. A lesson with a saved *position* — we know the exact step they stopped on,
 *     and it is the one they touched most recently, which beats curriculum order
 *     for guessing intent.
 *  2. Any lesson marked started.
 *  3. The next lesson after the ones already completed.
 */
export function resumeLesson(): ResumePoint | null {
  const progress = loadLocalProgress()
  const lessons = ACTIVITIES.filter((a) => a.kind === 'lesson').sort(
    (a, b) => a.sortKey - b.sortKey,
  )

  const saved = mostRecentPosition()
  if (saved) {
    const meta = ACTIVITIES.find((a) => a.slug === saved.slug)
    if (meta) {
      return {
        slug: meta.slug,
        path: meta.path,
        title: meta.title,
        inProgress: true,
        step: saved.position.step,
        totalSteps: saved.position.totalSteps,
      }
    }
  }

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
