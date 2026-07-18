import { COMPANIES, MARKET_HINTS, NEWS_ROUNDS, priceAt, portfolioValue, type Holdings } from './data'

export function money(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

interface TradingBoardProps {
  stage: number // 1..3 trading stages
  cash: number
  holdings: Holdings
  onTrade: (ticker: string, delta: number) => void
  locked?: boolean
}

/** Shared trading UI for solo mode and live player mode. */
export default function TradingBoard({ stage, cash, holdings, onTrade, locked }: TradingBoardProps) {
  const news = stage >= 2 ? NEWS_ROUNDS[stage - 2] : null
  const total = portfolioValue(cash, holdings, stage)

  return (
    <div className="space-y-4">
      {/* Sticky wallet bar */}
      <div className="sticky top-0 z-10 -mx-4 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:rounded-xl sm:border sm:shadow-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cash</p>
          <p className="font-display text-xl font-bold text-slate-900">{money(cash)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Portfolio value</p>
          <p className="font-display text-xl font-bold text-bff-700">{money(total)}</p>
        </div>
      </div>

      {news ? (
        <div className="card space-y-2 border-amber-200 bg-amber-50">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-amber-700">
            📰 Breaking news — round {stage - 1}
          </h3>
          <ul className="space-y-1.5">
            {news.map((n) => (
              <li key={n.headline} className="text-sm text-slate-700">
                {n.direction === 'up' ? '📈' : '📉'} {n.headline}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="card space-y-2 border-bff-200 bg-bff-50">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-bff-700">
            🔍 Market information
          </h3>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {MARKET_HINTS.map((h) => (
              <li key={h} className="text-sm text-slate-700">{h}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {COMPANIES.map((c) => {
          const price = priceAt(c, stage)
          const prevPrice = stage >= 2 ? priceAt(c, stage - 1) : price
          const change = price - prevPrice
          const shares = holdings[c.ticker] ?? 0
          const canBuy = !locked && cash >= price
          const canSell = !locked && shares > 0
          return (
            <div
              key={c.ticker}
              className={`card flex flex-col gap-2 p-4 ${
                change > 0 ? 'animate-flash-up' : change < 0 ? 'animate-flash-down' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-display font-bold text-slate-900">
                    {c.name} <span className="text-xs font-semibold text-slate-400">{c.ticker}</span>
                  </p>
                  <p className="text-xs text-slate-500">{c.industry} · {c.product}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold text-slate-900">${price}</p>
                  {stage >= 2 && (
                    <p className={`text-xs font-bold ${change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : 'text-slate-400'}`}>
                      {change > 0 ? `▲ +$${change}` : change < 0 ? `▼ -$${Math.abs(change)}` : '· flat'}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-slate-600">
                  You own <strong className="text-slate-900">{shares}</strong>
                  {shares > 0 && <span className="text-slate-400"> (${(shares * price).toLocaleString()})</span>}
                </span>
                <div className="flex gap-1.5">
                  <button
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-30"
                    disabled={!canSell}
                    onClick={() => onTrade(c.ticker, -1)}
                  >
                    Sell
                  </button>
                  <button
                    className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700 transition hover:bg-green-100 disabled:opacity-30"
                    disabled={!canBuy}
                    onClick={() => onTrade(c.ticker, 1)}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
