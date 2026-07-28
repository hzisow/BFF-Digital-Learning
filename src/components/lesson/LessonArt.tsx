// Hand-built SVG motifs that give each lesson topic its own visual identity on
// the dark hero canvas. Two tones only: `paper` (light strokes/fills, via
// currentColor set on the wrapper) and the BFF blue accent (var --lz-blue),
// with an occasional gold spark. Geometric and editorial — no emoji, no raster.
//
// Every motif draws inside a 0 0 200 200 viewBox and is mapped from a lesson
// slug below, with a sensible fallback so new lessons still render.

import type { ReactNode, ReactElement } from 'react'

type MotifProps = { className?: string }

const A = 'var(--lz-blue)' // accent
const AB = 'var(--lz-blue-bright)' // brighter accent
const GOLD = 'var(--lz-gold)'

// Shared frame: a chamfered plate the motif sits on, plus two orbit arcs that
// echo the hero's rings so the art feels part of the canvas.
function Frame({ children }: { children: ReactNode }) {
  return (
    <>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeOpacity="0.14" />
      <circle cx="100" cy="100" r="70" fill="none" stroke={A} strokeOpacity="0.35" />
      {children}
    </>
  )
}

function Paycheck() {
  return (
    <Frame>
      <g>
        <rect x="44" y="66" width="112" height="68" fill="currentColor" opacity="0.96" />
        <rect x="44" y="66" width="112" height="16" fill={A} />
        <rect x="56" y="96" width="46" height="7" fill={A} opacity="0.5" />
        <rect x="56" y="110" width="66" height="7" fill="currentColor" opacity="0.28" />
        <circle cx="130" cy="112" r="14" fill={GOLD} />
        <path d="M130 104v16M125 109h7a3 3 0 010 6h-6a3 3 0 000 6h8" stroke="var(--lz-ink)" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    </Frame>
  )
}

function Cart() {
  return (
    <Frame>
      <path d="M54 62h16l12 58h56l12-40H84" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="92" y="70" width="44" height="30" fill={A} />
      <path d="M100 85l7 7 14-14" stroke="var(--lz-ink)" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="92" cy="140" r="9" fill={GOLD} />
      <circle cx="132" cy="140" r="9" fill={GOLD} />
    </Frame>
  )
}

function Growth() {
  return (
    <Frame>
      <rect x="52" y="120" width="18" height="28" fill="currentColor" opacity="0.35" />
      <rect x="80" y="102" width="18" height="46" fill="currentColor" opacity="0.55" />
      <rect x="108" y="80" width="18" height="68" fill={A} />
      <rect x="136" y="58" width="18" height="90" fill={AB} />
      <path d="M52 108l30-16 26 12 40-40" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M132 60h18v18" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  )
}

function Card() {
  return (
    <Frame>
      <rect x="46" y="70" width="108" height="66" rx="4" fill="currentColor" opacity="0.96" />
      <rect x="46" y="84" width="108" height="14" fill="var(--lz-ink)" />
      <rect x="58" y="112" width="34" height="8" fill={A} />
      <rect x="58" y="124" width="20" height="6" fill="currentColor" opacity="0.35" />
      <circle cx="132" cy="122" r="10" fill={GOLD} />
      <circle cx="120" cy="122" r="10" fill={A} opacity="0.85" />
    </Frame>
  )
}

function Shield() {
  return (
    <Frame>
      <path d="M100 54l38 14v34c0 26-18 40-38 48-20-8-38-22-38-48V68z" fill="currentColor" opacity="0.96" />
      <path d="M100 54l38 14v34c0 26-18 40-38 48z" fill={A} />
      <path d="M84 100l12 12 24-26" stroke="var(--lz-ink)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </Frame>
  )
}

function Fork() {
  return (
    <Frame>
      <path d="M100 150V96" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M100 96L66 62M100 96l34-34" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <circle cx="100" cy="150" r="10" fill="currentColor" />
      <path d="M60 68l-6-14 14 2" stroke={A} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M140 68l6-14-14 2" stroke={GOLD} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="66" cy="62" r="7" fill={A} />
      <circle cx="134" cy="62" r="7" fill={GOLD} />
    </Frame>
  )
}

function Map() {
  return (
    <Frame>
      <path d="M58 72l28-10 28 10 28-10v66l-28 10-28-10-28 10z" fill="currentColor" opacity="0.92" />
      <path d="M86 62v66M114 72v66" stroke="var(--lz-ink)" strokeWidth="3" opacity="0.4" />
      <path d="M70 118c0-12 10-20 22-20s22 8 22 20" fill="none" stroke={A} strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="70" cy="118" r="7" fill={A} />
      <path d="M120 96c0-8 12-8 12 0 0 6-6 12-6 12s-6-6-6-12z" fill={GOLD} />
    </Frame>
  )
}

function Bank() {
  return (
    <Frame>
      <path d="M56 84l44-24 44 24z" fill={A} />
      <rect x="56" y="84" width="88" height="8" fill="currentColor" />
      <rect x="64" y="96" width="9" height="34" fill="currentColor" opacity="0.9" />
      <rect x="88" y="96" width="9" height="34" fill="currentColor" opacity="0.9" />
      <rect x="112" y="96" width="9" height="34" fill="currentColor" opacity="0.9" />
      <rect x="131" y="96" width="9" height="34" fill="currentColor" opacity="0.9" />
      <rect x="52" y="134" width="96" height="9" fill="currentColor" />
      <circle cx="100" cy="72" r="6" fill={GOLD} />
    </Frame>
  )
}

const MOTIFS: Record<string, () => ReactElement> = {
  paycheck: Paycheck,
  cart: Cart,
  growth: Growth,
  card: Card,
  shield: Shield,
  fork: Fork,
  map: Map,
  bank: Bank,
}

// Each lesson slug maps to a motif. Electives reuse the closest archetype.
const SLUG_MOTIF: Record<string, keyof typeof MOTIFS> = {
  'earning-income': 'paycheck',
  'first-paycheck': 'paycheck',
  'spending-budgeting': 'cart',
  'consumer-protection': 'cart',
  'saving-investing': 'growth',
  'entrepreneurship': 'growth',
  'credit-debt': 'card',
  'risk-insurance': 'shield',
  'crypto-and-scams': 'shield',
  'financial-decision-making': 'fork',
  'financial-planning': 'map',
  'paying-for-college': 'map',
  'taxes-deep-dive': 'bank',
}

export function LessonArt({ slug, className }: { slug: string } & MotifProps) {
  const Motif = MOTIFS[SLUG_MOTIF[slug] ?? 'growth'] ?? Growth
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true" focusable="false">
      <Motif />
    </svg>
  )
}
