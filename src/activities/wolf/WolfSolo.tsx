import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { COMPANIES, STARTING_CASH, portfolioValue, priceAt, type Holdings } from './data'
import TradingBoard, { money } from './TradingBoard'
import { saveProgress } from '../../lib/progress'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'

const STAGE_TITLES: Record<number, { emoji: string; title: string; titleEs: string; titleZh: string }> = {
  1: { emoji: '🔔', title: 'Opening Bell — pick your stocks', titleEs: 'Campana de apertura — elige tus acciones', titleZh: '开盘钟声——挑选你的股票' },
  2: { emoji: '📰', title: 'Breaking News — round 1', titleEs: 'Última hora — ronda 1', titleZh: '突发新闻——第 1 轮' },
  3: { emoji: '📰', title: 'Breaking News — round 2', titleEs: 'Última hora — ronda 2', titleZh: '突发新闻——第 2 轮' },
  4: { emoji: '🔒', title: 'Closing Bell — the results are in', titleEs: 'Campana de cierre — ya están los resultados', titleZh: '收盘钟声——结果揭晓' },
}

export default function WolfSolo() {
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
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
          <h1 className="font-display text-2xl font-bold text-ink">
            <span aria-hidden="true">🐺</span> Wolf of Wall <em>Street</em>
          </h1>
          <p className="text-sm text-ink/60">
            <span aria-hidden="true">{STAGE_TITLES[Math.min(stage, 4)].emoji}</span>{' '}
            {zh ? STAGE_TITLES[Math.min(stage, 4)].titleZh : es ? STAGE_TITLES[Math.min(stage, 4)].titleEs : STAGE_TITLES[Math.min(stage, 4)].title}
          </p>
        </div>
        {stage <= 3 && (
          <button className="btn-primary" onClick={advance}>
            {stage === 1
              ? zh
                ? '我投好了——敲响钟声'
                : es
                  ? 'Ya invertí — toca la campana'
                  : "I'm invested — ring the bell"
              : stage === 2
                ? zh
                  ? '下一轮新闻'
                  : es
                    ? 'Siguiente ronda de noticias'
                    : 'Next news round'
                : zh
                  ? '关闭市场'
                  : es
                    ? 'Cerrar el mercado'
                    : 'Close the market'}
          </button>
        )}
      </div>

      {stage === 1 && (
        <p className="card mb-4 border-bff-200 bg-bff-50 text-sm text-ink/75">
          {zh ? (
            <>
              你有 <strong>{money(STARTING_CASH)}</strong> 可以投资在 12 家公司上。研究下面的市场信息，
              搭建你的投资组合，然后敲响钟声。每轮新闻之后你都可以再买入和卖出。
            </>
          ) : es ? (
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
          <p className="text-sm text-ink/70">
            {zh
              ? '市场已经收盘。点一下，揭晓每家公司的表现……'
              : es
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
                    <p className="font-display font-bold text-ink">
                      {c.name} <span className="text-xs text-ink/60">{c.ticker}</span>
                      {shares > 0 && (
                        <span className="chip ml-2 bg-bff-50 text-bff-700">{zh ? `你持有 ${shares}` : es ? `tienes ${shares}` : `you own ${shares}`}</span>
                      )}
                    </p>
                    <p className="text-sm text-ink/70">{zh ? c.summaryZh : es ? c.summaryEs : c.summary}</p>
                  </div>
                  <p className={`whitespace-nowrap font-display text-lg font-bold ${change >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                    ${c.prices[3]}{' '}
                    <span className="text-sm">
                      <span aria-hidden="true">({change >= 0 ? '+' : ''}{change})</span>
                      <span className="sr-only">
                        {zh
                          ? change >= 0
                            ? `比开盘涨了 $${change}`
                            : `比开盘跌了 $${Math.abs(change)}`
                          : es
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
              ? zh
                ? `揭晓 ${COMPANIES[revealIndex].name} →`
                : es
                  ? `Revelar ${COMPANIES[revealIndex].name} →`
                  : `Reveal ${COMPANIES[revealIndex].name} →`
              : revealIndex === COMPANIES.length - 1
                ? zh
                  ? `揭晓 ${COMPANIES[revealIndex].name} 并查看你的总额 →`
                  : es
                    ? `Revelar ${COMPANIES[revealIndex].name} y ver tu total →`
                    : `Reveal ${COMPANIES[revealIndex].name} and see your total →`
                : zh
                  ? '查看你的结果 →'
                  : es
                    ? 'Ver tus resultados →'
                    : 'See your results →'}
          </button>
        </div>
      )}

      {stage === 5 && (
        <div className="card animate-pop-in space-y-4 text-center" role="status">
          <p className="text-5xl" aria-hidden="true">{finalValue >= STARTING_CASH ? '🎉' : '📉'}</p>
          <h2 className="font-display text-2xl font-bold text-ink">
            {zh ? '最终投资组合：' : es ? 'Cartera final:' : 'Final portfolio:'} {money(finalValue)}
          </h2>
          <p className={`font-display text-lg font-bold ${finalValue >= STARTING_CASH ? 'text-green-700' : 'text-red-600'}`}>
            {finalValue >= STARTING_CASH ? '+' : '−'}{money(Math.abs(finalValue - STARTING_CASH))}{' '}
            {zh
              ? `${finalValue >= STARTING_CASH ? '盈利' : '亏损'}，相对于你起步的 ${money(STARTING_CASH)}`
              : es
                ? `de ${finalValue >= STARTING_CASH ? 'ganancia' : 'pérdida'} sobre tu inicio de ${money(STARTING_CASH)}`
                : `${finalValue >= STARTING_CASH ? 'profit' : 'loss'} on your ${money(STARTING_CASH)} start`}
          </p>
          <p className="mx-auto max-w-md text-sm text-ink/70">
            {zh
              ? '真正的投资者也面对同样的挑战：热度会消退（抱歉了，Snacksy），稳健的趋势才能笑到最后，而分散投资能在某家公司某个月表现不佳时保护你。换个新策略再玩一次吧！'
              : es
                ? 'Los inversionistas reales enfrentan el mismo reto: la moda pasa (lo sentimos, Snacksy), las tendencias estables ganan y diversificar te protege cuando a una empresa le va mal un mes. ¡Juega otra vez con una nueva estrategia!'
                : 'Real investors face the same challenge: hype fades (sorry, Snacksy), steady trends win, and diversifying protects you when one company has a bad month. Play again with a new strategy!'}
          </p>
          <div className="flex justify-center gap-3">
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              {zh ? '再玩一次' : es ? 'Jugar otra vez' : 'Play again'}
            </button>
            <Link to="/activities" className="btn-primary">
              {zh ? '更多活动' : es ? 'Más actividades' : 'More activities'}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
