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

export type LessonSection =
  | { type: 'intro'; heading: string; body: string }
  | { type: 'content'; heading: string; body: string; bullets?: string[] }
  | { type: 'terms'; heading: string; terms: KeyTerm[] }
  | { type: 'example'; heading: string; body: string }
  | { type: 'checkpoint'; checkpoint: Checkpoint }

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
