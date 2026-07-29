// What fills the screen for the moment a route's code is downloading.
//
// These only ever appear on the first visit to a route (afterwards the chunk is
// in memory and the swap is synchronous), and on a fast connection they are
// gone in a frame or two. They still matter: without them the app would blank
// out mid-navigation, which reads as a crash rather than as loading.
//
// Each fallback mirrors the shape of the page it stands in for, so the layout
// does not jump when the real component takes over.

import { Loading, Skeleton, SkeletonHero, SkeletonCard } from './Skeleton'

/** For routes inside the global Layout — the header and footer are already
 *  painted, so this only fills the main content area. */
export function PageFallback() {
  return (
    <Loading label="Loading page">
      <SkeletonHero />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </Loading>
  )
}

/** The lesson canvas renders outside the global Layout and has its own chrome,
 *  so its fallback has to draw the whole screen: slim top bar, dark hero. */
export function LessonFallback() {
  return (
    <div className="lz">
      <Loading label="Loading lesson">
        <div className="flex h-14 items-center gap-3 border-b border-ink/10 px-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="mx-auto w-full max-w-[820px] px-4 py-10">
          <div className="chamfer space-y-4 bg-ink p-8 sm:p-12">
            <div className="h-3 w-28 animate-pulse rounded-[4px] bg-white/20" />
            <div className="h-11 w-3/4 animate-pulse rounded-[6px] bg-white/25" />
            <div className="h-11 w-1/2 animate-pulse rounded-[6px] bg-white/25" />
            <div className="space-y-2 pt-4">
              <div className="h-4 w-full animate-pulse rounded-[4px] bg-white/15" />
              <div className="h-4 w-full animate-pulse rounded-[4px] bg-white/15" />
              <div className="h-4 w-2/3 animate-pulse rounded-[4px] bg-white/15" />
            </div>
          </div>
        </div>
      </Loading>
    </div>
  )
}

/** Live game screens take over the whole viewport with no site chrome, so a
 *  page-shaped skeleton would be misleading. A quiet centered state is honest
 *  about the fact that nothing is on screen yet. */
export function FullscreenFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-ink px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Loading</span>
      <div className="w-full max-w-sm space-y-3" aria-hidden="true">
        <div className="h-3 w-24 animate-pulse rounded-[4px] bg-white/20" />
        <div className="h-9 w-3/4 animate-pulse rounded-[6px] bg-white/25" />
        <div className="h-4 w-1/2 animate-pulse rounded-[4px] bg-white/15" />
      </div>
    </div>
  )
}
