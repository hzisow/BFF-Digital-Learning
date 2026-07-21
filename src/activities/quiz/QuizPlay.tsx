import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLesson } from '../../content/lessons'
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

const NICK_KEY = 'bff_quiz_nick'
const QUESTION_SECONDS = 20

// Same colors as the host board; amber gets dark text for WCAG AA contrast.
const OPTION_COLORS = [
  'bg-red-600 text-white',
  'bg-blue-600 text-white',
  'bg-amber-400 text-slate-900',
  'bg-green-700 text-white',
]

function optionLetter(i: number): string {
  return String.fromCharCode(65 + i)
}

function errorMessage(err: unknown, es: boolean): string {
  return err instanceof Error
    ? err.message
    : es
      ? 'Algo salió mal. ¡Inténtalo de nuevo!'
      : 'Something went wrong. Try again!'
}

function Shell({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <Logo className="h-8" />
        {code && (
          <span className="chip bg-bff-50 font-display tracking-widest text-bff-700">
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

  const [session, setSession] = useState<QuizSession | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [player, setPlayer] = useState<QuizPlayer | null>(null)
  const [players, setPlayers] = useState<QuizPlayer[]>([])
  const [answers, setAnswers] = useState<Record<string, QuizAnswer>>({})
  const [nickname, setNickname] = useState(
    () => student?.nickname ?? localStorage.getItem(NICK_KEY) ?? '',
  )
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)

  // Refs guard React strict-mode double effects / double submits.
  const fetchedRef = useRef(false)
  const joinRef = useRef(false)

  // Look the quiz up by its code (once).
  useEffect(() => {
    if (!BACKEND_ENABLED || fetchedRef.current) return
    fetchedRef.current = true
    getQuizSessionByCode(code)
      .then(setSession)
      .catch((err) => setLoadError(errorMessage(err, es)))
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
      setJoinError(es ? '¡Primero elige un apodo!' : 'Pick a nickname first!')
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
      setJoinError(errorMessage(err, es))
    } finally {
      setJoining(false)
    }
  }

  const lesson = session ? getLesson(session.lesson_slug) : undefined

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
          <p className="text-4xl" aria-hidden="true">🔌</p>
          <h1 className="font-display text-xl font-bold text-slate-900">
            {es ? 'Los quiz en vivo aún no están conectados' : 'Live quizzes are not connected yet'}
          </h1>
          <p className="text-sm text-slate-600">
            {es
              ? 'Los quiz en vivo se activan cuando se conecta el servidor de la clase; ¡las lecciones siguen funcionando por tu cuenta!'
              : 'Live quizzes unlock when the class backend is connected — the lessons still work solo!'}
          </p>
          <Link to="/activities" className="btn-primary">
            {es ? 'Volver a las actividades' : 'Back to activities'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (loadError) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <p className="text-4xl" aria-hidden="true">🤔</p>
          <h1 className="font-display text-xl font-bold text-slate-900">
            {es ? 'Mmm, eso no funcionó' : 'Hmm, that did not work'}
          </h1>
          <p className="text-sm text-slate-600">{loadError}</p>
          <Link to="/activities" className="btn-primary">
            {es ? 'Volver a las actividades' : 'Back to activities'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell code={code}>
        <p className="mt-16 text-center font-display text-lg font-semibold text-slate-500">
          {es ? 'Buscando tu quiz…' : 'Finding your quiz…'}
        </p>
      </Shell>
    )
  }

  if (!lesson || lesson.quiz.length === 0) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <p className="text-4xl" aria-hidden="true">📚</p>
          <h1 className="font-display text-xl font-bold text-slate-900">
            {es ? 'Este quiz no está disponible' : 'This quiz is not available'}
          </h1>
          <p className="text-sm text-slate-600">
            {es
              ? 'No se encontró la lección de este quiz. Pídele a tu anfitrión que inicie uno nuevo.'
              : 'The lesson behind this quiz could not be found. Ask your host to start a new one.'}
          </p>
          <Link to="/activities" className="btn-primary">
            {es ? 'Volver a las actividades' : 'Back to activities'}
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
            <p className="text-4xl" aria-hidden="true">{lesson.emoji}</p>
            <h1 className="mt-2 font-display text-xl font-bold text-slate-900">
              {es ? '¡Encontraste el quiz!' : 'You found the quiz!'}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {es
                ? 'Elige un apodo para que todos sepan quién está en la tabla de posiciones.'
                : 'Pick a nickname so everyone knows who is on the leaderboard.'}
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleJoin}>
            <label htmlFor="quiz-nickname" className="sr-only">
              {es ? 'Tu apodo' : 'Your nickname'}
            </label>
            <input
              id="quiz-nickname"
              className="input text-center font-display text-lg"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={es ? 'Tu apodo' : 'Your nickname'}
              maxLength={24}
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
              {es ? (joining ? 'Entrando…' : '¡A jugar!') : joining ? 'Joining…' : "Let's play!"}
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
          <p className="text-5xl" aria-hidden="true">🎉</p>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {es ? `¡Estás dentro, ${player.nickname}!` : `You're in, ${player.nickname}!`}
          </h1>
          <p className="text-slate-600">
            {es
              ? 'Mira la pantalla grande; el quiz empieza pronto.'
              : 'Watch the big screen — the quiz starts soon.'}
          </p>
        </div>
      )}

      {/* Question — tap an answer */}
      {session.state === 'question' && (
        <div className="space-y-4">
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">
              {es ? `Pregunta ${qIndex + 1} de ${total}` : `Question ${qIndex + 1} of ${total}`}
            </h1>
            <p className="text-sm text-slate-500">
              {es
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
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white font-display text-xl font-bold text-slate-900">
                  {optionLetter(i)}
                </span>
                <span className="font-display text-xl font-semibold leading-snug">{opt}</span>
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-center">
            {myAnswer !== undefined && (
              <span className="chip bg-bff-50 font-display text-sm text-bff-700">
                {es ? 'Respuesta confirmada' : 'Answer locked in'}{' '}
                <span aria-hidden="true">🔒</span>{' '}
                {es ? '¡Mira la pantalla grande!' : 'Watch the big screen!'}
              </span>
            )}
          </p>
        </div>
      )}

      {/* Reveal — verdict */}
      {session.state === 'reveal' && (
        <div className="card animate-pop-in mt-6 space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">
            {myAnswer === undefined ? '⏰' : gotIt ? '✅' : '❌'}
          </p>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {myAnswer === undefined
              ? es
                ? 'El tiempo voló; no respondiste esta ronda'
                : 'Time flew by — no answer this round'
              : gotIt
                ? es
                  ? `¡Correcto! +${myAnswer.points.toLocaleString()} puntos`
                  : `Correct! +${myAnswer.points.toLocaleString()} points`
                : es
                  ? 'Esta vez no'
                  : 'Not this time'}
          </h1>
          <p className="text-slate-600">
            {es ? 'La respuesta era ' : 'The answer was '}
            <strong>{optionLetter(q.answerIndex)}</strong>:{' '}
            <strong>{q.options[q.answerIndex]}</strong>
          </p>
          {myRank > 0 && (
            <p className="font-display text-lg font-bold text-bff-700">
              {es
                ? `Vas #${myRank} de ${standings.length} con ${myScore.toLocaleString()} puntos`
                : `You're #${myRank} of ${standings.length} with ${myScore.toLocaleString()} points`}
            </p>
          )}
        </div>
      )}

      {/* Done — final rank */}
      {session.state === 'done' && (
        <div className="card animate-pop-in mt-6 space-y-5 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">
            {myRank === 1 ? '🥇' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : '🎊'}
          </p>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {es
                ? `Terminaste #${myRank || standings.length} de ${standings.length}`
                : `You finished #${myRank || standings.length} of ${standings.length}`}
            </h1>
            <p className="mt-1 font-display text-lg font-bold text-bff-700">
              {es
                ? `${myScore.toLocaleString()} puntos`
                : `${myScore.toLocaleString()} points`}
            </p>
          </div>
          {standings.length > 0 && (
            <div className="mx-auto max-w-sm text-left">
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                {es ? 'Mejores jugadores' : 'Top players'}
              </p>
              <ol className="space-y-1.5">
                {standings.slice(0, 5).map((p, i) => (
                  <li
                    key={p.id}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                      p.id === player.id
                        ? 'bg-bff-50 font-bold text-bff-800'
                        : 'bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>
                      <span aria-hidden="true">
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                      </span>
                      <span className="sr-only">
                        {es
                          ? `puesto ${i + 1}, `
                          : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place, `}
                      </span>{' '}
                      {p.nickname}
                    </span>
                    <span className="font-display font-bold">{p.score.toLocaleString()} pts</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <Link to="/activities" className="btn-primary">
            {es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      )}
    </Shell>
  )
}
