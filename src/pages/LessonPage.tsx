import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLesson } from '../content/lessons'
import type { Lesson, LessonSection } from '../content/types'
import VideoCheckpoint from '../components/VideoCheckpoint'
import ReadAloud from '../components/ReadAloud'
import { ACTIVITIES } from '../lib/activities'
import { useLang, localizeLesson } from '../lib/i18n'
import { saveProgress } from '../lib/progress'
import { useStudent } from '../lib/session'
import { playSound } from '../lib/sound'
import { celebrate } from '../lib/celebrate'

// Plain-text version of a step, for the read-aloud button.
function sectionText(section: LessonSection): string {
  switch (section.type) {
    case 'intro':
      return `${section.heading}. ${section.body}`
    case 'content':
      return [section.heading, section.body, ...(section.bullets ?? [])].join('. ')
    case 'terms':
      return [
        section.heading,
        ...section.terms.map((t) => `${t.term}: ${t.definition}`),
      ].join('. ')
    case 'example':
      return `${section.heading}. ${section.body}`
    case 'checkpoint':
      return `${section.checkpoint.question}. ${section.checkpoint.options.join('. ')}`
    case 'video':
      return `${section.heading}. ${section.body}`
  }
}

// ---------- Answer state for checkpoints & quiz questions ----------

interface AnswerState {
  /** Latest option the student picked. */
  chosen: number | null
  /** Wrong options picked so far (checkpoints allow one retry). */
  wrongPicks: number[]
  /** Explanation shown, Continue enabled. */
  revealed: boolean
}

const EMPTY_ANSWER: AnswerState = { chosen: null, wrongPicks: [], revealed: false }

// ---------- Shared multiple-choice renderer ----------

function optionClasses(state: AnswerState, answerIndex: number, i: number): string {
  const base =
    'w-full rounded-xl border-2 px-4 py-3 text-left font-medium transition disabled:cursor-default '
  if (state.revealed) {
    if (i === answerIndex) return `${base}border-green-500 bg-green-50 text-green-800`
    if (i === state.chosen) return `${base}border-red-400 bg-red-50 text-red-700`
    return `${base}border-slate-200 bg-white text-slate-500`
  }
  if (state.wrongPicks.includes(i)) return `${base}border-red-400 bg-red-50 text-red-700`
  return `${base}border-slate-200 bg-white text-slate-700 hover:border-bff-400 hover:bg-bff-50`
}

let mcCounter = 0

function MultipleChoice({
  kicker,
  kickerEmoji,
  question,
  options,
  answerIndex,
  explanation,
  state,
  onSelect,
}: {
  kicker: string
  kickerEmoji?: string
  question: string
  options: string[]
  answerIndex: number
  explanation: string
  state: AnswerState
  onSelect: (i: number) => void
}) {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const gotIt = state.chosen === answerIndex
  const questionId = useMemo(() => `mc-question-${(mcCounter += 1)}`, [])

  function optionStateLabel(i: number): string | undefined {
    if (!state.revealed) return undefined
    if (i === answerIndex)
      return `${options[i]}，${zh ? '正确答案' : es ? 'respuesta correcta' : 'correct answer'}`
    if (i === state.chosen)
      return `${options[i]}，${zh ? '你的答案，错误' : es ? 'tu respuesta, incorrecta' : 'your answer, incorrect'}`
    return undefined
  }

  return (
    <div className="animate-slide-up">
      <p className="chip bg-bff-100 text-bff-800">
        {kicker}
        {kickerEmoji && (
          <>
            {' '}
            <span aria-hidden="true">{kickerEmoji}</span>
          </>
        )}
      </p>
      <h2 id={questionId} className="mt-4 font-display text-2xl font-bold text-slate-900">
        {question}
      </h2>
      <div role="group" aria-labelledby={questionId} className="mt-6 space-y-3">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            disabled={state.revealed}
            aria-label={optionStateLabel(i)}
            onClick={() => onSelect(i)}
            className={optionClasses(state, answerIndex, i)}
          >
            {opt}
          </button>
        ))}
      </div>
      {!state.revealed && state.wrongPicks.length === 1 && (
        <p
          role="status"
          className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700"
        >
          {zh ? '还差一点——再试一次！' : es ? 'Casi — ¡inténtalo una vez más!' : 'Not quite — take one more shot!'}{' '}
          <span aria-hidden="true">🎯</span>
        </p>
      )}
      {state.revealed && (
        <div
          role="status"
          className={`mt-5 rounded-2xl border p-5 ${
            gotIt ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50'
          }`}
        >
          <p
            className={`font-display font-bold ${gotIt ? 'text-green-800' : 'text-amber-800'}`}
          >
            {gotIt ? (
              <>
                {zh ? '答对了！' : es ? '¡Perfecto!' : 'Nailed it!'} <span aria-hidden="true">✅</span>
              </>
            ) : zh ? (
              `不错的尝试！正确答案是“${options[answerIndex]}”`
            ) : es ? (
              `¡Buen intento! La respuesta es “${options[answerIndex]}”`
            ) : (
              `Good try! The answer is “${options[answerIndex]}”`
            )}
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${gotIt ? 'text-green-800' : 'text-amber-800'}`}>
            {explanation}
          </p>
        </div>
      )}
    </div>
  )
}

// ---------- Section renderers ----------

function SectionView({
  lesson,
  section,
  answer,
  onSelect,
  onVideoDone,
}: {
  lesson: Lesson
  section: LessonSection
  answer: AnswerState
  onSelect: (i: number) => void
  onVideoDone: () => void
}) {
  const { tr } = useLang()
  switch (section.type) {
    case 'intro':
      return (
        <div className="animate-slide-up text-center">
          <p className="text-7xl" aria-hidden="true">{lesson.emoji}</p>
          <h2 className="mt-6 font-display text-3xl font-extrabold text-slate-900">
            {section.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-left leading-relaxed text-slate-600 sm:text-lg">
            {section.body}
          </p>
        </div>
      )
    case 'content':
      return (
        <div className="animate-slide-up">
          <h2 className="font-display text-2xl font-bold text-slate-900">{section.heading}</h2>
          <p className="mt-4 leading-relaxed text-slate-600">{section.body}</p>
          {section.bullets && section.bullets.length > 0 && (
            <ul className="mt-5 space-y-3">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <span aria-hidden="true">✅</span>
                  <span className="text-sm leading-relaxed text-slate-700">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    case 'terms':
      return (
        <div className="animate-slide-up">
          <h2 className="font-display text-2xl font-bold text-slate-900">{section.heading}</h2>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-bff-700">
            {tr({ en: 'Key terms', es: 'Términos clave', zh: '关键术语' })}{' '}
            <span aria-hidden="true">🔑</span>
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {section.terms.map((t) => (
              <div key={t.term} className="card p-5">
                <p className="font-display font-bold text-bff-700">{t.term}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case 'example':
      return (
        <div className="animate-slide-up rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-bff-50 p-6 sm:p-8">
          <p className="text-3xl" aria-hidden="true">💡</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-slate-900">
            {section.heading}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-700">{section.body}</p>
        </div>
      )
    case 'checkpoint':
      return (
        <MultipleChoice
          kicker={tr({ en: 'Checkpoint', es: 'Punto de control', zh: '检查点' })}
          kickerEmoji="🧠"
          question={section.checkpoint.question}
          options={section.checkpoint.options}
          answerIndex={section.checkpoint.answerIndex}
          explanation={section.checkpoint.explanation}
          state={answer}
          onSelect={onSelect}
        />
      )
    case 'video':
      return (
        <div className="animate-slide-up">
          <p className="chip bg-red-100 text-red-700">
            <span aria-hidden="true">🎬</span>{' '}
            {tr({ en: 'Watch & answer', es: 'Mira y responde', zh: '观看并回答' })}
          </p>
          <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">
            {section.heading}
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
          <div className="mt-5">
            <VideoCheckpoint
              key={section.videoId}
              videoId={section.videoId}
              questions={section.questions}
              onDone={onVideoDone}
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {tr({ en: 'Video', es: 'Video', zh: '视频' })}: {section.source}
          </p>
        </div>
      )
  }
}

// ---------- The player ----------

type Phase = 'lesson' | 'quiz' | 'results'

function LessonPlayer({ lesson }: { lesson: Lesson }) {
  const { student } = useStudent()
  const { lang, t, tr } = useLang()
  const loc = useMemo(() => localizeLesson(lesson, lang), [lesson, lang])
  const [phase, setPhase] = useState<Phase>('lesson')
  const [sectionIndex, setSectionIndex] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [checkpointAnswers, setCheckpointAnswers] = useState<Record<number, AnswerState>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<number, AnswerState>>({})
  const [videoDone, setVideoDone] = useState<Record<number, boolean>>({})

  const studentRef = useRef(student)
  studentRef.current = student

  // Mark the lesson as started once.
  useEffect(() => {
    void saveProgress(studentRef.current, lesson.slug, { status: 'started' })
  }, [lesson.slug])

  // Scroll to the top whenever the step changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [phase, sectionIndex, quizIndex])

  const totalSteps = loc.sections.length + loc.quiz.length
  const currentStep =
    phase === 'lesson'
      ? sectionIndex + 1
      : phase === 'quiz'
        ? loc.sections.length + quizIndex + 1
        : totalSteps
  const percent = totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 100

  const section = loc.sections[sectionIndex]
  const quizQuestion = loc.quiz[quizIndex]

  const canContinue =
    phase === 'lesson'
      ? section.type === 'checkpoint'
        ? checkpointAnswers[sectionIndex]?.revealed === true
        : section.type === 'video'
          ? videoDone[sectionIndex] === true
          : true
      : phase === 'quiz'
        ? quizAnswers[quizIndex]?.revealed === true
        : false

  function finishQuiz(answers: Record<number, AnswerState>) {
    const total = loc.quiz.length
    const correct = loc.quiz.filter((q, i) => answers[i]?.chosen === q.answerIndex).length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 100
    setPhase('results')
    celebrate(pct === 100 ? 'perfect' : 'complete')
    void saveProgress(studentRef.current, lesson.slug, {
      status: 'completed',
      score: pct,
      // Per-question picks (-1 = unanswered) power the Practice page and the
      // mentor's per-question analytics. answerIndex is language-independent.
      data: { correct, total, answers: loc.quiz.map((_, i) => answers[i]?.chosen ?? -1) },
    })
  }

  function goNext() {
    if (phase === 'lesson') {
      if (sectionIndex < loc.sections.length - 1) {
        setSectionIndex(sectionIndex + 1)
      } else if (loc.quiz.length > 0) {
        setPhase('quiz')
        setQuizIndex(0)
      } else {
        finishQuiz(quizAnswers)
      }
    } else if (phase === 'quiz') {
      if (quizIndex < loc.quiz.length - 1) {
        setQuizIndex(quizIndex + 1)
      } else {
        finishQuiz(quizAnswers)
      }
    }
  }

  function goBack() {
    if (phase === 'lesson' && sectionIndex > 0) setSectionIndex(sectionIndex - 1)
  }

  // Enter advances when allowed (skips events targeting interactive elements,
  // which handle Enter natively).
  const goNextRef = useRef<(() => void) | null>(null)
  goNextRef.current = canContinue && phase !== 'results' ? goNext : null
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== 'Enter' || e.repeat) return
      const tag = (e.target as HTMLElement | null)?.tagName
      if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'TEXTAREA') return
      if (goNextRef.current) {
        e.preventDefault()
        goNextRef.current()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  function answerCheckpoint(i: number) {
    if (section.type !== 'checkpoint') return
    const answerIndex = section.checkpoint.answerIndex
    playSound(i === answerIndex ? 'correct' : 'wrong')
    setCheckpointAnswers((prev) => {
      const cur = prev[sectionIndex] ?? EMPTY_ANSWER
      if (cur.revealed) return prev
      if (i === answerIndex) {
        return { ...prev, [sectionIndex]: { ...cur, chosen: i, revealed: true } }
      }
      const wrongPicks = cur.wrongPicks.includes(i) ? cur.wrongPicks : [...cur.wrongPicks, i]
      // One retry allowed; second miss reveals the answer + explanation.
      return { ...prev, [sectionIndex]: { chosen: i, wrongPicks, revealed: wrongPicks.length >= 2 } }
    })
  }

  function answerQuiz(i: number) {
    if (!quizAnswers[quizIndex]?.revealed) {
      playSound(i === loc.quiz[quizIndex].answerIndex ? 'correct' : 'wrong')
    }
    setQuizAnswers((prev) => {
      const cur = prev[quizIndex] ?? EMPTY_ANSWER
      if (cur.revealed) return prev
      // Quiz questions lock on the first attempt — that is the one that counts.
      return { ...prev, [quizIndex]: { chosen: i, wrongPicks: [], revealed: true } }
    })
  }

  function retakeQuiz() {
    setQuizAnswers({})
    setQuizIndex(0)
    setPhase('quiz')
  }

  const lessonOrder = useMemo(
    () => ACTIVITIES.filter((a) => a.kind === 'lesson').sort((a, b) => a.sortKey - b.sortKey),
    [],
  )
  const myIndex = lessonOrder.findIndex((a) => a.slug === lesson.slug)
  const nextLesson =
    myIndex >= 0 && myIndex + 1 < lessonOrder.length ? lessonOrder[myIndex + 1] : undefined

  const stepLabel =
    phase === 'lesson'
      ? `${t('lesson.step')} ${currentStep} ${t('lesson.of')} ${totalSteps}`
      : phase === 'quiz'
        ? `${t('lesson.questionWord')} ${quizIndex + 1} ${t('lesson.of')} ${loc.quiz.length}`
        : t('lesson.complete')

  const continueLabel =
    phase === 'lesson' && sectionIndex === loc.sections.length - 1
      ? t('lesson.startQuiz')
      : phase === 'quiz' && quizIndex === loc.quiz.length - 1
        ? t('lesson.seeResults')
        : t('common.continue')

  const readText =
    phase === 'lesson'
      ? sectionText(section)
      : phase === 'quiz' && quizQuestion
        ? `${quizQuestion.question}. ${quizQuestion.options.join('. ')}`
        : ''

  // ---------- Results ----------

  if (phase === 'results') {
    const es = lang === 'es'
    const zh = lang === 'zh'
    const total = loc.quiz.length
    const correct = loc.quiz.filter((q, i) => quizAnswers[i]?.chosen === q.answerIndex).length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 100
    const tier =
      pct === 100
        ? zh
          ? '满分——你正式成为理财高手了！🏆'
          : es
            ? '¡Puntaje perfecto — eres oficialmente un master del dinero! 🏆'
            : 'Perfect score — you are officially a money master! 🏆'
        : pct >= 80
          ? zh
            ? '太棒了——你是真的懂这些！🌟'
            : es
              ? '¡Increíble — de verdad sabes de esto! 🌟'
              : 'Amazing work — you really know your stuff! 🌟'
          : pct >= 60
            ? zh
              ? '做得不错！快速复习一下你就全掌握了。💪'
              : es
                ? '¡Bien hecho! Un repaso rápido y lo dominas. 💪'
                : 'Nice job! One quick review and you will have it down. 💪'
            : zh
              ? '很努力了！再把这节课过一遍、重做测验——你可以的。🚀'
              : es
                ? '¡Buen esfuerzo! Repasa la lección y repite el examen — tú puedes. 🚀'
                : 'Good effort! Skim the lesson again and retake the quiz — you have got this. 🚀'

    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="animate-pop-in rounded-3xl bg-gradient-to-br from-bff-600 to-bff-800 p-8 text-center text-white shadow-lg">
          <p className="text-5xl" aria-hidden="true">{pct >= 80 ? '🎉' : pct >= 60 ? '👏' : '💪'}</p>
          <h1 className="mt-4 font-display text-3xl font-extrabold">
            {loc.title}: {pct}%
          </h1>
          <div role="status">
            <p className="mt-2 text-bff-100">
              {zh
                ? `你在第一次尝试就答对了 ${total} 道题中的 ${correct} 道。`
                : es
                  ? `Acertaste ${correct} de ${total} preguntas al primer intento.`
                  : `You got ${correct} of ${total} questions right on the first try.`}
            </p>
            <p className="mt-4 font-display text-lg font-semibold">{tier}</p>
          </div>
        </div>

        <h2 className="mt-10 font-display text-xl font-bold text-slate-900">
          {t('lesson.reviewAnswers')}
        </h2>
        <div className="mt-4 space-y-4">
          {loc.quiz.map((q, i) => {
            const chosen = quizAnswers[i]?.chosen ?? null
            const right = chosen === q.answerIndex
            return (
              <div
                key={i}
                className={`card border-l-4 ${right ? 'border-l-green-500' : 'border-l-red-400'}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-display font-semibold text-slate-900">
                    {i + 1}. {q.question}
                  </p>
                  <span
                    className={`chip shrink-0 ${
                      right ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    <span aria-hidden="true">{right ? '✓' : '✗'}</span>{' '}
                    {right ? t('lesson.correctChip') : t('lesson.missedChip')}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  <span className="font-semibold text-slate-700">{t('lesson.yourAnswer')}</span>{' '}
                  {chosen != null ? q.options[chosen] : '—'}
                </p>
                {!right && (
                  <p className="mt-1 text-sm text-slate-600">
                    <span className="font-semibold text-green-700">{t('lesson.correctAnswer')}</span>{' '}
                    {q.options[q.answerIndex]}
                  </p>
                )}
                <p className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-relaxed text-slate-600">
                  {q.explanation}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" onClick={retakeQuiz} className="btn-secondary">
            {t('lesson.retake')} <span aria-hidden="true">🔄</span>
          </button>
          <Link to="/lessons" className="btn-ghost">
            {t('lesson.backToLessons')}
          </Link>
          {nextLesson && (
            <Link to={nextLesson.path} className="btn-primary">
              {t('lesson.nextLesson')}: <span aria-hidden="true">{nextLesson.emoji}</span>{' '}
              {nextLesson.title} <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>
    )
  }

  // ---------- Lesson / quiz steps ----------

  return (
    <div>
      {/* Progress bar */}
      <div className="sticky top-16 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-2xl px-4 py-3">
          <div className="flex items-center justify-between gap-3 text-xs font-semibold text-slate-500">
            <span className="flex min-w-0 items-center gap-2">
              <span className="truncate">
                <span aria-hidden="true">{lesson.emoji}</span> {loc.title}
              </span>
              {loc.fallback && (
                <span className="chip shrink-0 bg-amber-100 text-amber-700">
                  {t('common.englishOnly')}
                </span>
              )}
            </span>
            <span className="flex shrink-0 items-center gap-2">
              <span>
                {stepLabel} · {percent}%
              </span>
              {readText && <ReadAloud text={readText} />}
            </span>
          </div>
          <div
            role="progressbar"
            aria-label={`${tr({ en: 'Lesson progress', es: 'Progreso de la lección', zh: '课程进度' })}: ${stepLabel}`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className="h-full rounded-full bg-bff-600 transition-all duration-300"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10">
        {phase === 'lesson' ? (
          <SectionView
            lesson={lesson}
            section={section}
            answer={checkpointAnswers[sectionIndex] ?? EMPTY_ANSWER}
            onSelect={answerCheckpoint}
            onVideoDone={() => setVideoDone((prev) => ({ ...prev, [sectionIndex]: true }))}
          />
        ) : (
          quizQuestion && (
            <MultipleChoice
              kicker={`${t('lesson.quizKicker')} · ${t('lesson.questionWord')} ${quizIndex + 1} ${t('lesson.of')} ${loc.quiz.length}`}
              kickerEmoji="📝"
              question={quizQuestion.question}
              options={quizQuestion.options}
              answerIndex={quizQuestion.answerIndex}
              explanation={quizQuestion.explanation}
              state={quizAnswers[quizIndex] ?? EMPTY_ANSWER}
              onSelect={answerQuiz}
            />
          )
        )}

        {/* Nav */}
        <div className="mt-10 flex items-center justify-between gap-3">
          {phase === 'lesson' && sectionIndex > 0 ? (
            <button type="button" onClick={goBack} className="btn-ghost">
              <span aria-hidden="true">←</span> Back
            </button>
          ) : (
            <span />
          )}
          <button type="button" onClick={goNext} disabled={!canContinue} className="btn-primary">
            {continueLabel} <span aria-hidden="true">→</span>
          </button>
        </div>
        {canContinue && (
          <p className="mt-4 text-center text-xs text-slate-500">
            {t('lesson.enterTip')}{' '}
            <kbd className="rounded border border-slate-300 bg-slate-100 px-1 text-slate-700">
              Enter ↵
            </kbd>{' '}
            {t('lesson.enterTipEnd')}
          </p>
        )}
      </div>
    </div>
  )
}

// ---------- Route component ----------

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const { tr } = useLang()
  const lesson = slug ? getLesson(slug) : undefined

  if (!lesson) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-6xl" aria-hidden="true">🔎</p>
        <h1 className="mt-6 font-display text-3xl font-bold text-slate-900">
          {tr({ en: 'Lesson not found', es: 'Lección no encontrada', zh: '未找到课程' })}
        </h1>
        <p className="mt-3 text-slate-600">
          {tr({
            en: 'We looked everywhere, but this lesson seems to have left the syllabus. Check the address, or browse the full curriculum.',
            es: 'Buscamos por todas partes, pero esta lección parece haber salido del temario. Revisa la dirección o explora todo el plan de estudios.',
            zh: '我们到处都找过了，但这节课似乎已经不在课程表里了。请检查网址，或浏览完整课程。',
          })}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/lessons" className="btn-primary">
            {tr({ en: 'Browse lessons', es: 'Explorar lecciones', zh: '浏览课程' })}
          </Link>
          <Link to="/" className="btn-ghost">
            {tr({ en: 'Go home', es: 'Ir al inicio', zh: '回到首页' })}
          </Link>
        </div>
      </div>
    )
  }

  // key resets the player state when jumping between lessons (e.g. "Next lesson").
  return <LessonPlayer key={lesson.slug} lesson={lesson} />
}
