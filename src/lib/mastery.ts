// What it takes to move on.
//
// Finishing a lesson used to unlock the next one at any score — a student could
// answer two of eight correctly and still advance. The course path is now a
// mastery gate: you clear a lesson by scoring at least PASS_SCORE on its quiz.
//
// One place defines this so the path, the results screen, the certificate and
// "continue where you left off" can never disagree about who has passed what.

import type { ActivityProgress } from './progress'

/**
 * The bar for unlocking the next lesson.
 *
 * Core-path lessons carry 7-8 questions, so 85% means **one wrong answer** is
 * still a pass and two is not. Worth knowing before changing this number: on a
 * shorter quiz the same percentage silently becomes "perfect score or nothing"
 * — the 6-question electives would need 100%, which is why the gate deliberately
 * only applies to the core path.
 */
export const PASS_SCORE = 85

/** Did they clear the bar on this activity? */
export function lessonPassed(p: ActivityProgress | undefined): boolean {
  return p?.status === 'completed' && typeof p.score === 'number' && p.score >= PASS_SCORE
}

/**
 * Finished the quiz but came up short. Distinct from "not started": this student
 * did the work and needs a retake, not an introduction, and the UI should say so
 * rather than showing them a blank "not started" chip.
 */
export function needsRetake(p: ActivityProgress | undefined): boolean {
  return p?.status === 'completed' && !lessonPassed(p)
}

/**
 * `saveProgress` keeps the best score it has ever seen for an activity, so a
 * retake can only ever help. That is what makes this gate fair rather than
 * punishing: a bad first attempt is never held against a student.
 */
export function bestScore(p: ActivityProgress | undefined): number | null {
  return typeof p?.score === 'number' ? p.score : null
}
