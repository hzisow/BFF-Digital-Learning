// What the class actually got wrong, question by question.
//
// The dashboard could already say "Jayden scored 71%". This says "14 of 22
// missed the APR question, and 9 of them picked the same wrong answer" — which
// is the thing a mentor can act on before Monday.
//
// Lesson content is loaded on demand (one chunk per lesson), so this fetches the
// lesson the mentor picked rather than importing the curriculum.

import { useEffect, useState } from 'react'
import { AlertTriangle, Check } from 'lucide-react'
import type { Lesson } from '../../content/types'
import { isLessonSlug, loadLesson } from '../../content/lessons'
import {
  correctPct,
  needsReteaching,
  questionStats,
  type AnswerSource,
  type QuestionStat,
} from '../../lib/questionAnalytics'
import { Loading, SkeletonText } from '../Skeleton'

function Bar({ stat }: { stat: QuestionStat }) {
  const pct = correctPct(stat)
  if (pct == null) return null
  // Red below half, amber below the reteach line, green above it. The colour is
  // backed up by the number and the label, never on its own.
  const tone = pct < 50 ? 'bg-red-500' : pct < 70 ? 'bg-amber-500' : 'bg-green-500'
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-stone">
      <div className={`h-full rounded-full ${tone}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function QuestionBreakdown({
  slug,
  rows,
  zh,
  es,
}: {
  slug: string
  rows: AnswerSource[]
  zh: boolean
  es: boolean
}) {
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLessonSlug(slug)) {
      setLesson(null)
      setLoading(false)
      return
    }
    let live = true
    setLoading(true)
    void loadLesson(slug).then((l) => {
      if (!live) return
      setLesson(l ?? null)
      setLoading(false)
    })
    return () => {
      live = false
    }
  }, [slug])

  if (loading) {
    return (
      <Loading label="Loading question results" className="mt-4">
        <SkeletonText lines={4} />
      </Loading>
    )
  }
  if (!lesson) return null

  const stats = questionStats(lesson, rows)
  if (stats.length === 0) {
    return (
      <p className="mt-4 text-sm text-pebble">
        {zh
          ? '还没有学生完成这节课的测验。'
          : es
            ? 'Todavía ningún estudiante ha terminado el examen de esta lección.'
            : 'No student has finished this lesson’s quiz yet.'}
      </p>
    )
  }

  const reteach = needsReteaching(stats)

  return (
    <div className="mt-4">
      {reteach.length > 0 && (
        <div className="mb-4 rounded-[8px] border border-amber-300 bg-amber-50 p-4">
          <p className="flex items-center gap-2 font-display text-sm font-bold text-amber-900">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
            {zh
              ? `建议重点复习 ${reteach.length} 道题`
              : es
                ? `Vale la pena repasar ${reteach.length} ${reteach.length === 1 ? 'pregunta' : 'preguntas'}`
                : `Worth reteaching: ${reteach.length} ${reteach.length === 1 ? 'question' : 'questions'}`}
          </p>
          <ul className="mt-2 space-y-1 text-sm text-amber-900/80">
            {reteach.map((s) => (
              <li key={s.index}>
                <b>{correctPct(s)}%</b>{' '}
                {zh ? '答对 · ' : es ? 'correcto · ' : 'correct · '}
                {s.question}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ol className="space-y-4">
        {stats.map((s) => {
          const pct = correctPct(s)
          return (
            <li key={s.index} className="rounded-[8px] border border-stone p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="font-semibold text-ink">
                  {s.index + 1}. {s.question}
                </p>
                <span className="shrink-0 whitespace-nowrap font-display text-sm font-bold text-ink">
                  {pct == null
                    ? zh
                      ? '无作答'
                      : es
                        ? 'sin respuestas'
                        : 'no answers'
                    : `${s.correct}/${s.answered} · ${pct}%`}
                </span>
              </div>
              <div className="mt-2">
                <Bar stat={s} />
              </div>

              {/* Every option with its share, so a mentor can see *which*
                  misconception the class landed on, not just that they missed. */}
              <ul className="mt-3 space-y-1.5">
                {s.options.map((opt, i) => {
                  const n = s.distribution[i]
                  const isAnswer = opt === s.correctAnswer
                  const share = s.answered > 0 ? Math.round((n / s.answered) * 100) : 0
                  return (
                    <li
                      key={i}
                      className={`flex items-center justify-between gap-3 rounded-[5px] px-2.5 py-1.5 text-sm ${
                        isAnswer
                          ? 'bg-green-50 text-green-900'
                          : n > 0
                            ? 'bg-paper-soft text-ink'
                            : 'text-pebble'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        {isAnswer && (
                          <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        )}
                        <span className="truncate">{opt}</span>
                      </span>
                      <span className="shrink-0 tabular-nums">
                        {n} · {share}%
                      </span>
                    </li>
                  )
                })}
              </ul>

              {s.topWrong && s.topWrong.count > 1 && (
                <p className="mt-2 text-xs text-pebble">
                  {zh
                    ? `最常见的错误答案：“${s.topWrong.option}”（${s.topWrong.count} 人）`
                    : es
                      ? `Error más común: «${s.topWrong.option}» (${s.topWrong.count})`
                      : `Most common wrong answer: “${s.topWrong.option}” (${s.topWrong.count})`}
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
