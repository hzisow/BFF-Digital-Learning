import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANIES, STARTING_CASH, portfolioValue, priceAt, type Holdings } from './data'
import TradingBoard, { money } from './TradingBoard'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'

const STAGE_TITLES: Record<number, string> = {
  1: '🔔 Opening Bell — pick your stocks',
  2: '📰 Breaking News — round 1',
  3: '📰 Breaking News — round 2',
  4: '🔒 Closing Bell — the results are in',
}

export default function WolfSolo() {
  const { student } = useStudent()
  const [stage, setStage] = useState(1)
  const [cash, setCash] = useState(STARTING_CASH)
  const [holdings, setHoldings] = useState<Holdings>({})
  const [revealIndex, setRevealIndex] = useState(0)

  const finalValue = useMemo(() => portfolioValue(cash, holdings, 5), [cash, holdings])

  function trade(ticker: string, delta: number) {
    const company = COMPANIES.find((c) => c.ticker === ticker)!
    const price = priceAt(company, stage)
    const shares = holdings[ticker] ?? 0
    if (delta > 0 && cash < price) return
    if (delta < 0 && shares <= 0) return
    setCash((c) => c - delta * price)
    setHoldings((h) => ({ ...h, [ticker]: shares + delta }))
  }

  function advance() {
    if (stage < 4) {
      setStage(stage + 1)
    }
  }

  function revealNext() {
    const next = revealIndex + 1
    setRevealIndex(next)
    if (next >= COMPANIES.length) {
      setStage(5)
      const gain = finalValue - STARTING_CASH
      const score = Math.max(0, Math.min(100, Math.round(50 + gain)))
      void saveProgress(student, 'wolf-of-wall-street', {
        status: 'completed',
        score,
        data: { mode: 'solo', finalValue, gain },
      })
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">🐺 Wolf of Wall Street</h1>
          <p className="text-sm text-slate-500">{STAGE_TITLES[Math.min(stage, 4)]}</p>
        </div>
        {stage <= 3 && (
          <button className="btn-primary" onClick={advance}>
            {stage === 1 ? "I'm invested — ring the bell" : stage === 2 ? 'Next news round' : 'Close the market'}
          </button>
        )}
      </div>

      {stage === 1 && (
        <p className="card mb-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          You have <strong>{money(STARTING_CASH)}</strong> to invest across 12 companies. Study the
          market information below, build your portfolio, then ring the bell. You can buy and sell
          again after each news round.
        </p>
      )}

      {stage <= 3 && (
        <TradingBoard stage={stage} cash={cash} holdings={holdings} onTrade={trade} />
      )}

      {stage === 4 && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            The market has closed. Tap to reveal how each company performed…
          </p>
          {COMPANIES.slice(0, revealIndex).map((c) => {
            const change = c.prices[3] - c.prices[0]
            const shares = holdings[c.ticker] ?? 0
            return (
              <div key={c.ticker} className="card animate-pop-in flex items-start justify-between gap-3 p-4">
                <div>
                  <p className="font-display font-bold text-slate-900">
                    {c.name} <span className="text-xs text-slate-400">{c.ticker}</span>
                    {shares > 0 && (
                      <span className="chip ml-2 bg-bff-50 text-bff-700">you own {shares}</span>
                    )}
                  </p>
                  <p className="text-sm text-slate-600">{c.summary}</p>
                </div>
                <p className={`whitespace-nowrap font-display text-lg font-bold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${c.prices[3]}{' '}
                  <span className="text-sm">({change >= 0 ? '+' : ''}{change})</span>
                </p>
              </div>
            )
          })}
          <button className="btn-primary w-full" onClick={revealNext}>
            {revealIndex < COMPANIES.length - 1
              ? `Reveal ${COMPANIES[revealIndex].name} →`
              : revealIndex === COMPANIES.length - 1
                ? `Reveal ${COMPANIES[revealIndex].name} and see your total →`
                : 'See your results →'}
          </button>
        </div>
      )}

      {stage === 5 && (
        <div className="card animate-pop-in space-y-4 text-center">
          <p className="text-5xl">{finalValue >= STARTING_CASH ? '🎉' : '📉'}</p>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Final portfolio: {money(finalValue)}
          </h2>
          <p className={`font-display text-lg font-bold ${finalValue >= STARTING_CASH ? 'text-green-600' : 'text-red-600'}`}>
            {finalValue >= STARTING_CASH ? '+' : '−'}{money(Math.abs(finalValue - STARTING_CASH))}{' '}
            {finalValue >= STARTING_CASH ? 'profit' : 'loss'} on your {money(STARTING_CASH)} start
          </p>
          <p className="mx-auto max-w-md text-sm text-slate-600">
            Real investors face the same challenge: hype fades (sorry, Snacksy), steady trends win,
            and diversifying protects you when one company has a bad month. Play again with a new
            strategy!
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              Play again
            </button>
            <Link to="/activities" className="btn-primary">
              More activities
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
