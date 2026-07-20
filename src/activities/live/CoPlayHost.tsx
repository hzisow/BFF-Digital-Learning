import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getLiveSession,
  listLivePlayers,
  subscribeToLive,
  updateLiveSession,
  type LivePlayer,
  type LiveSession,
} from './coplay'
import { getActivity } from '../../lib/activities'
import { Logo } from '../../components/Logo'

const BIG_BUTTON =
  'rounded-2xl bg-white px-8 py-4 font-display text-2xl font-bold text-bff-900 shadow-lg transition hover:bg-bff-50 disabled:cursor-not-allowed disabled:opacity-50'

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Could not load the game.'
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

function HostShell({ code, children }: { code?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-bff-950 text-white">
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
    <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-bff-950/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-4">{children}</div>
    </div>
  )
}

export default function CoPlayHost() {
  const { sessionId } = useParams<{ sessionId: string }>()

  const [session, setSession] = useState<LiveSession | null>(null)
  const [players, setPlayers] = useState<LivePlayer[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) return
    let active = true
    setSession(null)
    setPlayers([])
    setError(null)

    const refresh = () => {
      listLivePlayers(sessionId)
        .then((ps) => {
          if (active) setPlayers(ps)
        })
        .catch((err) => console.warn('Could not refresh players', err))
    }

    getLiveSession(sessionId)
      .then((s) => {
        if (active) setSession(s)
      })
      .catch((err) => {
        if (active) setError(errorMessage(err))
      })
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
  }, [sessionId])

  function setState(state: LiveSession['state']) {
    if (!session) return
    setSession({ ...session, state })
    updateLiveSession(session.id, { state }).catch((err) =>
      console.warn('Could not update game state', err),
    )
  }

  if (error && !session) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <p className="text-4xl" aria-hidden="true">
            🤔
          </p>
          <h1 className="font-display text-xl font-bold text-slate-900">Could not load the game</h1>
          <p className="text-sm text-slate-600">{error}</p>
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </HostShell>
    )
  }

  if (!session) {
    return (
      <HostShell>
        <p className="mt-32 text-center font-display text-2xl font-semibold text-bff-200">
          Warming up the game…
        </p>
      </HostShell>
    )
  }

  const activity = getActivity(session.activity_slug)

  if (!activity) {
    return (
      <HostShell code={session.code}>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <p className="text-4xl" aria-hidden="true">
            🧩
          </p>
          <h1 className="font-display text-xl font-bold text-slate-900">Unknown game</h1>
          <p className="text-sm text-slate-600">
            We couldn&apos;t find an activity called “{session.activity_slug}”. Double-check the
            challenge you started.
          </p>
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
        </div>
      </HostShell>
    )
  }

  const standings = rankPlayers(players)
  const finishedCount = players.filter((p) => p.finished).length

  return (
    <HostShell code={session.code}>
      {/* Lobby */}
      {session.state === 'lobby' && (
        <div className="flex flex-col items-center gap-8 pt-8 text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            <span aria-hidden="true">{activity.emoji}</span> {activity.title}
          </h1>
          <p className="text-xl text-bff-200">Grab a device and join with the game code</p>
          <p className="font-display text-7xl font-bold tracking-widest sm:text-8xl md:text-9xl">
            {session.code}
          </p>
          <p className="max-w-full overflow-x-auto rounded-xl bg-white/10 px-5 py-2.5 text-lg text-bff-100">
            Students: go to the site → Join a live game → enter this code
          </p>
          <div className="w-full">
            <p className="mb-3 font-display text-2xl font-bold text-bff-100">
              {players.length} {players.length === 1 ? 'player' : 'players'} joined
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
                <span className="text-lg text-bff-300">Waiting for the first player to join…</span>
              )}
            </div>
          </div>
          <button
            className={BIG_BUTTON}
            onClick={() => setState('playing')}
            disabled={players.length === 0}
          >
            Start game <span aria-hidden="true">🚀</span>
          </button>
        </div>
      )}

      {/* Playing */}
      {session.state === 'playing' && (
        <div className="space-y-6 pt-2">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            <span aria-hidden="true">{activity.emoji}</span> {activity.title}
          </h1>
          <p
            className="font-display text-3xl font-bold text-bff-100 sm:text-4xl"
            aria-live="polite"
          >
            {finishedCount} of {players.length} finished
          </p>
          <div className="rounded-2xl bg-white/10 p-6" aria-live="polite" aria-label="Live leaderboard">
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
              <span aria-hidden="true">🏆</span> Live leaderboard
            </h2>
            <ol className="space-y-2.5">
              {standings.map((p, i) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 text-xl last:border-0"
                >
                  <span className="font-display font-semibold">
                    {i + 1}. {p.nickname}
                  </span>
                  <span className="whitespace-nowrap font-display font-bold text-bff-100">
                    {p.finished && p.score !== null ? (
                      `${p.score} pts`
                    ) : (
                      <span className="text-bff-300">playing…</span>
                    )}
                  </span>
                </li>
              ))}
              {standings.length === 0 && (
                <li className="text-lg text-bff-300">No players yet…</li>
              )}
            </ol>
          </div>
          <ControlBar>
            <p className="mr-auto hidden text-bff-300 sm:block">
              Everyone plays at their own pace — end the game when the room is done.
            </p>
            <button className={BIG_BUTTON} onClick={() => setState('ended')}>
              End game <span aria-hidden="true">🏁</span>
            </button>
          </ControlBar>
        </div>
      )}

      {/* Ended */}
      {session.state === 'ended' && (
        <div className="flex flex-col items-center gap-10 pt-6 text-center">
          <h1 className="font-display text-5xl font-bold sm:text-6xl">
            <span aria-hidden="true">🏆</span> Final Leaderboard
          </h1>
          <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {standings.slice(0, 3).map((p, i) => (
              <div
                key={p.id}
                className={`animate-pop-in rounded-3xl p-8 ${
                  i === 0
                    ? 'bg-white/20 ring-2 ring-gold-400 sm:order-2'
                    : i === 1
                      ? 'bg-white/10 sm:order-1'
                      : 'bg-white/10 sm:order-3'
                }`}
              >
                <p className="text-6xl" aria-hidden="true">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </p>
                <p className="mt-3 break-words font-display text-3xl font-bold">
                  <span className="sr-only">{`${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place: `}</span>
                  {p.nickname}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-bff-100">
                  {p.score !== null ? `${p.score} pts` : 'did not finish'}
                </p>
              </div>
            ))}
          </div>
          {standings.length === 0 && (
            <p className="text-2xl text-bff-200">No players this round!</p>
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
                    {p.score !== null ? `${p.score} pts` : '—'}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </HostShell>
  )
}
