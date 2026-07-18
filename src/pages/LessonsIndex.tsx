import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ACTIVITIES } from '../lib/activities'
import type { ActivityMeta } from '../lib/activities'
import { loadLocalProgress } from '../lib/progress'
import type { ActivityProgress } from '../lib/progress'

const WEEK_BLURBS: Record<number, string> = {
  1: 'Where money comes from — and where yours goes.',
  2: 'Growing your money and borrowing without the traps.',
  3: 'Protecting yourself and making smarter choices.',
  4: 'Planning ahead and outsmarting the scammers.',
}

function ProgressChip({ progress }: { progress: ActivityProgress | undefined }) {
  if (progress?.status === 'completed') {
    return (
      <span className="chip bg-green-100 text-green-700">
        ✓ Completed{progress.score != null ? ` · ${Math.round(progress.score)}%` : ''}
      </span>
    )
  }
  if (progress?.status === 'started') {
    return <span className="chip bg-amber-100 text-amber-700">In progress</span>
  }
  return <span className="chip bg-slate-100 text-slate-500">Not started</span>
}

export default function LessonsIndex() {
  const progress = useMemo(() => loadLocalProgress(), [])

  const weeks = useMemo(() => {
    const lessons = ACTIVITIES.filter((a) => a.kind === 'lesson')
    const byWeek = new Map<number, ActivityMeta[]>()
    for (const lesson of lessons) {
      const week = Math.floor(lesson.sortKey / 10)
      const list = byWeek.get(week) ?? []
      list.push(lesson)
      byWeek.set(week, list)
    }
    return [...byWeek.entries()]
      .sort(([a], [b]) => a - b)
      .map(([week, list]) => ({
        week,
        lessons: list.sort((a, b) => a.sortKey - b.sortKey),
      }))
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <div className="max-w-2xl">
        <p className="chip bg-bff-50 text-bff-700">📚 The curriculum</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-slate-900">
          BFF Academy
        </h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          Our full financial literacy curriculum: 4 weeks, 8 lessons, about 20 minutes
          each. In classrooms, BFF mentors teach two lessons a week — here you can follow
          along with your class or binge the whole thing today. Each lesson ends with a
          quick quiz so you can prove you have got it.
        </p>
      </div>

      {/* Weeks */}
      <div className="mt-12 space-y-12">
        {weeks.map(({ week, lessons }) => (
          <section key={week}>
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="font-display text-2xl font-bold text-slate-900">Week {week}</h2>
              <p className="text-sm text-slate-500">{WEEK_BLURBS[week] ?? ''}</p>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {lessons.map((lesson) => {
                const day = lesson.sortKey % 10
                const p = progress[lesson.slug]
                return (
                  <Link
                    key={lesson.slug}
                    to={lesson.path}
                    className="card group flex gap-4 transition hover:-translate-y-0.5 hover:border-bff-300 hover:shadow-md"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-bff-50 text-3xl">
                      {lesson.emoji}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="chip bg-bff-100 text-bff-800">Day {day}</span>
                        <ProgressChip progress={p} />
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-slate-900 group-hover:text-bff-700">
                        {lesson.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {lesson.description}
                      </p>
                      <p className="mt-3 text-xs font-semibold text-slate-400">
                        ⏱️ ~{lesson.durationMin} min
                        {p?.status === 'completed' ? ' · nice work! 🎉' : ''}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
