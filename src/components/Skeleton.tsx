// Loading placeholders. Skeletons stand in for content that is on its way, so
// a screen keeps its shape instead of collapsing to a spinner and then jumping
// once the data lands.
//
// Accessibility: the shapes themselves are decorative (aria-hidden). The
// CONTAINER carries role="status" and a label, so a screen reader announces
// "Loading…" once rather than reading a wall of empty boxes. The `Loading`
// wrapper below does that for you.

import type { ReactNode } from 'react'

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[6px] bg-ink/[0.07] ${className}`}
      aria-hidden="true"
    />
  )
}

/**
 * Wrap a set of skeletons so assistive tech hears one clear status instead of
 * the individual placeholder blocks.
 */
export function Loading({
  label,
  className = '',
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  )
}

/** Stacked text lines, with a short last line so it reads like a paragraph. */
export function SkeletonText({
  lines = 3,
  className = '',
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  )
}

/** A card-shaped skeleton for grids of loading content. */
export function SkeletonCard() {
  return (
    <div className="card space-y-3" aria-hidden="true">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="mt-2 h-9 w-28" />
    </div>
  )
}

/** A horizontal row skeleton (e.g. a leaderboard/list line). */
export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <Skeleton className="h-7 w-7 rounded-full" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-4 w-12" />
    </div>
  )
}

/**
 * Stand-in for the dark editorial hero, drawn on the ink field itself so the
 * page keeps its full-bleed band while the real copy loads.
 */
export function SkeletonHero() {
  return (
    <div className="ed-hero px-6 py-12 sm:px-10" aria-hidden="true">
      <div className="relative z-[1] mx-auto max-w-6xl space-y-4">
        <div className="h-3 w-32 animate-pulse rounded-[4px] bg-white/20" />
        <div className="h-10 w-3/4 animate-pulse rounded-[6px] bg-white/25 sm:h-12" />
        <div className="h-4 w-1/2 animate-pulse rounded-[4px] bg-white/15" />
      </div>
    </div>
  )
}

/**
 * Whole-page placeholder for routes gated behind an auth or data check: an
 * editorial hero plus a grid of cards, so the layout does not jump when the
 * real content arrives.
 */
export function SkeletonPage({ label, cards = 3 }: { label: string; cards?: number }) {
  return (
    <Loading label={label}>
      <SkeletonHero />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </Loading>
  )
}

/** Quiz/practice question placeholder: prompt plus lettered option rows. */
export function SkeletonQuestion({ options = 4 }: { options?: number }) {
  return (
    <div className="card space-y-4" aria-hidden="true">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-6 w-4/5" />
      <div className="space-y-2 pt-2">
        {Array.from({ length: options }, (_, i) => (
          <Skeleton key={i} className="h-11 w-full" />
        ))}
      </div>
    </div>
  )
}
