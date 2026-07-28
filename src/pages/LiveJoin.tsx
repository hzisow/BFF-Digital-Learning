// One "Join a live game" screen: the student types a code and we route them to
// the right live player view (Wolf, live Quiz, or a co-play challenge).

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Radio, Play, Users, Loader2 } from 'lucide-react'
import { BACKEND_ENABLED } from '../lib/config'
import { findLiveSession } from '../activities/live/coplay'
import { useLang } from '../lib/i18n'

export default function LiveJoin() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (busy) return
    setError(null)
    setBusy(true)
    try {
      const found = await findLiveSession(code)
      if (!found) {
        setError(
          zh
            ? '现在没有使用这个代码的实时游戏——找主持人再核对一下吧！'
            : es
              ? 'No hay ningún juego en vivo con ese código ahora mismo — ¡verifícalo con tu anfitrión!'
              : 'No live game with that code right now — double-check it with your host!',
        )
        return
      }
      if (found.kind === 'wolf') navigate(`/play/${found.code}`)
      else if (found.kind === 'quiz') navigate(`/quiz/${found.code}`)
      else navigate(`/coplay/${found.code}`)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : zh
            ? '出了点问题——再试一次吧！'
            : es
              ? 'Algo salió mal — ¡inténtalo de nuevo!'
              : 'Something went wrong — try again!',
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <div className="ed-hero chamfer animate-pop-in px-6 py-10 sm:px-10 sm:py-12">
        <span
          className="ed-hero-orbit"
          style={{ width: 300, height: 300, top: -150, right: -110 }}
          aria-hidden="true"
        />
        <span
          className="ed-hero-orbit gold"
          style={{ width: 200, height: 200, bottom: -120, left: -70 }}
          aria-hidden="true"
        />
        <div className="relative z-[1]">
          <div className="text-center">
            <span
              aria-hidden="true"
              className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-bff-600 text-white"
            >
              <Radio className="h-7 w-7" />
            </span>
            <p className="eyebrow mt-4 justify-center text-bff-300">
              <span className="eyebrow-line" aria-hidden="true" />
              {zh ? '实时游戏' : es ? 'Juego en vivo' : 'Live game'}
              <span className="eyebrow-line" aria-hidden="true" />
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
              {zh ? (
                <>
                  加入<em>实时</em>游戏
                </>
              ) : es ? (
                <>
                  Únete a un juego <em>en vivo</em>
                </>
              ) : (
                <>
                  Join a <em>live</em> game
                </>
              )}
            </h1>
            <p className="mx-auto mt-3 flex max-w-sm items-start justify-center gap-2 text-sm leading-relaxed text-white/70">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-bff-300" aria-hidden="true" />
              <span>
                {zh
                  ? '你的导师正在大屏幕上主持一个游戏——输入屏幕上显示的代码就能加入。'
                  : es
                    ? 'Tu mentor está organizando un juego en la pantalla grande — escribe el código que muestra para entrar.'
                    : 'Your mentor is hosting a game on the big screen — type the code they show to jump in.'}
              </span>
            </p>
          </div>

          {!BACKEND_ENABLED ? (
            <p
              role="status"
              className="mt-8 rounded-[8px] border border-gold-400/40 bg-gold-400/10 px-4 py-3 text-center text-sm text-white/85"
            >
              {zh
                ? '实时游戏需要连接班级后台。问问你的导师，或者自己先把所有内容探索一遍吧！'
                : es
                  ? '¡Los juegos en vivo necesitan que el sistema de la clase esté conectado. Pregúntale a tu mentor o explora todo por tu cuenta!'
                  : 'Live games need the class backend connected. Ask your mentor, or explore everything solo!'}
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="game-code"
                  className="font-display text-sm font-semibold text-white/80"
                >
                  {zh ? '游戏代码' : es ? 'Código del juego' : 'Game code'}
                </label>
                <input
                  id="game-code"
                  className="input mt-1.5 py-3.5 text-center font-display text-3xl font-extrabold uppercase tracking-[0.4em]"
                  placeholder="ABC123"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))
                  }
                  maxLength={6}
                  autoComplete="off"
                  autoCapitalize="characters"
                  spellCheck={false}
                />
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-[8px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={busy || code.length !== 6}
                aria-busy={busy}
              >
                {busy ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {zh ? '正在查找你的游戏…' : es ? 'Buscando tu juego…' : 'Finding your game…'}
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" aria-hidden="true" />
                    {zh ? '加入游戏' : es ? 'Unirse al juego' : 'Join game'}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-ink/60">
        {zh ? '没有游戏代码？ ' : es ? '¿No tienes código del juego? ' : 'No game code? '}
        <Link to="/activities" className="font-semibold text-bff-700 hover:text-bff-800">
          {zh ? '自己玩任意一个游戏' : es ? 'Juega cualquier juego por tu cuenta' : 'Play any game solo'}
        </Link>
        .
      </p>
    </div>
  )
}
