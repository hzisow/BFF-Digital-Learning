// The review deck: which quiz questions a student still owes a second look.
//
// Two screens ask this question and used to answer it two different ways. The
// course path counted `total - correct` off the stored quiz result, and the
// practice page rebuilt the list by comparing every stored answer against the
// answer key. Nothing recorded that a question had actually been reviewed, so
// the chip on the path kept saying "Review 3 missed questions" after the
// student had reviewed all three — the only way to clear it was to retake the
// whole quiz. Both screens now read this module, and reviewing a question
// removes it.

import type { ActivityProgress } from './progress'
import { loadLocalProgress, saveProgress } from './progress'
import type { StudentSession } from './session'

interface QuizData {
  correct?: unknown
  total?: unknown
  /** Indexes of the questions missed on the most recent attempt. */
  missed?: unknown
  /** Indexes from `missed` the student has since worked through in practice. */
  reviewed?: unknown
}

function numberList(value: unknown): number[] {
  return Array.isArray(value) ? value.filter((n): n is number => Number.isInteger(n)) : []
}

/**
 * Question indexes missed on the latest attempt, or null when the stored
 * record predates `missed` being written. Legacy records still hold `answers`,
 * so the practice page can recover the list once it has the lesson; the course
 * path cannot, which is what `legacyMissedTotal` is for.
 */
export function missedIndexes(entry: ActivityProgress | undefined): number[] | null {
  const data = entry?.data as QuizData | undefined
  return Array.isArray(data?.missed) ? numberList(data.missed) : null
}

export function reviewedIndexes(entry: ActivityProgress | undefined): number[] {
  return numberList((entry?.data as QuizData | undefined)?.reviewed)
}

/** `total - correct` for records written before `missed` existed. */
function legacyMissedTotal(entry: ActivityProgress | undefined): number | null {
  const data = entry?.data as QuizData | undefined
  const correct = typeof data?.correct === 'number' ? data.correct : null
  const total = typeof data?.total === 'number' ? data.total : null
  if (correct == null || total == null) return null
  return Math.max(0, total - correct)
}

/** Missed questions this student has not reviewed yet, across every lesson. */
export function outstandingMissedCount(progress: Record<string, ActivityProgress>): number {
  let count = 0
  for (const entry of Object.values(progress)) {
    const reviewed = reviewedIndexes(entry)
    const missed = missedIndexes(entry)
    if (missed) {
      count += missed.filter((i) => !reviewed.includes(i)).length
      continue
    }
    const legacy = legacyMissedTotal(entry)
    if (legacy == null) continue
    // `reviewed` is only ever written for questions that were missed at the
    // time, and finishing a quiz resets it, so it can never exceed `legacy`.
    count += Math.max(0, legacy - reviewed.length)
  }
  return count
}

/**
 * Record that a missed question has been worked through, so it drops out of
 * the deck and off the count. Retaking the lesson quiz resets this, which is
 * what makes a question missed a second time come back.
 */
export async function markReviewed(
  student: StudentSession | null,
  lessonSlug: string,
  questionIndex: number,
): Promise<void> {
  const entry = loadLocalProgress()[lessonSlug]
  const reviewed = reviewedIndexes(entry)
  if (reviewed.includes(questionIndex)) return
  await saveProgress(student, lessonSlug, {
    status: entry?.status ?? 'started',
    data: { reviewed: [...reviewed, questionIndex] },
  })
}
