// Account/profile for signed-in BFF team members. With Google sign-in there's
// no password to manage — this lets them set their name + BFF chapter/region.

import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Check, UserCog } from 'lucide-react'
import { BACKEND_ENABLED } from '../../lib/config'
import { supabase } from '../../lib/supabase'
import { useAdmin } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import { Loading, Skeleton } from '../../components/Skeleton'
import { BackendOffCard } from './TeamAuth'
import { errMsg, fetchMyProfile } from './api'

export default function AccountPage() {
  const { adminUser, adminReady } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [fullName, setFullName] = useState('')
  const [chapter, setChapter] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const uid = adminUser?.id ?? null

  useEffect(() => {
    if (!uid) return
    let cancelled = false
    fetchMyProfile(uid)
      .then((p) => {
        if (cancelled || !p) return
        setFullName(p.full_name ?? '')
        setChapter(p.chapter ?? '')
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoaded(true)
      })
    return () => {
      cancelled = true
    }
  }, [uid])

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return (
      <Loading
        label={zh ? '加载中…' : es ? 'Cargando…' : 'Loading…'}
        className="mx-auto max-w-md px-4 py-12"
      >
        <div className="mb-6 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="card space-y-5">
          <Skeleton className="h-5 w-1/3" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-11 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-11 w-full" />
          </div>
          <Skeleton className="h-11 w-36" />
        </div>
      </Loading>
    )
  }
  if (!adminUser) return <Navigate to="/team" replace />

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!supabase || !uid) return
    setError(null)
    setDone(false)
    setBusy(true)
    try {
      const { error: upErr } = await supabase
        .from('profiles')
        .update({ full_name: fullName.trim(), chapter: chapter.trim() })
        .eq('id', uid)
      if (upErr) throw new Error(upErr.message)
      setDone(true)
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="mb-6">
        <Link to="/admin" className="inline-flex items-center gap-1 text-sm font-semibold text-bff-700 hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {zh ? '返回仪表板' : es ? 'Volver al panel' : 'Back to dashboard'}
        </Link>
        <p className="eyebrow mt-5">
          <span className="eyebrow-line" aria-hidden="true" />
          <UserCog className="h-3.5 w-3.5" aria-hidden="true" />
          {zh ? '账户' : es ? 'Cuenta' : 'Account'}
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold leading-[1.05] text-ink sm:text-4xl">
          {zh ? (
            <>
              您的<em>账户</em>
            </>
          ) : es ? (
            <>
              Tu <em>cuenta</em>
            </>
          ) : (
            <>
              Your <em>account</em>
            </>
          )}
        </h1>
        <p className="mt-3 text-ink/70">
          {zh ? '已用 Google 登录为 ' : es ? 'Sesión iniciada con Google como ' : 'Signed in with Google as '}
          <span className="font-semibold text-ink">{adminUser.email}</span>.
        </p>
      </div>

      <div className="card accent-left animate-pop-in pl-7">
        <h2 className="font-display text-lg font-bold text-ink">{zh ? '您的信息' : es ? 'Tus datos' : 'Your details'}</h2>
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">{zh ? '全名' : es ? 'Nombre completo' : 'Full name'}</span>
            <input
              className="input"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Jamie Rivera"
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-slate-700">
              {zh ? 'BFF 分会/地区' : es ? 'Capítulo / región de BFF' : 'BFF chapter / region'}
            </span>
            <input
              className="input"
              type="text"
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              placeholder={zh ? '例如 Chicago, IL · 中西部' : es ? 'p. ej. Chicago, IL · Midwest' : 'e.g. Chicago, IL · Midwest'}
              autoComplete="organization"
            />
            <span className="mt-1 block text-xs text-slate-500">
              {zh
                ? '您作为志愿者参与的 BFF of America 分会或地区。'
                : es
                  ? 'Con qué capítulo o región de BFF of America colaboras como voluntario.'
                  : 'Which BFF of America chapter or region you volunteer with.'}
            </span>
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}
          {done && (
            <p role="status" className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <Check className="h-4 w-4" aria-hidden="true" /> {zh ? '已保存！' : es ? '¡Guardado!' : 'Saved!'}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={busy || !loaded} aria-busy={busy}>
            {busy ? (zh ? '保存中…' : es ? 'Guardando…' : 'Saving…') : zh ? '保存更改' : es ? 'Guardar cambios' : 'Save changes'}
          </button>
        </form>
      </div>
    </div>
  )
}
