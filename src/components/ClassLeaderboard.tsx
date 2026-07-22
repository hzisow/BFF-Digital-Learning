// Persistent class standings, ranked by XP. Used on the student home (their own
// class) and the mentor's classroom page. Privacy-safe: nicknames only.

import { useCallback, useEffect, useState } from 'react'
import { fetchLeaderboard, type LeaderboardRow } from '../lib/leaderboard'
import { levelInfo } from '../lib/xp'
import { useLang } from '../lib/i18n'
import { SkeletonRow } from './Skeleton'

const MEDALS = ['🥇', '🥈', '🥉']

export default function ClassLeaderboard({
  classroomId,
  highlightStudentId,
}: {
  classroomId: string
  /** Optional: the current student, so their row stands out. */
  highlightStudentId?: string
}) {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const [rows, setRows] = useState<LeaderboardRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setRows(await fetchLeaderboard(classroomId))
    } catch {
      setError(zh ? '无法加载排行榜。' : es ? 'No se pudo cargar la tabla.' : 'Could not load the leaderboard.')
    } finally {
      setLoading(false)
    }
  }, [classroomId, es, zh])

  useEffect(() => {
    void load()
  }, [load])

  return (
    <div className="card">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-lg font-bold text-slate-900">
          <span aria-hidden="true">🏅</span> {zh ? '班级排行榜' : es ? 'Tabla de la clase' : 'Class leaderboard'}
        </h2>
        <button
          type="button"
          className="btn-ghost text-sm"
          onClick={() => void load()}
          disabled={loading}
        >
          <span aria-hidden="true">↻</span> {zh ? '刷新' : es ? 'Actualizar' : 'Refresh'}
        </button>
      </div>

      {error && (
        <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {loading && rows.length === 0 ? (
        <div className="mt-4 space-y-3" role="status" aria-label={zh ? '加载中…' : es ? 'Cargando…' : 'Loading…'}>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ) : rows.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">
          {zh
            ? '还没有积分！完成一个活动就能登上榜单。'
            : es
              ? '¡Aún no hay puntos! Completa una actividad para aparecer aquí.'
              : 'No points yet — finish an activity to land on the board!'}
        </p>
      ) : (
        <ol className="mt-4 space-y-1.5">
          {rows.map((r, i) => {
            const info = levelInfo(r.xp)
            const isMe = highlightStudentId === r.student_id
            return (
              <li
                key={r.student_id}
                className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                  isMe ? 'bg-bff-50 ring-1 ring-bff-200' : 'odd:bg-slate-50'
                }`}
              >
                <span
                  className="w-7 shrink-0 text-center font-display text-sm font-bold text-slate-500"
                  aria-hidden="true"
                >
                  {MEDALS[i] ?? i + 1}
                </span>
                <span className="min-w-0 flex-1 truncate font-display font-semibold text-slate-800">
                  {r.nickname}
                  {isMe && (
                    <span className="ml-1.5 text-xs font-semibold text-bff-600">
                      ({zh ? '你' : es ? 'tú' : 'you'})
                    </span>
                  )}
                  <span className="ml-2 text-xs font-normal text-slate-400">
                    {info.tier.emoji} {info.tier.name}
                  </span>
                </span>
                <span className="shrink-0 font-display text-sm font-bold text-bff-700">
                  {r.xp.toLocaleString()} XP
                </span>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}
