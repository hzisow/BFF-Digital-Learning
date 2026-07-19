// Practice mode: resurfaces every quiz question the student missed (recorded
// in progress.data.answers) so they can master it. Local-only, counts toward
// the daily streak.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { LESSONS } from '../content/lessons'
import { useLang, localizeLesson } from '../lib/i18n'
import { loadLocalProgress } from '../lib/progress'
import { recordActivity } from '../lib/streak'

interface PracticeItem {
  lessonSlug: string
  lessonEmoji: string
  lessonTitle: string
  questionIndex: number
}

export default function PracticePage() {
  const { lang } = useLang()
  const es = lang === 'es'

  const deck = useMemo<PracticeItem[]>(() => {
    const progress = loadLocalProgress()
    const items: PracticeItem[] = []
    for (const lesson of Object.values(LESSONS)) {
      const p = progress[lesson.slug]
      const answers = p?.data?.answers
      if (!Array.isArray(answers)) continue
      const loc = localizeLesson(lesson, lang)
      answers.forEach((chosen, i) => {
        const q = lesson.quiz[i]
        if (q && chosen !== q.answerIndex) {
          items.push({
            lessonSlug: lesson.slug,
            lessonEmoji: lesson.emoji,
            lessonTitle: loc.title,
            questionIndex: i,
          })
        }
      })
    }
    return items
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const done = step >= deck.length

  if (deck.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-6xl" aria-hidden="true">🌟</p>
        <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">
          {es ? '¡Nada que repasar!' : 'Nothing to review!'}
        </h1>
        <p className="mt-3 leading-relaxed text-slate-600">
          {es
            ? 'No tienes preguntas falladas pendientes. Termina más lecciones (o saca todo perfecto) y aquí aparecerá tu repaso personalizado.'
            : "You have no missed questions waiting. Finish more lessons (or ace them all) and your personalized review will appear here."}
        </p>
        <Link to="/lessons" className="btn-primary mt-8 inline-flex">
          {es ? 'Ir a las lecciones' : 'Go to lessons'} <span aria-hidden="true">→</span>
        </Link>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((correctCount / deck.length) * 100)
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="animate-pop-in rounded-3xl bg-gradient-to-br from-bff-600 to-bff-800 p-8 text-white shadow-lg">
          <p className="text-5xl" aria-hidden="true">{pct >= 80 ? '🎉' : '💪'}</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold">
            {es ? 'Repaso completado' : 'Review complete'}: {pct}%
          </h1>
          <p role="status" className="mt-2 text-bff-100">
            {es
              ? `Acertaste ${correctCount} de ${deck.length} preguntas que antes habías fallado.`
              : `You got ${correctCount} of ${deck.length} previously-missed questions right.`}
          </p>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          {es
            ? 'Para quitarlas de tu repaso para siempre, repite el examen de la lección y contéstalas bien. 😉'
            : 'To clear them from your review for good, retake the lesson quiz and nail them. 😉'}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              setStep(0)
              setChosen(null)
              setCorrectCount(0)
            }}
          >
            {es ? 'Repasar otra vez' : 'Review again'} <span aria-hidden="true">🔄</span>
          </button>
          <Link to="/lessons" className="btn-primary">
            {es ? 'Volver a la ruta' : 'Back to the path'}
          </Link>
        </div>
      </div>
    )
  }

  const item = deck[step]
  const lesson = LESSONS[item.lessonSlug]
  const loc = localizeLesson(lesson, lang)
  const q = loc.quiz[item.questionIndex] ?? lesson.quiz[item.questionIndex]
  const revealed = chosen != null
  const gotIt = chosen === q.answerIndex

  function pick(i: number) {
    if (revealed) return
    setChosen(i)
    if (i === q.answerIndex) setCorrectCount((c) => c + 1)
    recordActivity() // practicing counts toward the streak
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flex items-center justify-between gap-3">
        <p className="chip bg-bff-100 text-bff-800">
          <span aria-hidden="true">🔁</span>{' '}
          {es
            ? `Repaso · ${step + 1} de ${deck.length}`
            : `Practice · ${step + 1} of ${deck.length}`}
        </p>
        <p className="text-xs font-semibold text-slate-500">
          <span aria-hidden="true">{item.lessonEmoji}</span> {item.lessonTitle}
        </p>
      </div>

      <h1 className="mt-5 font-display text-2xl font-bold text-slate-900">{q.question}</h1>
      <div className="mt-6 space-y-3">
        {q.options.map((opt, i) => {
          let cls = 'border-slate-200 bg-white text-slate-700 hover:border-bff-400 hover:bg-bff-50'
          if (revealed) {
            cls =
              i === q.answerIndex
                ? 'border-green-500 bg-green-50 text-green-800'
                : i === chosen
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-white text-slate-500'
          }
          return (
            <button
              key={i}
              type="button"
              disabled={revealed}
              onClick={() => pick(i)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition disabled:cursor-default ${cls}`}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div
          role="status"
          className={`mt-5 rounded-2xl border p-5 ${
            gotIt ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
          }`}
        >
          <p className={`font-display font-bold ${gotIt ? 'text-green-800' : 'text-amber-800'}`}>
            {gotIt
              ? es
                ? '¡Ahora sí! ✅'
                : 'Got it this time! ✅'
              : es
                ? `Todavía no — la respuesta es “${q.options[q.answerIndex]}”`
                : `Not yet — the answer is “${q.options[q.answerIndex]}”`}
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${gotIt ? 'text-green-800' : 'text-amber-800'}`}>
            {q.explanation}
          </p>
          <button
            type="button"
            className="btn-primary mt-4"
            onClick={() => {
              setStep(step + 1)
              setChosen(null)
            }}
          >
            {step + 1 < deck.length
              ? es
                ? 'Siguiente'
                : 'Next'
              : es
                ? 'Ver resultado'
                : 'See results'}{' '}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  )
}
