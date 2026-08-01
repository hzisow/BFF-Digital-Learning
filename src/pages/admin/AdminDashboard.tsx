// Mentor dashboard: your classrooms, new-classroom form, and quick game host.

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Bell,
  Check,
  Copy,
  GraduationCap,
  Lock,
  LogOut,
  Play,
  PlusCircle,
  RefreshCw,
  School,
  Settings,
  Sparkles,
  Wand2,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { BACKEND_ENABLED } from '../../lib/config'
import { getSupabase } from '../../lib/supabase'
import { useAdmin } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import HostLauncher from '../../components/HostLauncher'
import { SkeletonCard, SkeletonPage } from '../../components/Skeleton'
import { BackendOffCard } from './TeamAuth'
import {
  approveTeamMember,
  createClassroom,
  errMsg,
  fetchClassrooms,
  fetchMyProfile,
  fetchPendingAdmins,
  formatDate,
  useCopy,
  type Classroom,
  type ProfileRow,
} from './api'

function displayName(user: User, zh: boolean, es: boolean): string {
  const name: unknown = user.user_metadata?.full_name
  if (typeof name === 'string' && name.trim()) return name.trim()
  return user.email ?? (zh ? 'BFF 团队成员' : es ? 'miembro del equipo BFF' : 'BFF team member')
}

function ClassroomCard({
  classroom,
  count,
  zh,
  es,
}: {
  classroom: Classroom
  count: number
  zh: boolean
  es: boolean
}) {
  const { copied, copy } = useCopy()
  return (
    <div className="card lift accent-left flex flex-col gap-4 pl-7">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-paper-soft text-ink">
          <GraduationCap className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <h3 className="font-display text-lg font-bold text-ink">
            {classroom.name}
          </h3>
          <p className="text-sm text-ink/50">
            {classroom.school ?? (zh ? '未填写学校' : es ? 'Sin escuela indicada' : 'No school listed')}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className="rounded-xl bg-paper-soft px-4 py-2 font-mono text-2xl font-bold tracking-[0.25em] text-ink"
          aria-label={zh ? `班级代码 ${classroom.code}` : es ? `Código de clase ${classroom.code}` : `Class code ${classroom.code}`}
        >
          {classroom.code}
        </span>
        <button
          type="button"
          className="btn-ghost text-sm"
          onClick={() => copy(classroom.code)}
          aria-label={
            copied
              ? zh
                ? `班级代码 ${classroom.code} 已复制`
                : es
                  ? `Código de clase ${classroom.code} copiado`
                  : `Class code ${classroom.code} copied`
              : zh
                ? `复制班级代码 ${classroom.code}`
                : es
                  ? `Copiar código de clase ${classroom.code}`
                  : `Copy class code ${classroom.code}`
          }
        >
          <span aria-hidden="true" className="inline-flex items-center gap-1.5">
            {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
            {copied ? (zh ? '已复制' : es ? 'Copiado' : 'Copied') : zh ? '复制' : es ? 'Copiar' : 'Copy'}
          </span>
        </button>
        <span role="status" className="sr-only">
          {copied ? (zh ? `班级代码 ${classroom.code} 已复制` : es ? `Código de clase ${classroom.code} copiado` : `Class code ${classroom.code} copied`) : ''}
        </span>
      </div>
      <p className="text-sm text-pebble">
        {zh
          ? `${count} 名学生已加入`
          : es
            ? `${count} ${count === 1 ? 'estudiante inscrito' : 'estudiantes inscritos'}`
            : `${count} student${count === 1 ? '' : 's'} joined`}
      </p>
      <Link to={`/admin/class/${classroom.id}`} className="btn-secondary mt-auto">
        {zh ? '打开班级' : es ? 'Abrir clase' : 'Open class'}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  )
}

export default function AdminDashboard() {
  const { adminUser, adminReady } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const navigate = useNavigate()
  const uid = adminUser?.id ?? null

  const [classrooms, setClassrooms] = useState<Classroom[]>([])
  const [counts, setCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Approval gating: null = still checking, false = pending, true = approved.
  const [approved, setApproved] = useState<boolean | null>(null)
  const [pending, setPending] = useState<ProfileRow[]>([])
  const [approvingId, setApprovingId] = useState<string | null>(null)

  // New classroom form
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)


  const load = useCallback(async () => {
    if (!uid) return
    setLoading(true)
    setError(null)
    try {
      // Approval status decides what the rest of the dashboard shows.
      const profile = await fetchMyProfile(uid)
      const isApproved = profile?.approved === true
      setApproved(isApproved)
      if (!isApproved) return

      const res = await fetchClassrooms(uid)
      setClassrooms(res.classrooms)
      setCounts(res.studentCounts)
      try {
        setPending(await fetchPendingAdmins())
      } catch {
        setPending([]) // non-fatal — the rest of the dashboard still loads
      }
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setLoading(false)
    }
  }, [uid])

  async function handleApprove(row: ProfileRow) {
    setApprovingId(row.id)
    try {
      await approveTeamMember(row.id)
      setPending((prev) => prev.filter((p) => p.id !== row.id))
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setApprovingId(null)
    }
  }

  useEffect(() => {
    void load()
  }, [load])

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return <SkeletonPage label={zh ? '加载中…' : es ? 'Cargando…' : 'Loading…'} cards={3} />
  }
  if (!adminUser) return <Navigate to="/team" replace />

  async function handleSignOut() {
    const supabase = await getSupabase()
    if (supabase) await supabase.auth.signOut()
    navigate('/')
  }

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!uid || !name.trim()) return
    setCreating(true)
    setCreateError(null)
    try {
      await createClassroom(uid, name, school)
      setName('')
      setSchool('')
      await load()
    } catch (err) {
      setCreateError(errMsg(err))
    } finally {
      setCreating(false)
    }
  }

  // Still checking approval status.
  if (approved === null) {
    return (
      <div role="status" className="px-4 py-24 text-center text-pebble">
        {zh ? '正在验证您的访问权限…' : es ? 'Verificando tu acceso…' : 'Checking your access…'}
      </div>
    )
  }

  // Signed in, but not yet approved by a BFF admin.
  if (approved === false) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="card animate-pop-in text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-paper-soft text-ink">
            <Lock className="h-7 w-7" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            {zh ? '正在等待管理员审批' : es ? 'Esperando la aprobación del administrador' : 'Waiting for admin approval'}
          </h1>
          <p className="mt-3 leading-relaxed text-pebble">
            {zh ? '您已登录为 ' : es ? 'Has iniciado sesión como ' : "You're signed in as "}
            <span className="font-semibold">{adminUser.email}</span>.
            {zh
              ? ' BFF 管理员需要先审批您的账户，之后您才能创建班级和主持游戏。审批通过后您即可进入——请稍后再回来查看。'
              : es
                ? ' Un administrador de BFF debe aprobar tu cuenta antes de que puedas crear aulas y organizar juegos. Entrarás en cuanto lo haga; solo vuelve a comprobarlo.'
                : ' A BFF administrator needs to approve your account before you can create classrooms and host games. You\'ll get in as soon as they do — just check back.'}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" className="btn-primary" onClick={() => void load()}>
              <RefreshCw className="h-4 w-4" aria-hidden="true" /> {zh ? '重新检查' : es ? 'Comprobar de nuevo' : 'Check again'}
            </button>
            <button type="button" className="btn-ghost" onClick={() => void handleSignOut()}>
              <LogOut className="h-4 w-4" aria-hidden="true" /> {zh ? '退出登录' : es ? 'Cerrar sesión' : 'Sign out'}
            </button>
          </div>
          <p className="mt-6 text-xs text-pebble">
            {zh ? '您是学生吗？无需账户，只需' : es ? '¿Eres estudiante? No necesitas una cuenta, solo ' : "Are you a student? You don't need an account — just "}
            <Link to="/join" className="font-semibold text-ink hover:underline">
              {zh ? '用班级代码加入' : es ? 'únete con tu código de clase' : 'join with your class code'}
            </Link>
            .
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Editorial ink hero — mentor console. */}
      <section className="ed-hero">
        <span
          aria-hidden="true"
          className="ed-hero-orbit -right-24 -top-40 h-[520px] w-[520px]"
        />
        <span
          aria-hidden="true"
          className="ed-hero-orbit gold -left-40 bottom-[-11rem] h-[440px] w-[440px]"
        />
        <div className="relative z-[1] mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-6 px-4 py-14 sm:py-16">
          <div className="max-w-2xl">
            <p className="eyebrow text-paper/70">
              <span className="eyebrow-line" aria-hidden="true" />
              {zh ? '导师控制台' : es ? 'Consola del mentor' : 'Mentor console'}
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
              {zh ? (
                <>
                  您的导师<em>仪表板</em>
                </>
              ) : es ? (
                <>
                  Tu panel de <em>mentor</em>
                </>
              ) : (
                <>
                  Your mentor <em>dashboard</em>
                </>
              )}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              {zh
                ? `您好，${displayName(adminUser, zh, es)} — 班级、作业和实时游戏，尽在此处。`
                : es
                  ? `Hola, ${displayName(adminUser, zh, es)} — aulas, tareas y juegos en vivo, todo en un lugar.`
                  : `Hey, ${displayName(adminUser, zh, es)} — classrooms, assignments, and live games, all in one place.`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/account"
              className="inline-flex items-center gap-2 rounded-[5px] border border-white/25 px-4 py-2 font-display font-semibold text-white/90 transition-[transform,background-color,color] duration-150 hover:bg-white/10 hover:text-white active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              <Settings className="h-4 w-4" aria-hidden="true" /> {zh ? '账户' : es ? 'Cuenta' : 'Account'}
            </Link>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-[5px] border border-white/25 px-4 py-2 font-display font-semibold text-white/90 transition-[transform,background-color,color] duration-150 hover:bg-white/10 hover:text-white active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              onClick={() => void handleSignOut()}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" /> {zh ? '退出登录' : es ? 'Cerrar sesión' : 'Sign out'}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">

      {/* ---------- Pending team approvals ---------- */}
      {pending.length > 0 && (
        <section className="mt-8">
          <div className="card border-amber-200 bg-amber-50">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold text-amber-900">
              <Bell className="h-5 w-5" aria-hidden="true" /> {zh ? '待处理的团队审批' : es ? 'Aprobaciones de equipo pendientes' : 'Pending team approvals'} ({pending.length})
            </h2>
            <p className="mt-1 text-sm text-amber-800">
              {zh
                ? '这些人已登录，正在等待被批准为 BFF 团队成员。'
                : es
                  ? 'Estas personas iniciaron sesión y esperan ser aprobadas como miembros del equipo de BFF.'
                  : 'These people signed in and are waiting to be approved as BFF team members.'}
            </p>
            <ul className="mt-4 space-y-2">
              {pending.map((p) => (
                <li
                  key={p.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-ink">
                      {p.full_name || p.email}
                    </p>
                    <p className="truncate text-sm text-pebble">
                      {p.email}
                      {p.chapter && <> · {p.chapter}</>} · {zh ? '申请于' : es ? 'solicitado el' : 'requested'} {formatDate(p.created_at)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary shrink-0 text-sm"
                    onClick={() => void handleApprove(p)}
                    disabled={approvingId === p.id}
                    aria-busy={approvingId === p.id}
                  >
                    {approvingId === p.id ? (zh ? '审批中…' : es ? 'Aprobando…' : 'Approving…') : zh ? '批准' : es ? 'Aprobar' : 'Approve'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- Your classrooms ---------- */}
      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <GraduationCap className="h-5 w-5 text-ink" aria-hidden="true" />
            {zh ? '您的班级' : es ? 'Tus aulas' : 'Your classrooms'}
          </h2>
          <button
            type="button"
            className="btn-ghost text-sm"
            onClick={() => void load()}
            disabled={loading}
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" /> {zh ? '刷新' : es ? 'Actualizar' : 'Refresh'}
          </button>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            {zh ? '无法加载班级：' : es ? 'No se pudieron cargar las aulas: ' : 'Could not load classrooms: '}{error}
          </p>
        )}

        {loading ? (
          <div
            className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="status"
            aria-label={zh ? '正在加载您的班级…' : es ? 'Cargando tus aulas…' : 'Loading your classrooms…'}
          >
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {classrooms.map((c) => (
              <ClassroomCard key={c.id} classroom={c} count={counts[c.id] ?? 0} zh={zh} es={es} />
            ))}

            {classrooms.length === 0 && !error && (
              <div className="card flex flex-col justify-center text-center sm:col-span-2 lg:col-span-1">
                <School className="mx-auto h-8 w-8 text-pebble" aria-hidden="true" />
                <p className="mt-2 font-display font-semibold text-ink">
                  {zh ? '还没有班级' : es ? 'Aún no hay aulas' : 'No classrooms yet'}
                </p>
                <p className="mt-1 text-sm text-pebble">
                  {zh
                    ? '创建您的第一个班级，分享其 6 位字母代码，学生几秒内即可加入，无需电子邮箱。'
                    : es
                      ? 'Crea tu primera clase, comparte su código de 6 letras y los estudiantes se unen en segundos, sin correo electrónico.'
                      : 'Create your first class, share its 6-letter code, and students join in seconds — no email needed.'}
                </p>
              </div>
            )}

            {/* New classroom */}
            <form
              onSubmit={handleCreate}
              className="card flex flex-col gap-3 border-2 border-dashed border-bff-200 bg-paper-soft/40"
            >
              <h3 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                <PlusCircle className="h-5 w-5 text-ink" aria-hidden="true" /> {zh ? '新建班级' : es ? 'Nueva aula' : 'New classroom'}
              </h3>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-ink">
                  {zh ? '班级名称' : es ? 'Nombre de la clase' : 'Class name'}<span className="text-red-500"> *</span>
                </span>
                <input
                  className="input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={zh ? '第 3 节课 — 财商教育' : es ? 'Periodo 3 — Educación financiera' : 'Period 3 — Financial Literacy'}
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-ink">
                  {zh ? '学校' : es ? 'Escuela' : 'School'} <span className="font-normal text-pebble">{zh ? '（可选）' : es ? '(opcional)' : '(optional)'}</span>
                </span>
                <input
                  className="input"
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder={zh ? '林肯中学' : es ? 'Escuela Secundaria Lincoln' : 'Lincoln Middle School'}
                />
              </label>
              {createError && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {createError}
                </p>
              )}
              <button
                type="submit"
                className="btn-primary mt-auto"
                disabled={creating || !name.trim()}
              >
                {creating ? (zh ? '创建中…' : es ? 'Creando…' : 'Creating…') : zh ? '创建班级' : es ? 'Crear aula' : 'Create classroom'}
              </button>
            </form>
          </div>
        )}
      </section>

      {/* ---------- Quick host (any game, no classroom needed) ---------- */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <Play className="h-5 w-5 text-ink" aria-hidden="true" />
          {zh ? '实时游戏' : es ? 'Juego en vivo' : 'Live game'}
        </h2>
        <p className="mt-1 text-sm text-pebble">
          {zh
            ? '立即开始一场实时游戏——无需班级。玩家用大屏幕上显示的代码加入。'
            : es
              ? 'Inicia un juego en vivo ahora mismo, sin necesidad de un aula. Los jugadores se unen con el código de la pantalla grande.'
              : 'Start a live game right now — no classroom needed. Players join with the code on the big screen.'}
        </p>
        <div className="mt-4">
          <HostLauncher classroomId={null} />
        </div>
      </section>

      {/* ---------- Teaching tools (AI) ---------- */}
      <section className="mt-10">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
          <Wand2 className="h-5 w-5 text-ink" aria-hidden="true" />
          {zh ? '教学工具' : es ? 'Herramientas de enseñanza' : 'Teaching tools'}
        </h2>
        <div className="card lift accent-left mt-4 flex flex-col items-start justify-between gap-4 pl-7 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-paper-soft text-ink">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display font-semibold text-ink">
                {zh
                  ? 'AI 教案与练习题生成器'
                  : es
                    ? 'Generador de planes de clase y hojas de trabajo con IA'
                    : 'AI lesson-plan & worksheet generator'}
              </p>
              <p className="mt-1 text-sm text-ink/60">
                {zh
                  ? '输入一个主题，即可获得可打印的、符合课程标准的教案或练习题（含答案）。'
                  : es
                    ? 'Escribe un tema y obtén un plan de clase o una hoja de trabajo imprimible y alineada al plan de estudios (con respuestas).'
                    : 'Type a topic and get a printable, curriculum-aligned lesson plan or worksheet (with answer key).'}
              </p>
            </div>
          </div>
          <Link to="/admin/generate" className="btn-primary shrink-0">
            {zh ? '打开生成器' : es ? 'Abrir generador' : 'Open generator'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      </div>
    </div>
  )
}
