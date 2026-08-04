import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, X, Lightbulb, Lock, SearchX, RotateCcw } from 'lucide-react'
import { isLessonSlug, loadLesson, peekLesson } from '../content/lessons'
import type { Lesson, LessonSection } from '../content/types'
import VideoCheckpoint from '../components/VideoCheckpoint'
import ReadAloud from '../components/ReadAloud'
import OpenResponse from '../components/OpenResponse'
import { LessonArt } from '../components/lesson/LessonArt'
import { LessonFallback } from '../components/RouteFallback'
import { ACTIVITIES } from '../lib/activities'
import { useLang, localizeLesson } from '../lib/i18n'
import { LangPicker } from '../components/LangPicker'
import { saveProgress } from '../lib/progress'
import { PASS_SCORE } from '../lib/mastery'
import {
  clearPosition,
  loadPosition,
  savePosition,
  type LessonPosition,
} from '../lib/lessonPosition'
import { useStudent } from '../lib/session'
import { playSound } from '../lib/sound'
import { celebrate } from '../lib/celebrate'
import '../styles/lesson.css'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

// Plain-text version of a step, for the read-aloud button.
function sectionText(section: LessonSection): string {
  switch (section.type) {
    case 'intro':
      return `${section.heading}. ${section.body}`
    case 'content':
      return [section.heading, section.body, ...(section.bullets ?? [])].join('. ')
    case 'terms':
      return [section.heading, ...section.terms.map((t) => `${t.term}: ${t.definition}`)].join('. ')
    case 'example':
      return `${section.heading}. ${section.body}`
    case 'checkpoint':
      return `${section.checkpoint.question}. ${section.checkpoint.options.join('. ')}`
    case 'open':
      return `${section.heading}. ${section.prompt}`
    case 'video':
      return `${section.heading}. ${section.body}`
  }
}

// ---------- Answer state for checkpoints & quiz questions ----------

interface AnswerState {
  chosen: number | null
  revealed: boolean
}

const EMPTY_ANSWER: AnswerState = { chosen: null, revealed: false }

// ---------- Compact chrome pieces ----------

// ---------- Eyebrow with step number ----------

function Kicker({ step, label }: { step: number; label: string }) {
  return (
    <p className="lz-eyebrow">
      <span className="lz-eyebrow-num">{String(step).padStart(2, '0')}</span>
      <span className="lz-eyebrow-line" aria-hidden="true" />
      {label}
    </p>
  )
}

// ---------- Shared multiple-choice renderer ----------

let mcCounter = 0

function optionClass(state: AnswerState, answerIndex: number, i: number): string {
  const base = 'lz-option'
  if (state.revealed) {
    if (i === answerIndex) return `${base} is-correct`
    if (i === state.chosen) return `${base} is-wrong`
    return `${base} is-dim`
  }
  return base
}

function MultipleChoice({
  step,
  kicker,
  question,
  options,
  answerIndex,
  explanation,
  state,
  onSelect,
}: {
  step: number
  kicker: string
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
    <div className="lz-panel animate-slide-up">
      <Kicker step={step} label={kicker} />
      <h2 id={questionId} className="lz-h" style={{ fontSize: '26px' }}>
        {question}
      </h2>
      <div role="group" aria-labelledby={questionId} className="lz-options">
        {options.map((opt, i) => (
          <button
            key={i}
            type="button"
            disabled={state.revealed}
            data-key={LETTERS[i]}
            aria-label={optionStateLabel(i)}
            onClick={() => onSelect(i)}
            className={optionClass(state, answerIndex, i)}
          >
            {opt}
          </button>
        ))}
      </div>
      {state.revealed && (
        <div role="status" className={`lz-feedback ${gotIt ? 'ok' : 'no'}`}>
          <strong>
            {gotIt ? <Check className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}
            {gotIt
              ? zh ? '答对了！' : es ? '¡Perfecto!' : 'Nailed it.'
              : zh ? `正确答案是“${options[answerIndex]}”` : es ? `La respuesta es “${options[answerIndex]}”` : `The answer is “${options[answerIndex]}”`}
          </strong>
          <p>{explanation}</p>
        </div>
      )}
    </div>
  )
}

// ---------- Section renderers ----------

function SectionView({
  step,
  section,
  answer,
  onSelect,
  onVideoDone,
  kickers,
}: {
  step: number
  section: LessonSection
  answer: AnswerState
  onSelect: (i: number) => void
  onVideoDone: () => void
  kickers: Record<string, string>
}) {
  switch (section.type) {
    case 'intro':
      // Intro is rendered as the hero cover by the player, not here.
      return null
    case 'content':
      return (
        <div className="lz-panel lz-panel--plain animate-slide-up">
          <Kicker step={step} label={kickers.concept} />
          <h2 className="lz-h" style={{ fontSize: '30px' }}>
            {section.heading}
          </h2>
          <p className="lz-body" style={{ marginTop: '18px' }}>
            {section.body}
          </p>
          {section.bullets && section.bullets.length > 0 && (
            <ul className="lz-list">
              {section.bullets.map((b, i) => (
                <li key={i} className="lz-li">
                  <span className="lz-li-tick" aria-hidden="true">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )
    case 'terms':
      return (
        <div className="lz-panel lz-panel--plain animate-slide-up">
          <Kicker step={step} label={kickers.terms} />
          <h2 className="lz-h" style={{ fontSize: '30px' }}>
            {section.heading}
          </h2>
          <div className="lz-terms">
            {section.terms.map((t) => (
              <div key={t.term} className="lz-term">
                <strong>{t.term}</strong>
                <p>{t.definition}</p>
              </div>
            ))}
          </div>
        </div>
      )
    case 'example':
      return (
        <div className="lz-scenario animate-slide-up">
          <span className="lz-scenario-badge" aria-hidden="true">
            <Lightbulb className="h-5 w-5" />
          </span>
          <Kicker step={step} label={kickers.example} />
          <h2 className="lz-h" style={{ fontSize: '28px' }}>
            {section.heading}
          </h2>
          <p className="lz-body" style={{ marginTop: '16px' }}>
            {section.body}
          </p>
        </div>
      )
    case 'checkpoint':
      return (
        <MultipleChoice
          step={step}
          kicker={kickers.checkpoint}
          question={section.checkpoint.question}
          options={section.checkpoint.options}
          answerIndex={section.checkpoint.answerIndex}
          explanation={section.checkpoint.explanation}
          state={answer}
          onSelect={onSelect}
        />
      )
    case 'open':
      return (
        <div className="lz-panel animate-slide-up">
          <Kicker step={step} label={kickers.open} />
          <h2 className="lz-h" style={{ fontSize: '28px' }}>
            {section.heading}
          </h2>
          <div style={{ marginTop: '18px' }}>
            <OpenResponse prompt={section.prompt} rubric={section.rubric} />
          </div>
        </div>
      )
    case 'video':
      return (
        <div className="lz-panel animate-slide-up">
          <Kicker step={step} label={kickers.video} />
          <h2 className="lz-h" style={{ fontSize: '28px' }}>
            {section.heading}
          </h2>
          <p className="lz-body" style={{ marginTop: '14px', marginBottom: '18px' }}>
            {section.body}
          </p>
          <VideoCheckpoint
            key={section.videoId}
            videoId={section.videoId}
            questions={section.questions}
            onDone={onVideoDone}
          />
          <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--lz-muted)' }}>
            {kickers.videoWord}: {section.source}
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

  // A position saved on a previous visit, waiting for the student to choose
  // between picking up and starting fresh. Read once, on mount — asking later
  // would race the effect below that keeps the position up to date.
  const [pendingResume, setPendingResume] = useState<LessonPosition | null>(() =>
    loadPosition(lesson.slug),
  )

  const studentRef = useRef(student)
  studentRef.current = student

  const kickers = {
    concept: tr({ en: 'Concept', es: 'Concepto', zh: '概念' }),
    terms: tr({ en: 'Key terms', es: 'Términos clave', zh: '关键术语' }),
    example: tr({ en: 'Worked example', es: 'Ejemplo práctico', zh: '实例演练' }),
    checkpoint: tr({ en: 'Your turn', es: 'Tu turno', zh: '轮到你了' }),
    open: tr({ en: 'Write & reflect', es: 'Escribe y reflexiona', zh: '写作与思考' }),
    video: tr({ en: 'Watch & answer', es: 'Mira y responde', zh: '观看并回答' }),
    videoWord: tr({ en: 'Video', es: 'Video', zh: '视频' }),
  }

  useEffect(() => {
    void saveProgress(studentRef.current, lesson.slug, { status: 'started' })
  }, [lesson.slug])

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
  // While the resume card is up the player is still parked on step 1, but the
  // bar should show the progress being offered — otherwise the header reads
  // "just started" next to a card saying "you stopped at step 12".
  const shownStep = pendingResume ? pendingResume.step : currentStep
  const percent = totalSteps > 0 ? Math.round((shownStep / totalSteps) * 100) : 100
  // "How much longer?" is the question students actually ask, and steps are a
  // poor proxy — a video step and a one-line concept step are not the same
  // effort. The lesson already carries an author-set duration, so prorate it.
  const minutesLeft = Math.max(0, Math.round((lesson.durationMin * (100 - percent)) / 100))
  const esLang = lang === 'es'
  const zhLang = lang === 'zh'

  const section = loc.sections[sectionIndex]
  const quizQuestion = loc.quiz[quizIndex]
  const isHero = phase === 'lesson' && section?.type === 'intro'

  // Keep the saved position current as the student moves. Skipped while the
  // resume card is up (they have not chosen yet, so overwriting the stored
  // position with step 1 would destroy the very thing being offered) and once
  // they reach the results, which clears it instead.
  useEffect(() => {
    if (pendingResume || phase === 'results') return
    savePosition(lesson.slug, {
      phase,
      sectionIndex,
      quizIndex,
      checkpointAnswers,
      quizAnswers,
      videoDone,
      step: currentStep,
      totalSteps,
    })
  }, [
    pendingResume,
    lesson.slug,
    phase,
    sectionIndex,
    quizIndex,
    checkpointAnswers,
    quizAnswers,
    videoDone,
    currentStep,
    totalSteps,
  ])

  /** Put the player back exactly where the student left it. */
  function resumeHere(pos: LessonPosition) {
    // Guard against content changing under a saved position (a lesson edited
    // between visits): never restore past the end of what exists now.
    setPhase(pos.phase)
    setSectionIndex(Math.min(pos.sectionIndex, Math.max(0, loc.sections.length - 1)))
    setQuizIndex(Math.min(pos.quizIndex, Math.max(0, loc.quiz.length - 1)))
    setCheckpointAnswers(pos.checkpointAnswers ?? {})
    setQuizAnswers(pos.quizAnswers ?? {})
    setVideoDone(pos.videoDone ?? {})
    setPendingResume(null)
  }

  function startOver() {
    clearPosition(lesson.slug)
    setPendingResume(null)
  }

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
    // Finished: there is nothing left to resume into, and leaving the position
    // behind would offer to drop them back into the middle of a lesson they
    // have already completed.
    clearPosition(lesson.slug)
    // Only celebrate a pass. Confetti over a score that leaves the next lesson
    // locked reads as "well done" and contradicts the banner right below it.
    if (pct >= PASS_SCORE) celebrate(pct === 100 ? 'perfect' : 'complete')
    void saveProgress(studentRef.current, lesson.slug, {
      status: 'completed',
      score: pct,
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

  // Keyboard navigation. Advancing a 21-step lesson otherwise means 21 trips to
  // the same button with a mouse; arrow keys make it one hand and no aiming,
  // which also helps anyone who cannot use a pointer comfortably.
  const goNextRef = useRef<(() => void) | null>(null)
  const goBackRef = useRef<(() => void) | null>(null)
  goNextRef.current = canContinue && phase !== 'results' ? goNext : null
  goBackRef.current = phase === 'lesson' && sectionIndex > 0 ? goBack : null
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      const el = e.target as HTMLElement | null
      const tag = el?.tagName
      // Never steal a keystroke meant for text entry, a select, or anything
      // the student is editing (the open-response box lives inside a lesson).
      const typing =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        el?.isContentEditable === true
      if (typing) return

      if (e.key === 'Enter') {
        // Enter on a focused control already does the right thing.
        if (tag === 'BUTTON' || tag === 'A') return
        if (goNextRef.current) {
          e.preventDefault()
          goNextRef.current()
        }
        return
      }
      if (e.key === 'ArrowRight') {
        if (goNextRef.current) {
          e.preventDefault()
          goNextRef.current()
        }
        return
      }
      if (e.key === 'ArrowLeft') {
        if (goBackRef.current) {
          e.preventDefault()
          goBackRef.current()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // One chance per question. Checkpoints used to allow a second guess before
  // revealing, which made them a game of elimination rather than a check of what
  // the student actually knew — and it disagreed with the final quiz and the
  // video checkpoints, which have always locked on the first pick.
  function answerCheckpoint(i: number) {
    if (section.type !== 'checkpoint') return
    const answerIndex = section.checkpoint.answerIndex
    playSound(i === answerIndex ? 'correct' : 'wrong')
    setCheckpointAnswers((prev) => {
      const cur = prev[sectionIndex] ?? EMPTY_ANSWER
      if (cur.revealed) return prev
      return { ...prev, [sectionIndex]: { chosen: i, wrongPicks: [], revealed: true } }
    })
  }

  function answerQuiz(i: number) {
    if (!quizAnswers[quizIndex]?.revealed) {
      playSound(i === loc.quiz[quizIndex].answerIndex ? 'correct' : 'wrong')
    }
    setQuizAnswers((prev) => {
      const cur = prev[quizIndex] ?? EMPTY_ANSWER
      if (cur.revealed) return prev
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

  // Looked up across all activities, not just `lessonOrder` — electives are a
  // different `kind` and would otherwise come back without a duration.
  const durationMin = useMemo(
    () => ACTIVITIES.find((a) => a.slug === lesson.slug)?.durationMin ?? 0,
    [lesson.slug],
  )

  const unitLabel = tr({
    en: `Week ${lesson.week} · Day ${lesson.day}`,
    es: `Semana ${lesson.week} · Día ${lesson.day}`,
    zh: `第 ${lesson.week} 周 · 第 ${lesson.day} 天`,
  })

  const continueLabel =
    phase === 'lesson' && sectionIndex === loc.sections.length - 1
      ? t('lesson.startQuiz')
      : phase === 'quiz' && quizIndex === loc.quiz.length - 1
        ? t('lesson.seeResults')
        : isHero
          ? tr({ en: 'Start lesson', es: 'Empezar lección', zh: '开始学习' })
          : t('common.continue')

  const readText =
    phase === 'lesson'
      ? sectionText(section)
      : phase === 'quiz' && quizQuestion
        ? `${quizQuestion.question}. ${quizQuestion.options.join('. ')}`
        : ''

  // Shared focused top bar.
  const topbar = (
    <header className="lz-topbar">
      <div className="lz-topbar-inner">
        <Link to="/lessons" className="lz-exit">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {tr({ en: 'Exit', es: 'Salir', zh: '退出' })}
        </Link>
        <div className="lz-topbar-title">
          <span className="lz-topbar-unit">{unitLabel}</span>
          <strong>{loc.title}</strong>
          {loc.fallback && (
            <span className="chip shrink-0 bg-amber-100 text-amber-700">{t('common.englishOnly')}</span>
          )}
        </div>
        <div className="lz-tools">
          {readText && <ReadAloud text={readText} />}
          <LangPicker tone="lesson" />
        </div>
      </div>
      <div
        className="lz-progress"
        role="progressbar"
        aria-label={tr({ en: 'Lesson progress', es: 'Progreso de la lección', zh: '课程进度' })}
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="lz-progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </header>
  )

  // ---------- Results ----------

  if (phase === 'results') {
    const es = lang === 'es'
    const zh = lang === 'zh'
    const total = loc.quiz.length
    const correct = loc.quiz.filter((q, i) => quizAnswers[i]?.chosen === q.answerIndex).length
    const pct = total > 0 ? Math.round((correct / total) * 100) : 100
    // Passing unlocks the next lesson; anything short of it does not. The
    // message has to say which of those just happened, because "Nice job!"
    // above a locked path is the most confusing thing this screen could do.
    const passed = pct >= PASS_SCORE
    const missedBy = total > 0 ? Math.ceil((PASS_SCORE / 100) * total) - correct : 0
    const tier = passed
      ? pct === 100
        ? zh ? '满分，你正式成为理财高手了！' : es ? '¡Puntaje perfecto, eres un master del dinero!' : 'Perfect score, you are officially a money master.'
        : zh ? '过关了：你是真的懂这些！' : es ? '¡Aprobada, de verdad sabes de esto!' : 'Passed, you really know your stuff.'
      : pct >= 60
        ? zh ? '很接近了！再复习一下，重做测验就能过关。' : es ? '¡Muy cerca! Repasa un poco y repite el examen.' : 'So close, a quick review and a retake will get you there.'
        : zh ? '很努力了！再把这节课过一遍、重做测验。' : es ? '¡Buen esfuerzo! Repasa la lección y repite el examen.' : 'Good effort, skim the lesson again and retake the quiz.'

    return (
      <div className="lz">
        {topbar}
        <div className="lz-stage">
          <div className="lz-result-cover animate-pop-in">
            <div className="lz-hero-orbit one" aria-hidden="true" />
            <p className="lz-eyebrow" style={{ color: 'var(--lz-blue-bright)', justifyContent: 'center' }}>
              {passed
                ? tr({ en: 'Lesson complete', es: 'Lección completa', zh: '课程完成' })
                : tr({ en: 'Not passed yet', es: 'Aún no aprobada', zh: '尚未通过' })}
            </p>
            <p className="lz-result-score">
              <em>{pct}</em>%
            </p>
            <div role="status">
              <p style={{ marginTop: '10px', color: '#b6c2cf', fontSize: '15px' }}>
                {zh
                  ? `你在第一次尝试就答对了 ${total} 道题中的 ${correct} 道。`
                  : es
                    ? `Acertaste ${correct} de ${total} preguntas al primer intento.`
                    : `You got ${correct} of ${total} questions right on the first try.`}
              </p>
              <p style={{ marginTop: '14px', fontFamily: 'var(--lz-display)', fontWeight: 700, fontSize: '17px' }}>
                {tier}
              </p>
            </div>
          </div>

          <h2 className="lz-h" style={{ fontSize: '22px', marginTop: '40px' }}>
            {t('lesson.reviewAnswers')}
          </h2>
          <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {loc.quiz.map((q, i) => {
              const chosen = quizAnswers[i]?.chosen ?? null
              const right = chosen === q.answerIndex
              return (
                <div key={i} className={`lz-review-item ${right ? 'ok' : 'no'}`}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <p style={{ fontFamily: 'var(--lz-display)', fontWeight: 600, margin: 0 }}>
                      {i + 1}. {q.question}
                    </p>
                    <span className={`chip shrink-0 ${right ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {right ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <X className="h-3.5 w-3.5" aria-hidden="true" />}
                      {right ? t('lesson.correctChip') : t('lesson.missedChip')}
                    </span>
                  </div>
                  <p style={{ marginTop: '12px', fontSize: '14px', color: '#4a5460' }}>
                    <b style={{ color: '#2a3340' }}>{t('lesson.yourAnswer')}</b> {chosen != null ? q.options[chosen] : ', '}
                  </p>
                  {!right && (
                    <p style={{ marginTop: '4px', fontSize: '14px', color: '#4a5460' }}>
                      <b style={{ color: '#175f36' }}>{t('lesson.correctAnswer')}</b> {q.options[q.answerIndex]}
                    </p>
                  )}
                  <p style={{ marginTop: '12px', background: 'var(--lz-paper)', border: '1px solid var(--lz-line)', padding: '12px 14px', fontSize: '14px', lineHeight: 1.6, color: '#3a4450' }}>
                    {q.explanation}
                  </p>
                </div>
              )
            })}
          </div>

          {/* The gate, stated plainly. A student who scored 71% should learn it
              here rather than by finding a locked node on the path. */}
          <div
            role="status"
            className={`lz-gate ${passed ? 'ok' : ''}`}
            style={{ marginTop: '28px' }}
          >
            {passed ? (
              <>
                <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {zh
                    ? `达到 ${PASS_SCORE}% 的过关线，下一课已解锁。`
                    : es
                      ? `Superaste el ${PASS_SCORE}%, la siguiente lección está desbloqueada.`
                      : `You cleared the ${PASS_SCORE}% bar. The next lesson is unlocked.`}
                </span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {zh
                    ? `解锁下一课需要 ${PASS_SCORE}%。再答对 ${missedBy} 题就够了，重做测验吧，我们只保留你的最高分。`
                    : es
                      ? `Necesitas ${PASS_SCORE}% para desbloquear la siguiente lección. Te ${missedBy === 1 ? 'falta' : 'faltan'} ${missedBy} ${missedBy === 1 ? 'respuesta' : 'respuestas'}, repite el examen, solo guardamos tu mejor puntaje.`
                      : `You need ${PASS_SCORE}% to unlock the next lesson. ${missedBy} more right ${missedBy === 1 ? 'answer' : 'answers'} does it. Retake the quiz; we only ever keep your best score.`}
                </span>
              </>
            )}
          </div>

          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={retakeQuiz}
              className={`lz-btn ${passed ? 'lz-btn--ghost-dark' : 'lz-btn--primary'}`}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> {t('lesson.retake')}
            </button>
            <Link to="/lessons" className="lz-btn lz-btn--ghost-dark">
              {t('lesson.backToLessons')}
            </Link>
            {/* Only offered once the bar is cleared — otherwise this button would
                walk straight past the gate the path is enforcing. */}
            {nextLesson && passed && (
              <Link to={nextLesson.path} className="lz-btn lz-btn--primary" style={{ marginLeft: 'auto' }}>
                {t('lesson.nextLesson')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ---------- Resume offer ----------
  // Shown instead of the lesson when a previous visit left off partway through.
  // Deliberately a decision rather than an automatic jump: dropping someone
  // straight into step 12 with no explanation is disorienting, and a student
  // who wants to review from the top should not have to click Back eleven times.

  if (pendingResume) {
    const pos = pendingResume
    return (
      <div className="lz">
        {topbar}
        <div className="lz-stage">
          <div className="lz-panel animate-slide-up">
            <p className="lz-eyebrow">
              {tr({ en: 'Welcome back', es: 'Bienvenido de nuevo', zh: '欢迎回来' })}
              <span className="lz-eyebrow-line" aria-hidden="true" />
            </p>
            <h2 className="lz-h" style={{ fontSize: '28px', marginTop: '10px' }}>
              {tr({
                en: 'Pick up where you left off?',
                es: '¿Continuar donde lo dejaste?',
                zh: '要从上次的地方继续吗？',
              })}
            </h2>
            <p className="lz-body" style={{ marginTop: '12px' }}>
              {tr({
                en: `You stopped at step ${pos.step} of ${pos.totalSteps}. Your answers so far are saved.`,
                es: `Te quedaste en el paso ${pos.step} de ${pos.totalSteps}. Tus respuestas están guardadas.`,
                zh: `你上次停在第 ${pos.step} 步（共 ${pos.totalSteps} 步）。你的答案已保存。`,
              })}
            </p>
            <div
              style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '22px' }}
            >
              <button
                type="button"
                onClick={() => resumeHere(pos)}
                className="lz-btn lz-btn--primary"
              >
                {tr({
                  en: `Resume at step ${pos.step}`,
                  es: `Continuar en el paso ${pos.step}`,
                  zh: `从第 ${pos.step} 步继续`,
                })}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={startOver} className="lz-btn">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {tr({ en: 'Start over', es: 'Empezar de nuevo', zh: '重新开始' })}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ---------- Lesson / quiz steps ----------

  return (
    <div className="lz">
      {topbar}

      <div className="lz-stage">
        {isHero && section.type === 'intro' ? (
          <section className="lz-hero animate-slide-up">
            <div className="lz-hero-orbit one" aria-hidden="true" />
            <div className="lz-hero-orbit two" aria-hidden="true" />
            <div className="lz-hero-grid">
              <div>
                <p className="lz-eyebrow">
                  {unitLabel}
                  <span className="lz-eyebrow-line" aria-hidden="true" />
                </p>
                <h1>{loc.title}</h1>
                <p className="lz-hero-lede">{section.body}</p>
                {/* Time first. "21 steps" is an internal unit — a student
                    cannot tell from it whether this fits in a class period,
                    and the step counter already lives in the bottom bar. */}
                <div className="lz-hero-meta">
                  {durationMin > 0 && (
                    <>
                      <span>
                        {durationMin} {tr({ en: 'min', es: 'min', zh: '分钟' })}
                      </span>
                      <span className="dot" aria-hidden="true" />
                    </>
                  )}
                  <span>
                    {totalSteps} {tr({ en: 'steps', es: 'pasos', zh: '步' })}
                  </span>
                  <span className="dot" aria-hidden="true" />
                  <span>
                    {loc.quiz.length} {tr({ en: 'quiz Qs', es: 'preguntas', zh: '道测验题' })}
                  </span>
                </div>
              </div>
              <div className="lz-hero-art">
                <LessonArt slug={lesson.slug} />
              </div>
            </div>
          </section>
        ) : phase === 'lesson' ? (
          <SectionView
            step={currentStep}
            section={section}
            answer={checkpointAnswers[sectionIndex] ?? EMPTY_ANSWER}
            onSelect={answerCheckpoint}
            onVideoDone={() => setVideoDone((prev) => ({ ...prev, [sectionIndex]: true }))}
            kickers={kickers}
          />
        ) : (
          quizQuestion && (
            <MultipleChoice
              step={currentStep}
              kicker={`${t('lesson.quizKicker')} · ${quizIndex + 1}/${loc.quiz.length}`}
              question={quizQuestion.question}
              options={quizQuestion.options}
              answerIndex={quizQuestion.answerIndex}
              explanation={quizQuestion.explanation}
              state={quizAnswers[quizIndex] ?? EMPTY_ANSWER}
              onSelect={answerQuiz}
            />
          )
        )}
      </div>

      {/* Fixed, consistent bottom action bar */}
      <div className="lz-actionbar">
        <div className="lz-actionbar-inner">
          {phase === 'lesson' && sectionIndex > 0 ? (
            <button type="button" onClick={goBack} className="lz-btn lz-btn--compact">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>{tr({ en: 'Back', es: 'Atrás', zh: '返回' })}</span>
            </button>
          ) : (
            <span className="lz-actionbar-spacer" aria-hidden="true" />
          )}

          {/* How much is left. A 3px hairline at the top of the page was the only
              answer to "how far am I?", and nobody reads a hairline — so the
              count, the remaining minutes and a segmented meter live here, in
              the one strip that is on screen at every step. */}
          <div className="lz-meter">
            <p className="lz-meter-label">
              <span>
                {tr({ en: 'Step', es: 'Paso', zh: '第' })} <b>{currentStep}</b>
                <span className="lz-meter-of"> / {totalSteps}</span>
                {minutesLeft > 0 && (
                  <span className="lz-meter-left">
                    {zhLang
                      ? `约剩 ${minutesLeft} 分钟`
                      : esLang
                        ? `~${minutesLeft} min restantes`
                        : `~${minutesLeft} min left`}
                  </span>
                )}
              </span>
              {/* Discoverability for the arrow-key shortcut. Hidden on touch,
                  where there is no keyboard and it would just be clutter. */}
              <span className="lz-kbd-hint" aria-hidden="true">
                <kbd>←</kbd>
                <kbd>→</kbd>
                {tr({ en: 'to move', es: 'para navegar', zh: '切换步骤' })}
              </span>
            </p>
            <div
              className="lz-meter-track"
              role="progressbar"
              aria-label={tr({ en: 'Lesson progress', es: 'Progreso de la lección', zh: '课程进度' })}
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext={tr({
                en: `Step ${currentStep} of ${totalSteps}, ${percent}% done`,
                es: `Paso ${currentStep} de ${totalSteps}, ${percent}% completado`,
                zh: `第 ${currentStep} 步，共 ${totalSteps} 步，已完成 ${percent}%`,
              })}
            >
              {/* One tick per step, so the remaining distance is countable at a
                  glance rather than estimated off a continuous bar. */}
              {Array.from({ length: totalSteps }, (_, i) => (
                <span
                  key={i}
                  className={`lz-meter-tick${i < currentStep ? ' is-done' : ''}${i === currentStep - 1 ? ' is-now' : ''}`}
                />
              ))}
            </div>
          </div>

          <button type="button" onClick={goNext} disabled={!canContinue} className="lz-btn lz-btn--primary">
            {continueLabel} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------- Route component ----------

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>()
  const { tr } = useLang()

  // Lesson content arrives as its own chunk (see content/lessons/index.ts), so
  // this is async. `peekLesson` makes a second visit in the same session render
  // synchronously with no loading flash — import() has already cached it.
  const [lesson, setLesson] = useState(() => (slug ? peekLesson(slug) : undefined))
  const [notFound, setNotFound] = useState(() => !slug || !isLessonSlug(slug))

  useEffect(() => {
    if (!slug || !isLessonSlug(slug)) {
      setNotFound(true)
      return
    }
    setNotFound(false)
    const already = peekLesson(slug)
    if (already) {
      setLesson(already)
      return
    }
    let live = true
    setLesson(undefined)
    void loadLesson(slug).then((l) => {
      if (!live) return
      if (l) setLesson(l)
      else setNotFound(true)
    })
    return () => {
      live = false
    }
  }, [slug])

  // Downloading one lesson, not the whole curriculum. Reuses the same shape the
  // router shows while the page's own code loads, so the two are indistinguishable.
  if (!notFound && !lesson) return <LessonFallback />

  if (!lesson) {
    return (
      <div className="lz">
        <div className="mx-auto max-w-xl px-4 py-24 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-bff-100 text-bff-700">
            <SearchX className="h-8 w-8" aria-hidden="true" />
          </span>
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
      </div>
    )
  }

  return <LessonPlayer key={lesson.slug} lesson={lesson} />
}
