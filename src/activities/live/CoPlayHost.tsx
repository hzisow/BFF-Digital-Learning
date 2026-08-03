import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getLiveSession,
  listLivePlayers,
  subscribeToLive,
  updateLiveSession,
  type LivePlayer,
  type LiveSession,
} from './coplay'
import { getActivity } from '../../lib/activities'
import { Logo } from '../../components/Logo'
import { useLang } from '../../lib/i18n'
import { AppIcon } from '../../lib/icons'
import { Award, Crown, Flag, HelpCircle, Medal, Play, Puzzle, Trophy } from 'lucide-react'

const BIG_BUTTON =
  'rounded-2xl bg-white px-8 py-4 font-display text-2xl font-bold text-bff-900 shadow-lg transition hover:bg-bff-50 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50'

function errorMessage(err: unknown, es: boolean, zh: boolean): string {
  return err instanceof Error
    ? err.message
    : zh
      ? '无法加载游戏。'
      : es
        ? 'No se pudo cargar el juego.'
        : 'Could not load the game.'
}

/** Rank order: finished players first, then by score (high to low), unscored last. */
function rankPlayers(players: LivePlayer[]): LivePlayer[] {
  return [...players].sort((a, b) => {
    if (a.finished !== b.finished) return a.finished ? -1 : 1
    const as = a.score
    const bs = b.score
    if (as === null && bs === null) return 0
    if (as === null) return 1
    if (bs === null) return -1
    return bs - as
  })
}

/**
 * Podium mark for a standings row: an icon for the top three, a plain number
 * for everyone else. Decorative — rows carry their own screen-reader place
 * label.
 */
function RankMark({ index, className = 'h-6 w-6' }: { index: number; className?: string }) {
  if (index === 0) return <Crown className={`${className} text-gold-400`} aria-hidden="true" />
  if (index === 1) return <Medal className={`${className} text-white`} aria-hidden="true" />
  if (index === 2) return <Award className={`${className} text-bff-200`} aria-hidden="true" />
  return <>{index + 1}.</>
}

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

export default function CoPlayHost() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const [session, setSession] = useState<LiveSession | null>(null)
  const [players, setPlayers] = useState<LivePlayer[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!sessionId) return
    let active = true
    setSession(null)
    setPlayers([])
    setError(null)

    const refresh = () => {
      listLivePlayers(sessionId)
        .then((ps) => {
          if (active) setPlayers(ps)
        })
        .catch((err) => console.warn('Could not refresh players', err))
    }

    getLiveSession(sessionId)
      .then((s) => {
        if (active) setSession(s)
      })
      .catch((err) => {
        if (active) setError(errorMessage(err, es, zh))
      })
    refresh()

    let unsubscribe: (() => void) | undefined
    try {
      unsubscribe = subscribeToLive(
        sessionId,
        (s) => {
          if (active) setSession(s)
        },
        refresh,
      )
    } catch (err) {
      console.warn('Could not open live channel', err)
    }

    return () => {
      active = false
      unsubscribe?.()
    }
  }, [sessionId, es, zh])

  function setState(state: LiveSession['state']) {
    if (!session) return
    setSession({ ...session, state })
    updateLiveSession(session.id, { state }).catch((err) =>
      console.warn('Could not update game state', err),
    )
  }

  if (error && !session) {
    return (
      <HostShell>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <HelpCircle className="mx-auto block h-11 w-11 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">{zh ? '无法加载游戏' : es ? 'No se pudo cargar el juego' : 'Could not load the game'}</h1>
          <p className="text-sm text-ink/70">{error}</p>
          <Link to="/" className="btn-primary">
            {zh ? '返回首页' : es ? 'Volver al inicio' : 'Back to home'}
          </Link>
        </div>
      </HostShell>
    )
  }

  if (!session) {
    return (
      <HostShell>
        <p className="mt-32 text-center font-display text-2xl font-semibold text-bff-200">
          {zh ? '正在准备游戏…' : es ? 'Preparando el juego…' : 'Warming up the game…'}
        </p>
      </HostShell>
    )
  }

  const activity = getActivity(session.activity_slug)

  if (!activity) {
    return (
      <HostShell code={session.code}>
        <div className="card mx-auto mt-24 max-w-md space-y-3 text-center">
          <Puzzle className="mx-auto block h-11 w-11 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">{zh ? '未知的游戏' : es ? 'Juego desconocido' : 'Unknown game'}</h1>
          <p className="text-sm text-ink/70">
            {zh ? (
              <>
                我们找不到名为“{session.activity_slug}”的活动。仔细核对一下你启动的挑战吧。
              </>
            ) : es ? (
              <>
                No pudimos encontrar una actividad llamada “{session.activity_slug}”. Revisa bien el
                reto que iniciaste.
              </>
            ) : (
              <>
                We couldn&apos;t find an activity called “{session.activity_slug}”. Double-check the
                challenge you started.
              </>
            )}
          </p>
          <Link to="/" className="btn-primary">
            {zh ? '返回首页' : es ? 'Volver al inicio' : 'Back to home'}
          </Link>
        </div>
      </HostShell>
    )
  }

  const standings = rankPlayers(players)
  const finishedCount = players.filter((p) => p.finished).length

  return (
    <HostShell code={session.code}>
      {/* Lobby */}
      {session.state === 'lobby' && (
        <div className="flex flex-col items-center gap-8 pt-8 text-center">
          <p className="eyebrow justify-center text-bff-300">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '实时对战' : es ? 'JUEGO EN VIVO' : 'LIVE GAME'}
          </p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            <AppIcon name={activity.icon} className="inline h-9 w-9 align-[-0.12em] sm:h-11 sm:w-11" />{' '}
            {activity.title}
          </h1>
          <p className="text-xl text-bff-200">{zh ? '拿起一台设备，用游戏代码加入' : es ? 'Toma un dispositivo y únete con el código del juego' : 'Grab a device and join with the game code'}</p>
          <p className="font-display text-7xl font-bold tracking-widest sm:text-8xl md:text-9xl">
            {session.code}
          </p>
          <p className="max-w-full overflow-x-auto rounded-xl bg-white/10 px-5 py-2.5 text-lg text-bff-100">
            {zh
              ? '同学们：进入网站，选择“加入实时对战”，然后输入这个代码'
              : es
                ? 'Estudiantes: entren al sitio, elijan Unirse a un juego en vivo e ingresen este código'
                : 'Students: go to the site, choose Join a live game, then enter this code'}
          </p>
          <div className="w-full">
            <p className="mb-3 font-display text-2xl font-bold text-bff-100">
              {players.length}{' '}
              {zh
                ? '名玩家已加入'
                : es
                  ? players.length === 1
                    ? 'jugador se unió'
                    : 'jugadores se unieron'
                  : players.length === 1
                    ? 'player joined'
                    : 'players joined'}
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
                <span className="text-lg text-bff-300">{zh ? '正在等待第一位玩家加入…' : es ? 'Esperando a que se una el primer jugador…' : 'Waiting for the first player to join…'}</span>
              )}
            </div>
          </div>
          <button
            className={BIG_BUTTON}
            onClick={() => setState('playing')}
            disabled={players.length === 0}
          >
            {zh ? '开始游戏' : es ? 'Comenzar juego' : 'Start game'} <Play className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Playing */}
      {session.state === 'playing' && (
        <div className="space-y-6 pt-2">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            <AppIcon name={activity.icon} className="inline h-9 w-9 align-[-0.12em] sm:h-11 sm:w-11" />{' '}
            {activity.title}
          </h1>
          <p
            className="font-display text-3xl font-bold text-bff-100 sm:text-4xl"
            aria-live="polite"
          >
            {zh ? `${players.length} 人中已有 ${finishedCount} 人完成` : es ? `${finishedCount} de ${players.length} terminaron` : `${finishedCount} of ${players.length} finished`}
          </p>
          <div className="rounded-2xl bg-white/10 p-6" aria-live="polite" aria-label={zh ? '实时排行榜' : es ? 'Tabla de posiciones en vivo' : 'Live leaderboard'}>
            <h2 className="mb-4 font-display text-lg font-bold uppercase tracking-wide text-bff-200">
              <Trophy className="inline h-5 w-5 align-[-0.15em]" aria-hidden="true" /> {zh ? '实时排行榜' : es ? 'Tabla de posiciones en vivo' : 'Live leaderboard'}
            </h2>
            <ol className="space-y-2.5">
              {standings.map((p, i) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 border-b border-white/10 py-1.5 text-xl last:border-0"
                >
                  <span className="flex items-center gap-1.5 font-display font-semibold">
                    <span className="inline-flex w-7 shrink-0 justify-center" aria-hidden="true">
                      <RankMark index={i} />
                    </span>
                    <span className="sr-only">
                      {zh
                        ? `第 ${i + 1} 名：`
                        : es
                          ? `puesto ${i + 1}: `
                          : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place: `}
                    </span>
                    {p.nickname}
                  </span>
                  <span className="whitespace-nowrap font-display font-bold text-bff-100">
                    {p.finished && p.score !== null ? (
                      `${p.score} pts`
                    ) : (
                      <span className="text-bff-300">{zh ? '游戏中…' : es ? 'jugando…' : 'playing…'}</span>
                    )}
                  </span>
                </li>
              ))}
              {standings.length === 0 && (
                <li className="text-lg text-bff-300">{zh ? '还没有玩家…' : es ? 'Aún no hay jugadores…' : 'No players yet…'}</li>
              )}
            </ol>
          </div>
          <ControlBar>
            <p className="mr-auto hidden text-bff-300 sm:block">
              {zh
                ? '每个人都按自己的节奏玩：等大家都玩完了再结束游戏。'
                : es
                  ? 'Cada quien juega a su propio ritmo, termina el juego cuando la sala haya acabado.'
                  : 'Everyone plays at their own pace, end the game when the room is done.'}
            </p>
            <button className={BIG_BUTTON} onClick={() => setState('ended')}>
              {zh ? '结束游戏' : es ? 'Terminar juego' : 'End game'}{' '}
              <Flag className="inline h-6 w-6 align-[-0.15em]" aria-hidden="true" />
            </button>
          </ControlBar>
        </div>
      )}

      {/* Ended */}
      {session.state === 'ended' && (
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
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <RankMark index={i} className="h-10 w-10" />
                </span>
                <p className="mt-3 break-words font-display text-3xl font-bold">
                  <span className="sr-only">{zh ? `第 ${i + 1} 名：` : es ? `puesto ${i + 1}: ` : `${i + 1}${['st', 'nd', 'rd'][i] ?? 'th'} place: `}</span>
                  {p.nickname}
                </p>
                <p className="mt-1 font-display text-2xl font-bold text-bff-100">
                  {p.score !== null ? `${p.score} pts` : zh ? '未完成' : es ? 'no terminó' : 'did not finish'}
                </p>
              </div>
            ))}
          </div>
          {standings.length === 0 && (
            <p className="text-2xl text-bff-200">{zh ? '这一轮没有玩家！' : es ? '¡No hubo jugadores esta ronda!' : 'No players this round!'}</p>
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
                  <span className="font-display font-bold text-bff-100">
                    {p.score !== null ? `${p.score} pts` : ', '}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </HostShell>
  )
}
