import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { COMPANIES, MARKET_HINTS, NEWS_ROUNDS, portfolioValue, priceAt } from './data'
import { money } from './TradingBoard'
import {
  createSession,
  getSession,
  listPlayers,
  subscribeToGame,
  updateSession,
  type GamePlayer,
  type GameSession,
} from './live'
import { Logo } from '../../components/Logo'
import { BACKEND_ENABLED } from '../../lib/config'
import { useAdmin } from '../../lib/session'

const STAGE_TITLES: Record<number, string> = {
  1: '🔔 Opening Bell',
  2: '📰 Breaking News 1',
  3: '📰 Breaking News 2',
}

const ADVANCE_LABELS: Record<number, string> = {
  1: 'Breaking news round 1 →',
  2: 'Breaking news round 2 →',
  3: 'Ring the closing bell 🔔',
}

const BIG_BUTTON =
  'rounded-2xl bg-white px-8 py-4 font-display text-2xl font-bold text-bff-900 shadow-lg transition hover:bg-bff-50 disabled:cursor-not-allowed disabled:opacity-50'

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

export default function WolfHost() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { adminUser, adminReady } = useAdmin()

  const [session, setSession] = useState<GameSession | null>(null)
  const [players, setPlayers] = useState<GamePlayer[]>([])
  const [error, setError] = useState<string | null>(null)
  const [creating, setCreating] = useState(false)

  const adminId = adminUser?.id

  useEffect(() => {
    if (!BACKEND_ENABLED || !adminId || !sessionId) return
    let active = true
    setSession(null)
    setPlayers([])
    setError(null)
    getSession(sessionId)
      .then((s) => {
        if (active) setSession(s)
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Could not load the game.')
      })
    const refresh = () => {
      listPlayers(sessionId)
        .then((ps) => {
          if (active) setPlayers(ps)
        })
        .catch((err) => console.warn('Could not refresh players', err))
    }
    refresh()
    const unsubscribe = subscribeToGame(
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

  function setStage(stage: number) {
    if (!session) return
    setSession({ ...session, stage })
    updateSession(session.id, { stage }).catch((err) => console.warn('Stage update failed', err))
  }

  function revealNext() {
    if (!session) return
    const reveal_index = Math.min(session.reveal_index + 1, COMPANIES.length)
    setSession({ ...session, reveal_index })
    updateSession(session.id, { reveal_index }).catch((err) =>
      console.warn('Reveal update failed', err),
    )
  }

  async function playAgain() {
    if (creating) return
    setCreating(true)
    try {
      const s = await createSession(null)
      navigate(`/host/${s.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create a new game.')
    } finally {
      setCreating(false)
    }
  }

  if (!BACKEND_ENABLED || (adminReady && !adminUser)) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <p className="text-4xl">🖥️</p>
          <h1 className="font-display text-xl font-bold text-slate-900">Host screen</h1>
          <p className="text-sm text-slate-600">
            {!BACKEND_ENABLED
              ? 'Live games unlock when the class backend is connected — solo mode is ready now!'
              : 'Hosting live games is for signed-in BFF mentors. Head over to the team page to sign in.'}
          </p>
          <Link to="/team" className="btn-primary">
            Go to the team page
          </Link>
        </div>
      </HostShell>
    )
  }

  if (error && !session) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <p className="text-4xl">🤔</p>
          <h1 className="font-display text-xl font-bold text-slate-900">Could not load the game</h1>
          <p className="text-sm text-slate-600">{error}</p>
          <Link to="/wolf" className="btn-primary">
            Back to Wolf of Wall Street
          </Link>
        </div>
      </HostShell>
    )
  }

  if (!adminReady || !session) {
    return (
      <HostShell>
        <p className="mt-32 text-center font-display text-2xl font-semibold text-bff-200">
          Warming up the trading floor…
        </p>
      </HostShell>
    )
  }

  const stage = session.stage
  const standings = [...players]
    .map((p) => ({ ...p, value: portfolioValue(p.cash, p.holdings, stage) }))
    .sort((a, b) => b.value - a.value)
  const joinUrl = `${window.location.origin}${window.location.pathname}#/play/${session.code}`

  return (
    <HostShell code={session.code}>
      {/* Stage 0 — lobby */}
      {stage === 0 && (
        <div className="flex flex-col items-center gap-8 pt-8 text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">🐺 Wolf of Wall Street</h1>
          <p className="text-xl text-bff-200">Grab a device and join with the game code</p>
          <p className="font-display text-7xl font-bold tracking-widest sm:text-8xl md:text-9xl">
            {session.code}
          </p>
          <p className="max-w-full overflow-x-auto rounded-xl bg-white/10 px-5 py-2.5 font-mono text-lg text-bff-100">
            {joinUrl}
          </p>
          <div className="w-full">
            <p className="mb-3 font-display text-2xl font-bold text-bff-100">
              {players.length} {players.length === 1 ? 'trader' : 'traders'} on the floor
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
                <span className="text-lg text-bff-300">Waiting for the first trader to join…</span>
              )}
            </div>
          </div>
          <button className={BIG_BUTTON} onClick={() => setStage(1)}>
            Start the game 🔔
          </button>
        </div>
      )}

      {/* Stages 1-3 — presenter view */}
      {stage >= 1 && stage <= 3 && (
        <div className="space-y-6 pt-2">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{STAGE_TITLES[stage]}</h1>
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(300px,360px)]">
            <div className="space-y-6">
              <div className="rounded-2xl bg-white/10 p-6">
                <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
                  {stage === 1 ? '🔍 Market information' : '📰 Breaking news'}
                </h2>
                <ul className="space-y-3">
                  {stage === 1
                    ? MARKET_HINTS.map((h) => (
                        <li key={h} className="text-2xl font-semibold leading-snug">
                          {h}
                        </li>
                      ))
                    : NEWS_ROUNDS[stage - 2].map((n) => (
                        <li key={n.headline} className="text-2xl font-semibold leading-snug">
                          {n.direction === 'up' ? '📈' : '📉'} {n.headline}
                        </li>
                      ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/10 p-6">
                <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
                  💹 Prices
                </h2>
                <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2">
                  {COMPANIES.map((c) => {
                    const price = priceAt(c, stage)
                    const prev = stage >= 2 ? priceAt(c, stage - 1) : price
                    const change = price - prev
                    return (
                      <div
                        key={c.ticker}
                        className="flex items-baseline justify-between gap-3 border-b border-white/10 py-1.5"
                      >
                        <span className="font-display text-lg font-semibold">
                          {c.ticker}{' '}
                          <span className="text-base font-normal text-bff-200">{c.name}</span>
                        </span>
                        <span className="whitespace-nowrap font-display text-xl font-bold">
                          ${price}
                          {stage >= 2 && (
                            <span
                              className={`ml-2 text-base ${
                                change > 0
                                  ? 'text-green-400'
                                  : change < 0
                                    ? 'text-red-400'
                                    : 'text-bff-300'
                              }`}
                            >
                              {change > 0 ? `▲ +${change}` : change < 0 ? `▼ ${change}` : '· flat'}
                            </span>
                          )}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
            <div className="h-fit rounded-2xl bg-white/10 p-6">
              <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
                🏆 Leaderboard
              </h2>
              <ol className="space-y-2.5">
                {standings.map((p, i) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 text-xl">
                    <span className="font-display font-semibold">
                      {i + 1}. {p.nickname}
                    </span>
                    <span className="whitespace-nowrap font-display font-bold text-bff-100">
                      {money(p.value)}
                    </span>
                  </li>
                ))}
                {standings.length === 0 && <li className="text-lg text-bff-300">No traders yet…</li>}
              </ol>
            </div>
          </div>
          <ControlBar>
            <p className="mr-auto hidden text-bff-300 sm:block">
              Everyone trades on their own device — advance when the room is ready.
            </p>
            <button className={BIG_BUTTON} onClick={() => setStage(stage + 1)}>
              {ADVANCE_LABELS[stage]}
            </button>
          </ControlBar>
        </div>
      )}

      {/* Stage 4 — closing-bell reveal */}
      {stage === 4 && (
        <div className="space-y-6 pt-2">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            🔒 Closing Bell — the results are in
          </h1>
          {session.reveal_index === 0 && (
            <p className="text-2xl text-bff-200">
              Build the suspense… reveal the companies one at a time!
            </p>
          )}
          <div className="space-y-3">
            {COMPANIES.slice(0, session.reveal_index).map((c, i) => {
              const change = c.prices[3] - c.prices[0]
              const latest = i === session.reveal_index - 1
              return (
                <div
                  key={c.ticker}
                  className={`flex items-start justify-between gap-6 rounded-2xl bg-white/10 p-5 ${
                    latest ? 'animate-pop-in ring-2 ring-white/40' : ''
                  }`}
                >
                  <div>
                    <p className="font-display text-2xl font-bold">
                      {c.name}{' '}
                      <span className="text-lg font-semibold text-bff-300">{c.ticker}</span>
                    </p>
                    <p className="mt-1 text-lg text-bff-100">{c.summary}</p>
                  </div>
                  <p
                    className={`whitespace-nowrap font-display text-3xl font-bold ${
                      change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    ${c.prices[3]}{' '}
                    <span className="text-xl">({change >= 0 ? '+' : ''}{change})</span>
                  </p>
                </div>
              )
            })}
          </div>
          <ControlBar>
            {session.reveal_index < COMPANIES.length ? (
              <button className={BIG_BUTTON} onClick={revealNext}>
                Reveal next company →
              </button>
            ) : (
              <button className={BIG_BUTTON} onClick={() => setStage(5)}>
                Show final leaderboard 🏆
              </button>
            )}
          </ControlBar>
        </div>
      )}

      {/* Stage 5 — podium */}
      {stage === 5 && (
        <div className="flex flex-col items-center gap-10 pt-6 text-center">
          <h1 className="font-display text-5xl font-bold sm:text-6xl">🏆 Final Leaderboard</h1>
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
                <p className="text-6xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</p>
                <p className="mt-3 break-words font-display text-3xl font-bold">{p.nickname}</p>
                <p className="mt-1 font-display text-2xl font-bold text-bff-100">
                  {money(p.value)}
                </p>
              </div>
            ))}
          </div>
          {standings.length === 0 && (
            <p className="text-2xl text-bff-200">No traders this round — the market was quiet!</p>
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
                  <span className="font-display font-bold text-bff-100">{money(p.value)}</span>
                </li>
              ))}
            </ol>
          )}
          <button className={BIG_BUTTON} onClick={playAgain} disabled={creating}>
            {creating ? 'Setting up…' : 'Play again with a new game 🔁'}
          </button>
        </div>
      )}
    </HostShell>
  )
}
