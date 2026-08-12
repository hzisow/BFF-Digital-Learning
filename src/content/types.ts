// Content model for BFF Academy lessons.
// Lessons are authored as TypeScript files in src/content/lessons/ so the
// compiler catches malformed content.

import type { IconName } from '../lib/icons'

export interface KeyTerm {
  term: string
  definition: string
}

export interface Checkpoint {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

/** A question that pops up mid-video (Edpuzzle-style). */
export interface VideoQuestion {
  /** Seconds into the video when playback pauses and the question appears. */
  at: number
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

export interface VideoSection {
  type: 'video'
  heading: string
  /** Short setup line shown above the player. */
  body: string
  /** YouTube video ID (the part after watch?v=). */
  videoId: string
  /** Attribution shown under the player, e.g. "Two Cents · PBS Digital Studios". */
  source: string
  /**
   * Width divided by height of the SOURCE footage, when it is not 16:9.
   *
   * YouTube's player pads a non-matching video rather than cropping it, so a
   * 3:2 recording inside a 16:9 frame gets black pillars down both sides. The
   * fix is to make the frame match the footage; there is no way to ask the
   * IFrame API what the ratio is, so it has to be stated here. Defaults to
   * 16 / 9.
   */
  aspect?: number
  questions: VideoQuestion[]
}

/** An open-ended written prompt graded by the AI coach (see OpenResponse). */
export interface OpenResponseSection {
  type: 'open'
  heading: string
  /** The question the student writes an answer to. */
  prompt: string
  /** Optional grading guidance passed to the AI. */
  rubric?: string
}

export type LessonSection =
  | { type: 'intro'; heading: string; body: string }
  | { type: 'content'; heading: string; body: string; bullets?: string[] }
  | { type: 'terms'; heading: string; terms: KeyTerm[] }
  | { type: 'example'; heading: string; body: string }
  | { type: 'checkpoint'; checkpoint: Checkpoint }
  | OpenResponseSection
  | VideoSection

export interface QuizQuestion {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

/** A translated variant of a lesson's content. Any field left out falls back to
 *  English (the app shows a small "English only" note then). Used for both
 *  Spanish (es) and Simplified Chinese (zh). */
export interface LessonTranslation {
  title?: string
  description?: string
  sections?: LessonSection[]
  quiz?: QuizQuestion[]
}

export interface Lesson {
  slug: string
  week: number
  day: number
  title: string
  /** Key into the central icon registry (src/lib/icons.tsx). No emoji. */
  icon: IconName
  description: string
  durationMin: number
  sections: LessonSection[]
  quiz: QuizQuestion[]
  /** Spanish translation (es). Video sections keep the same videoId/timestamps
   *  with translated question text. */
  es?: LessonTranslation
  /** Simplified Chinese translation (zh). Same structure as `es`. */
  zh?: LessonTranslation
}
