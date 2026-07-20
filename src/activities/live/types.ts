// Shared contract between a solo activity and the co-play live wrapper.
export interface LiveGameProps {
  /**
   * Present only when the activity is being played inside a live co-play
   * session. The activity calls it with the final 0-100 score when the student
   * finishes, so the score can stream to the class leaderboard.
   */
  onComplete?: (score: number) => void
}
