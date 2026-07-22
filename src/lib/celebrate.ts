// Celebration moments: a dependency-free confetti burst + a matching sound.
// Respects prefers-reduced-motion (no animation for students who opt out).

import { playSound } from './sound'

function reducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/** A one-shot confetti burst rendered on a throwaway full-screen canvas. */
export function confettiBurst(count = 130): void {
  if (typeof document === 'undefined' || reducedMotion()) return
  const canvas = document.createElement('canvas')
  canvas.style.cssText =
    'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:9999'
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  document.body.appendChild(canvas)
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }

  const colors = ['#2563eb', '#60a5fa', '#fbbf24', '#34d399', '#f472b6', '#a78bfa']
  const parts = Array.from({ length: count }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 140,
    y: canvas.height / 3,
    vx: (Math.random() - 0.5) * 13,
    vy: Math.random() * -15 - 4,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
  }))

  const start = performance.now()
  const DURATION = 2600
  function frame(now: number) {
    const elapsed = now - start
    ctx!.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of parts) {
      p.vy += 0.35 // gravity
      p.x += p.vx
      p.y += p.vy
      p.rot += p.vr
      ctx!.save()
      ctx!.translate(p.x, p.y)
      ctx!.rotate(p.rot)
      ctx!.globalAlpha = Math.max(0, 1 - elapsed / DURATION)
      ctx!.fillStyle = p.color
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx!.restore()
    }
    if (elapsed < DURATION) requestAnimationFrame(frame)
    else canvas.remove()
  }
  requestAnimationFrame(frame)
}

/** Fire confetti + the matching sound for a moment worth celebrating. */
export function celebrate(kind: 'levelup' | 'complete' | 'perfect' = 'complete'): void {
  confettiBurst(kind === 'perfect' ? 180 : 130)
  playSound(kind === 'levelup' ? 'levelup' : 'complete')
}
