// Create an account, sign in, or ask for a reset link.
//
// One screen, three modes, because they are the same three fields in different
// combinations and a student who lands on the wrong one should be one click from
// the right one.
//
// The copy leads with what an account is *for* — keeping your work when you
// switch devices — rather than presenting it as a wall in front of the course.
// It isn't one: everything on the site still works without an account, and the
// screen says so.

import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Check, KeyRound, Loader2, Mail } from 'lucide-react'
import { useAccount, useStudent } from '../../lib/session'
import {
  requestPasswordReset,
  signInStudent,
  signUpStudent,
  validatePassword,
} from '../../lib/studentAuth'
import { BACKEND_ENABLED } from '../../lib/config'
import { useLang } from '../../lib/i18n'

type Mode = 'signup' | 'signin' | 'forgot'

export default function AccountAuth() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const { account, accountReady } = useAccount()
  const { student } = useStudent()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const initial = (params.get('mode') as Mode) || 'signup'
  const [mode, setMode] = useState<Mode>(
    initial === 'signin' || initial === 'forgot' ? initial : 'signup',
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState<'confirm' | 'reset' | null>(null)

  // Keep the URL honest so a student can bookmark or share "sign in".
  useEffect(() => {
    if (params.get('mode') !== mode) {
      const next = new URLSearchParams(params)
      next.set('mode', mode)
      setParams(next, { replace: true })
    }
    // Only when the mode itself changes; params is replaced by this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  if (accountReady && account && !sent) return <Navigate to="/student" replace />

  const t = {
    signup: {
      title: zh ? '创建账号' : es ? 'Crea tu cuenta' : 'Create your account',
      lede: zh
        ? '把你的进度保存下来，换一台设备也能继续——课程结业证书也需要它。'
        : es
          ? 'Guarda tu progreso para seguir desde cualquier dispositivo — y para que tu certificado sea tuyo.'
          : 'Save your progress so you can pick it up on any device — and so your certificate is really yours.',
      submit: zh ? '创建账号' : es ? 'Crear cuenta' : 'Create account',
    },
    signin: {
      title: zh ? '登录' : es ? 'Inicia sesión' : 'Sign in',
      lede: zh
        ? '欢迎回来。'
        : es
          ? 'Qué bueno verte de nuevo.'
          : 'Welcome back.',
      submit: zh ? '登录' : es ? 'Entrar' : 'Sign in',
    },
    forgot: {
      title: zh ? '重置密码' : es ? 'Restablecer contraseña' : 'Reset your password',
      lede: zh
        ? '输入你的邮箱，我们会发一个重置链接给你。'
        : es
          ? 'Escribe tu correo y te enviamos un enlace para restablecerla.'
          : 'Enter your email and we will send you a reset link.',
      submit: zh ? '发送重置链接' : es ? 'Enviar enlace' : 'Send reset link',
    },
  }[mode]

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setBusy(true)
    try {
      if (mode === 'forgot') {
        await requestPasswordReset(email)
        setSent('reset')
      } else if (mode === 'signup') {
        const result = await signUpStudent(email, password, name || student?.nickname)
        if (result.needsConfirmation) setSent('confirm')
        else navigate('/student', { replace: true })
      } else {
        await signInStudent(email, password)
        navigate('/student', { replace: true })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusy(false)
    }
  }

  if (!BACKEND_ENABLED) {
    return (
      <Shell title={t.title}>
        <p className="text-ink/70">
          {zh
            ? '账号功能还没开启。别担心——课程、游戏和进度在没有账号的情况下也完全可用。'
            : es
              ? 'Las cuentas aún no están activas. Tranquilo — las lecciones, los juegos y tu progreso funcionan igual sin una.'
              : 'Accounts are not switched on yet. Nothing is blocked — lessons, games and your progress all work without one.'}
        </p>
        <Link to="/lessons" className="btn-primary mt-6">
          {zh ? '去上课' : es ? 'Ir a las lecciones' : 'Go to the lessons'}
          <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
        </Link>
      </Shell>
    )
  }

  if (sent) {
    return (
      <Shell title={zh ? '查收邮件' : es ? 'Revisa tu correo' : 'Check your email'}>
        <p className="flex items-start gap-3 text-ink/75">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-ink" aria-hidden="true" />
          <span>
            {sent === 'confirm'
              ? zh
                ? `我们向 ${email} 发送了一封确认邮件。点击里面的链接，你的账号就开通了。`
                : es
                  ? `Enviamos un correo de confirmación a ${email}. Haz clic en el enlace y tu cuenta queda lista.`
                  : `We sent a confirmation email to ${email}. Click the link in it and your account is live.`
              : zh
                ? `如果 ${email} 有对应的账号，重置链接已经在路上了。`
                : es
                  ? `Si hay una cuenta con ${email}, el enlace para restablecerla ya va en camino.`
                  : `If there is an account for ${email}, a reset link is on its way.`}
          </span>
        </p>
        <p className="mt-4 text-sm text-ink/55">
          {zh
            ? '没收到？看看垃圾邮件箱，或者过一分钟再试一次。'
            : es
              ? '¿No llegó? Revisa la carpeta de spam, o inténtalo de nuevo en un minuto.'
              : 'Nothing there? Check your spam folder, or try again in a minute.'}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link to="/lessons" className="btn-primary">
            {zh ? '继续学习' : es ? 'Seguir aprendiendo' : 'Keep learning'}
            <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => {
              setSent(null)
              setMode('signin')
            }}
          >
            {zh ? '返回登录' : es ? 'Volver a iniciar sesión' : 'Back to sign in'}
          </button>
        </div>
      </Shell>
    )
  }

  const pwHint = mode === 'signup' && password ? validatePassword(password) : null

  return (
    <Shell title={t.title} lede={t.lede}>
      <form onSubmit={onSubmit} className="mt-7 space-y-4">
        {mode === 'signup' && (
          <Field
            id="acct-name"
            label={zh ? '你的名字' : es ? 'Tu nombre' : 'Your name'}
            hint={
              zh
                ? '会印在你的结业证书上。'
                : es
                  ? 'Es el nombre que irá en tu certificado.'
                  : 'This is the name that goes on your certificate.'
            }
            type="text"
            autoComplete="name"
            value={name}
            onChange={setName}
            placeholder={student?.nickname ?? ''}
          />
        )}
        <Field
          id="acct-email"
          label={zh ? '邮箱' : es ? 'Correo electrónico' : 'Email'}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={setEmail}
        />
        {mode !== 'forgot' && (
          <Field
            id="acct-password"
            label={zh ? '密码' : es ? 'Contraseña' : 'Password'}
            hint={
              mode === 'signup'
                ? zh
                  ? '至少 8 个字符。'
                  : es
                    ? 'Mínimo 8 caracteres.'
                    : 'At least 8 characters.'
                : undefined
            }
            type="password"
            required
            minLength={8}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            value={password}
            onChange={setPassword}
            error={pwHint}
          />
        )}

        {error && (
          <p role="alert" className="rounded-[6px] border border-red-300 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800">
            {error}
          </p>
        )}

        <button type="submit" disabled={busy} className="btn-primary w-full py-3">
          {t.submit}
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="nudge h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/10 pt-5 text-sm">
        {mode !== 'signin' && (
          <button type="button" className="link-quiet" onClick={() => setMode('signin')}>
            {zh ? '已经有账号了？登录' : es ? '¿Ya tienes cuenta? Inicia sesión' : 'Already have an account? Sign in'}
          </button>
        )}
        {mode !== 'signup' && (
          <button type="button" className="link-quiet" onClick={() => setMode('signup')}>
            {zh ? '创建账号' : es ? 'Crear una cuenta' : 'Create an account'}
          </button>
        )}
        {mode !== 'forgot' && (
          <button type="button" className="link-quiet" onClick={() => setMode('forgot')}>
            {zh ? '忘记密码？' : es ? '¿Olvidaste tu contraseña?' : 'Forgot your password?'}
          </button>
        )}
      </div>

      {/* The reassurance that keeps this from reading as a gate. */}
      <p className="mt-6 flex items-start gap-2 text-sm text-ink/55">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
        {zh
          ? '不需要账号也能上全部课程。账号只是让你的进度跟着你走。'
          : es
            ? 'No necesitas una cuenta para hacer el curso. Solo sirve para que tu progreso te siga.'
            : 'You do not need an account to take the course. It only exists so your progress follows you.'}
      </p>
    </Shell>
  )
}

// ---------- Bits ----------

function Shell({
  title,
  lede,
  children,
}: {
  title: string
  lede?: string
  children: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:py-20">
      <div className="panel p-7 sm:p-9">
        <span className="flex h-11 w-11 items-center justify-center rounded-[6px] bg-ink-deep text-white">
          <KeyRound className="h-5 w-5" aria-hidden="true" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-extrabold text-ink">{title}</h1>
        {lede && <p className="mt-3 leading-relaxed text-ink/65">{lede}</p>}
        {children}
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  ...rest
}: {
  id: string
  label: string
  hint?: string
  error?: string | null
  value: string
  onChange: (v: string) => void
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'id'>) {
  const hintId = hint ? `${id}-hint` : undefined
  const errId = error ? `${id}-err` : undefined
  return (
    <div>
      <label htmlFor={id} className="block font-display text-sm font-bold text-ink">
        {label}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-ink/55">
          {hint}
        </p>
      )}
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
        aria-invalid={error ? true : undefined}
        className={`mt-2 w-full rounded-[6px] border px-4 py-2.5 text-ink outline-none transition focus:ring-2 focus:ring-ink ${
          error ? 'border-red-400' : 'border-ink/20 focus:border-ink'
        }`}
        {...rest}
      />
      {error && (
        <p id={errId} className="mt-1.5 text-xs font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}
