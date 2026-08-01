// A student's level, rank, and XP with a progress bar to the next rank.
// XP is passed in (computed from local progress or the server leaderboard).

import { Crown, Star } from 'lucide-react'
import { levelInfo } from '../lib/xp'
import { useLang } from '../lib/i18n'

export default function LevelCard({ xp }: { xp: number }) {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const info = levelInfo(xp)

  return (
    <div className="relative overflow-hidden rounded-[8px] bg-ink px-6 py-5 text-white">
      {/* gold top accent rule */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border border-white/15 bg-white/5"
            aria-hidden="true"
          >
            <Star className="h-6 w-6 text-gold-400" />
          </span>
          <div>
            <p className="eyebrow text-paper/70">
              {zh ? '等级' : es ? 'Nivel' : 'Level'} {info.level} · {info.tier.name}
            </p>
            <p className="mt-0.5 font-display text-3xl font-extrabold tabular-nums text-gold-400">
              {xp.toLocaleString()} <span className="text-xl text-white">XP</span>
            </p>
          </div>
        </div>
        {info.next && (
          <p className="text-right text-xs font-semibold text-white/70">
            <span className="tabular-nums text-white">{info.toNext.toLocaleString()} XP</span>{' '}
            {zh ? '即可升到' : es ? 'para' : 'to'}
            <br />
            {info.next.name}
          </p>
        )}
      </div>

      {info.next ? (
        <div
          className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15"
          role="progressbar"
          aria-valuenow={info.pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={zh ? '升级进度' : es ? 'Progreso al siguiente nivel' : 'Progress to next level'}
        >
          <div
            className="h-full rounded-full bg-gold-400 transition-all"
            style={{ width: `${info.pct}%` }}
          />
        </div>
      ) : (
        <p className="mt-4 flex items-center gap-1.5 font-display text-sm font-semibold text-white">
          <Crown className="h-4 w-4 text-gold-400" aria-hidden="true" /> {zh ? '已达到最高等级！' : es ? '¡Nivel máximo alcanzado!' : 'Max rank reached!'}
        </p>
      )}
    </div>
  )
}
