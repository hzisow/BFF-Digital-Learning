import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Check, Clock, Flame, Lock, MessageSquare, PartyPopper, School, Umbrella } from 'lucide-react'
import { ACTIVITIES, getActivity, kindLabel, localizeActivity } from '../../lib/activities'
import { AppIcon } from '../../lib/icons'
import { BACKEND_ENABLED } from '../../lib/config'
import type { ActivityProgress } from '../../lib/progress'
import { loadLocalProgress } from '../../lib/progress'
import { levelInfo, totalXp } from '../../lib/xp'
import { resumeLesson } from '../../lib/resume'
import { dueChipClass, dueInfo, dueLabel, isUrgent } from '../../lib/dueDate'
import { useStudent } from '../../lib/session'
import { useLang } from '../../lib/i18n'
import LevelCard from '../../components/LevelCard'
import ClassLeaderboard from '../../components/ClassLeaderboard'
import { Loading, SkeletonCard } from '../../components/Skeleton'

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
        <Check className="h-3.5 w-3.5" aria-hidden="true" /> {zh ? '已完成' : es ? 'Completado' : 'Completed'}
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
      const { getSupabase } = await import('../../lib/supabase')
      const supabase = await getSupabase()
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
  const level = useMemo(() => levelInfo(xp).level, [xp])
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
        <div className="animate-pop-in text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-sm">
            <Lock className="h-7 w-7" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <p className="eyebrow mt-6 justify-center text-ink/50">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '班级' : es ? 'Clase' : 'Class'}
          </p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
            {zh ? (
              <>这个班级已<em>关闭</em></>
            ) : es ? (
              <>Esta clase está <em>cerrada</em></>
            ) : (
              <>This class is <em>closed</em></>
            )}
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink/70">
            {zh ? (
              <>
                你的导师关闭了 <span className="font-semibold text-ink">{student.classroomName}</span>
                ，所以它已不再活跃。你的进度仍然保存着——而且每一节课、每个游戏和挑战都依然开放，你可以自己去探索。
              </>
            ) : es ? (
              <>
                Tu mentor cerró <span className="font-semibold text-ink">{student.classroomName}</span>, así
                que ya no está activa. Tu progreso sigue guardado — y cada lección, juego y desafío
                sigue abierto para que lo explores por tu cuenta.
              </>
            ) : (
              <>
                Your mentor closed <span className="font-semibold text-ink">{student.classroomName}</span>, so
                it's no longer active. Your progress is still saved — and every lesson, game, and
                challenge is still open to explore on your own.
              </>
            )}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/lessons" className="btn-primary">
              {zh ? '继续学习' : es ? 'Seguir aprendiendo' : 'Keep learning'} <BookOpen className="h-4 w-4" aria-hidden="true" />
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
      {/* Editorial hero: greeting + bold stats */}
      <div className="ed-hero rounded-3xl px-6 py-9 sm:px-10 sm:py-11">
        <span aria-hidden="true" className="ed-hero-orbit -right-24 -top-32 h-[420px] w-[420px]" />
        <span aria-hidden="true" className="ed-hero-orbit gold -left-32 bottom-[-9rem] h-[360px] w-[360px]" />
        <div className="relative z-[1]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-bff-200">
                <span className="eyebrow-line" aria-hidden="true" />
                {zh ? '你的主页' : es ? 'Tu panel' : 'Your dashboard'}
              </p>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
                {zh ? '你好 ' : es ? '¡Hola ' : 'Hey '}
                <span className="text-gold-400">{student.nickname}</span>!
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/15">
                  <School className="h-3.5 w-3.5" aria-hidden="true" /> {student.classroomName}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-bff-100 ring-1 ring-white/15">
                  {zh ? '代码' : es ? 'Código' : 'Code'}: {student.classCode}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleLeave}
              className="inline-flex items-center justify-center gap-2 rounded-[5px] px-4 py-2 font-display text-sm font-semibold text-white/70 transition-colors duration-150 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-bff-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
            >
              {zh ? '离开班级' : es ? 'Salir de la clase' : 'Leave class'}
            </button>
          </div>

          {/* Bold stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <div>
              <p className="font-display text-3xl font-extrabold text-gold-400 sm:text-4xl">
                {xp.toLocaleString()}
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-bff-200">XP</p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">{level}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-bff-200">
                {zh ? '等级' : es ? 'Nivel' : 'Level'}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {completedCount}
                <span className="text-xl font-bold text-bff-200">/{allActivities.length}</span>
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-bff-200">
                {zh ? '已完成' : es ? 'Completadas' : 'Completed'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Level + XP */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <LevelCard xp={xp} />
        <div className="card flex items-center gap-3">
          {completedCount > 0 ? (
            <PartyPopper className="h-6 w-6 shrink-0 text-bff-500" aria-hidden="true" />
          ) : (
            <Flame className="h-6 w-6 shrink-0 text-bff-500" aria-hidden="true" />
          )}
          <p className="font-display font-semibold text-slate-700">
            {completedCount > 0
              ? zh
                ? `你已经完成了 ${completedCount} / ${allActivities.length} 个活动`
                : es
                ? `Has completado ${completedCount} de ${allActivities.length} actividades`
                : `You've completed ${completedCount} of ${allActivities.length} activities`
              : zh
                ? `${allActivities.length} 个活动在等着你——一起把第一个搞定吧！`
                : es
                ? `${allActivities.length} actividades te esperan — ¡vamos a completar la primera!`
                : `${allActivities.length} activities are waiting for you — let's get that first one done!`}
          </p>
        </div>
      </div>

      {/* Continue where you left off */}
      {resume && (
        <Link
          to={resume.path}
          className="card lift accent-left mt-6 flex items-center justify-between gap-4 pl-7"
        >
          <div>
            <p className="eyebrow">
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
            <p className="mt-1 font-display text-lg font-bold text-ink">
              {(() => {
                const meta = getActivity(resume.slug)
                return meta ? localizeActivity(meta, lang).title : resume.title
              })()}
            </p>
            {/* Naming the step turns a vague nudge into a specific promise. */}
            {resume.step != null && resume.totalSteps != null && (
              <p className="mt-0.5 text-sm text-ink/60">
                {zh
                  ? `第 ${resume.step} 步，共 ${resume.totalSteps} 步`
                  : es
                    ? `Paso ${resume.step} de ${resume.totalSteps}`
                    : `Step ${resume.step} of ${resume.totalSteps}`}
              </p>
            )}
          </div>
          <span className="btn-primary shrink-0 px-4 py-2 text-sm">
            {resume.inProgress ? (zh ? '继续' : es ? 'Continuar' : 'Continue') : zh ? '开始' : es ? 'Empezar' : 'Start'}{' '}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
      <section className="mt-12">
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? '作业' : es ? 'Tareas' : 'Assignments'}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          {zh ? (
            <>你的<em>作业</em></>
          ) : es ? (
            <>Tus tareas <em>asignadas</em></>
          ) : (
            <>Your <em>assigned</em> work</>
          )}
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
          <Loading
            className="mt-4"
            label={zh ? '正在加载你的作业……' : es ? 'Cargando tus tareas…' : 'Loading your assignments…'}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </Loading>
        ) : assignments.length === 0 ? (
          !loadError && (
            <div className="card mt-4 text-center">
              <Umbrella className="mx-auto h-10 w-10 text-bff-500" strokeWidth={1.5} aria-hidden="true" />
              <p className="mt-3 font-display font-semibold text-slate-700">
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
              const due = dueInfo(asg.due_at)
              // A deadline only matters if the work is not already done.
              const pressing = due != null && isUrgent(due) && p?.status !== 'completed'
              return (
                <div
                  key={asg.activity_slug}
                  className={`card lift flex flex-col ${
                    pressing
                      ? due.urgency === 'overdue'
                        ? 'border-red-300 ring-1 ring-red-200'
                        : 'border-amber-300 ring-1 ring-amber-200'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
                        <AppIcon name={activity.icon} className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="font-display font-bold text-slate-900">{local.title}</p>
                        <p className="text-xs font-semibold text-slate-500">
                          {kindLabel(activity.kind, lang)} · ~{activity.durationMin} {zh ? '分钟' : 'min'}
                        </p>
                      </div>
                    </div>
                    <ProgressChip progress={p} es={es} zh={zh} />
                  </div>
                  {asg.note && (
                    <p className="mt-3 flex items-start gap-2 rounded-xl bg-bff-50 px-4 py-3 text-sm text-bff-900">
                      <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-bff-500" aria-hidden="true" />
                      <span>
                        <span className="font-semibold">{zh ? '来自你的导师：' : es ? 'De tu mentor:' : 'From your mentor:'}</span> {asg.note}
                      </span>
                    </p>
                  )}
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-slate-500">
                      {due ? (
                        // "Fri, Aug 7" reads like a fact. "Due tomorrow" reads
                        // like a deadline — and the exact date is still there
                        // for anyone planning further out.
                        <span className="inline-flex flex-wrap items-center gap-1.5">
                          <span
                            className={`chip px-2 py-0.5 text-[11px] ${dueChipClass(due.urgency)}`}
                          >
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {dueLabel(due, lang)}
                          </span>
                          <span className="text-slate-400">{formatDue(asg.due_at!, es, zh)}</span>
                        </span>
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
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? '课程库' : es ? 'Biblioteca' : 'Library'}
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">
          {zh ? (
            <>继续<em>学习</em></>
          ) : es ? (
            <>Seguir <em>aprendiendo</em></>
          ) : (
            <>Keep <em>learning</em></>
          )}
        </h2>
        <p className="mt-2 text-sm text-ink/60">
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
                className="card lift group flex flex-col p-5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bff-50 text-bff-700">
                    <AppIcon name={a.icon} className="h-6 w-6" />
                  </span>
                  <span className="chip bg-bff-50 text-bff-700">{kindLabel(a.kind, lang)}</span>
                </div>
                <p className="mt-3 font-display font-bold text-slate-900 group-hover:text-bff-700">
                  {local.title}
                </p>
                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> ~{a.durationMin} {zh ? '分钟' : 'min'}
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
