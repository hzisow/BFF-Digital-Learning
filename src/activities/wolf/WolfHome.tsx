import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COMPANIES, STARTING_CASH } from './data'
import { money } from './TradingBoard'
import { createSession } from './live'
import { useAdmin } from '../../lib/session'
import { BACKEND_ENABLED } from '../../lib/config'

const OFFLINE_NOTE =
  'Live games unlock when the class backend is connected — solo mode is ready now!'

export default function WolfHome() {
  const navigate = useNavigate()
  const { adminUser } = useAdmin()
  const [code, setCode] = useState('')
  const [hosting, setHosting] = useState(false)
  const [hostError, setHostError] = useState<string | null>(null)

  function joinGame(e: FormEvent) {
    e.preventDefault()
    const clean = code.trim().toUpperCase()
    if (clean.length !== 6) return
    navigate(`/play/${clean}`)
  }

  async function hostGame() {
    if (hosting) return
    setHosting(true)
    setHostError(null)
    try {
      const session = await createSession(null)
      navigate(`/host/${session.id}`)
    } catch (err) {
      setHostError(err instanceof Error ? err.message : 'Could not create a game. Try again!')
      setHosting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <section className="mb-10 text-center">
        <p className="text-6xl">🐺</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          Wolf of Wall Street
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          You have <strong className="text-slate-900">{money(STARTING_CASH)}</strong> to invest
          across 12 up-and-coming (and totally fictional) companies. Study the market, ride out two
          rounds of breaking news, and hold your nerve until the closing-bell reveal shows how every
          company really performed. Best portfolio wins!
        </p>
      </section>

      {/* Three ways to play */}
      <section className="mb-12 grid gap-4 md:grid-cols-3">
        {/* Solo */}
        <div className="card flex flex-col gap-3 text-center">
          <p className="text-4xl">🎯</p>
          <h2 className="font-display text-lg font-bold text-slate-900">Play solo</h2>
          <p className="flex-1 text-sm text-slate-600">
            Practice at your own pace — trade through every round and see how your instincts stack
            up.
          </p>
          <Link to="/wolf/solo" className="btn-primary w-full">
            Start a solo game
          </Link>
        </div>

        {/* Join */}
        <div className="card flex flex-col gap-3 text-center">
          <p className="text-4xl">📱</p>
          <h2 className="font-display text-lg font-bold text-slate-900">Join a live game</h2>
          <p className="flex-1 text-sm text-slate-600">
            Got a 6-character game code from your host? Jump in and trade against the whole room.
          </p>
          <form className="space-y-2" onSubmit={joinGame}>
            <input
              className="input text-center font-display text-lg uppercase tracking-widest"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              disabled={!BACKEND_ENABLED}
              aria-label="Game code"
            />
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={!BACKEND_ENABLED || code.trim().length !== 6}
            >
              Join the game
            </button>
          </form>
          {!BACKEND_ENABLED && <p className="text-xs text-slate-500">{OFFLINE_NOTE}</p>}
        </div>

        {/* Host */}
        <div className="card flex flex-col gap-3 text-center">
          <p className="text-4xl">🖥️</p>
          <h2 className="font-display text-lg font-bold text-slate-900">Host a live game</h2>
          {!BACKEND_ENABLED ? (
            <>
              <p className="flex-1 text-sm text-slate-600">
                Put the game on the big screen and run the market for your whole class.
              </p>
              <button className="btn-secondary w-full" disabled>
                Host a game
              </button>
              <p className="text-xs text-slate-500">{OFFLINE_NOTE}</p>
            </>
          ) : adminUser ? (
            <>
              <p className="flex-1 text-sm text-slate-600">
                Create a game, throw the join code on the projector, and run the market live.
              </p>
              <button className="btn-primary w-full" onClick={hostGame} disabled={hosting}>
                {hosting ? 'Setting up your game…' : 'Host a game'}
              </button>
              {hostError && <p className="text-xs font-semibold text-red-600">{hostError}</p>}
            </>
          ) : (
            <>
              <p className="flex-1 text-sm text-slate-600">
                BFF mentors host live games from the big screen. Sign in on the team page to get
                started.
              </p>
              <Link to="/team" className="btn-secondary w-full">
                Team sign in
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Companies */}
      <section>
        <h2 className="mb-1 font-display text-xl font-bold text-slate-900">Meet the market</h2>
        <p className="mb-4 text-sm text-slate-500">
          Twelve companies, twelve stories — which ones will you back?
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {COMPANIES.map((c) => (
            <div key={c.ticker} className="card p-4">
              <p className="font-display text-sm font-bold text-slate-900">{c.name}</p>
              <p className="text-xs font-semibold text-bff-600">{c.ticker}</p>
              <p className="mt-1 text-xs text-slate-500">{c.industry}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
