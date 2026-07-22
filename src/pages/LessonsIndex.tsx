// BFF Academy as a Duolingo-style course path: a winding trail of the 8
// curriculum lessons grouped by week. Games and challenges live separately
// on the Activities page. Progress comes from local storage (and the
// classroom DB when connected).

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ACTIVITIES } from '../lib/activities'
import type { ActivityMeta } from '../lib/activities'
import { getLesson } from '../content/lessons'
import { useLang } from '../lib/i18n'
import { loadLocalProgress } from '../lib/progress'
import type { ActivityProgress } from '../lib/progress'
import { getStreak } from '../lib/streak'
import { totalXp, levelInfo } from '../lib/xp'
import { dailyQuests } from '../lib/quests'

// ---------- Path data ----------

interface WeekTheme {
  name: string
  nameEs: string
  nameZh: string
  blurb: string
  blurbEs: string
  blurbZh: string
  banner: string // gradient classes
  nodeBg: string
  nodeShadow: string
  border: string
  text: string
  bar: string
}

const WEEK_THEMES: Record<number, WeekTheme> = {
  1: {
    name: 'Money In, Money Out',
    nameEs: 'Dinero que entra, dinero que sale',
    nameZh: '钱进，钱出',
    blurb: 'Where money comes from — and where yours goes.',
    blurbEs: 'De dónde viene el dinero — y a dónde se va el tuyo.',
    blurbZh: '钱从哪里来——你的钱又去了哪里。',
    banner: 'from-bff-500 to-bff-700',
    nodeBg: 'bg-bff-500',
    nodeShadow: 'shadow-[0_5px_0_#036092]',
    border: 'border-bff-500',
    text: 'text-bff-600',
    bar: 'bg-bff-500',
  },
  2: {
    name: 'Make It Grow',
    nameEs: 'Hazlo crecer',
    nameZh: '让钱增长',
    blurb: 'Growing your money and borrowing without the traps.',
    blurbEs: 'Haz crecer tu dinero y pide prestado sin caer en trampas.',
    blurbZh: '让你的钱增长，借钱也不落入陷阱。',
    banner: 'from-emerald-500 to-emerald-700',
    nodeBg: 'bg-emerald-500',
    nodeShadow: 'shadow-[0_5px_0_#047857]',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
  3: {
    name: 'Play It Smart',
    nameEs: 'Juega con inteligencia',
    nameZh: '玩得聪明',
    blurb: 'Protecting yourself and making smarter choices.',
    blurbEs: 'Protégete y toma decisiones más inteligentes.',
    blurbZh: '保护好自己，做出更聪明的选择。',
    banner: 'from-amber-500 to-orange-600',
    nodeBg: 'bg-amber-500',
    nodeShadow: 'shadow-[0_5px_0_#b45309]',
    border: 'border-amber-500',
    text: 'text-amber-600',
    bar: 'bg-amber-500',
  },
  4: {
    name: 'Plan & Protect',
    nameEs: 'Planea y protege',
    nameZh: '规划与保护',
    blurb: 'Planning ahead and outsmarting the scammers.',
    blurbEs: 'Planifica tu futuro y gánale a los estafadores.',
    blurbZh: '提前规划，智胜骗子。',
    banner: 'from-violet-500 to-violet-700',
    nodeBg: 'bg-violet-500',
    nodeShadow: 'shadow-[0_5px_0_#6d28d9]',
    border: 'border-violet-500',
    text: 'text-violet-600',
    bar: 'bg-violet-500',
  },
}

type NodeState = 'done' | 'current' | 'locked'

interface PathNode {
  kind: 'lesson' | 'trophy'
  meta?: ActivityMeta
  state: NodeState
  score: number | null
  started: boolean
}

// ---------- Geometry ----------

const PATH_W = 340
const CENTER_X = PATH_W / 2
const ROW_H = 160
const X_PATTERN = [0, 62, 88, 62, 0, -62, -88, -62]

function nodeXY(i: number, flip: boolean): { x: number; y: number } {
  const raw = X_PATTERN[i % X_PATTERN.length]
  return { x: CENTER_X + (flip ? -raw : raw), y: i * ROW_H + 46 }
}

function connectorPath(count: number, flip: boolean): string {
  if (count < 2) return ''
  const pts = Array.from({ length: count }, (_, i) => nodeXY(i, flip))
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    d += ` C ${a.x} ${a.y + ROW_H / 2}, ${b.x} ${b.y - ROW_H / 2}, ${b.x} ${b.y}`
  }
  return d
}

// ---------- Bits ----------

function Stars({ score }: { score: number | null }) {
  if (score == null) return null
  const n = score >= 90 ? 3 : score >= 70 ? 2 : 1
  return (
    <span
      role="img"
      aria-label={`Score ${Math.round(score)}% — ${n} of 3 stars`}
      className="mt-0.5 flex justify-center gap-0.5 text-sm leading-none"
    >
      {[0, 1, 2].map((i) => (
        <span key={i} aria-hidden="true" className={i < n ? 'text-yellow-400' : 'text-slate-300'}>
          ★
        </span>
      ))}
    </span>
  )
}

function NodeCircle({ node, theme }: { node: PathNode; theme: WeekTheme }) {
  const base =
    'flex h-[76px] w-[76px] items-center justify-center rounded-full border-b-0 text-4xl transition active:translate-y-1 active:shadow-none'
  if (node.kind === 'trophy') {
    return node.state === 'done' ? (
      <div className={`${base} bg-yellow-400 shadow-[0_5px_0_#b45309]`} aria-hidden="true">🏆</div>
    ) : (
      <div
        className={`${base} bg-slate-200 opacity-80 shadow-[0_5px_0_#cbd5e1] grayscale`}
        aria-hidden="true"
      >
        🏆
      </div>
    )
  }
  switch (node.state) {
    case 'done':
      return (
        <div className={`${base} ${theme.nodeBg} ${theme.nodeShadow} hover:brightness-110`}>
          {node.meta!.emoji}
        </div>
      )
    case 'current':
      return (
        <div className="relative">
          <span
            className={`absolute inset-0 -m-2 animate-ping rounded-full border-4 opacity-30 ${theme.border}`}
            aria-hidden
          />
          <div className={`${base} border-4 bg-white ${theme.border} ${theme.nodeShadow}`}>
            {node.meta!.emoji}
          </div>
        </div>
      )
    default:
      return (
        <div className={`${base} bg-slate-200 shadow-[0_5px_0_#cbd5e1]`}>
          <span className="opacity-60 grayscale">{node.meta!.emoji}</span>
        </div>
      )
  }
}

// ---------- Page ----------

export default function LessonsIndex() {
  const progress = useMemo(() => loadLocalProgress(), [])
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'
  const streak = useMemo(() => getStreak(), [])
  const level = useMemo(() => levelInfo(totalXp(progress)), [progress])
  const quests = useMemo(() => dailyQuests(progress), [progress])
  const questsDone = quests.filter((q) => q.done).length
  // Missed quiz questions across all lessons — powers the Practice chip.
  const missedCount = useMemo(() => {
    let count = 0
    for (const [slug, p] of Object.entries(progress)) {
      const answers = p.data?.answers
      const lesson = getLesson(slug)
      if (!lesson || !Array.isArray(answers)) continue
      answers.forEach((chosen, i) => {
        const q = lesson.quiz[i]
        if (q && chosen !== q.answerIndex) count++
      })
    }
    return count
  }, [progress])
  /** Lesson title in the active language (falls back to English). */
  const lessonTitle = (meta: ActivityMeta) =>
    (zh ? getLesson(meta.slug)?.zh?.title : es ? getLesson(meta.slug)?.es?.title : undefined) ??
    meta.title
  const [jumpTarget, setJumpTarget] = useState<ActivityMeta | null>(null)
  const jumpDialogRef = useRef<HTMLDivElement>(null)
  const jumpTriggerRef = useRef<HTMLElement | null>(null)

  // Modal focus management: move focus into the dialog on open, close on Escape,
  // and restore focus to the node that opened it.
  useEffect(() => {
    if (!jumpTarget) return
    const previouslyFocused = jumpTriggerRef.current
    jumpDialogRef.current?.focus()

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        setJumpTarget(null)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus()
    }
  }, [jumpTarget])

  const lessons = useMemo(
    () =>
      ACTIVITIES.filter((a) => a.kind === 'lesson').sort((a, b) => a.sortKey - b.sortKey),
    [],
  )

  const doneCount = lessons.filter((l) => progress[l.slug]?.status === 'completed').length
  const current = lessons.find((l) => progress[l.slug]?.status !== 'completed')
  const allDone = doneCount === lessons.length

  const weeks = useMemo(() => {
    const byWeek = new Map<number, ActivityMeta[]>()
    for (const lesson of lessons) {
      const week = Math.floor(lesson.sortKey / 10)
      byWeek.set(week, [...(byWeek.get(week) ?? []), lesson])
    }

    const toNode = (meta: ActivityMeta): PathNode => {
      const p: ActivityProgress | undefined = progress[meta.slug]
      const state: NodeState =
        p?.status === 'completed'
          ? 'done'
          : meta.slug === current?.slug
            ? 'current'
            : 'locked'
      return { kind: 'lesson', meta, state, score: p?.score ?? null, started: p?.status === 'started' }
    }

    const result = [...byWeek.entries()]
      .sort(([a], [b]) => a - b)
      .map(([week, list]) => ({
        week,
        nodes: list.map(toNode),
      }))

    // The trophy caps off the final week's segment.
    const last = result[result.length - 1]
    if (last) {
      last.nodes.push({
        kind: 'trophy',
        state: allDone ? 'done' : 'locked',
        score: null,
        started: false,
      })
    }
    return result
  }, [lessons, progress, current, allDone])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Header */}
      <div className="text-center">
        <p className="chip mx-auto bg-bff-50 text-bff-700">
          <span aria-hidden="true">📚</span> {zh ? '课程大纲' : es ? 'El plan de estudios' : 'The curriculum'}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-slate-900">BFF Academy</h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
          {zh
            ? '4 周，8 节课，每节约 20 分钟。沿着路径走——完成一节课就能解锁下一站，并在终点赢得奖杯。'
            : es
            ? '4 semanas, 8 lecciones, ~20 minutos cada una. Sigue la ruta: termina una lección para desbloquear la siguiente parada y gana el trofeo al final.'
            : '4 weeks, 8 lessons, ~20 minutes each. Follow the path — finish a lesson to unlock the next stop and claim the trophy at the end.'}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="chip bg-bff-100 text-bff-800">
            <span aria-hidden="true">{level.tier.emoji}</span>{' '}
            {zh ? '等级' : es ? 'Nivel' : 'Level'} {level.level} · {level.tier.name}
          </span>
          {(streak.current > 0 || missedCount > 0) && (
            <>
            {streak.current > 0 && (
              <span className="chip bg-orange-100 text-orange-700">
                <span aria-hidden="true">🔥</span>{' '}
                {zh
                  ? `连续 ${streak.current} 天`
                  : es
                  ? `Racha de ${streak.current} ${streak.current === 1 ? 'día' : 'días'}`
                  : `${streak.current}-day streak`}
                {!streak.activeToday && (zh ? '——今天来练习吧！' : es ? ' — ¡practica hoy!' : ' — practice today!')}
              </span>
            )}
            {missedCount > 0 && (
              <Link to="/practice" className="chip bg-bff-100 text-bff-800 hover:bg-bff-200">
                <span aria-hidden="true">🔁</span>{' '}
                {zh
                  ? `复习 ${missedCount} 道做错的题`
                  : es
                  ? `Repasar ${missedCount} ${missedCount === 1 ? 'pregunta fallada' : 'preguntas falladas'}`
                  : `Review ${missedCount} missed ${missedCount === 1 ? 'question' : 'questions'}`}
              </Link>
            )}
            </>
          )}
        </div>

        {/* Daily quests */}
        <div className="mx-auto mt-5 max-w-md rounded-2xl border border-slate-200 bg-white p-4 text-left">
          <div className="flex items-center justify-between gap-2">
            <p className="font-display text-sm font-bold text-slate-900">
              <span aria-hidden="true">📅</span> {zh ? '今日任务' : es ? 'Misiones de hoy' : "Today's quests"}
            </p>
            <span className="text-xs font-semibold text-slate-500">
              {questsDone}/{quests.length} {zh ? '完成' : es ? 'hechas' : 'done'}
            </span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {quests.map((q) => (
              <li key={q.id} className="flex items-center gap-2.5 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs ${
                    q.done ? 'bg-green-500 text-white' : 'border-2 border-slate-300 text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className={q.done ? 'text-slate-400 line-through' : 'text-slate-700'}>
                  <span aria-hidden="true">{q.emoji}</span> {zh ? q.zh : es ? q.es : q.en}
                </span>
                <span className="sr-only">{q.done ? (zh ? '已完成' : es ? 'completada' : 'done') : (zh ? '未完成' : es ? 'pendiente' : 'not done')}</span>
              </li>
            ))}
          </ul>
          {questsDone === quests.length && (
            <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-semibold text-green-700">
              <span aria-hidden="true">🎉</span>{' '}
              {zh ? '今日任务全部完成！' : es ? '¡Todas las misiones de hoy completadas!' : "All of today's quests complete!"}
            </p>
          )}
        </div>

        <div className="mx-auto mt-5 flex max-w-md items-center gap-3">
          <div
            role="progressbar"
            aria-label="Course progress"
            aria-valuenow={Math.round((doneCount / lessons.length) * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-bff-400 to-bff-600 transition-all"
              style={{ width: `${(doneCount / lessons.length) * 100}%` }}
            />
          </div>
          <span className="shrink-0 text-sm font-bold text-slate-600">
            {doneCount}/{lessons.length}
          </span>
        </div>
        {allDone ? (
          <p className="mt-4 font-display text-lg font-bold text-bff-700">
            {zh ? '课程完成——你太棒了！' : es ? '¡Curso completado — leyenda!' : 'Course complete — you legend!'}{' '}
            <span aria-hidden="true">🏆</span>
            <Link to="/certificate" className="btn-primary mt-3 flex sm:ml-3 sm:mt-0 sm:inline-flex">
              {zh ? '领取我的证书' : es ? 'Obtener mi certificado' : 'Get my certificate'} <span aria-hidden="true">📜</span>
            </Link>
          </p>
        ) : (
          current && (
            <Link to={current.path} className="btn-primary mt-5 inline-flex">
              {doneCount === 0 ? (zh ? '开始第 1 天' : es ? 'Empezar Día 1' : 'Start Day 1') : zh ? '继续' : es ? 'Continuar' : 'Continue'}:{' '}
              <span aria-hidden="true">{current.emoji}</span> {lessonTitle(current)}{' '}
              <span aria-hidden="true">→</span>
            </Link>
          )
        )}
      </div>

      {/* The path */}
      <div className="mt-12 space-y-10">
        {weeks.map(({ week, nodes }, weekIdx) => {
          const theme = WEEK_THEMES[week] ?? WEEK_THEMES[1]
          const flip = weekIdx % 2 === 1
          const weekLessons = nodes.filter((n) => n.kind === 'lesson')
          const weekDone = weekLessons.filter((n) => n.state === 'done').length
          const height = nodes.length * ROW_H + 24

          return (
            <section key={week}>
              {/* Week banner */}
              <div
                className={`rounded-3xl bg-gradient-to-r ${theme.banner} px-6 py-5 text-white shadow-md`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/90">
                      {zh ? `第 ${week} 周` : <>{es ? 'Semana' : 'Week'} {week}</>}
                    </p>
                    <h2 className="font-display text-xl font-extrabold">
                      {zh ? theme.nameZh : es ? theme.nameEs : theme.name}
                    </h2>
                    <p className="mt-1 text-sm text-white/90">{zh ? theme.blurbZh : es ? theme.blurbEs : theme.blurb}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-white/20 px-3 py-1 text-sm font-bold">
                    {weekDone}/{weekLessons.length}
                  </span>
                </div>
              </div>

              {/* Node trail */}
              <div className="relative mx-auto mt-4" style={{ width: PATH_W, height }}>
                <svg
                  className="pointer-events-none absolute inset-0"
                  width={PATH_W}
                  height={height}
                  aria-hidden
                >
                  <path
                    d={connectorPath(nodes.length, flip)}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeDasharray="0.1 18"
                  />
                </svg>

                {nodes.map((node, i) => {
                  const { x, y } = nodeXY(i, flip)
                  const label =
                    node.kind === 'trophy'
                      ? allDone
                        ? zh
                          ? '课程完成！'
                          : es
                          ? '¡Curso completado!'
                          : 'Course complete!'
                        : zh
                          ? '完成所有课程'
                          : es
                          ? 'Termina todas las lecciones'
                          : 'Finish every lesson'
                      : lessonTitle(node.meta!)
                  const sub =
                    node.kind === 'lesson'
                      ? zh
                        ? `第 ${node.meta!.sortKey % 10} 天 · ${node.meta!.durationMin} 分钟`
                        : `${es ? 'Día' : 'Day'} ${node.meta!.sortKey % 10} · ${node.meta!.durationMin} min`
                      : ''

                  const circle = <NodeCircle node={node} theme={theme} />
                  const clickable =
                    node.kind !== 'trophy' &&
                    (node.state === 'done' || node.state === 'current')

                  return (
                    <div
                      key={node.kind === 'trophy' ? 'trophy' : node.meta!.slug}
                      className="absolute"
                      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
                    >
                      {node.state === 'current' && (
                        <span
                          className={`absolute -top-9 left-1/2 z-10 -translate-x-1/2 animate-float whitespace-nowrap rounded-xl border-2 bg-white px-3 py-1 font-display text-xs font-extrabold uppercase tracking-wide ${theme.border} ${theme.text}`}
                        >
                          {node.started ? 'Keep going' : 'Start'}
                        </span>
                      )}
                      {clickable ? (
                        <Link
                          to={node.meta!.path}
                          aria-label={
                            node.state === 'done'
                              ? `${label}, completed`
                              : `${label}, current lesson`
                          }
                        >
                          {circle}
                        </Link>
                      ) : node.kind === 'trophy' ? (
                        node.state === 'done' ? (
                          <Link
                            to="/certificate"
                            aria-label={zh ? '查看我的证书' : es ? 'Ver mi certificado' : 'View my certificate'}
                          >
                            {circle}
                          </Link>
                        ) : (
                          circle
                        )
                      ) : (
                        <button
                          type="button"
                          aria-label={`${label}, locked — opens a confirmation`}
                          onClick={(e) => {
                            jumpTriggerRef.current = e.currentTarget
                            setJumpTarget(node.meta!)
                          }}
                        >
                          {circle}
                        </button>
                      )}
                      {node.state === 'done' && node.kind !== 'trophy' && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white shadow"
                        >
                          ✓
                        </span>
                      )}
                      {node.state === 'locked' && node.kind === 'lesson' && (
                        <span
                          aria-hidden="true"
                          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-xs text-white shadow"
                        >
                          🔒
                        </span>
                      )}
                      {/* bg matches the page so the dotted connector never bleeds through the text */}
                      <div className="absolute left-1/2 top-[82px] w-36 -translate-x-1/2 bg-slate-50 text-center">
                        <p
                          className={`text-xs font-bold leading-tight ${
                            node.state === 'locked' ? 'text-slate-500' : 'text-slate-700'
                          }`}
                        >
                          {label}
                        </p>
                        {sub && <p className="mt-0.5 text-[10px] font-semibold text-slate-500">{sub}</p>}
                        {node.kind === 'lesson' && node.state === 'done' && (
                          <Stars score={node.score} />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* Bonus electives — off the core 4-week path, self-paced deep dives */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          <span aria-hidden="true">✨</span> {zh ? '额外选修单元' : es ? 'Unidades extra' : 'Bonus electives'}
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          {zh
            ? '五个额外的深入单元，随时都能探索——它们不在 4 周路径内，但仍会计入你的进度和连续记录。'
            : es
            ? 'Cinco temas extra para profundizar cuando quieras — no son parte de las 4 semanas, pero cuentan para tu progreso y racha.'
            : "Five extra deep-dives to explore anytime — they're off the 4-week path, but still count toward your progress and streak."}
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACTIVITIES.filter((a) => a.kind === 'elective').map((meta) => {
            const p = progress[meta.slug]
            return (
              <Link
                key={meta.slug}
                to={meta.path}
                className="card group flex gap-4 transition hover:-translate-y-0.5 hover:border-bff-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-bff-50 text-2xl">
                  <span aria-hidden="true">{meta.emoji}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-bold text-slate-900 group-hover:text-bff-700">
                    {lessonTitle(meta)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{meta.description}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    ⏱️ ~{meta.durationMin} min
                    {p?.status === 'completed'
                      ? zh
                        ? ' · 已完成！🎉'
                        : es
                        ? ' · ¡completado! 🎉'
                        : ' · done! 🎉'
                      : p?.status === 'started'
                        ? zh
                          ? ' · 进行中'
                          : es
                          ? ' · en progreso'
                          : ' · in progress'
                        : ''}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Games live outside the curriculum path */}
      <div className="card mt-16 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display font-bold text-slate-900">
            <span aria-hidden="true">🐺🏠☂️</span> Looking for the games?
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Wolf of Wall Street and Ben's challenges are their own thing — play them anytime,
            no path required.
          </p>
        </div>
        <Link to="/activities" className="btn-secondary shrink-0">
          Games & Challenges →
        </Link>
      </div>

      {/* Jump-ahead confirm */}
      {jumpTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setJumpTarget(null)}
        >
          <div
            ref={jumpDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="jump-dialog-title"
            tabIndex={-1}
            className="w-full max-w-sm animate-pop-in rounded-3xl bg-white p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-5xl" aria-hidden="true">{jumpTarget.emoji}</p>
            <h3 id="jump-dialog-title" className="mt-3 font-display text-xl font-bold text-slate-900">
              {zh ? `即将跳到 ${lessonTitle(jumpTarget)}？` : es ? `¿Saltando a ${lessonTitle(jumpTarget)}?` : `Jumping ahead to ${lessonTitle(jumpTarget)}?`}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              This stop comes later on the path. If your mentor assigned it — or you're just
              curious — go right ahead. The path will be here when you get back!
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link to={jumpTarget.path} className="btn-primary w-full">
                Start it anyway <span aria-hidden="true">→</span>
              </Link>
              {current && (
                <Link to={current.path} className="btn-secondary w-full">
                  Take me to my next lesson (<span aria-hidden="true">{current.emoji}</span>{' '}
                  {lessonTitle(current)})
                </Link>
              )}
              <button type="button" className="btn-ghost" onClick={() => setJumpTarget(null)}>
                Never mind
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
