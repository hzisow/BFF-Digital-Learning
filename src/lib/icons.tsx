// Central icon registry — the single source of truth for every symbol in the
// app. The app uses ZERO emoji: content data (lessons, activities, badges, XP
// tiers, quests) stores an `icon` KEY from this registry, and UI renders it via
// <AppIcon name={...} />. Adding content means picking a key here, never pasting
// a glyph, so emoji can't creep back in.

import {
  Briefcase, ShoppingCart, TrendingUp, CreditCard, ShieldCheck, Brain, Map,
  ShieldAlert, ReceiptText, Landmark, GraduationCap, Rocket, Bitcoin, LineChart,
  Umbrella, Search, Gauge, Target, Egg, PieChart, PiggyBank, Handshake,
  Trophy, Sprout, Medal, Award, Gamepad2, Flame, Zap, Sun, BookOpen, CheckCheck,
  Coins, Banknote, Calculator, Store, Sparkles, Star, Crown, Clock, Users,
  Wand2, Home, Percent, HelpCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const ICONS = {
  // Core lessons
  briefcase: Briefcase,
  cart: ShoppingCart,
  growth: TrendingUp,
  card: CreditCard,
  shield: ShieldCheck,
  brain: Brain,
  map: Map,
  detective: Search,
  // Electives
  receipt: ReceiptText,
  landmark: Landmark,
  college: GraduationCap,
  rocket: Rocket,
  crypto: Bitcoin,
  // Games & challenges
  market: LineChart,
  home: Home,
  umbrella: Umbrella,
  gauge: Gauge,
  alert: ShieldAlert,
  target: Target,
  store: Store,
  // XP tiers
  egg: Egg,
  pie: PieChart,
  piggy: PiggyBank,
  handshake: Handshake,
  trophy: Trophy,
  // Badges & misc
  sprout: Sprout,
  medal: Medal,
  award: Award,
  gamepad: Gamepad2,
  flame: Flame,
  zap: Zap,
  sun: Sun,
  book: BookOpen,
  perfect: CheckCheck,
  coins: Coins,
  cash: Banknote,
  calculator: Calculator,
  sparkles: Sparkles,
  star: Star,
  crown: Crown,
  clock: Clock,
  users: Users,
  wand: Wand2,
  percent: Percent,
  help: HelpCircle,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof ICONS

/** Look up an icon component by key, falling back to a neutral glyph. */
export function iconFor(name: string): LucideIcon {
  return (ICONS as Record<string, LucideIcon>)[name] ?? HelpCircle
}

/**
 * Render a registry icon. Decorative by default (aria-hidden); pass a `title`
 * only when the icon is the sole carrier of meaning.
 */
export function AppIcon({
  name,
  className = 'h-5 w-5',
  title,
}: {
  name: string
  className?: string
  title?: string
}) {
  const Icon = iconFor(name)
  return (
    <Icon
      className={className}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      role={title ? 'img' : undefined}
      focusable="false"
    />
  )
}
