// Content model for BFF Academy lessons.
// Lessons are authored as TypeScript files in src/content/lessons/ so the
// compiler catches malformed content.

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
  questions: VideoQuestion[]
}

export type LessonSection =
  | { type: 'intro'; heading: string; body: string }
  | { type: 'content'; heading: string; body: string; bullets?: string[] }
  | { type: 'terms'; heading: string; terms: KeyTerm[] }
  | { type: 'example'; heading: string; body: string }
  | { type: 'checkpoint'; checkpoint: Checkpoint }
  | VideoSection

export interface QuizQuestion {
  question: string
  options: string[]
  answerIndex: number
  explanation: string
}

export interface Lesson {
  slug: string
  week: number
  day: number
  title: string
  emoji: string
  description: string
  durationMin: number
  sections: LessonSection[]
  quiz: QuizQuestion[]
}
