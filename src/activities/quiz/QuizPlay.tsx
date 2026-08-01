import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useLesson } from '../../lib/useLesson'
import { isNetworkError } from '../../lib/online'
import { useStalledLookup } from '../../lib/useStalledLookup'
import LiveLookupStalled from '../../components/LiveLookupStalled'
import {
  getQuizSessionByCode,
  joinQuizSession,
  listQuizPlayers,
  subscribeToQuiz,
  updateQuizPlayer,
  type QuizAnswer,
  type QuizPlayer,
  type QuizSession,
} from './live'
import { Logo } from '../../components/Logo'
import { BACKEND_ENABLED } from '../../lib/config'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import StudentNameFields from '../../components/StudentNameFields'
import { composeStudentName, splitStudentName } from '../../lib/studentName'
import { AppIcon } from '../../lib/icons'
import {
  Award,
  BookOpen,
  Check,
  Clock,
  Crown,
  HelpCircle,
  Lock,
  Medal,
  PartyPopper,
  Plug,
  X,
} from 'lucide-react'

const NICK_KEY = 'bff_quiz_nick'
const QUESTION_SECONDS = 20

// Same colors as the host board; amber gets dark text for WCAG AA contrast.
const OPTION_COLORS = [
  'bg-red-600 text-white',
  'bg-blue-600 text-white',
  'bg-amber-400 text-ink',
  'bg-green-700 text-white',
]

function optionLetter(i: number): string {
  return String.fromCharCode(65 + i)
}

/**
 * Podium mark for a standings row: an icon for the top three, a plain number
 * for everyone else. Decorative — each row also carries a screen-reader place
 * label.
 */
function RankMark({ index, className = 'h-5 w-5' }: { index: number; className?: string }) {
  if (index === 0) return <Crown className={`${className} text-gold-500`} aria-hidden="true" />
  if (index === 1) return <Medal className={`${className} text-ink/45`} aria-hidden="true" />
  if (index === 2) return <Award className={`${className} text-ink`} aria-hidden="true" />
  return <>{index + 1}.</>
}

function errorMessage(err: unknown, zh: boolean, es: boolean): string {
  return err instanceof Error
    ? err.message
    : zh
      ? '出错了，再试一次吧！'
      : es
        ? 'Algo salió mal. ¡Inténtalo de nuevo!'
        : 'Something went wrong. Try again!'
}

function Shell({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3">
        <Logo className="h-8" />
        {code && (
          <span className="chip bg-paper-soft font-display tracking-widest text-ink">
            QUIZ {code}
          </span>
        )}
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  )
}

export default function QuizPlay() {
  const params = useParams<{ code: string }>()
  const code = (params.code ?? '').toUpperCase()
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const [session, setSession] = useState<QuizSession | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [player, setPlayer] = useState<QuizPlayer | null>(null)
  const [players, setPlayers] = useState<QuizPlayer[]>([])
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({})
  // Seeded from the class session or the last name used on this device,
  // split back into its two parts so the form is already filled in.
  const seededName = student?.nickname ?? localStorage.getItem(NICK_KEY) ?? ''
  const [firstName, setFirstName] = useState(() => splitStudentName(seededName).firstName)
  const [lastInitial, setLastInitial] = useState(
    () => splitStudentName(seededName).lastInitial,
  )
  const nickname = composeStudentName(firstName, lastInitial)
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)

  // Refs guard React strict-mode double effects / double submits.
  const fetchedRef = useRef(false)
  const joinRef = useRef(false)
  const [lookupOffline, setLookupOffline] = useState(false)
  const stalled = useStalledLookup(
    session !== null || loadError !== null || lookupOffline,
  )

  // Look the quiz up by its code (once).
  useEffect(() => {
    if (!BACKEND_ENABLED || fetchedRef.current) return
    fetchedRef.current = true
    getQuizSessionByCode(code)
      .then(setSession)
      .catch((err) => {
        // A dead connection is not a broken game code. Route it to the
        // connection notice so the student is not told their code failed.
        if (isNetworkError(err)) setLookupOffline(true)
        else setLoadError(errorMessage(err, zh, es))
      })
  }, [code])

  // Once joined: live session updates (state / question) + player refreshes.
  const sessionId = session?.id
  const playerId = player?.id
  useEffect(() => {
    if (!sessionId || !playerId) return
    let active = true
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
  }, [sessionId, playerId])

  async function handleJoin(e: FormEvent) {
    e.preventDefault()
    if (!session || joinRef.current) return
    const nick = nickname.trim()
    if (!nick) {
      setJoinError(zh ? '先填上你的名字吧！' : es ? '¡Primero pon tu nombre!' : 'Add your name first!')
      return
    }
    joinRef.current = true
    setJoining(true)
    setJoinError(null)
    try {
      const p = await joinQuizSession(session.id, nick)
      localStorage.setItem(NICK_KEY, p.nickname)
      setPlayer(p)
      setAnswers(p.answers ?? {})
    } catch (err) {
      joinRef.current = false
      setJoinError(errorMessage(err, zh, es))
    } finally {
      setJoining(false)
    }
  }

  const { lesson, loading: lessonLoading } = useLesson(session?.lesson_slug)

  function answer(choice: number) {
    if (!session || !player || !lesson) return
    const key = String(session.question_index)
    if ((answers as Record<string, QuizAnswer | undefined>)[key]) return
    const q = lesson.quiz[session.question_index]
    if (!q) return
    // Speed scoring: 500 for correct + up to 500 speed bonus that fades
    // linearly over 20 seconds. Wrong answers earn 0.
    const startedAt = session.question_started_at
      ? Date.parse(session.question_started_at)
      : Date.now()
    const ms = Math.max(0, Date.now() - startedAt)
    const correct = choice === q.answerIndex
    const points = correct
      ? 500 + Math.round(500 * Math.max(0, 1 - ms / 1000 / QUESTION_SECONDS))
      : 0
    const next: Record<string, QuizAnswer> = { ...answers, [key]: { choice, points, ms } }
    const score = Object.values(next).reduce((sum, a) => sum + a.points, 0)
    setAnswers(next)
    updateQuizPlayer(player.id, { score, answers: next }).catch((err) =>
      console.warn('Could not save your answer', err),
    )
  }

  if (!BACKEND_ENABLED) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <Plug className="mx-auto block h-11 w-11 text-ink" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">
            {zh
              ? '实时测验还没有连接'
              : es
                ? 'Los quiz en vivo aún no están conectados'
                : 'Live quizzes are not connected yet'}
          </h1>
          <p className="text-sm text-ink/70">
            {zh
              ? '实时测验会在班级后台连接后开启——课程还是可以自己单独学习哦！'
              : es
                ? 'Los quiz en vivo se activan cuando se conecta el servidor de la clase; ¡las lecciones siguen funcionando por tu cuenta!'
                : 'Live quizzes unlock when the class backend is connected — the lessons still work solo!'}
          </p>
          <Link to="/activities" className="btn-primary">
            {zh ? '返回活动' : es ? 'Volver a las actividades' : 'Back to activities'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (loadError) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <HelpCircle className="mx-auto block h-11 w-11 text-ink" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">
            {zh ? '嗯，这次没成功' : es ? 'Mmm, eso no funcionó' : 'Hmm, that did not work'}
          </h1>
          <p className="text-sm text-ink/70">{loadError}</p>
          <Link to="/activities" className="btn-primary">
            {zh ? '返回活动' : es ? 'Volver a las actividades' : 'Back to activities'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell code={code}>
        {/* Once we know the lookup is not coming, the hopeful line is
            just noise sitting above the explanation. */}
        {!stalled && !lookupOffline && (
          <p className="mt-16 text-center font-display text-lg font-semibold text-ink/60">
            {zh ? '正在查找你的测验……' : es ? 'Buscando tu quiz…' : 'Finding your quiz…'}
          </p>
        )}
        {/* Without this the screen waits forever on a dead connection. */}
        {(stalled || lookupOffline) && (
          <LiveLookupStalled onRetry={() => window.location.reload()} />
        )}
      </Shell>
    )
  }

  // Do not claim the lesson is missing while its chunk is still downloading.
  if (lessonLoading) {
    return (
      <Shell code={code}>
        <p className="mt-16 text-center font-display text-lg font-semibold text-ink/60">
          {zh ? '正在加载课程……' : es ? 'Cargando la lección…' : 'Loading the lesson…'}
        </p>
      </Shell>
    )
  }

  if (!lesson || lesson.quiz.length === 0) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <BookOpen className="mx-auto block h-11 w-11 text-ink" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">
            {zh ? '这个测验暂时无法使用' : es ? 'Este quiz no está disponible' : 'This quiz is not available'}
          </h1>
          <p className="text-sm text-ink/70">
            {zh
              ? '找不到这个测验对应的课程。请让主持人重新开始一个吧。'
              : es
                ? 'No se encontró la lección de este quiz. Pídele a tu anfitrión que inicie uno nuevo.'
                : 'The lesson behind this quiz could not be found. Ask your host to start a new one.'}
          </p>
          <Link to="/activities" className="btn-primary">
            {zh ? '返回活动' : es ? 'Volver a las actividades' : 'Back to activities'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (!player) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-4">
          <div className="text-center">
            <AppIcon name={lesson.icon} className="mx-auto block h-11 w-11 text-ink" />
            <h1 className="mt-2 font-display text-xl font-bold text-ink">
              {zh ? '你找到测验啦！' : es ? '¡Encontraste el quiz!' : 'You found the quiz!'}
            </h1>
            <p className="mt-1 text-sm text-ink/70">
              {zh
                ? '填上名字和姓氏首字母，让大家都知道排行榜上的你是谁。'
                : es
                  ? 'Pon tu nombre y la inicial de tu apellido para que todos sepan quién está en la tabla.'
                  : 'Add your first name and last initial so everyone knows who is on the leaderboard.'}
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleJoin}>
            <StudentNameFields
              firstName={firstName}
              lastInitial={lastInitial}
              onFirstName={setFirstName}
              onLastInitial={setLastInitial}
              autoFocus
            />
            {joinError && (
              <p className="text-center text-sm font-semibold text-red-600" role="alert">
                {joinError}
              </p>
            )}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={joining || !nickname.trim()}
            >
              {zh
                ? joining
                  ? '正在加入……'
                  : '开始玩吧！'
                : es
                  ? joining
                    ? 'Entrando…'
                    : '¡A jugar!'
                  : joining
                    ? 'Joining…'
                    : "Let's play!"}
            </button>
          </form>
        </div>
      </Shell>
    )
  }

  const total = lesson.quiz.length
  const qIndex = Math.min(session.question_index, total - 1)
  const q = lesson.quiz[qIndex]
  const myAnswer: QuizAnswer | undefined = answers[String(qIndex)]
  const myScore = Object.values(answers).reduce((sum, a) => sum + a.points, 0)
  // Rank uses my locally-known score so it never lags behind my own answer.
  const standings = players
    .map((p) => ({ ...p, score: p.id === player.id ? myScore : p.score }))
    .sort((a, b) => b.score - a.score)
  const myRank = standings.findIndex((p) => p.id === player.id) + 1
  const gotIt = myAnswer !== undefined && myAnswer.choice === q.answerIndex

  return (
    <Shell code={session.code}>
      {/* Lobby */}
      {session.state === 'lobby' && (
        <div className="card animate-pop-in mt-6 space-y-4 text-center" role="status">
          <PartyPopper className="mx-auto block h-14 w-14 text-gold-500" aria-hidden="true" />
          <h1 className="font-display text-2xl font-bold text-ink">
            {zh
              ? `你加入啦，${player.nickname}！`
              : es
                ? `¡Estás dentro, ${player.nickname}!`
                : `You're in, ${player.nickname}!`}
          </h1>
          <p className="text-ink/70">
            {zh
              ? '看大屏幕，测验马上就要开始了。'
              : es
                ? 'Mira la pantalla grande; el quiz empieza pronto.'
                : 'Watch the big screen — the quiz starts soon.'}
          </p>
        </div>
      )}

      {/* Question — tap an answer */}
      {session.state === 'question' && (
        <div className="space-y-4">
          <div>
            <h1 className="font-display text-xl font-bold text-ink">
              {zh
                ? `第 ${qIndex + 1} 题，共 ${total} 题`
                : es
                  ? `Pregunta ${qIndex + 1} de ${total}`
                  : `Question ${qIndex + 1} of ${total}`}
            </h1>
            <p className="text-sm text-ink/60">
              {zh
                ? '答得又快又对能拿到更多分数。看大屏幕吧！'
                : es
                  ? 'Las respuestas correctas más rápidas ganan más puntos. ¡Mira la pantalla grande!'
                  : 'Faster correct answers earn more points — watch the big screen!'}
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {q.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => answer(i)}
                disabled={myAnswer !== undefined}
                className={`flex min-h-20 items-center gap-3 rounded-2xl p-4 text-left shadow-sm transition ${
                  OPTION_COLORS[i % OPTION_COLORS.length]
                } ${
                  myAnswer !== undefined
                    ? myAnswer.choice === i
                      ? 'ring-4 ring-bff-600 ring-offset-2'
                      : 'opacity-40'
                    : 'hover:scale-[1.01] active:scale-[0.99]'
                } disabled:cursor-not-allowed`}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white font-display text-xl font-bold text-ink">
                  {optionLetter(i)}
                </span>
                <span className="font-display text-xl font-semibold leading-snug">{opt}</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-center">
            {myAnswer !== undefined && (
              <span className="chip bg-paper-soft font-display text-sm text-ink">
                {zh ? '答案已锁定' : es ? 'Respuesta confirmada' : 'Answer locked in'}{' '}
                <Lock className="inline h-4 w-4 align-[-0.15em]" aria-hidden="true" />{' '}
                {zh ? '看大屏幕吧！' : es ? '¡Mira la pantalla grande!' : 'Watch the big screen!'}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Reveal — verdict */}
      {session.state === 'reveal' && (
        <div className="card animate-pop-in mt-6 space-y-4 text-center" role="status">
          {myAnswer === undefined ? (
            <Clock className="mx-auto block h-14 w-14 text-ink/50" aria-hidden="true" />
          ) : gotIt ? (
            <Check className="mx-auto block h-14 w-14 text-green-700" aria-hidden="true" />
          ) : (
            <X className="mx-auto block h-14 w-14 text-red-600" aria-hidden="true" />
          )}
          <h1 className="font-display text-2xl font-bold text-ink">
            {myAnswer === undefined
              ? zh
                ? '时间到啦，这一轮你没有作答'
                : es
                  ? 'El tiempo voló; no respondiste esta ronda'
                  : 'Time flew by — no answer this round'
              : gotIt
                ? zh
                  ? `答对了！+${myAnswer.points.toLocaleString()} 分`
                  : es
                    ? `¡Correcto! +${myAnswer.points.toLocaleString()} puntos`
                    : `Correct! +${myAnswer.points.toLocaleString()} points`
                : zh
                  ? '这次没答对'
                  : es
                    ? 'Esta vez no'
                    : 'Not this time'}
          </h1>
          <p className="text-ink/70">
            {zh ? '正确答案是 ' : es ? 'La respuesta era ' : 'The answer was '}
            <strong>{optionLetter(q.answerIndex)}</strong>:{' '}
            <strong>{q.options[q.answerIndex]}</strong>
          </p>
          {myRank > 0 && (
            <p className="font-display text-lg font-bold text-ink">
              {zh
                ? `你目前排在第 ${myRank} 名，共 ${standings.length} 人，${myScore.toLocaleString()} 分`
                : es
                  ? `Vas #${myRank} de ${standings.length} con ${myScore.toLocaleString()} puntos`
                  : `You're #${myRank} of ${standings.length} with ${myScore.toLocaleString()} points`}
            </p>
          )}
        </div>
      )}

      {/* Done — final rank */}
      {session.state === 'done' && (
        <div className="card animate-pop-in mt-6 space-y-5 text-center" role="status">
          {myRank >= 1 && myRank <= 3 ? (
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-paper">
              <RankMark index={myRank - 1} className="h-10 w-10" />
            </span>
          ) : (
            <PartyPopper className="mx-auto block h-14 w-14 text-gold-500" aria-hidden="true" />
          )}
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              {zh
                ? `你排在第 ${myRank || standings.length} 名，共 ${standings.length} 人`
                : es
                  ? `Terminaste #${myRank || standings.length} de ${standings.length}`
                  : `You finished #${myRank || standings.length} of ${standings.length}`}
            </h1>
            <p className="mt-1 font-display text-lg font-bold text-ink">
              {zh
                ? `${myScore.toLocaleString()} 分`
                : es
                  ? `${myScore.toLocaleString()} puntos`
                  : `${myScore.toLocaleString()} points`}
            </p>
          </div>
          {standings.length > 0 && (
            <div className="mx-auto max-w-sm text-left">
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink/60">
                {zh ? '最佳玩家' : es ? 'Mejores jugadores' : 'Top players'}
              </p>
              <ol className="space-y-1.5">
                {standings.slice(0, 5).map((p, i) => (
                  <li
                    key={p.id}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                      p.id === player.id
                        ? 'bg-paper-soft font-bold text-ink'
                        : 'bg-paper text-ink/75'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="inline-flex w-6 shrink-0 justify-center" aria-hidden="true">
                        <RankMark index={i} />
                      </span>
                      <span className="sr-only">
                        {zh
                          ? `第 ${i + 1} 名，`
                          : es
                            ? `puesto ${i + 1}, `
                            : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place, `}
                      </span>
                      {p.nickname}
                    </span>
                    <span className="font-display font-bold">
                      {p.score.toLocaleString()} {zh ? '分' : 'pts'}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <Link to="/activities" className="btn-primary">
            {zh ? '更多活动' : es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      )}
    </Shell>
  )
}
