// Backend configuration.
//
// BFF Classroom works in two modes:
//  - "Solo mode" (no backend): lessons, challenges, and the solo Wolf of Wall
//    Street game all work entirely in the browser. Progress saves locally.
//  - "Connected mode" (Supabase): class codes, assignments, mentor dashboard,
//    and live multiplayer games light up.
//
// To connect a backend, create a (free) Supabase project, run the migrations
// in supabase/migrations/, then fill these two values in (or set the
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env vars at build time).

const FALLBACK_SUPABASE_URL = ''
const FALLBACK_SUPABASE_ANON_KEY = ''

export const SUPABASE_URL: string =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || FALLBACK_SUPABASE_URL

export const SUPABASE_ANON_KEY: string =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  FALLBACK_SUPABASE_ANON_KEY

export const BACKEND_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
