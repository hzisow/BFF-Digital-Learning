// Loading placeholders — a subtle pulsing block, plus a ready-made card shape.

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/70 ${className}`} aria-hidden="true" />
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
