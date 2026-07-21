import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ACTIVITIES, kindLabel, localizeActivity } from '../lib/activities'
import { useLang } from '../lib/i18n'
import type { ActivityProgress } from '../lib/progress'
import { loadLocalProgress } from '../lib/progress'

function ProgressChip({
  progress,
  es,
}: {
  progress: ActivityProgress | undefined
  es: boolean
}) {
  if (progress?.status === 'completed') {
    return (
      <span className="chip bg-green-100 text-green-700">
        <span aria-hidden="true">✓</span> {es ? 'Completado' : 'Completed'}
        {progress.score != null ? ` · ${Math.round(progress.score)}%` : ''}
      </span>
    )
  }
  if (progress?.status === 'started') {
    return (
      <span className="chip bg-amber-100 text-amber-700">
        {es ? 'En progreso' : 'In progress'}
      </span>
    )
  }
  return (
    <span className="chip bg-slate-100 text-slate-600">
      {es ? 'Sin empezar' : 'Not started'}
    </span>
  )
}

export default function ActivitiesIndex() {
  const { lang } = useLang()
  const es = lang === 'es'
  const progress = useMemo(() => loadLocalProgress(), [])
  const activities = useMemo(
    () =>
      ACTIVITIES.filter((a) => a.kind === 'game' || a.kind === 'challenge').sort(
        (a, b) => a.sortKey - b.sortKey,
      ),
    [],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <p className="chip bg-bff-50 text-bff-700">
          <span aria-hidden="true">🎮</span> {es ? 'Aprender, pero divertido' : 'Learning, but fun'}
        </p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-slate-900">
          {es ? 'Juegos y Desafíos' : 'Games & Challenges'}
        </h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          {es
            ? 'Estos son exactamente los juegos y desafíos que los mentores de BFF hacen en vivo durante las visitas escolares — los favoritos de la clase. Ahora puedes jugarlos cuando quieras: practica una simulación antes de clase, arregla cuentas con un amigo, o simplemente comprueba si puedes ganarle al mercado.'
            : 'These are the exact games and challenges BFF mentors run live during school visits — the class favorites. Now you can play them anytime: practice a simulation before class, settle a score with a friend, or just see if you can beat the market.'}
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => {
          const p = progress[a.slug]
          const { title, description } = localizeActivity(a, lang)
          return (
            <Link
              key={a.slug}
              to={a.path}
              className="card group flex flex-col transition hover:-translate-y-1 hover:border-bff-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-4xl" aria-hidden="true">{a.emoji}</span>
                <span className="chip bg-bff-50 text-bff-700">{kindLabel(a.kind, lang)}</span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-slate-900 group-hover:text-bff-700">
                {title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-500">
                  <span aria-hidden="true">⏱️</span> ~{a.durationMin} min
                </span>
                <ProgressChip progress={p} es={es} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
