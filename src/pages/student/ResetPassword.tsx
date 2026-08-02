// Where a password-reset link lands.
//
// Supabase puts a recovery token in the URL fragment and the client library
// exchanges it for a short-lived session on load. So the job here is: wait for
// that session to appear, then take a new password. If it never appears the link
// was stale or already used, and saying that plainly beats a form that fails on
// submit for reasons the student cannot see.

import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, KeyRound, Loader2 } from 'lucide-react'
import { getSupabase } from '../../lib/supabase'
import { setNewPassword, validatePassword } from '../../lib/studentAuth'
import { BACKEND_ENABLED } from '../../lib/config'
import { useLang } from '../../lib/i18n'

type Phase = 'checking' | 'ready' | 'expired' | 'done'

export default function ResetPassword() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const navigate = useNavigate()

  const [phase, setPhase] = useState<Phase>(BACKEND_ENABLED ? 'checking' : 'expired')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!BACKEND_ENABLED) return
    let cancelled = false
    let unsubscribe: (() => void) | undefined
    // A timer, because "no PASSWORD_RECOVERY event" is not an event we can
    // listen for — the only way to know the link was bad is that nothing
    // happened for a while.
    const giveUp = window.setTimeout(() => {
      if (!cancelled) setPhase((p) => (p === 'checking' ? 'expired' : p))
    }, 6000)

    void getSupabase().then(async (client) => {
      if (!client || cancelled) return
      const { data } = await client.auth.getSession()
      if (cancelled) return
      if (data.session) setPhase('ready')
      const { data: sub } = client.auth.onAuthStateChange((_evt, session) => {
        if (session) setPhase((p) => (p === 'checking' ? 'ready' : p))
      })
      unsubscribe = () => sub.subscription.unsubscribe()
      if (cancelled) unsubscribe()
    })

    return () => {
      cancelled = true
      window.clearTimeout(giveUp)
      unsubscribe?.()
    }
  }, [])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      await setNewPassword(password)
      setPhase('done')
      window.setTimeout(() => navigate('/student', { replace: true }), 1400)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  const pwError = password ? validatePassword(password) : null

  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:py-20">
      <div className="panel p-7 sm:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-bff-600 text-white">
          <KeyRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-extrabold text-ink">
          {zh ? '设置新密码' : es ? 'Nueva contraseña' : 'Set a new password'}
        </h1>

        {phase === 'checking' && (
          <p className="mt-4 flex items-center gap-2 text-ink/65">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {zh ? '正在验证你的链接…' : es ? 'Verificando tu enlace…' : 'Checking your link…'}
          </p>
        )}

        {phase === 'expired' && (
          <>
            <p className="mt-4 leading-relaxed text-ink/70">
              {zh
                ? '这个重置链接已经失效或已被使用过了。重新申请一个新的就行。'
                : es
                  ? 'Ese enlace ya venció o ya se usó. Pide uno nuevo y listo.'
                  : 'That reset link has expired or was already used. Ask for a fresh one and you are set.'}
            </p>
            <Link to="/signin?mode=forgot" className="btn-primary mt-6">
              {zh ? '发送新链接' : es ? 'Enviar un enlace nuevo' : 'Send a new link'}
              <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
            </Link>
          </>
        )}

        {phase === 'done' && (
          <p role="status" className="mt-4 leading-relaxed text-ink/70">
            {zh
              ? '密码已更新，正在带你回去…'
              : es
                ? 'Contraseña actualizada. Te llevamos de vuelta…'
                : 'Password updated. Taking you back…'}
          </p>
        )}

        {phase === 'ready' && (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="new-pw" className="block font-display text-sm font-bold text-ink">
                {zh ? '新密码' : es ? 'Contraseña nueva' : 'New password'}
              </label>
              <p id="new-pw-hint" className="mt-1 text-xs text-ink/55">
                {zh ? '至少 8 个字符。' : es ? 'Mínimo 8 caracteres.' : 'At least 8 characters.'}
              </p>
              <input
                id="new-pw"
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby="new-pw-hint"
                aria-invalid={pwError ? true : undefined}
                className={`mt-2 w-full rounded-[6px] border px-4 py-2.5 text-ink outline-none transition focus:ring-2 focus:ring-bff-400 ${
                  pwError ? 'border-red-400' : 'border-ink/20 focus:border-bff-500'
                }`}
              />
              {pwError && (
                <p className="mt-1.5 text-xs font-semibold text-red-700">{pwError}</p>
              )}
            </div>

            {error && (
              <p role="alert" className="rounded-[6px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
                {error}
              </p>
            )}

            <button type="submit" disabled={busy} className="btn-primary w-full py-3">
              {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {zh ? '保存新密码' : es ? 'Guardar contraseña' : 'Save new password'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
