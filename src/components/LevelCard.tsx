// A student's level, rank, and XP with a progress bar to the next rank.
// XP is passed in (computed from local progress or the server leaderboard).

import { Crown } from 'lucide-react'
import { levelInfo } from '../lib/xp'
import { useLang } from '../lib/i18n'

export default function LevelCard({ xp }: { xp: number }) {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const info = levelInfo(xp)

  return (
    <div className="rounded-2xl bg-bff-900 px-6 py-5 text-white shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl" aria-hidden="true">
            {info.tier.emoji}
          </span>
          <div>
            <p className="font-display text-xs font-semibold uppercase tracking-wide text-bff-100">
              {zh ? '等级' : es ? 'Nivel' : 'Level'} {info.level} · {info.tier.name}
            </p>
            <p className="font-display text-2xl font-extrabold">
              {xp.toLocaleString()} XP
            </p>
          </div>
        </div>
        {info.next && (
          <p className="text-right text-xs font-semibold text-bff-100">
            {info.toNext.toLocaleString()} XP {zh ? '即可升到' : es ? 'para' : 'to'}
            <br />
            {info.next.emoji} {info.next.name}
          </p>
        )}
      </div>

      {info.next ? (
        <div
          className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/25"
          role="progressbar"
          aria-valuenow={info.pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={zh ? '升级进度' : es ? 'Progreso al siguiente nivel' : 'Progress to next level'}
        >
          <div
            className="h-full rounded-full bg-white transition-all"
            style={{ width: `${info.pct}%` }}
          />
        </div>
      ) : (
        <p className="mt-4 flex items-center gap-1.5 font-display text-sm font-semibold text-bff-50">
          <Crown className="h-4 w-4 text-gold-400" aria-hidden="true" /> {zh ? '已达到最高等级！' : es ? '¡Nivel máximo alcanzado!' : 'Max rank reached!'}
        </p>
      )}
    </div>
  )
}
