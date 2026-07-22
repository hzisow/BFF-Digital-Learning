// AI-Generated Practice — a personalized practice round whose questions are
// written on the fly by Claude, targeting the exact topics this student is weak
// in. Weak topics are detected locally (no server round-trip) from:
//   1. lesson quizzes with missed questions (progress.data.answers vs. the
//      lesson's answerIndex), and
//   2. completed activities finished with a score under 80.
// Those slugs are mapped to activity titles and sent to the ai-practice edge
// function, which returns a small MCQ set in the student's language. If nothing
// looks weak, we fall back to a few core topics so practice is always available.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { invokeAI, AI_ENABLED, AINotConfiguredError } from '../lib/ai'
import { useLang } from '../lib/i18n'
import { loadLocalProgress } from '../lib/progress'
import { getLesson } from '../content/lessons'
import { ACTIVITIES } from '../lib/activities'

interface Q {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

// Below this score a completed activity counts as a weak area worth practicing.
const WEAK_SCORE = 80

/** Detect the topics this student struggles with, as human-readable titles. */
function detectWeakTopics(): string[] {
  const progress = loadLocalProgress()
  const weakSlugs = new Set<string>()

  for (const [slug, entry] of Object.entries(progress)) {
    // 1) Lessons: any quiz answer that doesn't match the lesson's key.
    const lesson = getLesson(slug)
    const answers = entry.data?.answers
    if (lesson && Array.isArray(answers)) {
      const missed = answers.some((chosen, i) => {
        const q = lesson.quiz[i]
        return q != null && chosen !== q.answerIndex
      })
      if (missed) weakSlugs.add(slug)
    }
    // 2) Any completed activity finished below the mastery bar.
    if (
      entry.status === 'completed' &&
      typeof entry.score === 'number' &&
      entry.score < WEAK_SCORE
    ) {
      weakSlugs.add(slug)
    }
  }

  const titles: string[] = []
  for (const slug of weakSlugs) {
    const title = ACTIVITIES.find((a) => a.slug === slug)?.title
    if (title) titles.push(title)
  }
  return titles
}

// Sensible default so the feature is never a dead end for a fresh student.
const FALLBACK_TOPICS = ['Budgeting', 'Saving & Investing', 'Credit & Debt']

export default function AIPractice() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const weakTopics = useMemo(detectWeakTopics, [])
  const usingFallback = weakTopics.length === 0
  const topics = usingFallback ? FALLBACK_TOPICS : weakTopics

  const [questions, setQuestions] = useState<Q[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | 'notConfigured' | 'failed' | 'empty'>(null)

  // Quiz state
  const [step, setStep] = useState(0)
  const [chosen, setChosen] = useState<number | null>(null)
  const [correctCount, setCorrectCount] = useState(0)

  async function generate() {
    setLoading(true)
    setError(null)
    setQuestions(null)
    setStep(0)
    setChosen(null)
    setCorrectCount(0)
    try {
      const data = await invokeAI<{ questions: Q[] }>('ai-practice', {
        topics,
        count: 4,
        lang,
      })
      const valid = (data.questions ?? []).filter(
        (q) =>
          q &&
          typeof q.question === 'string' &&
          Array.isArray(q.options) &&
          q.options.length >= 2 &&
          typeof q.answerIndex === 'number' &&
          q.answerIndex >= 0 &&
          q.answerIndex < q.options.length,
      )
      if (valid.length === 0) {
        setError('empty')
      } else {
        setQuestions(valid)
      }
    } catch (err) {
      if (err instanceof AINotConfiguredError) {
        setError('notConfigured')
      } else {
        setError('failed')
      }
    } finally {
      setLoading(false)
    }
  }

  // ---- Header (always shown) ----
  const header = (
    <header className="mb-8">
      <p className="chip bg-bff-100 text-bff-800">
        <span aria-hidden="true">✨</span>{' '}
        {zh ? 'AI 练习' : es ? 'Práctica con IA' : 'AI Practice'}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold text-slate-900">
        {zh
          ? '为你量身定制的练习'
          : es
            ? 'Práctica personalizada para ti'
            : 'Practice made just for you'}
      </h1>
      <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">
        {zh
          ? '我们会根据你最需要加强的主题，生成全新的练习题。'
          : es
            ? 'Generamos preguntas de práctica nuevas centradas en los temas que más necesitas reforzar.'
            : 'We generate fresh practice questions focused on the topics you most need to strengthen.'}
      </p>
    </header>
  )

  // ---- Feature disabled (no backend) ----
  if (!AI_ENABLED) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        {header}
        <div className="card" role="note">
          <p className="font-display font-semibold text-slate-900">
            {zh
              ? 'AI 练习暂时不可用'
              : es
                ? 'La práctica con IA no está disponible'
                : 'AI Practice is unavailable'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {zh
              ? '此功能需要连接后端服务。请稍后再试。'
              : es
                ? 'Esta función necesita el servicio de backend conectado. Vuelve a intentarlo más tarde.'
                : 'This feature needs the backend service connected. Please check back later.'}
          </p>
        </div>
      </div>
    )
  }

  // ---- Weak-topic summary (shown before generating) ----
  const topicSummary = (
    <div className="card mb-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {usingFallback
          ? zh
            ? '我们会从这些主题开始'
            : es
              ? 'Empezaremos con estos temas'
              : "We'll start with these topics"
          : zh
            ? '我们会重点练习这些主题'
            : es
              ? 'Practicaremos estos temas'
              : "We'll focus on these topics"}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <li key={topic} className="chip bg-slate-100 text-slate-700">
            {topic}
          </li>
        ))}
      </ul>
      {usingFallback && (
        <p className="mt-3 text-sm leading-relaxed text-slate-500">
          {zh
            ? '完成更多课程和活动后，我们就能发现你的薄弱环节，并据此定制练习。'
            : es
              ? 'A medida que completes más lecciones y actividades, detectaremos tus puntos débiles y adaptaremos la práctica.'
              : "As you finish more lessons and activities, we'll spot your weak areas and tailor the practice to them."}
        </p>
      )}
    </div>
  )

  const generateButton = (
    <button
      type="button"
      className="btn-primary"
      onClick={generate}
      disabled={loading}
      aria-busy={loading}
    >
      {loading
        ? zh
          ? '正在生成…'
          : es
            ? 'Generando…'
            : 'Generating…'
        : zh
          ? '生成练习'
          : es
            ? 'Generar práctica'
            : 'Generate practice'}
    </button>
  )

  // ---- Error / not-configured messaging ----
  const errorNotice = error && (
    <div
      role="status"
      className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-800"
    >
      {error === 'notConfigured' ? (
        <p className="text-sm leading-relaxed">
          {zh
            ? 'AI 练习尚未设置。请稍后再来看看吧。'
            : es
              ? 'La práctica con IA aún no está configurada. Vuelve a intentarlo más tarde.'
              : "AI Practice isn't set up yet. Please check back later."}
        </p>
      ) : error === 'empty' ? (
        <p className="text-sm leading-relaxed">
          {zh
            ? '这次没能生成练习题。请再试一次。'
            : es
              ? 'No pudimos generar preguntas esta vez. Inténtalo de nuevo.'
              : "We couldn't generate questions this time. Please try again."}
        </p>
      ) : (
        <p className="text-sm leading-relaxed">
          {zh
            ? '出了点问题。请再试一次。'
            : es
              ? 'Algo salió mal. Inténtalo de nuevo.'
              : 'Something went wrong. Please try again.'}
        </p>
      )}
    </div>
  )

  // ---- No quiz yet: show the setup screen ----
  if (!questions) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        {header}
        {topicSummary}
        {generateButton}
        {errorNotice}
      </div>
    )
  }

  // ---- Results screen ----
  const done = step >= questions.length
  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        {header}
        <div className="card text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {zh ? '练习完成' : es ? 'Práctica completada' : 'Practice complete'}
          </p>
          <p className="mt-3 font-display text-4xl font-extrabold text-bff-700">{pct}%</p>
          <p role="status" className="mt-2 leading-relaxed text-slate-600">
            {zh
              ? `你答对了 ${questions.length} 道题中的 ${correctCount} 道。`
              : es
                ? `Acertaste ${correctCount} de ${questions.length} preguntas.`
                : `You got ${correctCount} of ${questions.length} questions right.`}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" className="btn-primary" onClick={generate} disabled={loading} aria-busy={loading}>
            {zh ? '换一组' : es ? 'Nuevo conjunto' : 'New set'}
          </button>
          <Link to="/activities" className="btn-secondary">
            {zh ? '返回活动' : es ? 'Volver a actividades' : 'Back to activities'}
          </Link>
        </div>
        {errorNotice}
      </div>
    )
  }

  // ---- One question at a time ----
  const q = questions[step]
  const revealed = chosen != null
  const gotIt = chosen === q.answerIndex
  const questionLabel = zh
    ? `第 ${step + 1} / ${questions.length} 题`
    : es
      ? `Pregunta ${step + 1} de ${questions.length}`
      : `Question ${step + 1} of ${questions.length}`

  function pick(i: number) {
    if (revealed) return
    setChosen(i)
    if (i === q.answerIndex) setCorrectCount((c) => c + 1)
  }

  function next() {
    setStep(step + 1)
    setChosen(null)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {header}
      <p className="chip bg-bff-100 text-bff-800">{questionLabel}</p>

      <section role="group" aria-label={questionLabel} className="mt-4">
        <h2 className="font-display text-2xl font-bold text-slate-900">{q.question}</h2>
        <div className="mt-6 space-y-3">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answerIndex
            const isChosen = i === chosen
            let cls =
              'border-slate-200 bg-white text-slate-700 hover:border-bff-400 hover:bg-bff-50'
            if (revealed) {
              cls = isAnswer
                ? 'border-green-500 bg-green-50 text-green-800'
                : isChosen
                  ? 'border-red-400 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-white text-slate-500'
            }
            // Text/label marker so correctness is never conveyed by color alone.
            const marker = revealed
              ? isAnswer
                ? zh
                  ? '正确'
                  : es
                    ? 'Correcta'
                    : 'Correct'
                : isChosen
                  ? zh
                    ? '你的答案'
                    : es
                      ? 'Tu respuesta'
                      : 'Your answer'
                  : null
              : null
            return (
              <button
                key={i}
                type="button"
                disabled={revealed}
                onClick={() => pick(i)}
                aria-label={marker ? `${opt} — ${marker}` : undefined}
                className={`flex w-full items-start justify-between gap-3 rounded-xl border-2 px-4 py-3 text-left font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-bff-400 focus-visible:ring-offset-2 disabled:cursor-default ${cls}`}
              >
                <span>{opt}</span>
                {revealed && isAnswer && (
                  <span className="shrink-0 text-sm font-semibold">
                    <span aria-hidden="true">✓ </span>
                    {zh ? '正确' : es ? 'Correcta' : 'Correct'}
                  </span>
                )}
                {revealed && isChosen && !isAnswer && (
                  <span className="shrink-0 text-sm font-semibold">
                    <span aria-hidden="true">✗ </span>
                    {zh ? '答错' : es ? 'Incorrecta' : 'Incorrect'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </section>

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
                ? '答对了 ✓'
                : es
                  ? '¡Correcto! ✓'
                  : 'Correct! ✓'
              : zh
                ? `不对 ✗ —— 正确答案是“${q.options[q.answerIndex]}”`
                : es
                  ? `Incorrecto ✗ — la respuesta es “${q.options[q.answerIndex]}”`
                  : `Incorrect ✗ — the answer is “${q.options[q.answerIndex]}”`}
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${gotIt ? 'text-green-800' : 'text-amber-800'}`}>
            {q.explanation}
          </p>
          <button type="button" className="btn-primary mt-4" onClick={next}>
            {step + 1 < questions.length
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
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  )
}
