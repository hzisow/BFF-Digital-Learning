import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getLiveSessionByCode,
  joinLiveSession,
  listLivePlayers,
  reportScore,
  subscribeToLive,
  type LivePlayer,
  type LiveSession,
} from './coplay'
import type { LiveGameProps } from './types'
import { getActivity } from '../../lib/activities'
import { Logo } from '../../components/Logo'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'

import BensBudget from '../bens-budget/BensBudget'
import BensInsurance from '../bens-insurance/BensInsurance'
import PaystubDetective from '../paystub/PaystubDetective'
import CreditScoreSim from '../credit-sim/CreditScoreSim'
import ScamSpotter from '../scam-spotter/ScamSpotter'
import SmartShopper from '../smart-shopper/SmartShopper'
import GoalGetter from '../goal-getter/GoalGetter'

const NICK_KEY = 'bff_live_nick'

// activity_slug → the solo game component. Typed as ComponentType<LiveGameProps>
// so this compiles whether or not each game has landed its optional onComplete
// prop yet — a parallel agent is wiring those in.
const GAME_REGISTRY: Record<string, React.ComponentType<LiveGameProps>> = {
  'bens-budget': BensBudget,
  'bens-insurance': BensInsurance,
  'paystub-detective': PaystubDetective,
  'credit-score-sim': CreditScoreSim,
  'scam-spotter': ScamSpotter,
  'smart-shopper': SmartShopper,
  'goal-getter': GoalGetter,
}

function errorMessage(err: unknown, es: boolean): string {
  return err instanceof Error
    ? err.message
    : es
      ? 'Algo salió mal. ¡Inténtalo de nuevo!'
      : 'Something went wrong. Try again!'
}

/** Rank order: finished players first, then by score (high→low), unscored last. */
function rankPlayers(players: LivePlayer[]): LivePlayer[] {
  return [...players].sort((a, b) => {
    if (a.finished !== b.finished) return a.finished ? -1 : 1
    const as = a.score
    const bs = b.score
    if (as === null && bs === null) return 0
    if (as === null) return 1
    if (bs === null) return -1
    return bs - as
  })
}

function Shell({ code, children }: { code: string; children: ReactNode }) {
  const { lang } = useLang()
  const es = lang === 'es'
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <Logo className="h-8" />
        {code && (
          <span className="chip bg-bff-50 font-display tracking-widest text-bff-700">
            {es ? 'JUEGO' : 'GAME'} {code}
          </span>
        )}
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  )
}

export default function CoPlayPlayer() {
  const params = useParams<{ code: string }>()
  const code = (params.code ?? '').toUpperCase()
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'

  const [session, setSession] = useState<LiveSession | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [player, setPlayer] = useState<LivePlayer | null>(null)
  const [players, setPlayers] = useState<LivePlayer[]>([])
  const [nickname, setNickname] = useState(
    () => student?.nickname ?? localStorage.getItem(NICK_KEY) ?? '',
  )
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [myScore, setMyScore] = useState<number | null>(null)

  const fetchedRef = useRef(false)
  const joinRef = useRef(false)

  // Look the game up by its code (once).
  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    getLiveSessionByCode(code)
      .then(setSession)
      .catch((err) => setLoadError(errorMessage(err, es)))
  }, [code, es])

  // Once joined: track session state + fellow players.
  const sessionId = session?.id
  const playerId = player?.id
  useEffect(() => {
    if (!sessionId || !playerId) return
    let active = true
    const refresh = () => {
      listLivePlayers(sessionId)
        .then((ps) => {
          if (active) setPlayers(ps)
        })
        .catch((err) => console.warn('Could not refresh players', err))
    }
    refresh()
    let unsubscribe: (() => void) | undefined
    try {
      unsubscribe = subscribeToLive(
        sessionId,
        (s) => {
          if (active) setSession(s)
        },
        refresh,
      )
    } catch (err) {
      console.warn('Could not open live channel', err)
    }
    return () => {
      active = false
      unsubscribe?.()
    }
  }, [sessionId, playerId])

  async function handleJoin(e: FormEvent) {
    e.preventDefault()
    if (!session || joinRef.current) return
    const nick = nickname.trim()
    if (!nick) {
      setJoinError(es ? '¡Elige un apodo primero!' : 'Pick a nickname first!')
      return
    }
    joinRef.current = true
    setJoining(true)
    setJoinError(null)
    try {
      const p = await joinLiveSession(session.id, nick)
      localStorage.setItem(NICK_KEY, p.nickname)
      setPlayer(p)
      if (p.finished) {
        setFinished(true)
        setMyScore(p.score)
      }
    } catch (err) {
      joinRef.current = false
      setJoinError(errorMessage(err, es))
    } finally {
      setJoining(false)
    }
  }

  function handleComplete(score: number) {
    if (!player) return
    const rounded = Math.round(score)
    setFinished(true)
    setMyScore(rounded)
    reportScore(player.id, rounded).catch((err) => console.warn('Could not report score', err))
  }

  if (loadError) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <p className="text-4xl" aria-hidden="true">
            🤔
          </p>
          <h1 className="font-display text-xl font-bold text-slate-900">{es ? 'Mmm, eso no funcionó' : 'Hmm, that did not work'}</h1>
          <p className="text-sm text-slate-600">{loadError}</p>
          <Link to="/" className="btn-primary">
            {es ? 'Volver al inicio' : 'Back to home'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell code={code}>
        <p className="mt-16 text-center font-display text-lg font-semibold text-slate-500">
          {es ? 'Buscando tu juego…' : 'Finding your game…'}
        </p>
      </Shell>
    )
  }

  const activity = getActivity(session.activity_slug)
  const Game = GAME_REGISTRY[session.activity_slug]

  // Join screen.
  if (!player) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-4">
          <div className="text-center">
            <p className="text-4xl" aria-hidden="true">
              {activity?.emoji ?? '🎮'}
            </p>
            <h1 className="mt-2 font-display text-xl font-bold text-slate-900">
              {es ? '¡Encontraste el juego!' : 'You found the game!'}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {activity ? activity.title : es ? 'Reto en vivo' : 'Live challenge'}{' '}
              {es
                ? '— elige un apodo para que todos sepan quién eres.'
                : '— pick a nickname so everyone knows who you are.'}
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleJoin}>
            <label htmlFor="live-nickname" className="sr-only">
              {es ? 'Tu apodo' : 'Your nickname'}
            </label>
            <input
              id="live-nickname"
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
              {joining ? (es ? 'Entrando…' : 'Joining…') : es ? 'Entrar al juego' : 'Join game'}
            </button>
          </form>
        </div>
      </Shell>
    )
  }

  const standings = rankPlayers(players)
  const myRank = standings.findIndex((p) => p.id === player.id) + 1
  const isFinished = finished || player.finished

  // Final rank card.
  if (session.state === 'ended') {
    return (
      <Shell code={session.code}>
        <div className="card animate-pop-in mt-6 space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">
            🏁
          </p>
          <h1 className="font-display text-2xl font-bold text-slate-900">{es ? '¡Juego terminado!' : 'Game over!'}</h1>
          {myRank > 0 ? (
            <p className="font-display text-lg font-bold text-bff-700">
              {es ? `Terminaste en el puesto #${myRank} de ${standings.length}` : `You finished #${myRank} of ${standings.length}`}
              {myScore !== null && (
                <>
                  {' — '}
                  {myScore} pts
                </>
              )}
            </p>
          ) : (
            <p className="text-slate-600">{es ? '¡Gracias por jugar!' : 'Thanks for playing!'}</p>
          )}
          <Link to="/activities" className="btn-primary">
            {es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      </Shell>
    )
  }

  // Lobby — joined, host hasn't started.
  if (session.state === 'lobby') {
    return (
      <Shell code={session.code}>
        <div className="card animate-pop-in mt-6 space-y-4 text-center" aria-live="polite">
          <p className="text-5xl" aria-hidden="true">
            🎉
          </p>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {es ? `¡Estás dentro, ${player.nickname}!` : `You're in, ${player.nickname}!`}
          </h1>
          <p className="text-slate-600">
            {es
              ? 'Esperando a que el anfitrión comience… ¡Mira la pantalla grande!'
              : 'Waiting for the host to start… Watch the big screen!'}
          </p>
          {players.length > 1 && (
            <p className="text-sm font-semibold text-slate-500">
              {es ? `${players.length} jugadores en la sala` : `${players.length} players in the room`}
            </p>
          )}
        </div>
      </Shell>
    )
  }

  // Playing but this game isn't in the registry.
  if (!Game) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <p className="text-4xl" aria-hidden="true">
            🚧
          </p>
          <h1 className="font-display text-xl font-bold text-slate-900">
            {es ? 'Este juego todavía no se puede jugar en vivo' : 'This game can’t be played live yet'}
          </h1>
          <p className="text-sm text-slate-600">
            {es
              ? 'Mira la pantalla grande — tu anfitrión se encargará desde aquí.'
              : 'Watch the big screen — your host will take it from here.'}
          </p>
        </div>
      </Shell>
    )
  }

  // Finished — waiting on the leaderboard.
  if (isFinished) {
    return (
      <Shell code={session.code}>
        <div className="card animate-pop-in mt-6 space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">
            🎉
          </p>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            {myScore !== null ? (es ? `¡Obtuviste ${myScore} puntos!` : `You scored ${myScore}!`) : es ? '¡Listo!' : 'All done!'}
          </h1>
          <p className="text-slate-600">{es ? 'Mira la tabla de posiciones en la pantalla grande.' : 'Watch the leaderboard on the big screen.'}</p>
          {myRank > 0 && (
            <p className="font-display text-lg font-bold text-bff-700">
              {es ? `Actualmente estás en el puesto #${myRank} de ${standings.length}` : `You're currently #${myRank} of ${standings.length}`}
            </p>
          )}
        </div>
      </Shell>
    )
  }

  // Playing — render the solo game.
  return (
    <Shell code={session.code}>
      <Game onComplete={handleComplete} />
    </Shell>
  )
}
