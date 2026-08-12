// Backend configuration.
//
// BFF Classroom works in two modes:
//  - "Solo mode" (no backend): lessons, challenges, and the solo Market
//    Movers game all work entirely in the browser. Progress saves locally.
//  - "Connected mode" (Supabase): class codes, assignments, mentor dashboard,
//    and live multiplayer games light up.
//
// To connect a backend, create a (free) Supabase project, run the migrations
// in supabase/migrations/, then fill these two values in (or set the
// VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env vars at build time).

// These are the BFF Classroom Supabase project's public values. The anon /
// publishable key is safe to ship in client code — every table is protected
// by Row-Level Security. Build-time env vars (VITE_SUPABASE_*) override them.
const FALLBACK_SUPABASE_URL = 'https://xrlmxpmaykldvbjnoapk.supabase.co'
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_yY92z7eOkizr9oraWU39-A_-9xAekfl'

export const SUPABASE_URL: string =
  (import.meta.env.VITE_SUPABASE_URL as string | undefined) || FALLBACK_SUPABASE_URL

export const SUPABASE_ANON_KEY: string =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
  FALLBACK_SUPABASE_ANON_KEY

export const BACKEND_ENABLED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// Google OAuth "Web application" Client ID (ends with .apps.googleusercontent.com).
// Public by design — safe to ship. Used by Google Identity Services to mint an
// ID token, which we exchange with Supabase via signInWithIdToken (no redirect
// through the supabase.co domain). Set VITE_GOOGLE_CLIENT_ID to override.
const FALLBACK_GOOGLE_CLIENT_ID =
  '320974823060-14u0de4f28q3n4tm59t15c30at7206o2.apps.googleusercontent.com'

export const GOOGLE_CLIENT_ID: string =
  (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined) || FALLBACK_GOOGLE_CLIENT_ID
