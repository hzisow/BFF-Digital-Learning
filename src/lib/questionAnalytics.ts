// "Which question did the class get wrong?"
//
// The dashboard could already tell a mentor that Jayden scored 71%. That says a
// student struggled; it does not say what to reteach. The answer data needed to
// say the second thing was already being fetched and then thrown away —
// `fetchRoster` pulls every progress row including `data`, and `finishQuiz`
// writes `data.answers` as the option index each student picked, in question
// order, with -1 for unanswered.
//
// So this is pure aggregation over data already in memory: no new query, no
// schema change, no extra storage.

import type { Lesson } from '../content/types'

/** One question, and how the class did on it. */
export interface QuestionStat {
  index: number
  question: string
  correctAnswer: string
  /** Students who answered this question at all. */
  answered: number
  correct: number
  /** How many students picked each option, indexed the same as `options`. */
  distribution: number[]
  options: string[]
  /** The wrong option chosen most often, when one stands out. */
  topWrong: { option: string; count: number } | null
}

/** Rows shaped like the dashboard's ProgressRow, narrowed to what we need. */
export interface AnswerSource {
  student_id: string
  activity_slug: string
  data: unknown
}

/** Pull `data.answers` off a progress row, if it holds a usable array. */
function answersOf(row: AnswerSource): number[] | null {
  const data = row.data as { answers?: unknown } | null | undefined
  const a = data?.answers
  if (!Array.isArray(a)) return null
  return a.every((n) => typeof n === 'number') ? (a as number[]) : null
}

/**
 * Per-question results for one lesson across a class.
 *
 * Returns [] when nobody has answered — the caller should say "no quiz results
 * yet" rather than render a table of zeroes, which reads like the class got
 * everything wrong.
 */
export function questionStats(lesson: Lesson, rows: AnswerSource[]): QuestionStat[] {
  const forLesson = rows.filter((r) => r.activity_slug === lesson.slug)
  if (forLesson.length === 0) return []

  const stats: QuestionStat[] = lesson.quiz.map((q, index) => ({
    index,
    question: q.question,
    correctAnswer: q.options[q.answerIndex] ?? '',
    answered: 0,
    correct: 0,
    distribution: q.options.map(() => 0),
    options: q.options,
    topWrong: null,
  }))

  let any = false
  for (const row of forLesson) {
    const answers = answersOf(row)
    if (!answers) continue
    answers.forEach((chosen, i) => {
      const s = stats[i]
      // -1 means the student never answered it; out-of-range means the lesson's
      // questions changed since they took it, so the old answer is meaningless.
      if (!s || chosen < 0 || chosen >= s.options.length) return
      any = true
      s.answered++
      s.distribution[chosen]++
      if (chosen === lesson.quiz[i].answerIndex) s.correct++
    })
  }
  if (!any) return []

  for (const s of stats) {
    let best = -1
    let bestCount = 0
    s.distribution.forEach((count, i) => {
      if (i === lesson.quiz[s.index].answerIndex) return
      if (count > bestCount) {
        best = i
        bestCount = count
      }
    })
    s.topWrong = bestCount > 0 ? { option: s.options[best], count: bestCount } : null
  }
  return stats
}

/** Percent correct, or null when nobody answered. */
export function correctPct(s: QuestionStat): number | null {
  return s.answered > 0 ? Math.round((s.correct / s.answered) * 100) : null
}

/**
 * Questions worth reteaching: the ones most of the class missed. Sorted worst
 * first, and deliberately thresholded — a mentor with ten minutes wants the two
 * questions that actually went wrong, not a ranked list of all seven.
 */
export function needsReteaching(stats: QuestionStat[], threshold = 70): QuestionStat[] {
  return stats
    .filter((s) => {
      const pct = correctPct(s)
      return pct != null && pct < threshold
    })
    .sort((a, b) => (correctPct(a) ?? 100) - (correctPct(b) ?? 100))
}
