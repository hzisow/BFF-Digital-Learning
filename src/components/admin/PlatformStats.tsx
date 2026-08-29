// Org-wide numbers for the whole platform, not just the signed-in mentor's
// classes. Every other admin view is scoped by RLS to one mentor's own
// classrooms, which is right for teaching a class and no use for running a
// national program: nobody could say how many students were on the platform.
//
// The counts come from one security-definer RPC that returns aggregates only.
// Nothing here identifies a student.

import { useCallback, useEffect, useState } from 'react'
import {
  Activity,
  Award,
  BookOpen,
  GraduationCap,
  Play,
  RefreshCw,
  School,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ACTIVITIES, localizeActivity } from '../../lib/activities'
import type { ActLang } from '../../lib/activities'
import { useLang } from '../../lib/i18n'
import { errMsg, fetchPlatformStats, type PlatformStats as Stats } from '../../pages/admin/api'
import { Skeleton } from '../Skeleton'

function Tile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
}) {
  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 text-bff-700">
        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-ink/55">{label}</p>
      </div>
      <p className="mt-2 font-display text-3xl font-extrabold leading-none text-ink">{value}</p>
      {hint && <p className="mt-1.5 text-xs leading-snug text-ink/50">{hint}</p>}
    </div>
  )
}

/** Eight weeks of joins. A trend a director can read at a glance. */
function SignupTrend({
  weeks,
  lang,
}: {
  weeks: Array<{ week: string; count: number }>
  lang: ActLang
}) {
  const es = lang === 'es'
  const zh = lang === 'zh'
  if (weeks.length === 0) return null
  const peak = Math.max(...weeks.map((w) => w.count), 1)
  const total = weeks.reduce((sum, w) => sum + w.count, 0)

  const heading = zh ? '近 8 周加入人数' : es ? 'Altas de las últimas 8 semanas' : 'Joins over the last 8 weeks'

  return (
    <div className="card flex h-full flex-col p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display font-bold text-ink">{heading}</p>
        <p className="text-sm text-ink/55">
          {zh ? `合计 ${total} 人` : es ? `${total} en total` : `${total} total`}
        </p>
      </div>
      {/* The bars are decorative; the numbers underneath and the summary below
          carry the same information for anyone not looking at shapes. */}
      <div className="mt-6 flex flex-1 items-end gap-2 pb-1" aria-hidden="true">
        {weeks.map((w) => (
          <div key={w.week} className="flex flex-1 flex-col items-center gap-1.5">
            <span className="text-[0.7rem] font-semibold text-ink/60">{w.count}</span>
            <div
              className="w-full rounded-t-[3px] bg-bff-500"
              style={{ height: `${Math.max(4, Math.round((w.count / peak) * 84))}px` }}
            />
            <span className="text-[0.65rem] text-ink/40">
              {new Date(w.week).toLocaleDateString(zh ? 'zh-CN' : es ? 'es-MX' : 'en-US', {
                month: 'numeric',
                day: 'numeric',
              })}
            </span>
          </div>
        ))}
      </div>
      <p className="sr-only">
        {weeks
          .map((w) => `${new Date(w.week).toLocaleDateString()}: ${w.count}`)
          .join(', ')}
      </p>
    </div>
  )
}

/** What students actually finish, most-used first. */
function TopActivities({
  rows,
  lang,
}: {
  rows: Array<{ slug: string; count: number }>
  lang: ActLang
}) {
  const es = lang === 'es'
  const zh = lang === 'zh'
  if (rows.length === 0) return null
  const peak = Math.max(...rows.map((r) => r.count), 1)

  return (
    <div className="card h-full p-5">
      <p className="font-display font-bold text-ink">
        {zh ? '最常完成的活动' : es ? 'Actividades más completadas' : 'Most completed activities'}
      </p>
      <ul className="mt-4 space-y-2.5">
        {rows.map((row) => {
          const meta = ACTIVITIES.find((a) => a.slug === row.slug)
          // A slug with no catalog entry is content that was renamed or removed;
          // show the slug rather than dropping the row and undercounting.
          const title = meta ? localizeActivity(meta, lang).title : row.slug
          return (
            <li key={row.slug} className="flex items-center gap-3">
              <span className="w-36 shrink-0 truncate text-sm text-ink/75 sm:w-52" title={title}>
                {title}
              </span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-paper-deep">
                <span
                  className="block h-full rounded-full bg-bff-500"
                  style={{ width: `${Math.max(3, Math.round((row.count / peak) * 100))}%` }}
                />
              </span>
              <span className="w-10 shrink-0 text-right text-sm font-semibold text-ink">
                {row.count}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default function PlatformStats() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(true)

  const load = useCallback(async () => {
    setBusy(true)
    setError(null)
    try {
      setStats(await fetchPlatformStats())
    } catch (err) {
      setError(errMsg(err))
    } finally {
      setBusy(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const num = (n: number) => n.toLocaleString(zh ? 'zh-CN' : es ? 'es-MX' : 'en-US')

  if (busy && !stats) {
    return (
      <section className="mt-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 rounded-[10px]" />
          ))}
        </div>
      </section>
    )
  }

  // A mentor whose approval has not come through yet gets nothing from the RPC.
  // That is not an error worth shouting about on a dashboard that otherwise
  // works, so the section simply does not appear.
  if (error && /NOT_APPROVED|permission/i.test(error)) return null

  return (
    <section className="mt-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            {zh ? '全平台' : es ? 'Toda la plataforma' : 'Across the platform'}
            <span className="eyebrow-line" aria-hidden="true" />
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink">
            {zh ? 'BFF Classroom 全局数据' : es ? 'BFF Classroom en conjunto' : 'BFF Classroom at a glance'}
          </h2>
        </div>
        <button type="button" className="btn-ghost shrink-0" onClick={() => void load()} disabled={busy}>
          <RefreshCw className={`h-4 w-4 ${busy ? 'animate-spin' : ''}`} aria-hidden="true" />
          {zh ? '刷新' : es ? 'Actualizar' : 'Refresh'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-[10px] bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      {stats && (
        <>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Tile
              icon={Users}
              label={zh ? '学生总数' : es ? 'Estudiantes' : 'Students'}
              value={num(stats.students_total)}
              hint={
                zh
                  ? `本周活跃 ${num(stats.students_active_7d)} 人`
                  : es
                    ? `${num(stats.students_active_7d)} activos esta semana`
                    : `${num(stats.students_active_7d)} active this week`
              }
            />
            <Tile
              icon={School}
              label={zh ? '班级' : es ? 'Clases' : 'Classrooms'}
              value={num(stats.classrooms_active)}
              hint={
                zh
                  ? `覆盖 ${num(stats.schools)} 所学校`
                  : es
                    ? `en ${num(stats.schools)} escuelas`
                    : `across ${num(stats.schools)} schools`
              }
            />
            <Tile
              icon={GraduationCap}
              label={zh ? '导师' : es ? 'Mentores' : 'Mentors'}
              value={num(stats.mentors_approved)}
              hint={
                stats.mentors_pending > 0
                  ? zh
                    ? `${num(stats.mentors_pending)} 人待审批`
                    : es
                      ? `${num(stats.mentors_pending)} en espera de aprobación`
                      : `${num(stats.mentors_pending)} awaiting approval`
                  : undefined
              }
            />
            <Tile
              icon={Award}
              label={zh ? '结业学生' : es ? 'Graduados' : 'Graduates'}
              value={num(stats.graduates)}
              hint={
                zh
                  ? '八节核心课程全部过关'
                  : es
                    ? 'aprobaron las 8 lecciones del núcleo'
                    : 'passed all 8 core lessons'
              }
            />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Tile
              icon={BookOpen}
              label={zh ? '课程完成次数' : es ? 'Lecciones terminadas' : 'Lessons finished'}
              value={num(stats.lessons_completed)}
              hint={
                zh
                  ? `其中 ${num(stats.lessons_passed)} 次达到过关线`
                  : es
                    ? `${num(stats.lessons_passed)} superaron el examen`
                    : `${num(stats.lessons_passed)} of them passed the quiz`
              }
            />
            <Tile
              icon={Target}
              label={zh ? '测验平均分' : es ? 'Promedio de exámenes' : 'Average quiz score'}
              value={stats.avg_quiz_score == null ? '—' : `${stats.avg_quiz_score}%`}
              hint={zh ? '仅统计核心课程' : es ? 'solo lecciones del núcleo' : 'core lessons only'}
            />
            <Tile
              icon={Activity}
              label={zh ? '活动完成总数' : es ? 'Actividades completadas' : 'Activities completed'}
              value={num(stats.activities_completed)}
              hint={
                zh
                  ? '课程、游戏与挑战'
                  : es
                    ? 'lecciones, juegos y desafíos'
                    : 'lessons, games and challenges'
              }
            />
            <Tile
              icon={Play}
              label={zh ? '实时课堂场次' : es ? 'Sesiones en vivo' : 'Live sessions hosted'}
              value={num(stats.live_sessions)}
              hint={
                zh
                  ? `30 天内活跃 ${num(stats.students_active_30d)} 人`
                  : es
                    ? `${num(stats.students_active_30d)} activos en 30 días`
                    : `${num(stats.students_active_30d)} students active in 30 days`
              }
            />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <SignupTrend weeks={stats.signups_by_week} lang={lang} />
            <TopActivities rows={stats.top_activities} lang={lang} />
          </div>

          <p className="mt-3 text-xs text-ink/45">
            {zh ? '统计时间：' : es ? 'Actualizado: ' : 'As of '}
            {new Date(stats.generated_at).toLocaleString(
              zh ? 'zh-CN' : es ? 'es-MX' : 'en-US',
            )}
            {zh
              ? '。这些数字均为汇总统计，不包含任何学生个人信息。'
              : es
                ? '. Solo son totales: no incluyen información de ningún estudiante.'
                : '. These are totals only, and carry no information about any individual student.'}
          </p>
        </>
      )}
    </section>
  )
}
