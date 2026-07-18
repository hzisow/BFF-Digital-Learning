// BFF Academy as a Duolingo-style course path: a winding trail of lesson
// nodes grouped by week, with the games woven in as bonus stops. Progress
// comes from local storage (and the classroom DB when connected).

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ACTIVITIES } from '../lib/activities'
import type { ActivityMeta } from '../lib/activities'
import { loadLocalProgress } from '../lib/progress'
import type { ActivityProgress } from '../lib/progress'

// ---------- Path data ----------

/** Games/challenges appear as bonus nodes right after these lessons. */
const BONUS_AFTER: Record<string, string> = {
  'spending-budgeting': 'bens-budget',
  'saving-investing': 'wolf-of-wall-street',
  'risk-insurance': 'bens-insurance',
}

interface WeekTheme {
  name: string
  blurb: string
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
    blurb: 'Where money comes from — and where yours goes.',
    banner: 'from-bff-500 to-bff-700',
    nodeBg: 'bg-bff-500',
    nodeShadow: 'shadow-[0_5px_0_#036092]',
    border: 'border-bff-500',
    text: 'text-bff-600',
    bar: 'bg-bff-500',
  },
  2: {
    name: 'Make It Grow',
    blurb: 'Growing your money and borrowing without the traps.',
    banner: 'from-emerald-500 to-emerald-700',
    nodeBg: 'bg-emerald-500',
    nodeShadow: 'shadow-[0_5px_0_#047857]',
    border: 'border-emerald-500',
    text: 'text-emerald-600',
    bar: 'bg-emerald-500',
  },
  3: {
    name: 'Play It Smart',
    blurb: 'Protecting yourself and making smarter choices.',
    banner: 'from-amber-500 to-orange-600',
    nodeBg: 'bg-amber-500',
    nodeShadow: 'shadow-[0_5px_0_#b45309]',
    border: 'border-amber-500',
    text: 'text-amber-600',
    bar: 'bg-amber-500',
  },
  4: {
    name: 'Plan & Protect',
    blurb: 'Planning ahead and outsmarting the scammers.',
    banner: 'from-violet-500 to-violet-700',
    nodeBg: 'bg-violet-500',
    nodeShadow: 'shadow-[0_5px_0_#6d28d9]',
    border: 'border-violet-500',
    text: 'text-violet-600',
    bar: 'bg-violet-500',
  },
}

type NodeState = 'done' | 'current' | 'locked' | 'open'

interface PathNode {
  kind: 'lesson' | 'bonus' | 'trophy'
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
    <span className="mt-0.5 flex justify-center gap-0.5 text-sm leading-none" title={`${Math.round(score)}%`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={i < n ? 'text-yellow-400' : 'text-slate-300'}>
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
      <div className={`${base} bg-yellow-400 shadow-[0_5px_0_#b45309]`}>🏆</div>
    ) : (
      <div className={`${base} bg-slate-200 opacity-80 shadow-[0_5px_0_#cbd5e1] grayscale`}>🏆</div>
    )
  }
  if (node.kind === 'bonus') {
    return (
      <div
        className={`${base} ${
          node.state === 'done' ? 'bg-fuchsia-500' : 'bg-fuchsia-500'
        } shadow-[0_5px_0_#a21caf] hover:brightness-110`}
      >
        {node.meta!.emoji}
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
  const [jumpTarget, setJumpTarget] = useState<ActivityMeta | null>(null)

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

    const toNode = (meta: ActivityMeta, kind: 'lesson' | 'bonus'): PathNode => {
      const p: ActivityProgress | undefined = progress[meta.slug]
      const state: NodeState =
        p?.status === 'completed'
          ? 'done'
          : kind === 'bonus'
            ? 'open'
            : meta.slug === current?.slug
              ? 'current'
              : 'locked'
      return { kind, meta, state, score: p?.score ?? null, started: p?.status === 'started' }
    }

    const result = [...byWeek.entries()]
      .sort(([a], [b]) => a - b)
      .map(([week, list]) => ({
        week,
        nodes: list.flatMap((lesson) => {
          const nodes: PathNode[] = [toNode(lesson, 'lesson')]
          const bonusSlug = BONUS_AFTER[lesson.slug]
          const bonusMeta = bonusSlug ? ACTIVITIES.find((a) => a.slug === bonusSlug) : undefined
          if (bonusMeta) nodes.push(toNode(bonusMeta, 'bonus'))
          return nodes
        }),
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
        <p className="chip mx-auto bg-bff-50 text-bff-700">📚 The curriculum</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-slate-900">BFF Academy</h1>
        <p className="mx-auto mt-3 max-w-xl leading-relaxed text-slate-600">
          4 weeks, 8 lessons, ~20 minutes each. Follow the path — finish a lesson to unlock
          the next stop, grab the bonus games along the way, and claim the trophy at the end.
        </p>
        <div className="mx-auto mt-5 flex max-w-md items-center gap-3">
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-slate-200">
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
            Course complete — you legend! 🏆
          </p>
        ) : (
          current && (
            <Link to={current.path} className="btn-primary mt-5 inline-flex">
              {doneCount === 0 ? 'Start Day 1' : 'Continue'}: {current.emoji} {current.title} →
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
                    <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                      Week {week}
                    </p>
                    <h2 className="font-display text-xl font-extrabold">{theme.name}</h2>
                    <p className="mt-1 text-sm text-white/85">{theme.blurb}</p>
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
                        ? 'Course complete!'
                        : 'Finish every lesson'
                      : node.meta!.title
                  const sub =
                    node.kind === 'lesson'
                      ? `Day ${node.meta!.sortKey % 10} · ${node.meta!.durationMin} min`
                      : node.kind === 'bonus'
                        ? 'Bonus 🎮'
                        : ''

                  const circle = <NodeCircle node={node} theme={theme} />
                  const clickable =
                    node.kind !== 'trophy' &&
                    (node.state === 'done' || node.state === 'current' || node.state === 'open')

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
                        <Link to={node.meta!.path} aria-label={label}>
                          {circle}
                        </Link>
                      ) : node.kind === 'trophy' ? (
                        circle
                      ) : (
                        <button
                          type="button"
                          aria-label={`${label} (locked)`}
                          onClick={() => setJumpTarget(node.meta!)}
                        >
                          {circle}
                        </button>
                      )}
                      {node.state === 'done' && node.kind !== 'trophy' && (
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white shadow">
                          ✓
                        </span>
                      )}
                      {node.state === 'locked' && node.kind === 'lesson' && (
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 text-xs text-white shadow">
                          🔒
                        </span>
                      )}
                      {/* bg matches the page so the dotted connector never bleeds through the text */}
                      <div className="absolute left-1/2 top-[82px] w-36 -translate-x-1/2 bg-slate-50 text-center">
                        <p
                          className={`text-xs font-bold leading-tight ${
                            node.state === 'locked' ? 'text-slate-400' : 'text-slate-700'
                          }`}
                        >
                          {label}
                        </p>
                        {sub && <p className="mt-0.5 text-[10px] font-semibold text-slate-400">{sub}</p>}
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

      <p className="mt-12 text-center text-sm text-slate-500">
        Want to replay a game without the path?{' '}
        <Link to="/activities" className="font-semibold text-bff-600 hover:underline">
          Browse all games & challenges →
        </Link>
      </p>

      {/* Jump-ahead confirm */}
      {jumpTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onClick={() => setJumpTarget(null)}
        >
          <div
            className="w-full max-w-sm animate-pop-in rounded-3xl bg-white p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-5xl">{jumpTarget.emoji}</p>
            <h3 className="mt-3 font-display text-xl font-bold text-slate-900">
              Jumping ahead to {jumpTarget.title}?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              This stop comes later on the path. If your mentor assigned it — or you're just
              curious — go right ahead. The path will be here when you get back!
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Link to={jumpTarget.path} className="btn-primary w-full">
                Start it anyway →
              </Link>
              {current && (
                <Link to={current.path} className="btn-secondary w-full">
                  Take me to my next lesson ({current.emoji} {current.title})
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
