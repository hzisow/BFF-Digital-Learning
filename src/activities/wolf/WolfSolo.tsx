import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANIES, STARTING_CASH, portfolioValue, priceAt, type Holdings } from './data'
import TradingBoard, { money } from './TradingBoard'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'

const STAGE_TITLES: Record<number, { emoji: string; title: string; titleEs: string }> = {
  1: { emoji: '🔔', title: 'Opening Bell — pick your stocks', titleEs: 'Campana de apertura — elige tus acciones' },
  2: { emoji: '📰', title: 'Breaking News — round 1', titleEs: 'Última hora — ronda 1' },
  3: { emoji: '📰', title: 'Breaking News — round 2', titleEs: 'Última hora — ronda 2' },
  4: { emoji: '🔒', title: 'Closing Bell — the results are in', titleEs: 'Campana de cierre — ya están los resultados' },
}

export default function WolfSolo() {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
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
          <h1 className="font-display text-2xl font-bold text-slate-900">
            <span aria-hidden="true">🐺</span> Wolf of Wall Street
          </h1>
          <p className="text-sm text-slate-500">
            <span aria-hidden="true">{STAGE_TITLES[Math.min(stage, 4)].emoji}</span>{' '}
            {es ? STAGE_TITLES[Math.min(stage, 4)].titleEs : STAGE_TITLES[Math.min(stage, 4)].title}
          </p>
        </div>
        {stage <= 3 && (
          <button className="btn-primary" onClick={advance}>
            {stage === 1
              ? es
                ? 'Ya invertí — toca la campana'
                : "I'm invested — ring the bell"
              : stage === 2
                ? es
                  ? 'Siguiente ronda de noticias'
                  : 'Next news round'
                : es
                  ? 'Cerrar el mercado'
                  : 'Close the market'}
          </button>
        )}
      </div>

      {stage === 1 && (
        <p className="card mb-4 border-bff-200 bg-bff-50 text-sm text-slate-700">
          {es ? (
            <>
              Tienes <strong>{money(STARTING_CASH)}</strong> para invertir en 12 empresas. Estudia la
              información del mercado de abajo, arma tu cartera y luego toca la campana. Puedes comprar y
              vender de nuevo después de cada ronda de noticias.
            </>
          ) : (
            <>
              You have <strong>{money(STARTING_CASH)}</strong> to invest across 12 companies. Study the
              market information below, build your portfolio, then ring the bell. You can buy and sell
              again after each news round.
            </>
          )}
        </p>
      )}

      {stage <= 3 && (
        <TradingBoard stage={stage} cash={cash} holdings={holdings} onTrade={trade} />
      )}

      {stage === 4 && (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">
            {es
              ? 'El mercado ha cerrado. Toca para revelar cómo le fue a cada empresa…'
              : 'The market has closed. Tap to reveal how each company performed…'}
          </p>
          <div className="space-y-3" aria-live="polite">
            {COMPANIES.slice(0, revealIndex).map((c) => {
              const change = c.prices[3] - c.prices[0]
              const shares = holdings[c.ticker] ?? 0
              return (
                <div key={c.ticker} className="card animate-pop-in flex items-start justify-between gap-3 p-4">
                  <div>
                    <p className="font-display font-bold text-slate-900">
                      {c.name} <span className="text-xs text-slate-500">{c.ticker}</span>
                      {shares > 0 && (
                        <span className="chip ml-2 bg-bff-50 text-bff-700">{es ? `tienes ${shares}` : `you own ${shares}`}</span>
                      )}
                    </p>
                    <p className="text-sm text-slate-600">{es ? c.summaryEs : c.summary}</p>
                  </div>
                  <p className={`whitespace-nowrap font-display text-lg font-bold ${change >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    ${c.prices[3]}{' '}
                    <span className="text-sm">
                      <span aria-hidden="true">({change >= 0 ? '+' : ''}{change})</span>
                      <span className="sr-only">
                        {es
                          ? change >= 0
                            ? `sube $${change} desde la apertura`
                            : `baja $${Math.abs(change)} desde la apertura`
                          : `${change >= 0 ? `up $${change}` : `down $${Math.abs(change)}`} from the open`}
                      </span>
                    </span>
                  </p>
                </div>
              )
            })}
          </div>
          <button className="btn-primary w-full" onClick={revealNext}>
            {revealIndex < COMPANIES.length - 1
              ? es
                ? `Revelar ${COMPANIES[revealIndex].name} →`
                : `Reveal ${COMPANIES[revealIndex].name} →`
              : revealIndex === COMPANIES.length - 1
                ? es
                  ? `Revelar ${COMPANIES[revealIndex].name} y ver tu total →`
                  : `Reveal ${COMPANIES[revealIndex].name} and see your total →`
                : es
                  ? 'Ver tus resultados →'
                  : 'See your results →'}
          </button>
        </div>
      )}

      {stage === 5 && (
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{finalValue >= STARTING_CASH ? '🎉' : '📉'}</p>
          <h2 className="font-display text-2xl font-bold text-slate-900">
            {es ? 'Cartera final:' : 'Final portfolio:'} {money(finalValue)}
          </h2>
          <p className={`font-display text-lg font-bold ${finalValue >= STARTING_CASH ? 'text-green-700' : 'text-red-600'}`}>
            {finalValue >= STARTING_CASH ? '+' : '−'}{money(Math.abs(finalValue - STARTING_CASH))}{' '}
            {es
              ? `de ${finalValue >= STARTING_CASH ? 'ganancia' : 'pérdida'} sobre tu inicio de ${money(STARTING_CASH)}`
              : `${finalValue >= STARTING_CASH ? 'profit' : 'loss'} on your ${money(STARTING_CASH)} start`}
          </p>
          <p className="mx-auto max-w-md text-sm text-slate-600">
            {es
              ? 'Los inversionistas reales enfrentan el mismo reto: la moda pasa (lo sentimos, Snacksy), las tendencias estables ganan y diversificar te protege cuando a una empresa le va mal un mes. ¡Juega otra vez con una nueva estrategia!'
              : 'Real investors face the same challenge: hype fades (sorry, Snacksy), steady trends win, and diversifying protects you when one company has a bad month. Play again with a new strategy!'}
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              {es ? 'Jugar otra vez' : 'Play again'}
            </button>
            <Link to="/activities" className="btn-primary">
              {es ? 'Más actividades' : 'More activities'}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
