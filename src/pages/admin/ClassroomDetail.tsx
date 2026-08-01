// Single classroom view: code, assignments, live game, students & progress.

import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Backpack,
  Check,
  ChevronDown,
  ClipboardList,
  Copy,
  Download,
  Link2,
  Play,
  RefreshCw,
  Merge,
  Pencil,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import { BACKEND_ENABLED } from '../../lib/config'
import { useAdmin } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import { ACTIVITIES, getActivity } from '../../lib/activities'
import { AppIcon } from '../../lib/icons'
import { toCsv, downloadCsv } from '../../lib/csv'
import HostLauncher from '../../components/HostLauncher'
import ClassLeaderboard from '../../components/ClassLeaderboard'
import { useToast } from '../../components/ToastProvider'
import { Loading, SkeletonHero, SkeletonPage, SkeletonRow } from '../../components/Skeleton'
import { BackendOffCard } from './TeamAuth'
import QuestionBreakdown from '../../components/admin/QuestionBreakdown'
import {
  addAssignment,
  archiveClassroom,
  deleteAssignment,
  errMsg,
  fetchAssignments,
  fetchClassroom,
  fetchRoster,
  formatDate,
  mergeStudents,
  removeStudent,
  renameStudent,
  useCopy,
  type AssignmentRow,
  type Classroom,
  type ProgressRow,
  type StudentRow,
} from './api'

function ProgressChip({ row, zh, es }: { row: ProgressRow | undefined; zh: boolean; es: boolean }) {
  if (!row) {
    return (
      <span className="chip bg-paper-soft text-pebble">
        <span aria-hidden="true">—</span>
        <span className="sr-only">{zh ? '未开始' : es ? 'Sin comenzar' : 'Not started'}</span>
      </span>
    )
  }
  if (row.status === 'completed') {
    return (
      <span className="chip bg-green-100 text-green-700">
        <span aria-hidden="true" className="inline-flex items-center gap-0.5">
          <Check className="h-3.5 w-3.5" aria-hidden="true" />{row.score != null ? ` ${row.score}` : ''}
        </span>
        <span className="sr-only">
          {zh ? '已完成' : es ? 'Completado' : 'Completed'}{row.score != null ? `${zh ? '，得分 ' : es ? ', puntuación ' : ', score '}${row.score}` : ''}
        </span>
      </span>
    )
  }
  return (
    <span className="chip bg-amber-100 text-amber-700">
      <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-current" /> {zh ? '进行中' : es ? 'comenzado' : 'started'}
    </span>
  )
}

export default function ClassroomDetail() {
  const { id } = useParams<{ id: string }>()
  const { adminUser, adminReady } = useAdmin()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const { toast } = useToast()
  const navigate = useNavigate()
  const uid = adminUser?.id ?? null
  const { copied, copy } = useCopy()

  const [classroom, setClassroom] = useState<Classroom | null>(null)
  const [assignments, setAssignments] = useState<AssignmentRow[]>([])
  const [students, setStudents] = useState<StudentRow[]>([])
  const [progress, setProgress] = useState<ProgressRow[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Assign-an-activity form
  const [slug, setSlug] = useState('')
  const [note, setNote] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assigning, setAssigning] = useState(false)
  const [assignError, setAssignError] = useState<string | null>(null)

  const [archiving, setArchiving] = useState(false)

  // Which lesson's per-question results are open. Null = none.
  const [breakdownSlug, setBreakdownSlug] = useState<string | null>(null)

  // Roster editing: the student being renamed, and the pending merge source.
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [rosterBusy, setRosterBusy] = useState(false)
  const [mergeFrom, setMergeFrom] = useState<StudentRow | null>(null)

  const load = useCallback(async () => {
    if (!id || !uid) return
    setLoading(true)
    setError(null)
    try {
      const c = await fetchClassroom(id)
      if (!c) {
        setNotFound(true)
        return
      }
      setNotFound(false)
      setClassroom(c)
      const [asg, roster] = await Promise.all([fetchAssignments(id), fetchRoster(id)])
      setAssignments(asg)
      setStudents(roster.students)
      setProgress(roster.progress)
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setLoading(false)
    }
  }, [id, uid])

  useEffect(() => {
    void load()
  }, [load])

  if (!BACKEND_ENABLED) return <BackendOffCard />
  if (!adminReady) {
    return <SkeletonPage label={zh ? '加载中…' : es ? 'Cargando…' : 'Loading…'} cards={3} />
  }
  if (!adminUser) return <Navigate to="/team" replace />

  if (notFound) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="card text-center">
          <Search className="mx-auto h-9 w-9 text-pebble" aria-hidden="true" />
          <h1 className="mt-3 font-display text-2xl font-bold text-ink">
            {zh ? '未找到班级' : es ? 'Aula no encontrada' : 'Classroom not found'}
          </h1>
          <p className="mt-2 text-pebble">
            {zh
              ? '该班级不存在、已归档，或属于其他导师。'
              : es
                ? 'Esta clase no existe, fue archivada o pertenece a otro mentor.'
                : "This class doesn't exist, was archived, or belongs to another mentor."}
          </p>
          <Link to="/admin" className="btn-secondary mt-6">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {zh ? '返回仪表板' : es ? 'Volver al panel' : 'Back to dashboard'}
          </Link>
        </div>
      </div>
    )
  }

  if (loading && !classroom) {
    return (
      <Loading label={zh ? '正在加载班级…' : es ? 'Cargando la clase…' : 'Loading class…'}>
        <SkeletonHero />
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="card space-y-4">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>
      </Loading>
    )
  }

  if (!classroom) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {zh ? '无法加载该班级' : es ? 'No se pudo cargar esta clase' : 'Could not load this class'}{error ? `: ${error}` : '.'}
        </p>
        <div className="mt-4 flex gap-3">
          <button type="button" className="btn-primary" onClick={() => void load()}>
            {zh ? '重试' : es ? 'Intentar de nuevo' : 'Try again'}
          </button>
          <Link to="/admin" className="btn-ghost">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {zh ? '仪表板' : es ? 'Panel' : 'Dashboard'}
          </Link>
        </div>
      </div>
    )
  }

  async function handleArchive() {
    if (!classroom) return
    const ok = window.confirm(
      zh
        ? `确定归档“${classroom.name}”吗？它将从您的仪表板中消失，学生也将无法再用其代码加入。`
        : es
          ? `¿Archivar "${classroom.name}"? Desaparecerá de tu panel y los estudiantes ya no podrán unirse con su código.`
          : `Archive "${classroom.name}"? It will disappear from your dashboard and students can no longer join with its code.`,
    )
    if (!ok) return
    setArchiving(true)
    try {
      await archiveClassroom(classroom.id)
      navigate('/admin')
    } catch (err) {
      setError(errMsg(err))
      setArchiving(false)
    }
  }

  async function handleAssign(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!id || !uid || !slug) return
    setAssigning(true)
    setAssignError(null)
    try {
      await addAssignment({
        classroomId: id,
        activitySlug: slug,
        note: note.trim() || null,
        // <input type="date"> gives YYYY-MM-DD; make it due end of that day, local time.
        dueAt: dueDate ? new Date(`${dueDate}T23:59:00`).toISOString() : null,
        uid,
      })
      setSlug('')
      setNote('')
      setDueDate('')
      await load()
    } catch (err) {
      setAssignError(errMsg(err))
    } finally {
      setAssigning(false)
    }
  }

  async function handleUnassign(assignment: AssignmentRow) {
    const meta = getActivity(assignment.activity_slug)
    const ok = window.confirm(
      zh
        ? `确定从本班移除“${meta?.title ?? assignment.activity_slug}”吗？学生的进度将会保留。`
        : es
          ? `¿Quitar "${meta?.title ?? assignment.activity_slug}" de esta clase? El progreso de los estudiantes se conserva.`
          : `Remove "${meta?.title ?? assignment.activity_slug}" from this class? Student progress is kept.`,
    )
    if (!ok) return
    try {
      await deleteAssignment(assignment.id)
      await load()
    } catch (err) {
      setError(errMsg(err))
    }
  }

  // ---------- Roster editing ----------
  //
  // Students type their own name now, so typos are inevitable and produce
  // duplicate records with split progress. These three are the way back.

  async function handleRename(student: StudentRow) {
    const next = editName.trim()
    if (!next || next === student.nickname) {
      setEditingId(null)
      return
    }
    setRosterBusy(true)
    try {
      await renameStudent(student.id, next)
      setEditingId(null)
      await load()
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setRosterBusy(false)
    }
  }

  async function handleRemove(student: StudentRow) {
    const ok = window.confirm(
      zh
        ? `确定移除“${student.nickname}”吗？该学生在本班的进度也会一并删除，且无法恢复。`
        : es
          ? `¿Quitar a "${student.nickname}"? También se borrará su progreso en esta clase, y no se puede deshacer.`
          : `Remove "${student.nickname}"? Their progress in this class is deleted too, and this cannot be undone.`,
    )
    if (!ok) return
    setRosterBusy(true)
    try {
      await removeStudent(student.id)
      await load()
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setRosterBusy(false)
    }
  }

  async function handleMergeInto(target: StudentRow) {
    if (!mergeFrom) return
    const ok = window.confirm(
      zh
        ? `把“${mergeFrom.nickname}”并入“${target.nickname}”吗？两条记录中更好的成绩会保留，然后删除“${mergeFrom.nickname}”。`
        : es
          ? `¿Combinar "${mergeFrom.nickname}" con "${target.nickname}"? Se conserva el mejor resultado de cada actividad y luego se elimina "${mergeFrom.nickname}".`
          : `Merge "${mergeFrom.nickname}" into "${target.nickname}"? The better result for each activity is kept, then "${mergeFrom.nickname}" is deleted.`,
    )
    if (!ok) return
    setRosterBusy(true)
    try {
      await mergeStudents(mergeFrom.id, target.id)
      setMergeFrom(null)
      await load()
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setRosterBusy(false)
    }
  }

  // ---------- Derived data ----------

  // Only lessons carry a quiz, so only they have per-question results.
  const lessonAssignments = assignments.filter(
    (a) => getActivity(a.activity_slug)?.kind === 'lesson' ||
           getActivity(a.activity_slug)?.kind === 'elective',
  )

  const assignedSlugs = new Set(assignments.map((a) => a.activity_slug))
  const unassigned = ACTIVITIES.filter((a) => !assignedSlugs.has(a.slug))
  const unassignedLessons = unassigned.filter((a) => a.kind === 'lesson')
  const unassignedOther = unassigned.filter((a) => a.kind !== 'lesson')

  // student id -> (activity slug -> progress row)
  const progressByStudent = new Map<string, Map<string, ProgressRow>>()
  for (const p of progress) {
    let m = progressByStudent.get(p.student_id)
    if (!m) {
      m = new Map()
      progressByStudent.set(p.student_id, m)
    }
    m.set(p.activity_slug, p)
  }

  const summaries = assignments.map((a) => {
    const meta = getActivity(a.activity_slug)
    const rows = progress.filter(
      (p) => p.activity_slug === a.activity_slug && p.status === 'completed',
    )
    const scores = rows.filter((p) => p.score != null).map((p) => p.score as number)
    const avg =
      scores.length > 0
        ? Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length)
        : null
    return {
      slug: a.activity_slug,
      icon: meta?.icon ?? 'help',
      title: meta?.title ?? a.activity_slug,
      completed: rows.length,
      total: students.length,
      avg,
    }
  })

  // ---- Class-level analytics (computed from the same roster + progress) ----
  const cellsTotal = students.length * assignments.length
  const cellsCompleted = progress.filter(
    (p) => p.status === 'completed' && assignments.some((a) => a.activity_slug === p.activity_slug),
  ).length
  const completionPct = cellsTotal > 0 ? Math.round((cellsCompleted / cellsTotal) * 100) : 0

  const allScores = progress
    .filter((p) => p.status === 'completed' && p.score != null)
    .map((p) => p.score as number)
  const classAvg =
    allScores.length > 0
      ? Math.round(allScores.reduce((s, n) => s + n, 0) / allScores.length)
      : null

  // "Active this week" = a student whose progress moved in the last 7 days.
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  const activeStudentIds = new Set(
    progress.filter((p) => new Date(p.updated_at).getTime() >= weekAgo).map((p) => p.student_id),
  )

  function handleExportCsv() {
    if (!classroom) return
    const header = [
      zh ? '学生' : es ? 'Estudiante' : 'Student',
      zh ? '加入时间' : es ? 'Se unió' : 'Joined',
      zh ? '完成数' : es ? 'Completadas' : 'Completed',
      zh ? '平均分' : es ? 'Puntuación media' : 'Avg score',
      ...assignments.map((a) => getActivity(a.activity_slug)?.title ?? a.activity_slug),
    ]
    const rows = students.map((s) => {
      const byActivity = progressByStudent.get(s.id)
      const done = assignments.filter(
        (a) => byActivity?.get(a.activity_slug)?.status === 'completed',
      ).length
      const scores = assignments
        .map((a) => byActivity?.get(a.activity_slug)?.score)
        .filter((n): n is number => n != null)
      const avg =
        scores.length > 0 ? Math.round(scores.reduce((x, n) => x + n, 0) / scores.length) : ''
      const cells = assignments.map((a) => {
        const row = byActivity?.get(a.activity_slug)
        if (!row) return zh ? '未开始' : es ? 'Sin comenzar' : 'Not started'
        if (row.status === 'completed')
          return row.score != null
            ? `${zh ? '已完成' : es ? 'Completado' : 'Completed'} (${row.score})`
            : zh
              ? '已完成'
              : es
                ? 'Completado'
                : 'Completed'
        return zh ? '进行中' : es ? 'Comenzado' : 'Started'
      })
      return [
        s.nickname,
        formatDate(s.created_at),
        `${done}/${assignments.length}`,
        avg,
        ...cells,
      ]
    })
    const csv = toCsv([header, ...rows])
    const stamp = new Date().toISOString().slice(0, 10)
    const safeName = classroom.name.replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '')
    downloadCsv(`${safeName || 'class'}-${classroom.code}-progress-${stamp}.csv`, csv)
  }

  const lightBtn =
    'inline-flex items-center gap-2 rounded-[5px] border border-white/25 px-4 py-2 text-sm font-display font-semibold text-white/90 transition-[transform,background-color,color] duration-150 hover:bg-white/10 hover:text-white active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div>
      {/* ---------- Editorial ink hero header ---------- */}
      <section className="ed-hero">
        <span
          aria-hidden="true"
          className="ed-hero-orbit -right-24 -top-40 h-[520px] w-[520px]"
        />
        <span
          aria-hidden="true"
          className="ed-hero-orbit gold -left-40 bottom-[-11rem] h-[440px] w-[440px]"
        />
        <div className="relative z-[1] mx-auto max-w-6xl px-4 py-12 sm:py-14">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {zh ? '所有班级' : es ? 'Todas las aulas' : 'All classrooms'}
          </Link>
          <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="eyebrow text-paper/70">
                <span className="eyebrow-line" aria-hidden="true" />
                {zh ? '班级' : es ? 'Aula' : 'Classroom'}
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
                {classroom.name}
              </h1>
              <p className="mt-3 text-white/70">
                {classroom.school ?? (zh ? '未填写学校' : es ? 'Sin escuela indicada' : 'No school listed')} · {students.length}{' '}
                {zh
                  ? '名学生'
                  : es
                    ? students.length === 1
                      ? 'estudiante'
                      : 'estudiantes'
                    : `student${students.length === 1 ? '' : 's'}`}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span
                  className="rounded-[6px] bg-white/10 px-5 py-2 font-mono text-3xl font-bold tracking-[0.25em] text-white ring-1 ring-inset ring-white/15"
                  aria-label={zh ? `班级代码 ${classroom.code}` : es ? `Código de clase ${classroom.code}` : `Class code ${classroom.code}`}
                >
                  {classroom.code}
                </span>
                <button
                  type="button"
                  className={lightBtn}
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
                <button
                  type="button"
                  className={lightBtn}
                  onClick={() => {
                    // Clean URL built from the app's base path, so the link
                    // works on the Pages project path and a custom domain alike.
                    const base = import.meta.env.BASE_URL.replace(/\/$/, '')
                    const link = `${window.location.origin}${base}/join?code=${classroom.code}`
                    void navigator.clipboard?.writeText(link)
                    toast(zh ? '加入链接已复制！' : es ? '¡Enlace para unirse copiado!' : 'Join link copied!', 'success')
                  }}
                >
                  <Link2 className="h-4 w-4" aria-hidden="true" /> {zh ? '复制加入链接' : es ? 'Copiar enlace' : 'Copy join link'}
                </button>
                <span role="status" className="sr-only">
                  {copied ? (zh ? `班级代码 ${classroom.code} 已复制` : es ? `Código de clase ${classroom.code} copiado` : `Class code ${classroom.code} copied`) : ''}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={lightBtn}
                onClick={() => void load()}
                disabled={loading}
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" /> {loading ? (zh ? '刷新中…' : es ? 'Actualizando…' : 'Refreshing…') : zh ? '刷新' : es ? 'Actualizar' : 'Refresh'}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[5px] border border-red-400/40 px-4 py-2 text-sm font-display font-semibold text-red-300 transition-[transform,background-color,color] duration-150 hover:bg-red-500/15 hover:text-red-200 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => void handleArchive()}
                disabled={archiving}
              >
                {archiving ? (zh ? '归档中…' : es ? 'Archivando…' : 'Archiving…') : zh ? '归档班级' : es ? 'Archivar clase' : 'Archive class'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* ---------- Assignments ---------- */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <ClipboardList className="h-5 w-5 text-ink" aria-hidden="true" />
            {zh ? '作业' : es ? 'Tareas' : 'Assignments'}
          </h2>

          {assignments.length === 0 ? (
            <p className="card mt-4 text-sm text-pebble">
              {zh
                ? '还没有布置任何内容——在下方选择一个活动，它就会显示在每位学生的主页上。'
                : es
                  ? 'Aún no hay nada asignado: elige una actividad abajo y aparecerá en la página de inicio de cada estudiante.'
                  : "Nothing assigned yet — pick an activity below and it will show up on every student's home page."}
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {assignments.map((a) => {
                const meta = getActivity(a.activity_slug)
                return (
                  <li key={a.id} className="card flex items-start gap-3 p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-soft text-ink">
                      <AppIcon name={meta?.icon ?? 'help'} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display font-semibold text-ink">
                        {meta?.title ?? a.activity_slug}
                      </p>
                      {a.note && <p className="text-sm text-pebble">{a.note}</p>}
                      {a.due_at && (
                        <p className="mt-0.5 text-xs font-semibold text-ink">
                          {zh ? '截止 ' : es ? 'Fecha límite ' : 'Due '}{formatDate(a.due_at)}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="btn-ghost px-2 py-1 text-sm text-pebble hover:text-red-600"
                      onClick={() => void handleUnassign(a)}
                      aria-label={zh ? `移除作业 ${meta?.title ?? a.activity_slug}` : es ? `Quitar la tarea ${meta?.title ?? a.activity_slug}` : `Remove assignment ${meta?.title ?? a.activity_slug}`}
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Assign an activity */}
          <form
            onSubmit={handleAssign}
            className="card mt-4 flex flex-col gap-3 border-2 border-dashed border-bff-200 bg-paper-soft/40"
          >
            <h3 className="font-display font-bold text-ink">
              {zh ? '布置一项活动' : es ? 'Asignar una actividad' : 'Assign an activity'}
            </h3>
            {unassigned.length === 0 ? (
              <p className="text-sm text-pebble">
                {zh ? '所有活动都已布置——太棒了！' : es ? 'Todas las actividades ya están asignadas. ¡Genial!' : 'Every activity is already assigned — nice!'}
              </p>
            ) : (
              <>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-ink">
                    {zh ? '活动' : es ? 'Actividad' : 'Activity'}<span className="text-red-500"> *</span>
                  </span>
                  <select
                    className="input"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      {zh ? '选择一项活动…' : es ? 'Elige una actividad…' : 'Choose an activity…'}
                    </option>
                  {unassignedLessons.length > 0 && (
                    <optgroup label={zh ? '课程' : es ? 'Lecciones' : 'Lessons'}>
                      {unassignedLessons.map((a) => (
                        <option key={a.slug} value={a.slug}>
                          {a.title}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {unassignedOther.length > 0 && (
                    <optgroup label={zh ? '游戏与挑战' : es ? 'Juegos y retos' : 'Games & Challenges'}>
                      {unassignedOther.map((a) => (
                        <option key={a.slug} value={a.slug}>
                          {a.title}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-ink">
                    {zh ? '给学生的备注' : es ? 'Nota para los estudiantes' : 'Note for students'}{' '}
                    <span className="font-normal text-pebble">{zh ? '（可选）' : es ? '(opcional)' : '(optional)'}</span>
                  </span>
                  <input
                    className="input"
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={zh ? '例如 在周五上课前完成' : es ? 'p. ej. Termínalo antes de la clase del viernes' : "e.g. Finish before Friday's class"}
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-semibold text-ink">
                    {zh ? '截止日期' : es ? 'Fecha límite' : 'Due date'} <span className="font-normal text-pebble">{zh ? '（可选）' : es ? '(opcional)' : '(optional)'}</span>
                  </span>
                  <input
                    className="input"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </label>
                {assignError && (
                  <p
                    role="alert"
                    className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {assignError}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={assigning || !slug}
                >
                  {assigning ? (zh ? '布置中…' : es ? 'Asignando…' : 'Assigning…') : zh ? '布置' : es ? 'Asignar' : 'Assign'}
                </button>
              </>
            )}
          </form>
        </section>

        {/* ---------- Live game ---------- */}
        <section>
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Play className="h-5 w-5 text-ink" aria-hidden="true" />
            {zh ? '实时游戏' : es ? 'Juego en vivo' : 'Live game'}
          </h2>
          <div className="mt-4">
            <HostLauncher classroomId={classroom.id} />
          </div>
        </section>
      </div>

      {/* ---------- Students & progress ---------- */}
      <section className="mt-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Users className="h-5 w-5 text-ink" aria-hidden="true" />
            {zh ? '学生与进度' : es ? 'Estudiantes y progreso' : 'Students & progress'}
          </h2>
          {students.length > 0 && (
            <button
              type="button"
              className="btn-secondary text-sm"
              onClick={handleExportCsv}
            >
              <Download className="h-4 w-4" aria-hidden="true" /> {zh ? '导出 CSV' : es ? 'Exportar CSV' : 'Export CSV'}
            </button>
          )}
        </div>

        {/* Class analytics at a glance */}
        {students.length > 0 && (
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-pebble">
                {zh ? '学生' : es ? 'Estudiantes' : 'Students'}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">
                {students.length}
              </dd>
            </div>
            <div className="card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-pebble">
                {zh ? '本周活跃' : es ? 'Activos esta semana' : 'Active this week'}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">
                {activeStudentIds.size}
                <span className="text-base font-semibold text-pebble">
                  /{students.length}
                </span>
              </dd>
            </div>
            <div className="card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-pebble">
                {zh ? '完成率' : es ? 'Finalización' : 'Completion'}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">
                {assignments.length === 0 ? '—' : `${completionPct}%`}
              </dd>
            </div>
            <div className="card p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-pebble">
                {zh ? '班级平均分' : es ? 'Puntuación media de la clase' : 'Class avg score'}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">
                {classAvg == null ? '—' : classAvg}
              </dd>
            </div>
          </dl>
        )}

        {students.length === 0 ? (
          <div className="card mt-4 text-center">
            <Backpack className="mx-auto h-8 w-8 text-pebble" aria-hidden="true" />
            <p className="mt-2 font-display font-semibold text-ink">
              {zh ? '还没有学生' : es ? 'Aún no hay estudiantes' : 'No students yet'}
            </p>
            <p className="mx-auto mt-1 max-w-md text-sm text-pebble">
              {zh ? '分享班级代码 ' : es ? 'Comparte el código de clase ' : 'Share the class code '}
              <span className="font-mono font-bold tracking-widest text-ink">
                {classroom.code}
              </span>{' '}
              {zh
                ? '——学生在本网站上点击「加入班级」，只需一个昵称即可加入。无需电子邮箱。'
                : es
                  ? '— los estudiantes entran en este sitio y pulsan "Unirse a la clase", solo con un apodo. Sin correo electrónico.'
                  : '— students join at this site by tapping "Join Class", with just a nickname. No email needed.'}
            </p>
          </div>
        ) : (
          <>
            {mergeFrom && (
              <div
                role="status"
                className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-[8px] border border-bff-300 bg-paper-soft px-4 py-3 text-sm"
              >
                <span className="text-ink">
                  {zh
                    ? `选择要把“${mergeFrom.nickname}”并入的同学。两条记录中较好的成绩会保留。`
                    : es
                      ? `Elige con quién combinar a "${mergeFrom.nickname}". Se conserva el mejor resultado de cada actividad.`
                      : `Pick who to merge "${mergeFrom.nickname}" into. The better result for each activity is kept.`}
                </span>
                <button type="button" onClick={() => setMergeFrom(null)} className="btn-secondary px-3 py-1.5 text-sm">
                  {zh ? '取消' : es ? 'Cancelar' : 'Cancel'}
                </button>
              </div>
            )}
            <div className="card mt-4 overflow-x-auto p-0">
              <table className="w-full min-w-max text-left text-sm">
                <caption className="sr-only">
                  {zh
                    ? `${classroom.name} 的学生及其在每项已布置活动上的进度`
                    : es
                      ? `Estudiantes de ${classroom.name} y su progreso en cada actividad asignada`
                      : `Students in ${classroom.name} and their progress on each assigned activity`}
                </caption>
                <thead>
                  <tr className="border-b border-stone bg-paper-soft text-xs uppercase tracking-wide text-pebble">
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {zh ? '学生' : es ? 'Estudiante' : 'Student'}
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      {zh ? '加入时间' : es ? 'Se unió' : 'Joined'}
                    </th>
                    {assignments.map((a) => {
                      const meta = getActivity(a.activity_slug)
                      return (
                        <th
                          key={a.id}
                          scope="col"
                          className="whitespace-nowrap px-4 py-3 font-semibold"
                        >
                          <AppIcon
                            name={meta?.icon ?? 'help'}
                            className="mr-1.5 inline-block h-4 w-4 align-[-0.2em]"
                          />
                          {meta?.title ?? a.activity_slug}
                        </th>
                      )
                    })}
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => {
                    const byActivity = progressByStudent.get(s.id)
                    return (
                      <tr key={s.id} className="border-b border-stone last:border-0">
                        <th
                          scope="row"
                          className="whitespace-nowrap px-4 py-3 text-left font-semibold text-ink"
                        >
                          {editingId === s.id ? (
                            <span className="flex items-center gap-1.5">
                              <input
                                className="input w-40 px-2 py-1 text-sm"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') void handleRename(s)
                                  if (e.key === 'Escape') setEditingId(null)
                                }}
                                aria-label={zh ? '学生姓名' : es ? 'Nombre del estudiante' : 'Student name'}
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => void handleRename(s)}
                                disabled={rosterBusy}
                                className="rounded p-1 text-green-700 hover:bg-green-50"
                                aria-label={zh ? '保存' : es ? 'Guardar' : 'Save'}
                              >
                                <Check className="h-4 w-4" aria-hidden="true" />
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingId(null)}
                                className="rounded p-1 text-pebble hover:bg-paper-soft"
                                aria-label={zh ? '取消' : es ? 'Cancelar' : 'Cancel'}
                              >
                                <X className="h-4 w-4" aria-hidden="true" />
                              </button>
                            </span>
                          ) : mergeFrom && mergeFrom.id !== s.id ? (
                            // Merge mode: every other row becomes a target.
                            <button
                              type="button"
                              onClick={() => void handleMergeInto(s)}
                              disabled={rosterBusy}
                              className="rounded-[5px] border border-bff-400 bg-paper-soft px-2 py-1 text-left text-ink hover:bg-paper-soft"
                            >
                              {zh ? `并入“${s.nickname}”` : es ? `Combinar con ${s.nickname}` : `Merge into ${s.nickname}`}
                            </button>
                          ) : (
                            <span className="group/name flex items-center gap-1.5">
                              {s.nickname}
                              {!mergeFrom && (
                                <span className="opacity-0 transition-opacity group-hover/name:opacity-100 focus-within:opacity-100">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditName(s.nickname)
                                      setEditingId(s.id)
                                    }}
                                    className="rounded p-1 text-pebble hover:bg-paper-soft hover:text-ink"
                                    aria-label={
                                      zh ? `重命名 ${s.nickname}` : es ? `Renombrar a ${s.nickname}` : `Rename ${s.nickname}`
                                    }
                                  >
                                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setMergeFrom(s)}
                                    className="rounded p-1 text-pebble hover:bg-paper-soft hover:text-ink"
                                    aria-label={
                                      zh ? `合并 ${s.nickname}` : es ? `Combinar a ${s.nickname}` : `Merge ${s.nickname}`
                                    }
                                    title={
                                      zh
                                        ? '把这条记录并入另一名同学（用于重复记录）'
                                        : es
                                          ? 'Combinar este registro con otro (para duplicados)'
                                          : 'Fold this record into another (for duplicates)'
                                    }
                                  >
                                    <Merge className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => void handleRemove(s)}
                                    className="rounded p-1 text-pebble hover:bg-red-50 hover:text-red-600"
                                    aria-label={
                                      zh ? `移除 ${s.nickname}` : es ? `Quitar a ${s.nickname}` : `Remove ${s.nickname}`
                                    }
                                  >
                                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                                  </button>
                                </span>
                              )}
                            </span>
                          )}
                        </th>
                        <td className="whitespace-nowrap px-4 py-3 text-pebble">
                          {formatDate(s.created_at)}
                        </td>
                        {assignments.map((a) => (
                          <td key={a.id} className="px-4 py-3">
                            <ProgressChip row={byActivity?.get(a.activity_slug)} zh={zh} es={es} />
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            {assignments.length === 0 && (
              <p className="mt-2 text-sm text-pebble">
                {zh
                  ? '在上方布置一项活动，即可在此开始追踪进度。'
                  : es
                    ? 'Asigna una actividad arriba para empezar a seguir el progreso aquí.'
                    : 'Assign an activity above to start tracking progress here.'}
              </p>
            )}

            {/* Per-activity completion summary */}
            {summaries.length > 0 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {summaries.map((sm) => {
                  const pct = sm.total > 0 ? Math.round((sm.completed / sm.total) * 100) : 0
                  return (
                    <div key={sm.slug} className="card p-4">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                          <AppIcon name={sm.icon} className="h-4 w-4 shrink-0 text-ink" />
                          {sm.title}
                        </p>
                        <p className="whitespace-nowrap text-xs text-pebble">
                          {sm.completed}/{sm.total} {zh ? '已完成' : es ? 'completadas' : 'completed'}
                          {sm.avg != null && (zh ? `，平均分 ${sm.avg}` : es ? `, puntuación media ${sm.avg}` : `, avg score ${sm.avg}`)}
                        </p>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper-soft">
                        <div
                          className="h-full rounded-full bg-bff-500 transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* ---------- Per-question results ----------
                The answer data was already being fetched by fetchRoster and
                then discarded. This is what turns "Jayden scored 71%" into
                "fourteen students missed the APR question". */}
            {lessonAssignments.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow">
                  <span className="eyebrow-line" aria-hidden="true" />
                  {zh ? '逐题结果' : es ? 'Resultados por pregunta' : 'Question by question'}
                </p>
                <p className="mt-2 text-sm text-pebble">
                  {zh
                    ? '看看全班在每道测验题上的表现，决定下节课该重点复习什么。'
                    : es
                      ? 'Mira cómo le fue a la clase en cada pregunta para decidir qué repasar.'
                      : 'See how the class did on each quiz question, so you know what to reteach.'}
                </p>
                <div className="mt-3 space-y-2">
                  {lessonAssignments.map((a) => {
                    const meta = getActivity(a.activity_slug)
                    const open = breakdownSlug === a.activity_slug
                    return (
                      <div key={a.id} className="rounded-[8px] border border-stone">
                        <button
                          type="button"
                          onClick={() => setBreakdownSlug(open ? null : a.activity_slug)}
                          aria-expanded={open}
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-display text-sm font-semibold text-ink hover:bg-paper-soft"
                        >
                          <span className="flex items-center gap-2">
                            <AppIcon name={meta?.icon ?? 'help'} className="h-4 w-4 shrink-0 text-ink" />
                            {meta?.title ?? a.activity_slug}
                          </span>
                          <ChevronDown
                            className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                            aria-hidden="true"
                          />
                        </button>
                        {open && (
                          <div className="border-t border-stone px-4 pb-4">
                            <QuestionBreakdown slug={a.activity_slug} rows={progress} zh={zh} es={es} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </section>

      {/* ---------- Class leaderboard ---------- */}
      {students.length > 0 && (
        <section className="mt-12">
          <ClassLeaderboard classroomId={classroom.id} />
        </section>
      )}
      </div>
    </div>
  )
}
