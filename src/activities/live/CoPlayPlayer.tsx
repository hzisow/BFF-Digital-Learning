import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  getLiveSessionByCode,
  joinLiveSession,
  listLivePlayers,
  reportScore,
  subscribeToLive,
  type LivePlayer,
  type LiveSession,
} from './coplay'
import type { LiveGameProps } from './types'
import { getActivity } from '../../lib/activities'
import { Logo } from '../../components/Logo'
import { isNetworkError } from '../../lib/online'
import { useStalledLookup } from '../../lib/useStalledLookup'
import LiveLookupStalled from '../../components/LiveLookupStalled'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import StudentNameFields from '../../components/StudentNameFields'
import { composeStudentName, splitStudentName } from '../../lib/studentName'
import { AppIcon } from '../../lib/icons'
import { Construction, Flag, Gamepad2, HelpCircle, PartyPopper } from 'lucide-react'

import BensBudget from '../bens-budget/BensBudget'
import BensInsurance from '../bens-insurance/BensInsurance'
import PaystubDetective from '../paystub/PaystubDetective'
import CreditScoreSim from '../credit-sim/CreditScoreSim'
import ScamSpotter from '../scam-spotter/ScamSpotter'
import SmartShopper from '../smart-shopper/SmartShopper'
import GoalGetter from '../goal-getter/GoalGetter'

const NICK_KEY = 'bff_live_nick'

// activity_slug maps to the solo game component. Typed as ComponentType<LiveGameProps>
// so this compiles whether or not each game has landed its optional onComplete
// prop yet — a parallel agent is wiring those in.
const GAME_REGISTRY: Record<string, React.ComponentType<LiveGameProps>> = {
  'bens-budget': BensBudget,
  'bens-insurance': BensInsurance,
  'paystub-detective': PaystubDetective,
  'credit-score-sim': CreditScoreSim,
  'scam-spotter': ScamSpotter,
  'smart-shopper': SmartShopper,
  'goal-getter': GoalGetter,
}

function errorMessage(err: unknown, es: boolean, zh: boolean): string {
  return err instanceof Error
    ? err.message
    : zh
      ? '出了点问题。再试一次吧！'
      : es
        ? 'Algo salió mal. ¡Inténtalo de nuevo!'
        : 'Something went wrong. Try again!'
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

export default function CoPlayPlayer() {
  const params = useParams<{ code: string }>()
  const code = (params.code ?? '').toUpperCase()
  const { student } = useStudent()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  const [session, setSession] = useState<LiveSession | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [player, setPlayer] = useState<LivePlayer | null>(null)
  const [players, setPlayers] = useState<LivePlayer[]>([])
  // Seeded from the class session or the last name used on this device,
  // split back into its two parts so the form is already filled in.
  const seededName = student?.nickname ?? localStorage.getItem(NICK_KEY) ?? ''
  const [firstName, setFirstName] = useState(() => splitStudentName(seededName).firstName)
  const [lastInitial, setLastInitial] = useState(
    () => splitStudentName(seededName).lastInitial,
  )
  const nickname = composeStudentName(firstName, lastInitial)
  const [joining, setJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)
  const [finished, setFinished] = useState(false)
  const [myScore, setMyScore] = useState<number | null>(null)

  const fetchedRef = useRef(false)
  const joinRef = useRef(false)
  const [lookupOffline, setLookupOffline] = useState(false)
  const stalled = useStalledLookup(
    session !== null || loadError !== null || lookupOffline,
  )

  // Look the game up by its code (once).
  useEffect(() => {
    if (fetchedRef.current) return
    fetchedRef.current = true
    getLiveSessionByCode(code)
      .then(setSession)
      .catch((err) => {
        // A dead connection is not a broken game code. Route it to the
        // connection notice so the student is not told their code failed.
        if (isNetworkError(err)) setLookupOffline(true)
        else setLoadError(errorMessage(err, es, zh))
      })
  }, [code, es, zh])

  // Once joined: track session state + fellow players.
  const sessionId = session?.id
  const playerId = player?.id
  useEffect(() => {
    if (!sessionId || !playerId) return
    let active = true
    const refresh = () => {
      listLivePlayers(sessionId)
        .then((ps) => {
          if (active) setPlayers(ps)
        })
        .catch((err) => console.warn('Could not refresh players', err))
    }
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
  }, [sessionId, playerId])

  async function handleJoin(e: FormEvent) {
    e.preventDefault()
    if (!session || joinRef.current) return
    const nick = nickname.trim()
    if (!nick) {
      setJoinError(zh ? '先填上你的名字吧！' : es ? '¡Primero pon tu nombre!' : 'Add your name first!')
      return
    }
    joinRef.current = true
    setJoining(true)
    setJoinError(null)
    try {
      const p = await joinLiveSession(session.id, nick)
      localStorage.setItem(NICK_KEY, p.nickname)
      setPlayer(p)
      if (p.finished) {
        setFinished(true)
        setMyScore(p.score)
      }
    } catch (err) {
      joinRef.current = false
      setJoinError(errorMessage(err, es, zh))
    } finally {
      setJoining(false)
    }
  }

  function handleComplete(score: number) {
    if (!player) return
    const rounded = Math.round(score)
    setFinished(true)
    setMyScore(rounded)
    reportScore(player.id, rounded).catch((err) => console.warn('Could not report score', err))
  }

  if (loadError) {
    return (
      <Shell code={code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <HelpCircle className="mx-auto block h-11 w-11 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">{zh ? '嗯，这没能成功' : es ? 'Mmm, eso no funcionó' : 'Hmm, that did not work'}</h1>
          <p className="text-sm text-ink/70">{loadError}</p>
          <Link to="/" className="btn-primary">
            {zh ? '返回首页' : es ? 'Volver al inicio' : 'Back to home'}
          </Link>
        </div>
      </Shell>
    )
  }

  if (!session) {
    return (
      <Shell code={code}>
        {/* Once we know the lookup is not coming, the hopeful line is
            just noise sitting above the explanation. */}
        {!stalled && !lookupOffline && (
          <p className="mt-16 text-center font-display text-lg font-semibold text-ink/60">
            {zh ? '正在寻找你的游戏…' : es ? 'Buscando tu juego…' : 'Finding your game…'}
          </p>
        )}
        {/* Without this the screen waits forever on a dead connection. */}
        {(stalled || lookupOffline) && (
          <LiveLookupStalled onRetry={() => window.location.reload()} />
        )}
      </Shell>
    )
  }

  const activity = getActivity(session.activity_slug)
  const Game = GAME_REGISTRY[session.activity_slug]

  // Join screen.
  if (!player) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-4">
          <div className="text-center">
            {activity ? (
              <AppIcon name={activity.icon} className="mx-auto block h-11 w-11 text-bff-600" />
            ) : (
              <Gamepad2 className="mx-auto block h-11 w-11 text-bff-600" aria-hidden="true" />
            )}
            <h1 className="mt-2 font-display text-xl font-bold text-ink">
              {zh ? '你找到游戏啦！' : es ? '¡Encontraste el juego!' : 'You found the game!'}
            </h1>
            <p className="mt-1 text-sm text-ink/70">
              {activity ? activity.title : zh ? '实时挑战' : es ? 'Reto en vivo' : 'Live challenge'}{' '}
              {zh
                ? '，起个昵称，好让大家知道你是谁。'
                : es
                  ? ', pon tu nombre y la inicial de tu apellido.'
                  : ', add your first name and last initial so everyone knows who you are.'}
            </p>
          </div>
          <form className="space-y-3" onSubmit={handleJoin}>
            <StudentNameFields
              firstName={firstName}
              lastInitial={lastInitial}
              onFirstName={setFirstName}
              onLastInitial={setLastInitial}
              autoFocus
            />
            {joinError && (
              <p className="text-center text-sm font-semibold text-red-600" role="alert">
                {joinError}
              </p>
            )}
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={joining || !nickname.trim()}
            >
              {joining ? (zh ? '正在加入…' : es ? 'Entrando…' : 'Joining…') : zh ? '进入游戏' : es ? 'Entrar al juego' : 'Join game'}
            </button>
          </form>
        </div>
      </Shell>
    )
  }

  const standings = rankPlayers(players)
  const myRank = standings.findIndex((p) => p.id === player.id) + 1
  const isFinished = finished || player.finished

  // Final rank card.
  if (session.state === 'ended') {
    return (
      <Shell code={session.code}>
        <div className="card animate-pop-in mt-6 space-y-4 text-center" role="status">
          <Flag className="mx-auto block h-14 w-14 text-bff-600" aria-hidden="true" />
          <h1 className="font-display text-2xl font-bold text-ink">{zh ? '游戏结束！' : es ? '¡Juego terminado!' : 'Game over!'}</h1>
          {myRank > 0 ? (
            <p className="font-display text-lg font-bold text-bff-700">
              {zh ? `你在 ${standings.length} 人中排名第 ${myRank}` : es ? `Terminaste en el puesto #${myRank} de ${standings.length}` : `You finished #${myRank} of ${standings.length}`}
              {myScore !== null && (
                <>
                  {', '}
                  {myScore} pts
                </>
              )}
            </p>
          ) : (
            <p className="text-ink/70">{zh ? '谢谢你的参与！' : es ? '¡Gracias por jugar!' : 'Thanks for playing!'}</p>
          )}
          <Link to="/activities" className="btn-primary">
            {zh ? '更多活动' : es ? 'Más actividades' : 'More activities'}
          </Link>
        </div>
      </Shell>
    )
  }

  // Lobby — joined, host hasn't started.
  if (session.state === 'lobby') {
    return (
      <Shell code={session.code}>
        <div className="card animate-pop-in mt-6 space-y-4 text-center" aria-live="polite">
          <PartyPopper className="mx-auto block h-14 w-14 text-gold-500" aria-hidden="true" />
          <h1 className="font-display text-2xl font-bold text-ink">
            {zh ? `你进来啦，${player.nickname}！` : es ? `¡Estás dentro, ${player.nickname}!` : `You're in, ${player.nickname}!`}
          </h1>
          <p className="text-ink/70">
            {zh
              ? '正在等待主持人开始……看大屏幕！'
              : es
                ? 'Esperando a que el anfitrión comience… ¡Mira la pantalla grande!'
                : 'Waiting for the host to start… Watch the big screen!'}
          </p>
          {players.length > 1 && (
            <p className="text-sm font-semibold text-ink/60">
              {zh ? `房间里有 ${players.length} 名玩家` : es ? `${players.length} jugadores en la sala` : `${players.length} players in the room`}
            </p>
          )}
        </div>
      </Shell>
    )
  }

  // Playing but this game isn't in the registry.
  if (!Game) {
    return (
      <Shell code={session.code}>
        <div className="card mx-auto mt-10 max-w-md space-y-3 text-center">
          <Construction className="mx-auto block h-11 w-11 text-gold-500" aria-hidden="true" />
          <h1 className="font-display text-xl font-bold text-ink">
            {zh ? '这个游戏还不能实时对战' : es ? 'Este juego todavía no se puede jugar en vivo' : 'This game can’t be played live yet'}
          </h1>
          <p className="text-sm text-ink/70">
            {zh
              ? '看大屏幕，接下来交给你的主持人。'
              : es
                ? 'Mira la pantalla grande, tu anfitrión se encargará desde aquí.'
                : 'Watch the big screen. Your host will take it from here.'}
          </p>
        </div>
      </Shell>
    )
  }

  // Finished — waiting on the leaderboard.
  if (isFinished) {
    return (
      <Shell code={session.code}>
        <div className="card animate-pop-in mt-6 space-y-4 text-center" role="status">
          <PartyPopper className="mx-auto block h-14 w-14 text-gold-500" aria-hidden="true" />
          <h1 className="font-display text-2xl font-bold text-ink">
            {myScore !== null ? (zh ? `你得了 ${myScore} 分！` : es ? `¡Obtuviste ${myScore} puntos!` : `You scored ${myScore}!`) : zh ? '搞定！' : es ? '¡Listo!' : 'All done!'}
          </h1>
          <p className="text-ink/70">{zh ? '在大屏幕上看排行榜吧。' : es ? 'Mira la tabla de posiciones en la pantalla grande.' : 'Watch the leaderboard on the big screen.'}</p>
          {myRank > 0 && (
            <p className="font-display text-lg font-bold text-bff-700">
              {zh ? `你目前在 ${standings.length} 人中排名第 ${myRank}` : es ? `Actualmente estás en el puesto #${myRank} de ${standings.length}` : `You're currently #${myRank} of ${standings.length}`}
            </p>
          )}
        </div>
      </Shell>
    )
  }

  // Playing — render the solo game.
  return (
    <Shell code={session.code}>
      <Game onComplete={handleComplete} />
    </Shell>
  )
}
