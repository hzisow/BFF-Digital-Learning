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

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Something went wrong. Try again!'
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
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <Logo className="h-8" />
        {code && (
          <span className="chip bg-bff-50 font-display tracking-widest text-bff-700">
            GAME {code}
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
      .catch((err) => setLoadError(errorMessage(err)))
  }, [code])

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
      setJoinError('Pick a nickname first!')
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
      setJoinError(errorMessage(err))
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
          <h1 className="font-display text-xl font-bold text-slate-900">Hmm, that did not work</h1>
          <p className="text-sm text-slate-600">{loadError}</p>
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell code={code}>
        <p className="mt-16 text-center font-display text-lg font-semibold text-slate-500">
          Finding your game…
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
              You found the game!
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {activity ? activity.title : 'Live challenge'} — pick a nickname so everyone knows who
              you are.
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleJoin}>
            <label htmlFor="live-nickname" className="sr-only">
              Your nickname
            </label>
            <input
              id="live-nickname"
              className="input text-center font-display text-lg"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your nickname"
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
              {joining ? 'Joining…' : 'Join game'}
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
          <h1 className="font-display text-2xl font-bold text-slate-900">Game over!</h1>
          {myRank > 0 ? (
            <p className="font-display text-lg font-bold text-bff-700">
              You finished #{myRank} of {standings.length}
              {myScore !== null && (
                <>
                  {' — '}
                  {myScore} pts
                </>
              )}
            </p>
          ) : (
            <p className="text-slate-600">Thanks for playing!</p>
          )}
          <Link to="/activities" className="btn-primary">
            More activities
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
            You&apos;re in, {player.nickname}!
          </h1>
          <p className="text-slate-600">
            Waiting for the host to start… Watch the big screen!
          </p>
          {players.length > 1 && (
            <p className="text-sm font-semibold text-slate-500">
              {players.length} players in the room
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
            This game can&apos;t be played live yet
          </h1>
          <p className="text-sm text-slate-600">
            Watch the big screen — your host will take it from here.
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
            {myScore !== null ? `You scored ${myScore}!` : 'All done!'}
          </h1>
          <p className="text-slate-600">Watch the leaderboard on the big screen.</p>
          {myRank > 0 && (
            <p className="font-display text-lg font-bold text-bff-700">
              You&apos;re currently #{myRank} of {standings.length}
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
