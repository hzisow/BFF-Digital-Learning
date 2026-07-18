import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { COMPANIES, STARTING_CASH, portfolioValue, priceAt, type Holdings } from './data'
import TradingBoard, { money } from './TradingBoard'
import {
  getSessionByCode,
  joinSession,
  listPlayers,
  subscribeToGame,
  updatePlayer,
  type GamePlayer,
  type GameSession,
} from './live'
import { Logo } from '../../components/Logo'
import { BACKEND_ENABLED } from '../../lib/config'
import { useStudent } from '../../lib/session'
import { saveProgress } from '../../lib/progress'

const NICK_KEY = 'bff_wolf_nick'

const STAGE_TITLES: Record<number, string> = {
  1: '🔔 Opening Bell — pick your stocks',
  2: '📰 Breaking News — round 1',
  3: '📰 Breaking News — round 2',
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Something went wrong. Try again!'
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

export default function WolfPlayer() {
  const params = useParams<{ code: string }>()
  const code = (params.code ?? '').toUpperCase()
  const { student } = useStudent()

  const [session, setSession] = useState<GameSession | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [player, setPlayer] = useState<GamePlayer | null>(null)
  const [players, setPlayers] = useState<GamePlayer[]>([])
  const [nickname, setNickname] = useState(
    () => student?.nickname ?? localStorage.getItem(NICK_KEY) ?? '',
  )
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)
  const [cash, setCash] = useState(STARTING_CASH)
  const [holdings, setHoldings] = useState<Holdings>({})

  // Refs guard React strict-mode double effects / double submits.
  const fetchedRef = useRef(false)
  const joinRef = useRef(false)
  const savedRef = useRef(false)

  // Look the game up by its code (once).
  useEffect(() => {
    if (!BACKEND_ENABLED || fetchedRef.current) return
    fetchedRef.current = true
    getSessionByCode(code)
      .then(setSession)
      .catch((err) => setLoadError(errorMessage(err)))
  }, [code])

  // Once joined: live session updates (stage / reveal) + fellow-player refreshes.
  const sessionId = session?.id
  const playerId = player?.id
  useEffect(() => {
    if (!sessionId || !playerId) return
    let active = true
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
  }, [sessionId, playerId])

  const stage = session?.stage ?? 0
  const finalValue = portfolioValue(cash, holdings, 5)

  // Record progress once the final results appear.
  useEffect(() => {
    if (stage !== 5 || savedRef.current || !player || players.length === 0) return
    savedRef.current = true
    const standings = [...players].sort(
      (a, b) => portfolioValue(b.cash, b.holdings, 5) - portfolioValue(a.cash, a.holdings, 5),
    )
    const idx = standings.findIndex((p) => p.id === player.id)
    const rank = idx >= 0 ? idx + 1 : standings.length
    const value = portfolioValue(cash, holdings, 5)
    const score = Math.max(0, Math.min(100, Math.round(50 + (value - STARTING_CASH))))
    void saveProgress(student, 'wolf-of-wall-street', {
      status: 'completed',
      score,
      data: { mode: 'live', finalValue: value, rank },
    })
  }, [stage, players, player, cash, holdings, student])

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
      const p = await joinSession(session.id, nick)
      localStorage.setItem(NICK_KEY, p.nickname)
      setPlayer(p)
      setCash(p.cash)
      setHoldings(p.holdings ?? {})
    } catch (err) {
      joinRef.current = false
      setJoinError(errorMessage(err))
    } finally {
      setJoining(false)
    }
  }

  function trade(ticker: string, delta: number) {
    if (!player) return
    const company = COMPANIES.find((c) => c.ticker === ticker)
    if (!company) return
    const price = priceAt(company, stage)
    const shares = holdings[ticker] ?? 0
    if (delta > 0 && cash < price) return
    if (delta < 0 && shares <= 0) return
    const nextCash = cash - delta * price
    const nextHoldings: Holdings = { ...holdings, [ticker]: shares + delta }
    setCash(nextCash)
    setHoldings(nextHoldings)
    updatePlayer(player.id, { cash: nextCash, holdings: nextHoldings }).catch((err) =>
      console.warn('Could not sync trade', err),
    )
  }

  if (!BACKEND_ENABLED) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <p className="text-4xl">🔌</p>
          <h1 className="font-display text-xl font-bold text-slate-900">
            Live games are not connected yet
          </h1>
          <p className="text-sm text-slate-600">
            Live games unlock when the class backend is connected — solo mode is ready now!
          </p>
          <Link to="/wolf" className="btn-primary">
            Back to Wolf of Wall Street
          </Link>
        </div>
      </Shell>
    )
  }

  if (loadError) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <p className="text-4xl">🤔</p>
          <h1 className="font-display text-xl font-bold text-slate-900">Hmm, that did not work</h1>
          <p className="text-sm text-slate-600">{loadError}</p>
          <Link to="/wolf" className="btn-primary">
            Back to Wolf of Wall Street
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

  if (!player) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-4">
          <div className="text-center">
            <p className="text-4xl">🐺</p>
            <h1 className="mt-2 font-display text-xl font-bold text-slate-900">
              You found the game!
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Pick a nickname so everyone knows who is trading.
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleJoin}>
            <input
              className="input text-center font-display text-lg"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your nickname"
              maxLength={24}
              autoFocus
              aria-label="Nickname"
            />
            {joinError && (
              <p className="text-center text-sm font-semibold text-red-600">{joinError}</p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={joining || !nickname.trim()}>
              {joining ? 'Joining…' : "Let's trade!"}
            </button>
          </form>
        </div>
      </Shell>
    )
  }

  const others = players.filter((p) => p.id !== player.id)
  const standings = [...players]
    .map((p) => ({ ...p, value: portfolioValue(p.cash, p.holdings, 5) }))
    .sort((a, b) => b.value - a.value)
  const myRank = standings.findIndex((p) => p.id === player.id) + 1

  return (
    <Shell code={session.code}>
      {stage === 0 && (
        <div className="card animate-pop-in mt-6 space-y-4 text-center">
          <p className="text-5xl">🎉</p>
          <h1 className="font-display text-2xl font-bold text-slate-900">
            You&apos;re in, {player.nickname}!
          </h1>
          <p className="text-slate-600">
            Watch the big screen — the market opens when your host rings the bell.
          </p>
          {others.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Trading alongside you
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {others.map((p) => (
                  <span key={p.id} className="chip bg-bff-50 text-bff-700">
                    {p.nickname}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {stage >= 1 && stage <= 3 && (
        <div className="space-y-4">
          <div>
            <h1 className="font-display text-xl font-bold text-slate-900">Wolf of Wall Street</h1>
            <p className="text-sm text-slate-500">{STAGE_TITLES[stage]}</p>
          </div>
          <TradingBoard stage={stage} cash={cash} holdings={holdings} onTrade={trade} />
        </div>
      )}

      {stage === 4 && (
        <div className="space-y-3">
          <div className="card border-bff-200 bg-bff-50 p-4 text-center text-sm text-slate-700">
            🔒 The market has closed! Eyes on the big screen as the results are revealed…
          </div>
          {COMPANIES.slice(0, session.reveal_index).map((c) => {
            const change = c.prices[3] - c.prices[0]
            const shares = holdings[c.ticker] ?? 0
            return (
              <div
                key={c.ticker}
                className="card animate-pop-in flex items-start justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-display font-bold text-slate-900">
                    {c.name} <span className="text-xs text-slate-400">{c.ticker}</span>
                    {shares > 0 && (
                      <span className="chip ml-2 bg-bff-50 text-bff-700">you own {shares}</span>
                    )}
                  </p>
                  <p className="text-sm text-slate-600">{c.summary}</p>
                </div>
                <p
                  className={`whitespace-nowrap font-display text-lg font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}
                >
                  ${c.prices[3]}{' '}
                  <span className="text-sm">({change >= 0 ? '+' : ''}{change})</span>
                </p>
              </div>
            )
          })}
        </div>
      )}

      {stage === 5 && (
        <div className="card animate-pop-in mt-6 space-y-5 text-center">
          <p className="text-5xl">{finalValue >= STARTING_CASH ? '🎊' : '📉'}</p>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              Final portfolio: {money(finalValue)}
            </h1>
            <p
              className={`mt-1 font-display text-lg font-bold ${finalValue >= STARTING_CASH ? 'text-green-600' : 'text-red-600'}`}
            >
              {finalValue >= STARTING_CASH ? '+' : '−'}
              {money(Math.abs(finalValue - STARTING_CASH))}{' '}
              {finalValue >= STARTING_CASH ? 'profit' : 'loss'} on your {money(STARTING_CASH)} start
            </p>
          </div>
          {myRank > 0 && (
            <p className="font-display text-lg font-bold text-bff-700">
              🎉 You finished #{myRank} of {standings.length} traders
            </p>
          )}
          {standings.length > 0 && (
            <div className="mx-auto max-w-sm text-left">
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                Top traders
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
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`} {p.nickname}
                    </span>
                    <span className="font-display font-bold">{money(p.value)}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <Link to="/activities" className="btn-primary">
            More activities
          </Link>
        </div>
      )}
    </Shell>
  )
}
