import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { COMPANIES, STARTING_CASH, portfolioValue, priceAt, type Holdings } from './data'
import TradingBoard, { money, GameIcon } from './TradingBoard'
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
import { useLang } from '../../lib/i18n'
import {
  Award, Bell, Crown, HelpCircle, LineChart, Lock, Medal, Newspaper, PartyPopper,
  Plug, TrendingDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const NICK_KEY = 'bff_wolf_nick'

const STAGE_TITLES: Record<number, { Icon: LucideIcon; title: string; titleEs: string; titleZh: string }> = {
  1: { Icon: Bell, title: 'Opening Bell — pick your stocks', titleEs: 'Campana de apertura — elige tus acciones', titleZh: '开盘钟声——挑选你的股票' },
  2: { Icon: Newspaper, title: 'Breaking News — round 1', titleEs: 'Última hora — ronda 1', titleZh: '突发新闻——第 1 轮' },
  3: { Icon: Newspaper, title: 'Breaking News — round 2', titleEs: 'Última hora — ronda 2', titleZh: '突发新闻——第 2 轮' },
}

/** Podium icons for 1st / 2nd / 3rd place in the final standings. */
const PODIUM_ICONS: LucideIcon[] = [Crown, Medal, Award]

function errorMessage(err: unknown, es: boolean, zh: boolean): string {
  return err instanceof Error
    ? err.message
    : zh
      ? '出了点问题。再试一次吧！'
      : es
        ? 'Algo salió mal. ¡Inténtalo de nuevo!'
        : 'Something went wrong. Try again!'
}

function Shell({ code, children }: { code: string; children: ReactNode }) {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-ink/10 bg-white px-4 py-3">
        <Logo className="h-8" />
        {code && (
          <span className="chip bg-bff-50 font-display tracking-widest text-bff-700">
            {zh ? '游戏' : es ? 'JUEGO' : 'GAME'} {code}
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
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

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
      .catch((err) => setLoadError(errorMessage(err, es, zh)))
  }, [code, es, zh])

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
      setJoinError(zh ? '先起个昵称吧！' : es ? '¡Elige un apodo primero!' : 'Pick a nickname first!')
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
      setJoinError(errorMessage(err, es, zh))
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
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
            <Plug className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="font-display text-xl font-bold text-ink">
            {zh ? '实时对战还没有接通' : es ? 'Los juegos en vivo aún no están conectados' : 'Live games are not connected yet'}
          </h1>
          <p className="text-sm text-ink/70">
            {zh
              ? '当班级后端接通后，实时对战就会解锁——单人模式现在就能玩！'
              : es
                ? 'Los juegos en vivo se activan cuando el backend de la clase está conectado — ¡el modo individual ya está listo!'
                : 'Live games unlock when the class backend is connected — solo mode is ready now!'}
          </p>
          <Link to="/wolf" className="btn-primary">
            {zh ? '返回 Wolf of Wall Street' : es ? 'Volver a Wolf of Wall Street' : 'Back to Wolf of Wall Street'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (loadError) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
            <HelpCircle className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="font-display text-xl font-bold text-ink">{zh ? '嗯，这没能成功' : es ? 'Mmm, eso no funcionó' : 'Hmm, that did not work'}</h1>
          <p className="text-sm text-ink/70">{loadError}</p>
          <Link to="/wolf" className="btn-primary">
            {zh ? '返回 Wolf of Wall Street' : es ? 'Volver a Wolf of Wall Street' : 'Back to Wolf of Wall Street'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell code={code}>
        <p className="mt-16 text-center font-display text-lg font-semibold text-ink/60">
          {zh ? '正在寻找你的游戏…' : es ? 'Buscando tu juego…' : 'Finding your game…'}
        </p>
      </Shell>
    )
  }

  if (!player) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-4">
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-bff-50 text-bff-700">
              <LineChart className="h-7 w-7" aria-hidden="true" />
            </span>
            <h1 className="mt-2 font-display text-xl font-bold text-ink">
              {zh ? '你找到游戏啦！' : es ? '¡Encontraste el juego!' : 'You found the game!'}
            </h1>
            <p className="mt-1 text-sm text-ink/70">
              {zh
                ? '起个昵称，好让大家知道是谁在交易。'
                : es
                  ? 'Elige un apodo para que todos sepan quién está negociando.'
                  : 'Pick a nickname so everyone knows who is trading.'}
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleJoin}>
            <label htmlFor="wolf-nickname" className="sr-only">
              {zh ? '你的昵称' : es ? 'Tu apodo' : 'Your nickname'}
            </label>
            <input
              id="wolf-nickname"
              className="input text-center font-display text-lg"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={zh ? '你的昵称' : es ? 'Tu apodo' : 'Your nickname'}
              maxLength={24}
              autoFocus
            />
            {joinError && (
              <p className="text-center text-sm font-semibold text-red-600" role="alert">
                {joinError}
              </p>
            )}
            <button type="submit" className="btn-primary w-full" disabled={joining || !nickname.trim()}>
              {joining ? (zh ? '正在加入…' : es ? 'Entrando…' : 'Joining…') : zh ? '开始交易！' : es ? '¡A negociar!' : "Let's trade!"}
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
          <PartyPopper className="mx-auto h-14 w-14 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-2xl font-bold text-ink">
            {zh ? `你进来啦，${player.nickname}！` : es ? `¡Estás dentro, ${player.nickname}!` : `You're in, ${player.nickname}!`}
          </h1>
          <p className="text-ink/70">
            {zh
              ? '看大屏幕——主持人敲响钟声时，市场就开盘。'
              : es
                ? 'Mira la pantalla grande — el mercado abre cuando tu anfitrión toca la campana.'
                : 'Watch the big screen — the market opens when your host rings the bell.'}
          </p>
          {others.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/60">
                {zh ? '和你一起交易的人' : es ? 'Negociando junto a ti' : 'Trading alongside you'}
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
            <h1 className="font-display text-xl font-bold text-ink">Wolf of Wall Street</h1>
            <p className="flex items-center gap-1.5 text-sm text-ink/60">
              {(() => {
                const StageIcon = STAGE_TITLES[stage].Icon
                return <StageIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              })()}
              {zh ? STAGE_TITLES[stage].titleZh : es ? STAGE_TITLES[stage].titleEs : STAGE_TITLES[stage].title}
            </p>
          </div>
          <TradingBoard stage={stage} cash={cash} holdings={holdings} onTrade={trade} />
        </div>
      )}

      {stage === 4 && (
        <div className="space-y-3">
          <div className="card border-bff-200 bg-bff-50 p-4 text-center text-sm text-ink/75">
            <Lock className="mr-1.5 inline h-4 w-4 align-[-0.2em]" aria-hidden="true" />
            {zh
              ? '市场已经收盘！盯着大屏幕，结果正在揭晓……'
              : es
                ? '¡El mercado ha cerrado! Atentos a la pantalla grande mientras se revelan los resultados…'
                : 'The market has closed! Eyes on the big screen as the results are revealed…'}
          </div>
          <div className="space-y-3" aria-live="polite">
            {COMPANIES.slice(0, session.reveal_index).map((c) => {
              const change = c.prices[3] - c.prices[0]
              const shares = holdings[c.ticker] ?? 0
              return (
                <div
                  key={c.ticker}
                  className="card animate-pop-in flex items-start justify-between gap-3 p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bff-50 text-bff-700">
                      <GameIcon name={c.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display font-bold text-ink">
                        {c.name} <span className="text-xs text-ink/60">{c.ticker}</span>
                        {shares > 0 && (
                          <span className="chip ml-2 bg-bff-50 text-bff-700">{zh ? `你持有 ${shares}` : es ? `tienes ${shares}` : `you own ${shares}`}</span>
                        )}
                      </p>
                      <p className="text-sm text-ink/70">{zh ? c.summaryZh : es ? c.summaryEs : c.summary}</p>
                    </div>
                  </div>
                  <p
                    className={`whitespace-nowrap font-display text-lg font-bold ${change >= 0 ? 'text-green-700' : 'text-red-600'}`}
                  >
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
        </div>
      )}

      {stage === 5 && (
        <div className="card animate-pop-in mt-6 space-y-5 text-center" role="status">
          {finalValue >= STARTING_CASH ? (
            <PartyPopper className="mx-auto h-14 w-14 text-green-600" aria-hidden="true" />
          ) : (
            <TrendingDown className="mx-auto h-14 w-14 text-red-500" aria-hidden="true" />
          )}
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              {zh ? '最终投资组合：' : es ? 'Cartera final:' : 'Final portfolio:'} {money(finalValue)}
            </h1>
            <p
              className={`mt-1 font-display text-lg font-bold ${finalValue >= STARTING_CASH ? 'text-green-700' : 'text-red-600'}`}
            >
              {finalValue >= STARTING_CASH ? '+' : '−'}
              {money(Math.abs(finalValue - STARTING_CASH))}{' '}
              {zh
                ? `${finalValue >= STARTING_CASH ? '盈利' : '亏损'}，相对于你起步的 ${money(STARTING_CASH)}`
                : es
                  ? `de ${finalValue >= STARTING_CASH ? 'ganancia' : 'pérdida'} sobre tu inicio de ${money(STARTING_CASH)}`
                  : `${finalValue >= STARTING_CASH ? 'profit' : 'loss'} on your ${money(STARTING_CASH)} start`}
            </p>
          </div>
          {myRank > 0 && (
            <p className="font-display text-lg font-bold text-bff-700">
              <PartyPopper className="mr-1.5 inline h-5 w-5 align-[-0.2em]" aria-hidden="true" />
              {zh
                ? `你在 ${standings.length} 位投资者中排名第 ${myRank}`
                : es
                  ? `Terminaste en el puesto #${myRank} de ${standings.length} inversionistas`
                  : `You finished #${myRank} of ${standings.length} traders`}
            </p>
          )}
          {standings.length > 0 && (
            <div className="mx-auto max-w-sm text-left">
              <p className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink/60">
                {zh ? '顶尖投资者' : es ? 'Mejores inversionistas' : 'Top traders'}
              </p>
              <ol className="space-y-1.5">
                {standings.slice(0, 5).map((p, i) => (
                  <li
                    key={p.id}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm ${
                      p.id === player.id
                        ? 'bg-bff-50 font-bold text-bff-800'
                        : 'bg-paper text-ink/75'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {(() => {
                        const PlaceIcon = PODIUM_ICONS[i]
                        return PlaceIcon ? (
                          <PlaceIcon
                            className={`h-4 w-4 shrink-0 ${i === 0 ? 'text-gold-500' : 'text-ink/50'}`}
                            aria-hidden="true"
                          />
                        ) : (
                          <span aria-hidden="true">{i + 1}.</span>
                        )
                      })()}
                      <span className="sr-only">{zh ? `第 ${i + 1} 名，` : es ? `puesto ${i + 1}, ` : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place, `}</span>
                      {p.nickname}
                    </span>
                    <span className="font-display font-bold">{money(p.value)}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <Link to="/activities" className="btn-primary">
            {zh ? '更多活动' : es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      )}
    </Shell>
  )
}
