import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COMPANIES, STARTING_CASH } from './data'
import { money, GameIcon } from './TradingBoard'
import { createSession } from './live'
import { useAdmin } from '../../lib/session'
import { BACKEND_ENABLED } from '../../lib/config'
import { useLang } from '../../lib/i18n'
import { LineChart, Monitor, Smartphone, Target } from 'lucide-react'

const OFFLINE_NOTE =
  'Live games unlock when the class backend is connected — solo mode is ready now!'
const OFFLINE_NOTE_ES =
  'Los juegos en vivo se activan cuando el backend de la clase está conectado — ¡el modo individual ya está listo!'
const OFFLINE_NOTE_ZH =
  '当班级后端接通后，实时对战就会解锁——单人模式现在就能玩！'

export default function WolfHome() {
  const navigate = useNavigate()
  const { adminUser } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const offlineNote = zh ? OFFLINE_NOTE_ZH : es ? OFFLINE_NOTE_ES : OFFLINE_NOTE
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
      setHostError(
        err instanceof Error
          ? err.message
          : zh
            ? '无法创建游戏。再试一次吧！'
            : es
              ? 'No se pudo crear el juego. ¡Inténtalo de nuevo!'
              : 'Could not create a game. Try again!',
      )
      setHosting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero */}
      <section className="mb-10 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-bff-50 text-bff-700 shadow-sm">
          <LineChart className="h-10 w-10" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-4 justify-center">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? '市场游戏' : es ? 'JUEGO DE MERCADO' : 'MARKET GAME'}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Wolf of Wall <em>Street</em>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-ink/70">
          {zh ? (
            <>
              你有 <strong className="text-ink">{money(STARTING_CASH)}</strong> 可以投资在 12 家崭露头角
              （而且完全是虚构）的公司上。研究市场，扛住两轮突发新闻，沉住气，直到收盘钟声揭晓每家公司真正的表现。
              投资组合最棒的人获胜！
            </>
          ) : es ? (
            <>
              Tienes <strong className="text-ink">{money(STARTING_CASH)}</strong> para invertir
              en 12 empresas prometedoras (y totalmente ficticias). Estudia el mercado, resiste dos
              rondas de noticias de última hora y mantén la calma hasta que la campana de cierre revele
              cómo le fue de verdad a cada empresa. ¡Gana la mejor cartera!
            </>
          ) : (
            <>
              You have <strong className="text-ink">{money(STARTING_CASH)}</strong> to invest
              across 12 up-and-coming (and totally fictional) companies. Study the market, ride out two
              rounds of breaking news, and hold your nerve until the closing-bell reveal shows how every
              company really performed. Best portfolio wins!
            </>
          )}
        </p>
      </section>

      {/* Three ways to play */}
      <section className="mb-12 grid gap-4 md:grid-cols-3">
        {/* Solo */}
        <div className="card flex flex-col gap-3 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
            <Target className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg font-bold text-ink">{zh ? '单人游戏' : es ? 'Juega individual' : 'Play solo'}</h2>
          <p className="flex-1 text-sm text-ink/70">
            {zh
              ? '按自己的节奏练习——玩完每一轮交易，看看你的直觉有多准。'
              : es
                ? 'Practica a tu propio ritmo — negocia en cada ronda y descubre qué tan buenos son tus instintos.'
                : 'Practice at your own pace — trade through every round and see how your instincts stack up.'}
          </p>
          <Link to="/wolf/solo" className="btn-primary w-full">
            {zh ? '开始单人游戏' : es ? 'Iniciar un juego individual' : 'Start a solo game'}
          </Link>
        </div>

        {/* Join */}
        <div className="card flex flex-col gap-3 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
            <Smartphone className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg font-bold text-ink">{zh ? '加入实时对战' : es ? 'Únete a un juego en vivo' : 'Join a live game'}</h2>
          <p className="flex-1 text-sm text-ink/70">
            {zh
              ? '拿到了主持人给的 6 位游戏代码？加入进来，和全场一起交易比拼。'
              : es
                ? '¿Tienes un código de juego de 6 caracteres de tu anfitrión? Únete y compite contra toda la sala.'
                : 'Got a 6-character game code from your host? Jump in and trade against the whole room.'}
          </p>
          <form className="space-y-2" onSubmit={joinGame}>
            <label htmlFor="wolf-join-code" className="sr-only">
              {zh ? '6 位游戏代码' : es ? 'Código de juego de 6 caracteres' : '6-character game code'}
            </label>
            <input
              id="wolf-join-code"
              className="input text-center font-display text-lg uppercase tracking-widest"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="ABC123"
              maxLength={6}
              disabled={!BACKEND_ENABLED}
            />
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={!BACKEND_ENABLED || code.trim().length !== 6}
            >
              {zh ? '进入游戏' : es ? 'Entrar al juego' : 'Join the game'}
            </button>
          </form>
          {!BACKEND_ENABLED && <p className="text-xs text-ink/60">{offlineNote}</p>}
        </div>

        {/* Host */}
        <div className="card flex flex-col gap-3 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
            <Monitor className="h-6 w-6" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg font-bold text-ink">{zh ? '主持实时对战' : es ? 'Organiza un juego en vivo' : 'Host a live game'}</h2>
          {!BACKEND_ENABLED ? (
            <>
              <p className="flex-1 text-sm text-ink/70">
                {zh
                  ? '把游戏投到大屏幕上，为全班同学主持这个市场。'
                  : es
                    ? 'Pon el juego en la pantalla grande y dirige el mercado para toda tu clase.'
                    : 'Put the game on the big screen and run the market for your whole class.'}
              </p>
              <button className="btn-secondary w-full" disabled>
                {zh ? '主持一场游戏' : es ? 'Organizar un juego' : 'Host a game'}
              </button>
              <p className="text-xs text-ink/60">{offlineNote}</p>
            </>
          ) : adminUser ? (
            <>
              <p className="flex-1 text-sm text-ink/70">
                {zh
                  ? '创建一场游戏，把加入代码投到投影仪上，实时主持这个市场。'
                  : es
                    ? 'Crea un juego, muestra el código de acceso en el proyector y dirige el mercado en vivo.'
                    : 'Create a game, throw the join code on the projector, and run the market live.'}
              </p>
              <button className="btn-primary w-full" onClick={hostGame} disabled={hosting}>
                {hosting ? (zh ? '正在准备你的游戏…' : es ? 'Preparando tu juego…' : 'Setting up your game…') : zh ? '主持一场游戏' : es ? 'Organizar un juego' : 'Host a game'}
              </button>
              {hostError && (
                <p className="text-xs font-semibold text-red-600" role="alert">
                  {hostError}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="flex-1 text-sm text-ink/70">
                {zh
                  ? 'BFF 导师会在大屏幕上主持实时对战。在团队页面登录即可开始。'
                  : es
                    ? 'Los mentores de BFF organizan juegos en vivo desde la pantalla grande. Inicia sesión en la página del equipo para comenzar.'
                    : 'BFF mentors host live games from the big screen. Sign in on the team page to get started.'}
              </p>
              <Link to="/team" className="btn-secondary w-full">
                {zh ? '团队登录' : es ? 'Iniciar sesión de equipo' : 'Team sign in'}
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Companies */}
      <section>
        <h2 className="mb-1 font-display text-xl font-bold text-ink">{zh ? '认识这个市场' : es ? 'Conoce el mercado' : 'Meet the market'}</h2>
        <p className="mb-4 text-sm text-ink/60">
          {zh
            ? '十二家公司，十二个故事——你会押注哪几家？'
            : es
              ? 'Doce empresas, doce historias — ¿por cuáles vas a apostar?'
              : 'Twelve companies, twelve stories — which ones will you back?'}
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {COMPANIES.map((c) => (
            <div key={c.ticker} className="card p-4">
              <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-bff-50 text-bff-700">
                <GameIcon name={c.icon} className="h-5 w-5" />
              </span>
              <p className="font-display text-sm font-bold text-ink">{c.name}</p>
              <p className="text-xs font-semibold text-bff-700">{c.ticker}</p>
              <p className="mt-1 text-xs text-ink/60">{zh ? c.industryZh : es ? c.industryEs : c.industry}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
