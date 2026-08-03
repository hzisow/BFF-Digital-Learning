import { useEffect, useState, type ReactNode } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  COMPANIES, MARKET_HINTS, MARKET_HINTS_ES, MARKET_HINTS_ZH, MARKET_HINT_ICONS,
  NEWS_ROUNDS, portfolioValue, priceAt,
} from './data'
import { money, GameIcon } from './TradingBoard'
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
import { useLang } from '../../lib/i18n'
import {
  ArrowDown, ArrowRight, ArrowUp, Award, Bell, ChartCandlestick, Crown, HelpCircle, LineChart,
  Lock, Medal, Minus, Monitor, Newspaper, RotateCcw, Search, TrendingDown, TrendingUp, Trophy,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const STAGE_TITLES: Record<number, { Icon: LucideIcon; title: string; titleEs: string; titleZh: string }> = {
  1: { Icon: Bell, title: 'Opening Bell', titleEs: 'Campana de apertura', titleZh: '开盘钟声' },
  2: { Icon: Newspaper, title: 'Breaking News 1', titleEs: 'Última hora 1', titleZh: '突发新闻 1' },
  3: { Icon: Newspaper, title: 'Breaking News 2', titleEs: 'Última hora 2', titleZh: '突发新闻 2' },
}

const ADVANCE_LABELS: Record<number, { label: string; labelEs: string; labelZh: string; Icon?: LucideIcon }> = {
  1: { label: 'Breaking news round 1', labelEs: 'Ronda de noticias 1', labelZh: '第 1 轮突发新闻', Icon: ArrowRight },
  2: { label: 'Breaking news round 2', labelEs: 'Ronda de noticias 2', labelZh: '第 2 轮突发新闻', Icon: ArrowRight },
  3: { label: 'Ring the closing bell', labelEs: 'Toca la campana de cierre', labelZh: '敲响收盘钟声', Icon: Bell },
}

/** Podium icons for 1st / 2nd / 3rd place. */
const PODIUM_ICONS: LucideIcon[] = [Crown, Medal, Award]

const BIG_BUTTON =
  'rounded-2xl bg-white px-8 py-4 font-display text-2xl font-bold text-bff-900 shadow-lg transition hover:bg-bff-50 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50'

function HostShell({ code, children }: { code?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-white">
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
    <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-ink/95 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-end gap-4">{children}</div>
    </div>
  )
}

export default function WolfHost() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()
  const { adminUser, adminReady } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

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
        if (active)
          setError(
            err instanceof Error
              ? err.message
              : zh
                ? '无法加载游戏。'
                : es
                  ? 'No se pudo cargar el juego.'
                  : 'Could not load the game.',
          )
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
  }, [sessionId, adminId, es, zh])

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
      setError(
        err instanceof Error
          ? err.message
          : zh
            ? '无法创建新游戏。'
            : es
              ? 'No se pudo crear un juego nuevo.'
              : 'Could not create a new game.',
      )
    } finally {
      setCreating(false)
    }
  }

  if (!BACKEND_ENABLED || (adminReady && !adminUser)) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
            <Monitor className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="font-display text-xl font-bold text-ink">{zh ? '主持人屏幕' : es ? 'Pantalla del anfitrión' : 'Host screen'}</h1>
          <p className="text-sm text-ink/70">
            {!BACKEND_ENABLED
              ? zh
                ? '当班级后端接通后，实时对战就会解锁，单人模式现在就能玩！'
                : es
                  ? 'Los juegos en vivo se activan cuando el backend de la clase está conectado, ¡el modo individual ya está listo!'
                  : 'Live games unlock when the class backend is connected. Solo mode is ready now!'
              : zh
                ? '主持实时对战需要 BFF 导师登录后进行。前往团队页面登录吧。'
                : es
                  ? 'Organizar juegos en vivo es para mentores de BFF con sesión iniciada. Ve a la página del equipo para iniciar sesión.'
                  : 'Hosting live games is for signed-in BFF mentors. Head over to the team page to sign in.'}
          </p>
          <Link to="/team" className="btn-primary">
            {zh ? '前往团队页面' : es ? 'Ir a la página del equipo' : 'Go to the team page'}
          </Link>
        </div>
      </HostShell>
    )
  }

  if (error && !session) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
            <HelpCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="font-display text-xl font-bold text-ink">{zh ? '无法加载游戏' : es ? 'No se pudo cargar el juego' : 'Could not load the game'}</h1>
          <p className="text-sm text-ink/70">{error}</p>
          <Link to="/wolf" className="btn-primary">
            {zh ? '返回 Wolf of Wall Street' : es ? 'Volver a Wolf of Wall Street' : 'Back to Wolf of Wall Street'}
          </Link>
        </div>
      </HostShell>
    )
  }

  if (!adminReady || !session) {
    return (
      <HostShell>
        <p className="mt-32 text-center font-display text-2xl font-semibold text-bff-200">
          {zh ? '正在预热交易大厅…' : es ? 'Preparando el piso de negociación…' : 'Warming up the trading floor…'}
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
          <p className="eyebrow justify-center text-bff-300">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '实时市场游戏' : es ? 'JUEGO DE MERCADO EN VIVO' : 'LIVE MARKET GAME'}
          </p>
          <h1 className="flex items-center justify-center gap-3 font-display text-4xl font-bold sm:text-5xl">
            <LineChart className="h-9 w-9 shrink-0 text-bff-300 sm:h-11 sm:w-11" aria-hidden="true" />
            Wolf of Wall Street
          </h1>
          <p className="text-xl text-bff-200">{zh ? '拿起一台设备，用游戏代码加入' : es ? 'Toma un dispositivo y únete con el código del juego' : 'Grab a device and join with the game code'}</p>
          <p className="font-display text-7xl font-bold tracking-widest sm:text-8xl md:text-9xl">
            {session.code}
          </p>
          <p className="max-w-full overflow-x-auto rounded-xl bg-white/10 px-5 py-2.5 font-mono text-lg text-bff-100">
            {joinUrl}
          </p>
          <div className="w-full">
            <p className="mb-3 font-display text-2xl font-bold text-bff-100">
              {players.length}{' '}
              {zh
                ? '位投资者在场'
                : es
                  ? players.length === 1
                    ? 'inversionista en el piso'
                    : 'inversionistas en el piso'
                  : players.length === 1
                    ? 'trader on the floor'
                    : 'traders on the floor'}
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
                <span className="text-lg text-bff-300">{zh ? '正在等待第一位投资者加入…' : es ? 'Esperando a que se una el primer inversionista…' : 'Waiting for the first trader to join…'}</span>
              )}
            </div>
          </div>
          <button className={BIG_BUTTON} onClick={() => setStage(1)}>
            {zh ? '开始游戏' : es ? 'Comenzar el juego' : 'Start the game'} <Bell className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Stages 1-3 — presenter view */}
      {stage >= 1 && stage <= 3 && (
        <div className="space-y-6 pt-2">
          <h1 className="flex items-center gap-3 font-display text-4xl font-bold sm:text-5xl">
            {(() => {
              const StageIcon = STAGE_TITLES[stage].Icon
              return <StageIcon className="h-9 w-9 shrink-0 text-bff-300 sm:h-11 sm:w-11" aria-hidden="true" />
            })()}
            {zh ? STAGE_TITLES[stage].titleZh : es ? STAGE_TITLES[stage].titleEs : STAGE_TITLES[stage].title}
          </h1>
          <div className="grid gap-6 lg:grid-cols-[1fr_minmax(300px,360px)]">
            <div className="space-y-6">
              <div className="rounded-2xl bg-white/10 p-6">
                <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
                  {stage === 1 ? (
                    <>
                      <Search className="inline h-5 w-5 align-[-0.15em]" aria-hidden="true" /> {zh ? '市场信息' : es ? 'Información del mercado' : 'Market information'}
                    </>
                  ) : (
                    <>
                      <Newspaper className="inline h-5 w-5 align-[-0.15em]" aria-hidden="true" /> {zh ? '突发新闻' : es ? 'Última hora' : 'Breaking news'}
                    </>
                  )}
                </h2>
                <ul className="space-y-3">
                  {stage === 1
                    ? (zh ? MARKET_HINTS_ZH : es ? MARKET_HINTS_ES : MARKET_HINTS).map((h, i) => (
                        <li key={h} className="flex items-start gap-3 text-2xl font-semibold leading-snug">
                          <GameIcon name={MARKET_HINT_ICONS[i]} className="mt-1 h-7 w-7 shrink-0 text-bff-300" />
                          <span>{h}</span>
                        </li>
                      ))
                    : NEWS_ROUNDS[stage - 2].map((n) => (
                        <li key={n.headline} className="flex items-start gap-3 text-2xl font-semibold leading-snug">
                          {n.direction === 'up' ? (
                            <TrendingUp className="mt-1 h-7 w-7 shrink-0 text-green-400" aria-hidden="true" />
                          ) : (
                            <TrendingDown className="mt-1 h-7 w-7 shrink-0 text-red-400" aria-hidden="true" />
                          )}
                          <span>
                            <span className="sr-only">
                              {n.direction === 'up' ? (zh ? '好消息：' : es ? 'Buenas noticias: ' : 'Good news: ') : (zh ? '坏消息：' : es ? 'Malas noticias: ' : 'Bad news: ')}
                            </span>
                            {zh ? n.headlineZh : es ? n.headlineEs : n.headline}
                          </span>
                        </li>
                      ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/10 p-6">
                <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
                  <ChartCandlestick className="inline h-5 w-5 align-[-0.15em]" aria-hidden="true" /> {zh ? '价格' : es ? 'Precios' : 'Prices'}
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
                              <span aria-hidden="true" className="inline-flex items-center gap-0.5">
                                {change > 0 ? (
                                  <>
                                    <ArrowUp className="h-4 w-4 shrink-0" />+{change}
                                  </>
                                ) : change < 0 ? (
                                  <>
                                    <ArrowDown className="h-4 w-4 shrink-0" />
                                    {change}
                                  </>
                                ) : (
                                  <Minus className="h-4 w-4 shrink-0" />
                                )}
                              </span>
                              <span className="sr-only">
                                {zh
                                  ? change > 0
                                    ? `涨 ${change}`
                                    : change < 0
                                      ? `跌 ${Math.abs(change)}`
                                      : '无变化'
                                  : es
                                    ? change > 0
                                      ? `sube ${change}`
                                      : change < 0
                                        ? `baja ${Math.abs(change)}`
                                        : 'sin cambios'
                                    : change > 0
                                      ? `up ${change}`
                                      : change < 0
                                        ? `down ${Math.abs(change)}`
                                        : 'no change'}
                              </span>
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
                <Trophy className="inline h-5 w-5 align-[-0.15em]" aria-hidden="true" /> {zh ? '排行榜' : es ? 'Tabla de posiciones' : 'Leaderboard'}
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
                {standings.length === 0 && <li className="text-lg text-bff-300">{zh ? '还没有投资者…' : es ? 'Aún no hay inversionistas…' : 'No traders yet…'}</li>}
              </ol>
            </div>
          </div>
          <ControlBar>
            <p className="mr-auto hidden text-bff-300 sm:block">
              {zh
                ? '每个人都在自己的设备上交易：等大家准备好了再推进。'
                : es
                  ? 'Cada quien negocia en su propio dispositivo, avanza cuando la sala esté lista.'
                  : 'Everyone trades on their own device. Advance when the room is ready.'}
            </p>
            <button className={BIG_BUTTON} onClick={() => setStage(stage + 1)}>
              {zh ? ADVANCE_LABELS[stage].labelZh : es ? ADVANCE_LABELS[stage].labelEs : ADVANCE_LABELS[stage].label}
              {(() => {
                const AdvanceIcon = ADVANCE_LABELS[stage].Icon
                return AdvanceIcon ? (
                  <>
                    {' '}
                    <AdvanceIcon className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
                  </>
                ) : null
              })()}
            </button>
          </ControlBar>
        </div>
      )}

      {/* Stage 4 — closing-bell reveal */}
      {stage === 4 && (
        <div className="space-y-6 pt-2">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            <Lock className="inline h-9 w-9 align-[-0.12em] text-bff-300 sm:h-10 sm:w-10" aria-hidden="true" /> {zh ? '收盘钟声，结果揭晓' : es ? 'Campana de cierre, ya están los resultados' : 'Closing Bell, the results are in'}
          </h1>
          {session.reveal_index === 0 && (
            <p className="text-2xl text-bff-200">
              {zh
                ? '营造悬念……一家一家地揭晓这些公司吧！'
                : es
                  ? 'Crea el suspenso… ¡revela las empresas una por una!'
                  : 'Build the suspense… reveal the companies one at a time!'}
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
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-bff-100">
                      <GameIcon name={c.icon} className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="font-display text-2xl font-bold">
                        {c.name}{' '}
                        <span className="text-lg font-semibold text-bff-300">{c.ticker}</span>
                      </p>
                      <p className="mt-1 text-lg text-bff-100">{zh ? c.summaryZh : es ? c.summaryEs : c.summary}</p>
                    </div>
                  </div>
                  <p
                    className={`whitespace-nowrap font-display text-3xl font-bold ${
                      change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    ${c.prices[3]}{' '}
                    <span className="text-xl">
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
          <ControlBar>
            {session.reveal_index < COMPANIES.length ? (
              <button className={BIG_BUTTON} onClick={revealNext}>
                {zh ? '揭晓下一家公司' : es ? 'Revelar la siguiente empresa' : 'Reveal next company'}{' '}
                <ArrowRight className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
              </button>
            ) : (
              <button className={BIG_BUTTON} onClick={() => setStage(5)}>
                {zh ? '显示最终排行榜' : es ? 'Mostrar la tabla final' : 'Show final leaderboard'} <Trophy className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
              </button>
            )}
          </ControlBar>
        </div>
      )}

      {/* Stage 5 — podium */}
      {stage === 5 && (
        <div className="flex flex-col items-center gap-10 pt-6 text-center">
          <h1 className="font-display text-5xl font-bold sm:text-6xl">
            <Trophy className="inline h-10 w-10 align-[-0.12em]" aria-hidden="true" /> {zh ? '最终排行榜' : es ? 'Tabla de posiciones final' : 'Final Leaderboard'}
          </h1>
          <div className="grid w-full max-w-4xl gap-4 sm:grid-cols-3">
            {standings.slice(0, 3).map((p, i) => (
              <div
                key={p.id}
                className={`animate-pop-in rounded-2xl p-8 ${
                  i === 0
                    ? 'bg-white/20 ring-2 ring-gold-400 sm:order-2'
                    : i === 1
                      ? 'bg-white/10 sm:order-1'
                      : 'bg-white/10 sm:order-3'
                }`}
              >
                {(() => {
                  const PlaceIcon = PODIUM_ICONS[i] ?? Medal
                  return (
                    <PlaceIcon
                      className={`mx-auto h-14 w-14 ${i === 0 ? 'text-gold-400' : 'text-bff-100'}`}
                      aria-hidden="true"
                    />
                  )
                })()}
                <p className="mt-3 break-words font-display text-3xl font-bold">
                  <span className="sr-only">{zh ? `第 ${i + 1} 名：` : es ? `puesto ${i + 1}: ` : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place: `}</span>
                  {p.nickname}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-bff-100">
                  {money(p.value)}
                </p>
              </div>
            ))}
          </div>
          {standings.length === 0 && (
            <p className="text-2xl text-bff-200">{zh ? '这一轮没有投资者，市场一片冷清！' : es ? 'No hubo inversionistas esta ronda, ¡el mercado estuvo tranquilo!' : 'No traders this round. The market was quiet!'}</p>
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
            {creating ? (
              zh ? '正在准备…' : es ? 'Preparando…' : 'Setting up…'
            ) : (
              <>
                {zh ? '开一局新游戏再玩一次' : es ? 'Jugar otra vez con un juego nuevo' : 'Play again with a new game'} <RotateCcw className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      )}
    </HostShell>
  )
}
