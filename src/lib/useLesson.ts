// Load one lesson by slug, for screens where the slug arrives at runtime.
//
// The live quiz screens learn which lesson they are running from the session
// row, so they cannot import it — they have to fetch it once the session lands.
// Lesson content is one chunk per lesson (see content/lessons/index.ts), so this
// is a network call the first time and free afterwards.
//
// `loading` matters more than it looks: without it, a screen that renders
// "lesson not found" whenever `lesson` is undefined will flash that message
// during the perfectly normal fetch.

import { useEffect, useState } from 'react'
import type { Lesson } from '../content/types'
import { isLessonSlug, loadLesson, peekLesson } from '../content/lessons'

export function useLesson(slug: string | undefined): {
  lesson: Lesson | undefined
  loading: boolean
} {
  const [lesson, setLesson] = useState<Lesson | undefined>(() =>
    slug ? peekLesson(slug) : undefined,
  )
  // Start "loading" only when there is a real slug we have not already fetched,
  // so an unknown slug reports not-found immediately instead of spinning.
  const [loading, setLoading] = useState(
    () => !!slug && isLessonSlug(slug) && !peekLesson(slug),
  )

  useEffect(() => {
    if (!slug || !isLessonSlug(slug)) {
      setLesson(undefined)
      setLoading(false)
      return
    }
    const already = peekLesson(slug)
    if (already) {
      setLesson(already)
      setLoading(false)
      return
    }
    let live = true
    setLoading(true)
    void loadLesson(slug).then((l) => {
      if (!live) return
      setLesson(l)
      setLoading(false)
    })
    return () => {
      live = false
    }
  }, [slug])

  return { lesson, loading }
}
