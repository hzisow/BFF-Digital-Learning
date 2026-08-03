import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLesson } from '../../lib/useLesson'
import {
  getQuizSession,
  listQuizPlayers,
  subscribeToQuiz,
  updateQuizSession,
  type QuizPlayer,
  type QuizSession,
} from './live'
import { Logo } from '../../components/Logo'
import { BACKEND_ENABLED } from '../../lib/config'
import { useAdmin } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import { AppIcon } from '../../lib/icons'
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  Crown,
  Eye,
  Flag,
  HelpCircle,
  Lightbulb,
  Medal,
  Monitor,
  PartyPopper,
  Play,
  Trophy,
} from 'lucide-react'

const QUESTION_SECONDS = 20

// Kahoot-style option colors. Amber gets dark text so every card meets
// WCAG AA contrast; the letter is always shown as text, never color alone.
const OPTION_COLORS = [
  'bg-red-600 text-white',
  'bg-blue-600 text-white',
  'bg-amber-400 text-ink',
  'bg-green-700 text-white',
]

const BIG_BUTTON =
  'rounded-2xl bg-white px-8 py-4 font-display text-2xl font-bold text-bff-900 shadow-lg transition hover:bg-bff-50 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50'

function optionLetter(i: number): string {
  return String.fromCharCode(65 + i)
}

/**
 * Podium mark for a standings row: an icon for the top three, a plain number
 * for everyone else. Purely decorative — every row also carries a screen-reader
 * place label next to it.
 */
function RankMark({ index, className = 'h-6 w-6' }: { index: number; className?: string }) {
  if (index === 0) return <Crown className={`${className} text-gold-400`} aria-hidden="true" />
  if (index === 1) return <Medal className={`${className} text-white`} aria-hidden="true" />
  if (index === 2) return <Award className={`${className} text-bff-200`} aria-hidden="true" />
  return <>{index + 1}.</>
}

function HostShell({ code, children }: { code?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-white">
      <header className="flex items-center justify-between px-6 py-4">
        <Logo reversed className="h-10" />
        {code && (
          <span className="rounded-xl bg-white/10 px-4 py-2 font-display text-xl font-bold tracking-widest">
            {code}
          </span>
        )}
      </header>
      <main className="mx-auto max-w-6xl px-6 pb-32">{children}</main>
    </div>
  )
}

function ControlBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-ink/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-4">{children}</div>
    </div>
  )
}

/** Purely visual 20-second countdown ring — the host stays in control. */
function CountdownRing({
  startedAt,
  zh,
  es,
}: {
  startedAt: string | null
  zh: boolean
  es: boolean
}) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 200)
    return () => window.clearInterval(timer)
  }, [])
  const start = startedAt ? Date.parse(startedAt) : now
  const remaining = Math.max(0, QUESTION_SECONDS - (now - start) / 1000)
  const frac = remaining / QUESTION_SECONDS
  const radius = 28
  const circumference = 2 * Math.PI * radius
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 64 64" className="h-20 w-20 -rotate-90" aria-hidden="true">
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-white/15"
        />
        <circle
          cx="32"
          cy="32"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - frac)}
          className="text-white"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">
        {Math.ceil(remaining)}
        <span className="sr-only">
          {zh
            ? ' 秒，计时器剩余时间'
            : es
              ? ' segundos restantes en el temporizador'
              : ' seconds left on the visual timer'}
        </span>
      </span>
    </div>
  )
}

export default function QuizHost() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const { adminUser, adminReady } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const [session, setSession] = useState<QuizSession | null>(null)
  const [players, setPlayers] = useState<QuizPlayer[]>([])
  const [error, setError] = useState<string | null>(null)

  // Called up here because the lesson is used well past several early returns,
  // and hooks cannot live below those. The slug is undefined until the session
  // row lands, which the hook handles.
  const { lesson, loading: lessonLoading } = useLesson(session?.lesson_slug)

  const adminId = adminUser?.id

  useEffect(() => {
    if (!BACKEND_ENABLED || !adminId || !sessionId) return
    let active = true
    setSession(null)
    setPlayers([])
    setError(null)
    getQuizSession(sessionId)
      .then((s) => {
        if (active) setSession(s)
      })
      .catch((err) => {
        if (active)
          setError(
            err instanceof Error
              ? err.message
              : zh
                ? '无法加载测验。'
                : es
                  ? 'No se pudo cargar el quiz.'
                  : 'Could not load the quiz.',
          )
      })
    const refresh = () => {
      listQuizPlayers(sessionId)
        .then((ps) => {
          if (active) setPlayers(ps)
        })
        .catch((err) => console.warn('Could not refresh players', err))
    }
    refresh()
    const unsubscribe = subscribeToQuiz(
      sessionId,
      (s) => {
        if (active) setSession(s)
      },
      refresh,
    )
    return () => {
      active = false
      unsubscribe()
    }
  }, [sessionId, adminId])

  function patchSession(
    patch: Partial<Pick<QuizSession, 'state' | 'question_index' | 'question_started_at'>>,
  ) {
    if (!session) return
    setSession({ ...session, ...patch })
    updateQuizSession(session.id, patch).catch((err) => console.warn('Quiz update failed', err))
  }

  /** Enter a question (including the first): stamps question_started_at. */
  function startQuestion(index: number) {
    patchSession({
      state: 'question',
      question_index: index,
      question_started_at: new Date().toISOString(),
    })
  }

  if (!BACKEND_ENABLED || (adminReady && !adminUser)) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <Monitor className="mx-auto block h-11 w-11 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">
            {zh ? '测验主持人屏幕' : es ? 'Pantalla del anfitrión del quiz' : 'Quiz host screen'}
          </h1>
          <p className="text-sm text-ink/70">
            {!BACKEND_ENABLED
              ? zh
                ? '实时测验会在班级后台连接后开启。'
                : es
                  ? 'Los quiz en vivo se activan cuando se conecta el servidor de la clase.'
                  : 'Live quizzes unlock when the class backend is connected.'
              : zh
                ? '主持实时测验仅限已登录的 BFF 导师使用。请前往团队页面登录。'
                : es
                  ? 'Presentar quiz en vivo es solo para mentores de BFF con sesión iniciada. Ve a la página del equipo para iniciar sesión.'
                  : 'Hosting live quizzes is for signed-in BFF mentors. Head over to the team page to sign in.'}
          </p>
          <Link to="/team" className="btn-primary">
            {zh ? '前往团队页面' : es ? 'Ir a la página del equipo' : 'Go to the team page'}
          </Link>
        </div>
      </HostShell>
    )
  }

  if (error && !session) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <HelpCircle className="mx-auto block h-11 w-11 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">
            {zh ? '无法加载测验' : es ? 'No se pudo cargar el quiz' : 'Could not load the quiz'}
          </h1>
          <p className="text-sm text-ink/70">{error}</p>
          <Link to="/activities" className="btn-primary">
            {zh ? '返回活动' : es ? 'Volver a las actividades' : 'Back to activities'}
          </Link>
        </div>
      </HostShell>
    )
  }

  if (!adminReady || !session) {
    return (
      <HostShell>
        <p className="mt-32 text-center font-display text-2xl font-semibold text-bff-200">
          {zh ? '正在准备测验……' : es ? 'Preparando el quiz…' : 'Warming up the quiz…'}
        </p>
      </HostShell>
    )
  }

  if (lessonLoading) {
    return (
      <HostShell code={session.code}>
        <p className="mt-24 text-center font-display text-lg font-semibold text-ink/60">
          {zh ? '正在加载课程……' : es ? 'Cargando la lección…' : 'Loading the lesson…'}
        </p>
      </HostShell>
    )
  }

  if (!lesson || lesson.quiz.length === 0) {
    return (
      <HostShell code={session.code}>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <BookOpen className="mx-auto block h-11 w-11 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">
            {zh
              ? '这节课暂时无法使用'
              : es
                ? 'Esa lección no está disponible'
                : 'That lesson is not available'}
          </h1>
          <p className="text-sm text-ink/70">
            {zh ? (
              <>
                这个测验指向的课程（{session.lesson_slug}）没有任何题目。请从当前的课程重新开始一个测验。
              </>
            ) : es ? (
              <>
                Este quiz apunta a una lección ({session.lesson_slug}) sin preguntas. Inicia un
                nuevo quiz desde una lección actual.
              </>
            ) : (
              <>
                This quiz points at a lesson ({session.lesson_slug}) with no quiz questions. Start a
                new quiz from a current lesson.
              </>
            )}
          </p>
          <Link to="/activities" className="btn-primary">
            {zh ? '返回活动' : es ? 'Volver a las actividades' : 'Back to activities'}
          </Link>
        </div>
      </HostShell>
    )
  }

  const total = lesson.quiz.length
  const qIndex = Math.min(session.question_index, total - 1)
  const q = lesson.quiz[qIndex]
  const qKey = String(qIndex)
  const answeredCount = players.filter((p) => (p.answers ?? {})[qKey] !== undefined).length
  const lastQuestion = qIndex >= total - 1
  const standings = [...players].sort((a, b) => b.score - a.score)
  const joinUrl = `${window.location.origin}${window.location.pathname}#/quiz/${session.code}`

  return (
    <HostShell code={session.code}>
      {/* Lobby */}
      {session.state === 'lobby' && (
        <div className="flex flex-col items-center gap-8 pt-8 text-center">
          <p className="eyebrow justify-center text-bff-300">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '实时测验' : es ? 'QUIZ EN VIVO' : 'LIVE QUIZ'}
          </p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            <AppIcon name={lesson.icon} className="inline h-9 w-9 align-[-0.12em] sm:h-11 sm:w-11" />{' '}
            {zh ? '实时测验' : es ? 'Quiz en vivo' : 'Live Quiz'}, {lesson.title}
          </h1>
          <p className="text-xl text-bff-200">
            {zh
              ? '打开网站，进入“活动”，选择“实时测验”，然后输入这个代码'
              : es
                ? 'Ve al sitio, luego a Actividades, luego a Quiz en vivo, e ingresa este código'
                : 'Go to the site, then Activities, then Live Quiz, and enter this code'}
          </p>
          <p className="font-display text-7xl font-bold tracking-widest sm:text-8xl md:text-9xl">
            {session.code}
          </p>
          <p className="max-w-full overflow-x-auto rounded-xl bg-white/10 px-5 py-2.5 font-mono text-lg text-bff-100">
            {joinUrl}
          </p>
          <div className="w-full">
            <p className="mb-3 font-display text-2xl font-bold text-bff-100" aria-live="polite">
              {zh
                ? `${players.length} 人已加入`
                : es
                  ? `${players.length} ${players.length === 1 ? 'jugador' : 'jugadores'} dentro`
                  : `${players.length} ${players.length === 1 ? 'player' : 'players'} in`}
            </p>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2">
              {players.map((p) => (
                <span
                  key={p.id}
                  className="animate-pop-in rounded-full bg-white/15 px-4 py-1.5 font-display text-lg font-semibold"
                >
                  {p.nickname}
                </span>
              ))}
              {players.length === 0 && (
                <span className="text-lg text-bff-300">
                  {zh
                    ? '正在等待第一位玩家加入……'
                    : es
                      ? 'Esperando a que se una el primer jugador…'
                      : 'Waiting for the first player to join…'}
                </span>
              )}
            </div>
          </div>
          <button className={BIG_BUTTON} onClick={() => startQuestion(0)}>
            {zh ? '开始测验' : es ? 'Empezar quiz' : 'Start quiz'} <Play className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Question */}
      {session.state === 'question' && (
        <div className="space-y-6 pt-2">
          <div className="flex items-center justify-between gap-6">
            <p className="font-display text-xl font-bold uppercase tracking-wide text-bff-200">
              {zh
                ? `第 ${qIndex + 1} 题，共 ${total} 题`
                : es
                  ? `Pregunta ${qIndex + 1} de ${total}`
                  : `Question ${qIndex + 1} of ${total}`}
            </p>
            <div className="flex items-center gap-5">
              <p className="font-display text-2xl font-bold text-bff-100" aria-live="polite">
                {zh
                  ? `${players.length} 人中已有 ${answeredCount} 人作答`
                  : es
                    ? `${answeredCount} de ${players.length} respondieron`
                    : `${answeredCount} of ${players.length} answered`}
              </p>
              <CountdownRing startedAt={session.question_started_at} zh={zh} es={es} />
            </div>
          </div>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            {q.question}
          </h1>
          <p className="text-xl text-bff-200">
            {zh
              ? '在你自己的设备上作答吧！'
              : es
                ? '¡Responde en tu propio dispositivo!'
                : 'Answer on your own device!'}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {q.options.map((opt, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-2xl p-6 ${OPTION_COLORS[i % OPTION_COLORS.length]}`}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white font-display text-2xl font-bold text-ink">
                  {optionLetter(i)}
                </span>
                <span className="font-display text-2xl font-semibold leading-snug">{opt}</span>
              </div>
            ))}
          </div>
          <ControlBar>
            <p className="mr-auto hidden text-bff-300 sm:block">
              {zh
                ? '计时器只是为了营造气氛：等大家准备好了再揭晓答案吧。'
                : es
                  ? 'El temporizador es solo para dar emoción; revela cuando la clase esté lista.'
                  : 'The timer is just for hype. Reveal whenever the room is ready.'}
            </p>
            <button className={BIG_BUTTON} onClick={() => patchSession({ state: 'reveal' })}>
              {zh ? '揭晓答案' : es ? 'Revelar respuesta' : 'Reveal answer'}{' '}
              <Eye className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
            </button>
          </ControlBar>
        </div>
      )}

      {/* Reveal */}
      {session.state === 'reveal' && (
        <div className="space-y-6 pt-2">
          <p className="font-display text-xl font-bold uppercase tracking-wide text-bff-200">
            {zh
              ? `第 ${qIndex + 1} 题，共 ${total} 题 ， 答案是……`
              : es
                ? `Pregunta ${qIndex + 1} de ${total}. La respuesta es…`
                : `Question ${qIndex + 1} of ${total}. The answer is…`}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">
            {q.question}
          </h1>
          <div className="grid gap-4 sm:grid-cols-2" aria-live="polite">
            {q.options.map((opt, i) => {
              const correct = i === q.answerIndex
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 rounded-2xl p-6 ${OPTION_COLORS[i % OPTION_COLORS.length]} ${
                    correct ? 'animate-pop-in ring-4 ring-white' : 'opacity-40'
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white font-display text-2xl font-bold text-ink">
                    {optionLetter(i)}
                  </span>
                  <span className="font-display text-2xl font-semibold leading-snug">
                    {opt}
                    {correct && (
                      <>
                        {' '}
                        <Check className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
                        <span className="sr-only">
                          {zh ? ' ， 正确答案' : es ? ', respuesta correcta' : ', correct answer'}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              )
            })}
          </div>
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(300px,360px)]">
            <div className="rounded-2xl bg-white/10 p-6">
              <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
                <Lightbulb className="inline h-5 w-5 align-[-0.15em]" aria-hidden="true" />{' '}
                {zh ? '为什么' : es ? 'Por qué' : 'Why'}
              </h2>
              <p className="text-2xl font-semibold leading-snug">{q.explanation}</p>
            </div>
            <div className="h-fit rounded-2xl bg-white/10 p-6">
              <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
                <Trophy className="inline h-5 w-5 align-[-0.15em]" aria-hidden="true" />{' '}
                {zh ? '排行榜' : es ? 'Tabla de posiciones' : 'Leaderboard'}
              </h2>
              <ol className="space-y-2.5">
                {standings.slice(0, 5).map((p, i) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 text-xl">
                    <span className="flex items-center gap-1.5 font-display font-semibold">
                      <span className="inline-flex w-7 shrink-0 justify-center" aria-hidden="true">
                        <RankMark index={i} />
                      </span>
                      <span className="sr-only">
                        {zh
                          ? `第 ${i + 1} 名：`
                          : es
                            ? `puesto ${i + 1}: `
                            : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place: `}
                      </span>
                      {p.nickname}
                    </span>
                    <span className="whitespace-nowrap font-display font-bold text-bff-100">
                      {p.score.toLocaleString()} {zh ? '分' : 'pts'}
                    </span>
                  </li>
                ))}
                {standings.length === 0 && (
                  <li className="text-lg text-bff-300">
                    {zh ? '还没有玩家……' : es ? 'Aún no hay jugadores…' : 'No players yet…'}
                  </li>
                )}
              </ol>
            </div>
          </div>
          <ControlBar>
            {lastQuestion ? (
              <button className={BIG_BUTTON} onClick={() => patchSession({ state: 'done' })}>
                {zh ? '最终结果' : es ? 'Resultados finales' : 'Final results'}{' '}
                <Flag className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
              </button>
            ) : (
              <button className={BIG_BUTTON} onClick={() => startQuestion(qIndex + 1)}>
                {zh ? '下一题' : es ? 'Siguiente pregunta' : 'Next question'}{' '}
                <ArrowRight className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
              </button>
            )}
          </ControlBar>
        </div>
      )}

      {/* Done — podium */}
      {session.state === 'done' && (
        <div className="flex flex-col items-center gap-10 pt-6 text-center">
          <h1 className="font-display text-5xl font-bold sm:text-6xl">
            <Trophy className="inline h-10 w-10 align-[-0.12em]" aria-hidden="true" />{' '}
            {zh ? '最终结果' : es ? 'Resultados finales' : 'Final Results'}
          </h1>
          <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {standings.slice(0, 3).map((p, i) => (
              <div
                key={p.id}
                className={`animate-pop-in rounded-2xl p-8 ${
                  i === 0
                    ? 'bg-white/20 ring-2 ring-gold-400 sm:order-2'
                    : i === 1
                      ? 'bg-white/10 sm:order-1'
                      : 'bg-white/10 sm:order-3'
                }`}
              >
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <RankMark index={i} className="h-10 w-10" />
                </span>
                <p className="mt-3 break-words font-display text-3xl font-bold">
                  <span className="sr-only">
                    {zh
                      ? `第 ${i + 1} 名：`
                      : es
                        ? `puesto ${i + 1}: `
                        : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place: `}
                  </span>
                  {p.nickname}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-bff-100">
                  {p.score.toLocaleString()} {zh ? '分' : 'pts'}
                </p>
              </div>
            ))}
          </div>
          {standings.length === 0 && (
            <p className="text-2xl text-bff-200">
              {zh
                ? '这一轮没有人参与，好安静的教室！'
                : es
                  ? 'Nadie jugó esta ronda; ¡qué salón tan callado!'
                  : 'Nobody played this round, quiet classroom!'}
            </p>
          )}
          {standings.length > 3 && (
            <ol className="w-full max-w-xl space-y-2">
              {standings.slice(3).map((p, i) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between rounded-xl bg-white/5 px-5 py-2.5 text-xl"
                >
                  <span className="font-display font-semibold">
                    {i + 4}. {p.nickname}
                  </span>
                  <span className="font-display font-bold text-bff-100">
                    {p.score.toLocaleString()} {zh ? '分' : 'pts'}
                  </span>
                </li>
              ))}
            </ol>
          )}
          <p className="text-xl text-bff-200">
            {zh ? '大家答得都很棒！' : es ? '¡Excelente quiz, todos!' : 'Great quizzing, everyone!'}{' '}
            <PartyPopper className="inline h-6 w-6 align-[-0.15em] text-gold-400" aria-hidden="true" />
          </p>
        </div>
      )}
    </HostShell>
  )
}
