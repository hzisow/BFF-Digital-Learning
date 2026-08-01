// Student accounts: sign up, sign in, forget the password, get back in.
//
// Until now a student's identity lived entirely on one device — a class code and
// a name in localStorage, backed by an *anonymous* Supabase user. Lose the
// laptop and you lose the progress. This adds a real account so a student can
// come back on any device, which is also what makes the end-of-course
// certificate mean anything.
//
// ## The one thing worth understanding here
//
// A student has usually already done several lessons before they think about an
// account, and that progress is attached to their anonymous `auth.users` row.
// So signing up does not create a second user — it *upgrades the one they
// already have* via `updateUser`, which keeps the same uid. Because
// `students.auth_uid` and therefore every `progress` row hang off that uid, all
// of it survives with no data migration and no merge step.
//
// Falling back to `signUp` only happens when there is no session at all, i.e. a
// visitor who is creating an account before doing anything.
//
// ## Deliberately kept: the class-code path
//
// Accounts are *additional*, not a replacement. A mentor with thirty students
// and a forty-five minute period cannot run everyone through email confirmation,
// and demanding an email address to try a free lesson is exactly the friction
// the name-based join was built to remove. Class code stays the classroom door;
// accounts are for keeping your work.

import { requireSupabase } from './supabase'
import { BACKEND_ENABLED } from './config'

/** Where Supabase should send someone after they click a password-reset link. */
export function resetRedirectUrl(): string {
  // import.meta.env.BASE_URL already carries the repo subpath on Pages.
  return `${window.location.origin}${import.meta.env.BASE_URL}reset-password`
}

/**
 * Marks an account as a student's rather than a BFF team member's.
 *
 * This is a UX flag, not a security boundary: user metadata is writable by the
 * user it belongs to. Real team access is gated server-side by
 * `profiles.approved` and the `is_approved_admin()` RLS helper, so the worst a
 * student can do by clearing this is show themselves a dashboard link that
 * leads to a "waiting for approval" screen.
 */
export const STUDENT_ROLE = 'student'

export function isStudentAccount(meta: Record<string, unknown> | undefined): boolean {
  return meta?.bff_role === STUDENT_ROLE
}

function friendly(message: string): string {
  const m = message.toLowerCase()
  if (m.includes('already registered') || m.includes('already been registered')) {
    return 'There is already an account with that email. Try signing in instead.'
  }
  if (m.includes('invalid login credentials')) {
    return 'That email and password do not match. Check them, or reset your password.'
  }
  if (m.includes('email not confirmed')) {
    return 'Check your inbox and click the confirmation link first, then sign in.'
  }
  if (m.includes('password should be') || m.includes('at least')) {
    return 'Passwords need to be at least 8 characters.'
  }
  if (m.includes('rate limit') || m.includes('too many')) {
    return 'Too many tries just now. Wait a minute and try again.'
  }
  if (m.includes('failed to fetch') || m.includes('network')) {
    return 'Could not reach the server. Check your connection and try again.'
  }
  return message
}

function assertBackend(): void {
  if (!BACKEND_ENABLED) {
    throw new Error('Accounts are not switched on yet — everything still works without one.')
  }
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return 'Use at least 8 characters.'
  return null
}

export interface SignUpResult {
  /** True when Supabase wants the address confirmed before the account works. */
  needsConfirmation: boolean
  /** True when existing on-device progress was carried into the new account. */
  keptProgress: boolean
}

/**
 * Create an account, keeping any work already done on this device.
 *
 * @param name Optional display name, stored so the certificate can fill itself in.
 */
export async function signUpStudent(
  email: string,
  password: string,
  name?: string,
): Promise<SignUpResult> {
  assertBackend()
  const pwError = validatePassword(password)
  if (pwError) throw new Error(pwError)

  const supabase = await requireSupabase()
  const { data: current } = await supabase.auth.getSession()
  const anon = current.session?.user
  const metadata = {
    bff_role: STUDENT_ROLE,
    ...(name?.trim() ? { full_name: name.trim() } : {}),
  }

  // The upgrade path — same uid, so progress, class membership and scores all
  // stay attached without touching a single row.
  if (anon?.is_anonymous) {
    const { error } = await supabase.auth.updateUser({
      email: email.trim(),
      password,
      data: metadata,
    })
    if (error) throw new Error(friendly(error.message))
    return { needsConfirmation: true, keptProgress: true }
  }

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: metadata, emailRedirectTo: resetRedirectUrl() },
  })
  if (error) throw new Error(friendly(error.message))
  // Supabase returns a user with no session when confirmation is required.
  return { needsConfirmation: !data.session, keptProgress: false }
}

export async function signInStudent(email: string, password: string): Promise<void> {
  assertBackend()
  const supabase = await requireSupabase()
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  })
  if (error) throw new Error(friendly(error.message))
}

/**
 * Send a reset link.
 *
 * Resolves the same way whether or not the address has an account — telling an
 * anonymous caller "no account with that email" turns this form into a way to
 * find out who has signed up.
 */
export async function requestPasswordReset(email: string): Promise<void> {
  assertBackend()
  const supabase = await requireSupabase()
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: resetRedirectUrl(),
  })
  // A missing address is not an error worth surfacing; a broken connection is.
  if (error && !/not found|no user/i.test(error.message)) {
    throw new Error(friendly(error.message))
  }
}

/** Called on the reset page, once the recovery link has established a session. */
export async function setNewPassword(password: string): Promise<void> {
  assertBackend()
  const pwError = validatePassword(password)
  if (pwError) throw new Error(pwError)
  const supabase = await requireSupabase()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(friendly(error.message))
}

export async function signOutStudent(): Promise<void> {
  if (!BACKEND_ENABLED) return
  const supabase = await requireSupabase()
  await supabase.auth.signOut()
}
