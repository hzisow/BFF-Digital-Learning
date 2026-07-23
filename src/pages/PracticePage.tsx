// Practice mode: resurfaces every quiz question the student missed (recorded
// in progress.data.answers) so they can master it. Local-only, counts toward
// the daily streak.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, RefreshCw } from 'lucide-react'
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
  const zh = lang === 'zh'

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
          {zh ? '没有需要复习的内容！' : es ? '¡Nada que repasar!' : 'Nothing to review!'}
        </h1>
        <p className="mt-3 leading-relaxed text-slate-600">
          {zh
            ? '你没有待复习的错题。多完成几节课（或者全部答对），你的专属复习就会出现在这里。'
            : es
              ? 'No tienes preguntas falladas pendientes. Termina más lecciones (o saca todo perfecto) y aquí aparecerá tu repaso personalizado.'
              : "You have no missed questions waiting. Finish more lessons (or ace them all) and your personalized review will appear here."}
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/lessons" className="btn-primary inline-flex">
            {zh ? '去上课' : es ? 'Ir a las lecciones' : 'Go to lessons'} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link to="/practice/ai" className="btn-secondary inline-flex">
            {zh ? 'AI 生成练习' : es ? 'Práctica con IA' : 'AI-generated practice'}
          </Link>
        </div>
      </div>
    )
  }

  if (done) {
    const pct = Math.round((correctCount / deck.length) * 100)
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="animate-pop-in rounded-3xl bg-bff-900 p-8 text-white shadow-lg">
          <p className="text-5xl" aria-hidden="true">{pct >= 80 ? '🎉' : '💪'}</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold">
            {zh ? '复习完成' : es ? 'Repaso completado' : 'Review complete'}: {pct}%
          </h1>
          <p role="status" className="mt-2 text-bff-100">
            {zh
              ? `你把之前答错的 ${deck.length} 道题中的 ${correctCount} 道答对了。`
              : es
                ? `Acertaste ${correctCount} de ${deck.length} preguntas que antes habías fallado.`
                : `You got ${correctCount} of ${deck.length} previously-missed questions right.`}
          </p>
        </div>
        <p className="mt-6 text-sm text-slate-600">
          {zh
            ? '想把它们从复习里彻底清掉，就重做一遍课程测验、把它们答对吧。😉'
            : es
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
            {zh ? '再复习一遍' : es ? 'Repasar otra vez' : 'Review again'} <RefreshCw className="h-4 w-4" aria-hidden="true" />
          </button>
          <Link to="/lessons" className="btn-primary">
            {zh ? '返回学习路径' : es ? 'Volver a la ruta' : 'Back to the path'}
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
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          {zh
            ? `复习 · 第 ${step + 1} / ${deck.length} 题`
            : es
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
              ? zh
                ? '这次答对了！✅'
                : es
                  ? '¡Ahora sí! ✅'
                  : 'Got it this time! ✅'
              : zh
                ? `还没对——正确答案是“${q.options[q.answerIndex]}”`
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
              ? zh
                ? '下一题'
                : es
                  ? 'Siguiente'
                  : 'Next'
              : zh
                ? '查看结果'
                : es
                  ? 'Ver resultado'
                  : 'See results'}{' '}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
