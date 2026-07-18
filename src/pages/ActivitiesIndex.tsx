import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ACTIVITIES, KIND_LABEL } from '../lib/activities'
import type { ActivityProgress } from '../lib/progress'
import { loadLocalProgress } from '../lib/progress'

function ProgressChip({ progress }: { progress: ActivityProgress | undefined }) {
  if (progress?.status === 'completed') {
    return (
      <span className="chip bg-green-100 text-green-700">
        <span aria-hidden="true">✓</span> Completed
        {progress.score != null ? ` · ${Math.round(progress.score)}%` : ''}
      </span>
    )
  }
  if (progress?.status === 'started') {
    return <span className="chip bg-amber-100 text-amber-700">In progress</span>
  }
  return <span className="chip bg-slate-100 text-slate-500">Not started</span>
}

export default function ActivitiesIndex() {
  const progress = useMemo(() => loadLocalProgress(), [])
  const activities = useMemo(
    () => ACTIVITIES.filter((a) => a.kind !== 'lesson').sort((a, b) => a.sortKey - b.sortKey),
    [],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="chip bg-bff-50 text-bff-700">
          <span aria-hidden="true">🎮</span> Learning, but fun
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-slate-900">
          Games & Challenges
        </h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          These are the exact games and challenges BFF mentors run live during school
          visits — the class favorites. Now you can play them anytime: practice a
          simulation before class, settle a score with a friend, or just see if you can
          beat the market.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => {
          const p = progress[a.slug]
          return (
            <Link
              key={a.slug}
              to={a.path}
              className="card group flex flex-col transition hover:-translate-y-1 hover:border-bff-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl" aria-hidden="true">{a.emoji}</span>
                <span className="chip bg-bff-50 text-bff-700">{KIND_LABEL[a.kind]}</span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-bff-700">
                {a.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {a.description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  <span aria-hidden="true">⏱️</span> ~{a.durationMin} min
                </span>
                <ProgressChip progress={p} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
