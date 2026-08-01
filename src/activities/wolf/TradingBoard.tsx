import {
  COMPANIES, MARKET_HINTS, MARKET_HINTS_ES, MARKET_HINTS_ZH, MARKET_HINT_ICONS,
  NEWS_ROUNDS, priceAt, portfolioValue, type Holdings,
} from './data'
import { useLang } from '../../lib/i18n'
import {
  ArrowDown, ArrowUp, BatteryCharging, Bike, Brain, Building2, Cookie, CupSoda, Dog,
  Gamepad2, HeartPulse, Leaf, Minus, MonitorPlay, Newspaper, PawPrint, Pill, Plane,
  Search, Shirt, Smartphone, Sprout, TrendingDown, TrendingUp, TriangleAlert,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Icons used by the market data (companies + market hints). `data.ts` stores a
 * plain icon NAME so the game data stays free of JSX — this record is the only
 * place those names are resolved to components.
 */
export const GAME_ICONS: Record<string, LucideIcon> = {
  BatteryCharging, Bike, Brain, Building2, Cookie, CupSoda, Dog, Gamepad2, HeartPulse,
  Leaf, MonitorPlay, PawPrint, Pill, Plane, Shirt, Smartphone, Sprout, TriangleAlert,
}

/** Renders a market icon by name, falling back to a generic company glyph. */
export function GameIcon({ name, className }: { name: string; className?: string }) {
  const Icon = GAME_ICONS[name] ?? Building2
  return <Icon className={className} aria-hidden="true" />
}

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
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const news = stage >= 2 ? NEWS_ROUNDS[stage - 2] : null
  const total = portfolioValue(cash, holdings, stage)

  return (
    <div className="space-y-4">
      {/* Sticky wallet bar */}
      <div
        aria-live="polite"
        className="sticky top-0 z-10 -mx-4 flex items-center justify-between gap-4 border-b border-ink/10 bg-white/95 px-4 py-3 backdrop-blur sm:rounded-xl sm:border sm:shadow-sm"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">{zh ? '现金' : es ? 'Efectivo' : 'Cash'}</p>
          <p className="font-display text-xl font-bold text-ink">{money(cash)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/60">{zh ? '投资组合价值' : es ? 'Valor de la cartera' : 'Portfolio value'}</p>
          <p className="font-display text-xl font-bold text-ink">{money(total)}</p>
        </div>
      </div>

      {news ? (
        <div className="card space-y-2 border-amber-200 bg-amber-50">
          <h2 className="flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-amber-700">
            <Newspaper className="h-4 w-4 shrink-0" aria-hidden="true" />
            {zh ? `突发新闻——第 ${stage - 1} 轮` : es ? `Última hora — ronda ${stage - 1}` : `Breaking news — round ${stage - 1}`}
          </h2>
          <ul className="space-y-1.5">
            {news.map((n) => (
              <li key={n.headline} className="flex items-start gap-1.5 text-sm text-ink/75">
                {n.direction === 'up' ? (
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-green-700" aria-hidden="true" />
                ) : (
                  <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
                )}
                <span>
                  <span className="sr-only">{n.direction === 'up' ? (zh ? '好消息：' : es ? 'Buenas noticias: ' : 'Good news: ') : (zh ? '坏消息：' : es ? 'Malas noticias: ' : 'Bad news: ')}</span>
                  {zh ? n.headlineZh : es ? n.headlineEs : n.headline}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="card space-y-2 border-bff-200 bg-paper-soft">
          <h2 className="flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-ink">
            <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            {zh ? '市场信息' : es ? 'Información del mercado' : 'Market information'}
          </h2>
          <ul className="grid gap-1.5 sm:grid-cols-2">
            {(zh ? MARKET_HINTS_ZH : es ? MARKET_HINTS_ES : MARKET_HINTS).map((h, i) => (
              <li key={h} className="flex items-start gap-1.5 text-sm text-ink/75">
                <GameIcon name={MARKET_HINT_ICONS[i]} className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
                <span>{h}</span>
              </li>
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
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-paper-soft text-ink">
                    <GameIcon name={c.icon} className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-display font-bold text-ink">
                      {c.name} <span className="text-xs font-semibold text-ink/70">{c.ticker}</span>
                    </p>
                    <p className="text-xs text-ink/70">{zh ? c.industryZh : es ? c.industryEs : c.industry} · {zh ? c.productZh : es ? c.productEs : c.product}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold text-ink">${price}</p>
                  {stage >= 2 && (
                    <p className={`flex items-center justify-end gap-0.5 text-xs font-bold ${change > 0 ? 'text-green-700' : change < 0 ? 'text-red-600' : 'text-ink/70'}`}>
                      {change > 0 ? (
                        <>
                          <ArrowUp className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span aria-hidden="true">+${change}</span>
                          <span className="sr-only">{zh ? `涨 $${change}` : es ? `sube $${change}` : `up $${change}`}</span>
                        </>
                      ) : change < 0 ? (
                        <>
                          <ArrowDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span aria-hidden="true">-${Math.abs(change)}</span>
                          <span className="sr-only">{zh ? `跌 $${Math.abs(change)}` : es ? `baja $${Math.abs(change)}` : `down $${Math.abs(change)}`}</span>
                        </>
                      ) : (
                        <>
                          <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span aria-hidden="true">{zh ? '持平' : es ? 'sin cambios' : 'flat'}</span>
                          <span className="sr-only">{zh ? '无变化' : es ? 'sin cambios' : 'no change'}</span>
                        </>
                      )}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm text-ink/70">
                  {zh ? '你持有' : es ? 'Tienes' : 'You own'} <strong className="text-ink">{shares}</strong>
                  {shares > 0 && <span className="text-ink/70"> (${(shares * price).toLocaleString()})</span>}
                </span>
                <div className="flex gap-1.5">
                  <button
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700 transition hover:bg-red-100 active:scale-[0.97] disabled:opacity-30"
                    disabled={!canSell}
                    onClick={() => onTrade(c.ticker, -1)}
                    aria-label={zh ? `卖出一股 ${c.name}` : es ? `Vender una acción de ${c.name}` : `Sell one share of ${c.name}`}
                  >
                    {zh ? '卖出' : es ? 'Vender' : 'Sell'}
                  </button>
                  <button
                    className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700 transition hover:bg-green-100 active:scale-[0.97] disabled:opacity-30"
                    disabled={!canBuy}
                    onClick={() => onTrade(c.ticker, 1)}
                    aria-label={zh ? `买入一股 ${c.name}` : es ? `Comprar una acción de ${c.name}` : `Buy one share of ${c.name}`}
                  >
                    {zh ? '买入' : es ? 'Comprar' : 'Buy'}
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
