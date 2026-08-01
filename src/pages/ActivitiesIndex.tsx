import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Check, Clock, Gamepad2 } from 'lucide-react'
import { ACTIVITIES, kindLabel, localizeActivity } from '../lib/activities'
import { AppIcon } from '../lib/icons'
import { useLang } from '../lib/i18n'
import type { ActivityProgress } from '../lib/progress'
import { loadLocalProgress } from '../lib/progress'

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
      <span className="chip bg-amber-100 text-amber-700">
        {zh ? '进行中' : es ? 'En progreso' : 'In progress'}
      </span>
    )
  }
  return (
    <span className="chip bg-paper-soft text-pebble">
      {zh ? '未开始' : es ? 'Sin empezar' : 'Not started'}
    </span>
  )
}

export default function ActivitiesIndex() {
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
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
      <section className="ed-hero chamfer px-6 py-12 sm:px-10 sm:py-14">
        <span
          className="ed-hero-orbit"
          aria-hidden="true"
          style={{ width: 340, height: 340, top: -140, right: -90 }}
        />
        <span
          className="ed-hero-orbit gold"
          aria-hidden="true"
          style={{ width: 200, height: 200, bottom: -110, right: 70 }}
        />
        <div className="relative z-[1] max-w-2xl">
          <p className="eyebrow text-paper/70">
            <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
            {zh ? '学习，但很好玩' : es ? 'Aprender, pero divertido' : 'Learning, but fun'}
            <span className="eyebrow-line" aria-hidden="true" />
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl">
            {zh ? (
              <>游戏与<em>挑战</em></>
            ) : es ? (
              <>Juegos y <em>Desafíos</em></>
            ) : (
              <>Games &amp; <em>Challenges</em></>
            )}
          </h1>
          <p className="mt-4 max-w-xl leading-relaxed text-white/70">
            {zh
              ? '这些正是 BFF 导师在学校访问时现场带的游戏和挑战——全班的最爱。现在你随时都能玩：上课前练一把模拟，跟朋友一决高下，或者干脆看看你能不能跑赢市场。'
              : es
                ? 'Estos son exactamente los juegos y desafíos que los mentores de BFF hacen en vivo durante las visitas escolares — los favoritos de la clase. Ahora puedes jugarlos cuando quieras: practica una simulación antes de clase, arregla cuentas con un amigo, o simplemente comprueba si puedes ganarle al mercado.'
                : 'These are the exact games and challenges BFF mentors run live during school visits — the class favorites. Now you can play them anytime: practice a simulation before class, settle a score with a friend, or just see if you can beat the market.'}
          </p>
        </div>
      </section>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {activities.map((a) => {
          const p = progress[a.slug]
          const { title, description } = localizeActivity(a, lang)
          return (
            <Link key={a.slug} to={a.path} className="card lift group flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper-soft text-ink">
                  <AppIcon name={a.icon} className="h-6 w-6" />
                </span>
                <span className="chip bg-paper-soft text-ink">{kindLabel(a.kind, lang)}</span>
              </div>
              <h2 className="mt-4 font-display text-lg font-bold text-ink group-hover:text-ink">
                {title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                {description}
              </p>
              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-ink/50">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> ~{a.durationMin} {zh ? '分钟' : 'min'}
                </span>
                <ProgressChip progress={p} es={es} zh={zh} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
