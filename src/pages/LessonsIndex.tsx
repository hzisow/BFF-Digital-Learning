// BFF Academy as a course path that reads left to right like a line of text:
// the 8 curriculum lessons grouped by week along one horizontal track. Games and challenges live separately
// on the Activities page. Progress comes from local storage (and the
// classroom DB when connected).

import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  Lock,
  RotateCcw,
  Sparkles,
  Star,
  Trophy,
  Flame,
} from 'lucide-react'
import { AppIcon } from '../lib/icons'
import { ACTIVITIES, localizeActivity } from '../lib/activities'
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
  banner: string // solid banner background class
  nodeBg: string
  nodeShadow: string
  border: string
  text: string
  bar: string
}

// Weeks alternate between two solid editorial fields — BFF blue and near-black
// ink — instead of the old rainbow. White text on both; a gold rule ties them
// together. Node colors follow the same field so the trail reads as one system.
const WEEK_THEMES: Record<number, WeekTheme> = {
  1: {
    name: 'Money In, Money Out',
    nameEs: 'Dinero que entra, dinero que sale',
    nameZh: '钱进，钱出',
    blurb: 'Where money comes from — and where yours goes.',
    blurbEs: 'De dónde viene el dinero — y a dónde se va el tuyo.',
    blurbZh: '钱从哪里来——你的钱又去了哪里。',
    banner: 'bg-bff-700',
    nodeBg: 'bg-bff-600',
    nodeShadow: 'shadow-[0_4px_0_#075178]',
    border: 'border-bff-600',
    text: 'text-bff-700',
    bar: 'bg-bff-600',
  },
  2: {
    name: 'Make It Grow',
    nameEs: 'Hazlo crecer',
    nameZh: '让钱增长',
    blurb: 'Growing your money and borrowing without the traps.',
    blurbEs: 'Haz crecer tu dinero y pide prestado sin caer en trampas.',
    blurbZh: '让你的钱增长，借钱也不落入陷阱。',
    banner: 'bg-ink',
    nodeBg: 'bg-ink',
    nodeShadow: 'shadow-[0_4px_0_#050f18]',
    border: 'border-ink',
    text: 'text-ink',
    bar: 'bg-ink',
  },
  3: {
    name: 'Play It Smart',
    nameEs: 'Juega con inteligencia',
    nameZh: '玩得聪明',
    blurb: 'Protecting yourself and making smarter choices.',
    blurbEs: 'Protégete y toma decisiones más inteligentes.',
    blurbZh: '保护好自己，做出更聪明的选择。',
    banner: 'bg-bff-800',
    nodeBg: 'bg-bff-700',
    nodeShadow: 'shadow-[0_4px_0_#0b4364]',
    border: 'border-bff-700',
    text: 'text-bff-800',
    bar: 'bg-bff-700',
  },
  4: {
    name: 'Plan & Protect',
    nameEs: 'Planea y protege',
    nameZh: '规划与保护',
    blurb: 'Planning ahead and outsmarting the scammers.',
    blurbEs: 'Planifica tu futuro y gánale a los estafadores.',
    blurbZh: '提前规划，智胜骗子。',
    banner: 'bg-ink',
    nodeBg: 'bg-ink',
    nodeShadow: 'shadow-[0_4px_0_#050f18]',
    border: 'border-ink',
    text: 'text-ink',
    bar: 'bg-ink',
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

// The path reads left-to-right like a line of text: lessons advance along the
// x-axis and the trail gently rises and falls on the y-axis. The whole course
// lives in one horizontal scroller, so students travel forward rather than down.
const PATH_H = 300
const CENTER_Y = PATH_H / 2
const COL_W = 168
const NODE_X0 = 84
const Y_PATTERN = [0, -46, -66, -46, 0, 46, 66, 46]

function nodeXY(i: number, flip: boolean): { x: number; y: number } {
  const raw = Y_PATTERN[i % Y_PATTERN.length]
  return { x: i * COL_W + NODE_X0, y: CENTER_Y + (flip ? -raw : raw) }
}

/** Total width a run of `count` nodes occupies. */
function trailWidth(count: number): number {
  return Math.max(1, count) * COL_W + NODE_X0
}

function connectorPath(count: number, flip: boolean): string {
  if (count < 2) return ''
  const pts = Array.from({ length: count }, (_, i) => nodeXY(i, flip))
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1]
    const b = pts[i]
    d += ` C ${a.x + COL_W / 2} ${a.y}, ${b.x - COL_W / 2} ${b.y}, ${b.x} ${b.y}`
  }
  return d
}

// ---------- Bits ----------

function Stars({ score, lang }: { score: number | null; lang: 'en' | 'es' | 'zh' }) {
  if (score == null) return null
  const n = score >= 90 ? 3 : score >= 70 ? 2 : 1
  const pct = Math.round(score)
  const label =
    lang === 'zh'
      ? `得分 ${pct}% — 3 颗星中的 ${n} 颗`
      : lang === 'es'
        ? `Puntaje ${pct}% — ${n} de 3 estrellas`
        : `Score ${pct}% — ${n} of 3 stars`
  return (
    <span
      role="img"
      aria-label={label}
      className="mt-0.5 flex justify-center gap-0.5 text-sm leading-none"
    >
      {[0, 1, 2].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i < n ? 'fill-gold-500 text-gold-500' : 'fill-ink/15 text-ink/15'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function NodeCircle({ node, theme }: { node: PathNode; theme: WeekTheme }) {
  // Crisper than the old bubbly Duolingo pill: a flatter 4px offset shadow and
  // a thin hairline ring instead of a puffy border.
  const base =
    'flex h-[76px] w-[76px] items-center justify-center rounded-full ring-1 ring-black/5 transition active:translate-y-1 active:shadow-none'
  if (node.kind === 'trophy') {
    return node.state === 'done' ? (
      <div className={`${base} bg-gold-400 text-ink shadow-[0_4px_0_#b7791f]`} aria-hidden="true">
        <Trophy className="h-9 w-9" />
      </div>
    ) : (
      <div
        className={`${base} bg-paper-deep text-ink/35 shadow-[0_4px_0_#d8d2c4]`}
        aria-hidden="true"
      >
        <Trophy className="h-9 w-9" />
      </div>
    )
  }
  switch (node.state) {
    case 'done':
      return (
        <div className={`${base} ${theme.nodeBg} text-white ${theme.nodeShadow} hover:brightness-110`}>
          <AppIcon name={node.meta!.icon} className="h-9 w-9" />
        </div>
      )
    case 'current':
      return (
        <div className="relative">
          <span
            className={`absolute inset-0 -m-2 animate-ping rounded-full border-4 opacity-30 ${theme.border}`}
            aria-hidden
          />
          <div className={`${base} border-[3px] bg-white ${theme.border} ${theme.text} ${theme.nodeShadow}`}>
            <AppIcon name={node.meta!.icon} className="h-9 w-9" />
          </div>
        </div>
      )
    default:
      return (
        <div className={`${base} bg-paper-deep text-ink/35 shadow-[0_4px_0_#d8d2c4]`}>
          <AppIcon name={node.meta!.icon} className="h-9 w-9" />
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
    <div>
      {/* Editorial hero — dark ink band with orbit rings, the curriculum
          eyebrow, an oversized display title, the lede, status chips and the
          overall course progress. White text throughout. */}
      <section className="ed-hero">
        <span aria-hidden className="ed-hero-orbit" style={{ width: 560, height: 560, top: -220, right: -160 }} />
        <span aria-hidden className="ed-hero-orbit gold" style={{ width: 340, height: 340, bottom: -180, right: -20 }} />
        <span aria-hidden className="ed-hero-orbit" style={{ width: 220, height: 220, bottom: -120, left: -70 }} />
        <div className="relative z-[1] mx-auto max-w-3xl px-4 py-14 sm:py-16">
          <p className="eyebrow text-bff-300">
            <span className="eyebrow-line" aria-hidden="true" />
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" /> {zh ? '课程大纲' : es ? 'El plan de estudios' : 'The curriculum'}
          </p>
          <h1 className="mt-3 font-display text-5xl font-extrabold leading-[1.02] text-white sm:text-6xl">
            BFF <em className="text-bff-300">Academy</em>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">
            {zh
              ? '4 周，8 节课，每节约 20 分钟。沿着路径走——完成一节课就能解锁下一站，并在终点赢得奖杯。'
              : es
              ? '4 semanas, 8 lecciones, ~20 minutos cada una. Sigue la ruta: termina una lección para desbloquear la siguiente parada y gana el trofeo al final.'
              : '4 weeks, 8 lessons, ~20 minutes each. Follow the path — finish a lesson to unlock the next stop and claim the trophy at the end.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="chip bg-white/10 text-white ring-1 ring-inset ring-white/15">
              <AppIcon name={level.tier.icon} className="h-4 w-4" />{' '}
              {zh ? '等级' : es ? 'Nivel' : 'Level'} {level.level} · {level.tier.name}
            </span>
            {streak.current > 0 && (
              <span className="chip bg-orange-100 text-orange-800">
                <Flame className="h-4 w-4" aria-hidden="true" />{' '}
                {zh
                  ? `连续 ${streak.current} 天`
                  : es
                  ? `Racha de ${streak.current} ${streak.current === 1 ? 'día' : 'días'}`
                  : `${streak.current}-day streak`}
                {!streak.activeToday && (zh ? '——今天来练习吧！' : es ? ' — ¡practica hoy!' : ' — practice today!')}
              </span>
            )}
            {missedCount > 0 && (
              <Link
                to="/practice"
                className="chip bg-white/10 text-white ring-1 ring-inset ring-white/15 transition-colors hover:bg-white/20"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />{' '}
                {zh
                  ? `复习 ${missedCount} 道做错的题`
                  : es
                  ? `Repasar ${missedCount} ${missedCount === 1 ? 'pregunta fallada' : 'preguntas falladas'}`
                  : `Review ${missedCount} missed ${missedCount === 1 ? 'question' : 'questions'}`}
              </Link>
            )}
          </div>

          <div className="mt-7 flex max-w-md items-center gap-3">
            <div
              role="progressbar"
              aria-label={zh ? '课程进度' : es ? 'Progreso del curso' : 'Course progress'}
              aria-valuenow={Math.round((doneCount / lessons.length) * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="h-3 flex-1 overflow-hidden rounded-full bg-white/15"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-bff-400 to-bff-600 transition-all"
                style={{ width: `${(doneCount / lessons.length) * 100}%` }}
              />
            </div>
            <span className="shrink-0 text-sm font-bold text-white/80">
              {doneCount}/{lessons.length}
            </span>
          </div>

          {allDone ? (
            <p className="mt-6 flex flex-col items-start gap-3 font-display text-lg font-bold text-white sm:flex-row sm:items-center">
              <span>
                {zh ? '课程完成——你太棒了！' : es ? '¡Curso completado — leyenda!' : 'Course complete — you legend!'}{' '}
                <Trophy className="h-4 w-4" aria-hidden="true" />
              </span>
              <Link to="/certificate" className="btn-primary">
                {zh ? '领取我的证书' : es ? 'Obtener mi certificado' : 'Get my certificate'} <Award className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          ) : (
            current && (
              <Link to={current.path} className="btn-primary mt-6 inline-flex">
                {doneCount === 0 ? (zh ? '开始第 1 天' : es ? 'Empezar Día 1' : 'Start Day 1') : zh ? '继续' : es ? 'Continuar' : 'Continue'}:{' '}
                <AppIcon name={current.icon} className="h-4 w-4" /> {lessonTitle(current)}{' '}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            )
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-16 pt-10">
        {/* Daily quests — editorial panel with a blue top accent bar. */}
        <p className="eyebrow">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? '每日' : es ? 'Cada día' : 'Daily'}
        </p>
        <div className="panel mt-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-slate-900">
              <CalendarDays className="h-4 w-4 text-bff-600" aria-hidden="true" /> {zh ? '今日任务' : es ? 'Misiones de hoy' : "Today's quests"}
            </p>
            <span className="text-xs font-semibold text-slate-500">
              {questsDone}/{quests.length} {zh ? '完成' : es ? 'hechas' : 'done'}
            </span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {quests.map((q) => (
              <li key={q.id} className="flex items-center gap-2.5 text-sm">
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    q.done ? 'bg-green-500 text-white' : 'border-2 border-slate-300'
                  }`}
                  aria-hidden="true"
                >
                  {q.done && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </span>
                <span
                  className={`inline-flex items-center gap-2 ${
                    q.done ? 'text-slate-400 line-through' : 'text-slate-700'
                  }`}
                >
                  <AppIcon name={q.icon} className="h-4 w-4 shrink-0" />
                  {zh ? q.zh : es ? q.es : q.en}
                </span>
                <span className="sr-only">{q.done ? (zh ? '已完成' : es ? 'completada' : 'done') : (zh ? '未完成' : es ? 'pendiente' : 'not done')}</span>
              </li>
            ))}
          </ul>
          {questsDone === quests.length && (
            <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-center text-xs font-semibold text-green-700">
                            {zh ? '今日任务全部完成！' : es ? '¡Todas las misiones de hoy completadas!' : "All of today's quests complete!"}
            </p>
          )}
        </div>

        {/* The path */}
        <p className="eyebrow mt-12">
          <span className="eyebrow-line" aria-hidden="true" />
          {zh ? '学习路径' : es ? 'La ruta' : 'The path'}
        </p>
        {/* One long horizontal track: weeks sit side by side and the student
            scrolls forward through the course, left to right. */}
        <div
          className="scroll-track -mx-4 mt-4 overflow-x-auto overflow-y-hidden px-4 pb-6"
          tabIndex={0}
          role="region"
          aria-label={zh ? '课程路径（左右滚动）' : es ? 'Ruta del curso (desplázate de izquierda a derecha)' : 'Course path (scroll left to right)'}
        >
          <div className="flex w-max items-center gap-8">
            {weeks.map(({ week, nodes }, weekIdx) => {
            const theme = WEEK_THEMES[week] ?? WEEK_THEMES[1]
            const flip = weekIdx % 2 === 1
            const weekLessons = nodes.filter((n) => n.kind === 'lesson')
            const weekDone = weekLessons.filter((n) => n.state === 'done').length

            return (
              <section key={week} className="flex shrink-0 items-center gap-6">
                {/* Week banner — solid editorial field (ink or BFF blue) with a
                    gold top accent rule, an eyebrow-style WEEK label and a big
                    display heading. White text on the solid field. */}
                <div
                  className={`relative w-[248px] shrink-0 self-stretch overflow-hidden rounded-[10px] ${theme.banner} flex flex-col justify-center px-6 py-6 text-white shadow-card`}
                >
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-gold-400" />
                  <div>
                    <div>
                      <p className="font-display text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/70">
                        {zh ? `第 ${week} 周` : <>{es ? 'Semana' : 'Week'} {week}</>}
                      </p>
                      <h2 className="mt-1.5 font-display text-2xl font-extrabold leading-tight">
                        {zh ? theme.nameZh : es ? theme.nameEs : theme.name}
                      </h2>
                      <p className="mt-1.5 text-sm text-white/80">{zh ? theme.blurbZh : es ? theme.blurbEs : theme.blurb}</p>
                    </div>
                    <span className="mt-4 inline-block shrink-0 rounded-full bg-white/15 px-3 py-1 text-sm font-bold ring-1 ring-inset ring-white/20">
                      {weekDone}/{weekLessons.length}
                    </span>
                  </div>
                </div>

                {/* Node trail */}
                <div
                  className="relative shrink-0"
                  style={{ width: trailWidth(nodes.length), height: PATH_H }}
                >
                  <svg
                    className="pointer-events-none absolute inset-0"
                    width={trailWidth(nodes.length)}
                    height={PATH_H}
                    aria-hidden
                  >
                    <path
                      d={connectorPath(nodes.length, flip)}
                      fill="none"
                      stroke="#0c1a27"
                      strokeOpacity={0.18}
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
                            className={`absolute -top-9 left-1/2 z-10 -translate-x-1/2 animate-float whitespace-nowrap rounded-[6px] border-2 bg-white px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.12em] ${theme.border} ${theme.text}`}
                          >
                            {node.started
                              ? zh
                                ? '继续'
                                : es
                                  ? 'Sigue'
                                  : 'Keep going'
                              : zh
                                ? '开始'
                                : es
                                  ? 'Empezar'
                                  : 'Start'}
                          </span>
                        )}
                        {clickable ? (
                          <Link
                            to={node.meta!.path}
                            aria-label={
                              node.state === 'done'
                                ? `${label}${zh ? '，已完成' : es ? ', completada' : ', completed'}`
                                : `${label}${zh ? '，当前课程' : es ? ', lección actual' : ', current lesson'}`
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
                            aria-label={`${label}${zh ? '，已锁定 — 打开确认框' : es ? ', bloqueada — abre una confirmación' : ', locked — opens a confirmation'}`}
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
                            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white shadow"
                          >
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          </span>
                        )}
                        {node.state === 'locked' && node.kind === 'lesson' && (
                          <span
                            aria-hidden="true"
                            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink/40 text-white shadow"
                          >
                            <Lock className="h-3 w-3" aria-hidden="true" />
                          </span>
                        )}
                        {/* bg matches the page so the dotted connector never bleeds through the text */}
                        <div className="absolute left-1/2 top-[82px] w-[160px] -translate-x-1/2 bg-paper px-1 text-center leading-tight">
                          <p
                            className={`text-xs font-bold leading-tight ${
                              node.state === 'locked' ? 'text-ink/50' : 'text-ink'
                            }`}
                          >
                            {label}
                          </p>
                          {sub && <p className="mt-0.5 text-[10px] font-semibold text-ink/50">{sub}</p>}
                          {node.kind === 'lesson' && node.state === 'done' && (
                            <Stars score={node.score} lang={lang} />
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
        </div>

        {/* Bonus electives — off the core 4-week path, self-paced deep dives */}
        <section className="mt-16">
          <p className="eyebrow text-gold-500">
            <span className="eyebrow-line" aria-hidden="true" />
            {zh ? '额外' : es ? 'Extra' : 'Bonus'}
          </p>
          <h2 className="mt-2 flex items-center gap-2 font-display text-2xl font-bold text-ink">
            <Sparkles className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
            {zh ? '额外选修单元' : es ? 'Unidades extra' : 'Bonus electives'}
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
                  className="card lift group flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-bff-50 text-2xl">
                    <AppIcon name={meta.icon} className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-slate-900 group-hover:text-bff-700">
                      {lessonTitle(meta)}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">
                      {localizeActivity(meta, lang).description}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-slate-500">
                      <Clock className="mr-1 inline h-3.5 w-3.5 align-[-2px]" aria-hidden="true" />~{meta.durationMin} {zh ? '分钟' : 'min'}
                      {p?.status === 'completed'
                        ? zh
                          ? ' · 已完成！'
                          : es
                          ? ' · ¡completado!'
                          : ' · done!'
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
                            {zh ? '在找游戏吗？' : es ? '¿Buscas los juegos?' : 'Looking for the games?'}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {zh
                ? 'Wolf of Wall Street 和 Ben 的挑战自成一体——随时都能玩，不需要跟着路径走。'
                : es
                  ? 'Wolf of Wall Street y los desafíos de Ben van por su cuenta — juégalos cuando quieras, sin necesidad de la ruta.'
                  : "Wolf of Wall Street and Ben's challenges are their own thing — play them anytime, no path required."}
            </p>
          </div>
          <Link to="/activities" className="btn-secondary shrink-0">
            {zh ? '游戏与挑战' : es ? 'Juegos y desafíos' : 'Games & Challenges'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Jump-ahead confirm */}
      {jumpTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
          onClick={() => setJumpTarget(null)}
        >
          <div
            ref={jumpDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="jump-dialog-title"
            tabIndex={-1}
            className="w-full max-w-sm animate-pop-in rounded-[10px] bg-white p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <AppIcon name={jumpTarget.icon} className="mx-auto h-12 w-12 text-bff-600" />
            <h3 id="jump-dialog-title" className="mt-3 font-display text-xl font-bold text-slate-900">
              {zh ? `即将跳到 ${lessonTitle(jumpTarget)}？` : es ? `¿Saltando a ${lessonTitle(jumpTarget)}?` : `Jumping ahead to ${lessonTitle(jumpTarget)}?`}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {zh
                ? '这一站在路径上还比较靠后。如果是你的导师布置的——或者你只是好奇——尽管去吧。等你回来，路径还在这里！'
                : es
                  ? 'Esta parada viene más adelante en la ruta. Si tu mentor la asignó — o solo tienes curiosidad — adelante. ¡La ruta seguirá aquí cuando vuelvas!'
                  : "This stop comes later on the path. If your mentor assigned it — or you're just curious — go right ahead. The path will be here when you get back!"}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link to={jumpTarget.path} className="btn-primary w-full">
                {zh ? '还是要开始' : es ? 'Empezar de todos modos' : 'Start it anyway'}{' '}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              {current && (
                <Link to={current.path} className="btn-secondary w-full">
                  {zh ? '带我去下一课（' : es ? 'Llévame a mi próxima lección (' : 'Take me to my next lesson ('}
                  <AppIcon name={current.icon} className="h-4 w-4" />{' '}
                  {lessonTitle(current)})
                </Link>
              )}
              <button type="button" className="btn-ghost" onClick={() => setJumpTarget(null)}>
                {zh ? '算了' : es ? 'Déjalo' : 'Never mind'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
