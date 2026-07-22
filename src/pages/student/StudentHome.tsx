import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ACTIVITIES, getActivity, kindLabel, localizeActivity } from '../../lib/activities'
import { BACKEND_ENABLED } from '../../lib/config'
import type { ActivityProgress } from '../../lib/progress'
import { loadLocalProgress } from '../../lib/progress'
import { totalXp } from '../../lib/xp'
import { resumeLesson } from '../../lib/resume'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import LevelCard from '../../components/LevelCard'
import ClassLeaderboard from '../../components/ClassLeaderboard'
import { SkeletonCard } from '../../components/Skeleton'

interface AssignmentRow {
  activity_slug: string
  note: string | null
  due_at: string | null
}

function ProgressChip({
  progress,
  es,
  zh,
}: {
  progress: ActivityProgress | undefined
  es: boolean
  zh: boolean
}) {
  if (progress?.status === 'completed') {
    return (
      <span className="chip bg-green-100 text-green-700">
        <span aria-hidden="true">✓</span> {zh ? '已完成' : es ? 'Completado' : 'Completed'}
        {progress.score != null ? ` · ${Math.round(progress.score)}%` : ''}
      </span>
    )
  }
  if (progress?.status === 'started') {
    return (
      <span className="chip bg-amber-100 text-amber-700">{zh ? '进行中' : es ? 'En progreso' : 'In progress'}</span>
    )
  }
  return (
    <span className="chip bg-slate-100 text-slate-600">{zh ? '未开始' : es ? 'Sin empezar' : 'Not started'}</span>
  )
}

function formatDue(dueAt: string, es: boolean, zh: boolean): string {
  const due = new Date(dueAt)
  if (Number.isNaN(due.getTime())) return dueAt
  return due.toLocaleDateString(zh ? 'zh-CN' : es ? 'es' : undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function StudentHome() {
  const { student, leaveClass } = useStudent()
  const navigate = useNavigate()
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const progress = useMemo(() => loadLocalProgress(), [])

  // null = loading; [] = loaded and empty (or backend disabled).
  const [assignments, setAssignments] = useState<AssignmentRow[] | null>(
    BACKEND_ENABLED ? null : [],
  )
  const [loadError, setLoadError] = useState<string | null>(null)
  // true once we confirm the mentor archived (closed) this class.
  const [classClosed, setClassClosed] = useState(false)

  const classroomId = student?.classroomId
  const studentId = student?.studentId
  useEffect(() => {
    if (!BACKEND_ENABLED || !classroomId || !studentId) return
    let cancelled = false
    async function load() {
      const { supabase } = await import('../../lib/supabase')
      if (!supabase) {
        if (!cancelled) setAssignments([])
        return
      }
      // Is the class still open? An archived class should read as closed.
      const { data: state } = await supabase.rpc('student_classroom_state', {
        p_student_id: studentId,
      })
      const row = Array.isArray(state) ? state[0] : state
      if (!cancelled && row?.archived === true) {
        setClassClosed(true)
        setAssignments([])
        return
      }

      const { data, error } = await supabase
        .from('assignments')
        .select('activity_slug, note, due_at')
        .eq('classroom_id', classroomId)
        .order('due_at', { ascending: true, nullsFirst: false })
      if (cancelled) return
      if (error) {
        setLoadError(
          zh
            ? '现在没能加载你的作业——先看看下面的课程吧！'
            : es
            ? 'No pudimos cargar tus tareas ahora mismo — ¡mejor revisa las lecciones de abajo!'
            : 'Could not load your assignments right now — pull up the lessons below instead!',
        )
        setAssignments([])
      } else {
        setAssignments((data ?? []) as AssignmentRow[])
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [classroomId, studentId])

  const allActivities = useMemo(() => [...ACTIVITIES].sort((a, b) => a.sortKey - b.sortKey), [])
  const completedCount = allActivities.filter(
    (a) => progress[a.slug]?.status === 'completed',
  ).length
  const xp = useMemo(() => totalXp(progress), [progress])
  const resume = useMemo(() => resumeLesson(), [])

  if (!student) {
    return <Navigate to="/join" replace />
  }

  function handleLeave() {
    const sure = window.confirm(
      zh
        ? '要离开这个班级吗？你的进度仍会保存在这台设备上，但重新加入时需要班级代码。'
        : es
        ? '¿Salir de esta clase? Tu progreso se queda guardado en este dispositivo, pero necesitarás el código de clase para volver a entrar.'
        : 'Leave this class? Your progress stays saved on this device, but you will need the class code to rejoin.',
    )
    if (!sure) return
    leaveClass()
    navigate('/')
  }

  // The mentor archived (closed) this class — the student can no longer use it.
  if (classClosed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="card animate-pop-in text-center">
          <p className="text-5xl" aria-hidden="true">🔒</p>
          <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
            {zh ? '这个班级已关闭' : es ? 'Esta clase está cerrada' : 'This class is closed'}
          </h1>
          <p className="mt-3 leading-relaxed text-slate-600">
            {zh ? (
              <>
                你的导师关闭了 <span className="font-semibold">{student.classroomName}</span>
                ，所以它已不再活跃。你的进度仍然保存着——而且每一节课、每个游戏和挑战都依然开放，你可以自己去探索。
              </>
            ) : es ? (
              <>
                Tu mentor cerró <span className="font-semibold">{student.classroomName}</span>, así
                que ya no está activa. Tu progreso sigue guardado — y cada lección, juego y desafío
                sigue abierto para que lo explores por tu cuenta.
              </>
            ) : (
              <>
                Your mentor closed <span className="font-semibold">{student.classroomName}</span>, so
                it's no longer active. Your progress is still saved — and every lesson, game, and
                challenge is still open to explore on your own.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/lessons" className="btn-primary">
              {zh ? '继续学习' : es ? 'Seguir aprendiendo' : 'Keep learning'} <span aria-hidden="true">📚</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                leaveClass()
                navigate('/join')
              }}
              className="btn-secondary"
            >
              {zh ? '加入其他班级' : es ? 'Unirse a otra clase' : 'Join a different class'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {zh ? '你好' : es ? '¡Hola' : 'Hey'} {student.nickname}! <span aria-hidden="true">👋</span>
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="chip bg-bff-100 text-bff-800">
              <span aria-hidden="true">🏫</span> {student.classroomName}
            </span>
            <span className="chip bg-slate-100 text-slate-600">
              {zh ? '代码' : es ? 'Código' : 'Code'}: {student.classCode}
            </span>
          </div>
        </div>
        <button type="button" onClick={handleLeave} className="btn-ghost text-sm">
          {zh ? '离开班级' : es ? 'Salir de la clase' : 'Leave class'}
        </button>
      </div>

      {/* Level + XP */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <LevelCard xp={xp} />
        <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-6 py-4">
          <p className="font-display font-semibold text-slate-700">
            {completedCount > 0
              ? zh
                ? `你已经完成了 ${completedCount} / ${allActivities.length} 个活动 🎉`
                : es
                ? `Has completado ${completedCount} de ${allActivities.length} actividades 🎉`
                : `You've completed ${completedCount} of ${allActivities.length} activities 🎉`
              : zh
                ? `${allActivities.length} 个活动在等着你——一起把第一个搞定吧！💪`
                : es
                ? `${allActivities.length} actividades te esperan — ¡vamos a completar la primera! 💪`
                : `${allActivities.length} activities are waiting for you — let's get that first one done! 💪`}
          </p>
        </div>
      </div>

      {/* Continue where you left off */}
      {resume && (
        <Link
          to={resume.path}
          className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-bff-200 bg-bff-50 px-6 py-4 transition hover:border-bff-300 hover:bg-bff-100"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-bff-600">
              {resume.inProgress
                ? zh
                  ? '从上次离开的地方继续'
                  : es
                  ? 'Continúa donde lo dejaste'
                  : 'Continue where you left off'
                : zh
                  ? '你的下一节课'
                  : es
                  ? 'Tu próxima lección'
                  : 'Your next lesson'}
            </p>
            <p className="mt-0.5 font-display text-lg font-bold text-slate-900">
              {(() => {
                const meta = getActivity(resume.slug)
                return meta ? localizeActivity(meta, lang).title : resume.title
              })()}
            </p>
          </div>
          <span className="btn-primary shrink-0 px-4 py-2 text-sm">
            {resume.inProgress ? (zh ? '继续' : es ? 'Continuar' : 'Continue') : zh ? '开始' : es ? 'Empezar' : 'Start'}{' '}
            <span aria-hidden="true">→</span>
          </span>
        </Link>
      )}

      {/* Class leaderboard */}
      {BACKEND_ENABLED && classroomId && (
        <section className="mt-8">
          <ClassLeaderboard classroomId={classroomId} highlightStudentId={studentId} />
        </section>
      )}

      {/* Assigned work */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-slate-900">
          {zh ? '你的作业' : es ? 'Tus tareas asignadas' : 'Your assigned work'}
        </h2>
        {loadError && (
          <p
            role="alert"
            className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-700"
          >
            {loadError}
          </p>
        )}
        {assignments === null ? (
          <div
            className="mt-4 grid gap-4 sm:grid-cols-2"
            role="status"
            aria-label={zh ? '正在加载你的作业……' : es ? 'Cargando tus tareas…' : 'Loading your assignments…'}
          >
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : assignments.length === 0 ? (
          !loadError && (
            <div className="card mt-4 text-center">
              <p className="text-3xl" aria-hidden="true">🏖️</p>
              <p className="mt-2 font-display font-semibold text-slate-700">
                {zh ? '目前还没有布置作业——去下面探索吧！' : es ? 'Nada asignado todavía — ¡explora abajo!' : 'Nothing assigned yet — explore below!'}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {zh
                  ? '随着你的班级学习 BFF Academy，你的导师会在这里发布课程和游戏。'
                  : es
                  ? 'Tu mentor publicará lecciones y juegos aquí a medida que tu clase avance por BFF Academy.'
                  : 'Your mentor will post lessons and games here as your class works through BFF Academy.'}
              </p>
            </div>
          )
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {assignments.map((asg) => {
              const activity = getActivity(asg.activity_slug)
              if (!activity) return null
              const p = progress[activity.slug]
              const local = localizeActivity(activity, lang)
              return (
                <div key={asg.activity_slug} className="card flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden="true">{activity.emoji}</span>
                      <div>
                        <p className="font-display font-bold text-slate-900">{local.title}</p>
                        <p className="text-xs font-semibold text-slate-500">
                          {kindLabel(activity.kind, lang)} · ~{activity.durationMin} min
                        </p>
                      </div>
                    </div>
                    <ProgressChip progress={p} es={es} zh={zh} />
                  </div>
                  {asg.note && (
                    <p className="mt-3 rounded-xl bg-bff-50 px-4 py-3 text-sm text-bff-900">
                      <span aria-hidden="true">💬</span>{' '}
                      <span className="font-semibold">{zh ? '来自你的导师：' : es ? 'De tu mentor:' : 'From your mentor:'}</span> {asg.note}
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      {asg.due_at ? (
                        <>
                          <span aria-hidden="true">📅</span> {zh ? '截止' : es ? 'Entrega' : 'Due'} {formatDue(asg.due_at, es, zh)}
                        </>
                      ) : zh ? (
                        '没有截止日期'
                      ) : es ? (
                        'Sin fecha de entrega'
                      ) : (
                        'No due date'
                      )}
                    </span>
                    <Link to={activity.path} className="btn-primary px-4 py-2 text-sm">
                      {p?.status === 'completed'
                        ? zh
                          ? '再玩一次'
                          : es
                          ? 'Jugar de nuevo'
                          : 'Play again'
                        : p?.status === 'started'
                          ? zh
                            ? '继续'
                            : es
                            ? 'Continuar'
                            : 'Continue'
                          : zh
                            ? '开始'
                            : es
                            ? 'Empezar'
                            : 'Start'}{' '}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* Keep learning */}
      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-slate-900">
          {zh ? '继续学习' : es ? 'Seguir aprendiendo' : 'Keep learning'}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {zh
            ? 'BFF Classroom 里的一切都向你开放——无论是否被布置。'
            : es
            ? 'Todo en BFF Classroom está disponible para ti — asignado o no.'
            : 'Everything in BFF Classroom is open to you — assigned or not.'}
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allActivities.map((a) => {
            const p = progress[a.slug]
            const local = localizeActivity(a, lang)
            return (
              <Link
                key={a.slug}
                to={a.path}
                className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-bff-300 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-3xl" aria-hidden="true">{a.emoji}</span>
                  <span className="chip bg-bff-50 text-bff-700">{kindLabel(a.kind, lang)}</span>
                </div>
                <p className="mt-3 font-display font-bold text-slate-900 group-hover:text-bff-700">
                  {local.title}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-slate-500">
                    <span aria-hidden="true">⏱️</span> ~{a.durationMin} min
                  </span>
                  <ProgressChip progress={p} es={es} zh={zh} />
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
