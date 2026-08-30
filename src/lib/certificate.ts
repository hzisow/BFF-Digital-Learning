// Shareable certificates, and the LinkedIn hand-off.
//
// The certificate is private by default: the name is typed, drawn, and never
// leaves the browser. Issuing a shareable one is a separate act the student
// takes on purpose, because LinkedIn's "add to profile" flow needs a URL a
// stranger can open, and a credential nobody can check is not a credential.

import { requireSupabase } from './supabase'

/** The public name of the credential, as it should read on a profile. */
export const CERTIFICATE_NAME = 'BFF Academy Financial Literacy'

/** The issuing organisation, as LinkedIn should show it. */
export const ISSUER_NAME = 'BFF of America'

/**
 * BFF of America's LinkedIn company page id, if it has one.
 *
 * LinkedIn matches the issuer to a real company page by numeric id. With only a
 * name it still fills the field in, but the entry does not link through to the
 * page and does not carry the logo. Find the id by opening the company page and
 * reading the number out of the "admin" URL, or from the page source, then put
 * it here. Until then the name is used and everything else works.
 */
export const ISSUER_LINKEDIN_ID: string | null = null

export interface VerifiedCertificate {
  displayName: string
  avgScore: number | null
  lessonsPassed: number
  issuedAt: string
}

/**
 * Publish a certificate and return its credential id.
 *
 * Creates an anonymous session first when the student does not have one, which
 * most solo students will not: the database function refuses callers it cannot
 * identify, because an open insert reachable with the public anon key would be
 * a spam endpoint.
 */
export async function issueCertificate(
  name: string,
  avgScore: number | null,
  lessonsPassed: number,
): Promise<string> {
  const db = await requireSupabase()
  const { data: session } = await db.auth.getSession()
  if (!session.session) {
    const { error } = await db.auth.signInAnonymously()
    if (error) throw new Error(error.message)
  }
  const { data, error } = await db.rpc('issue_certificate', {
    p_name: name.trim(),
    p_avg_score: avgScore,
    p_lessons_passed: lessonsPassed,
  })
  if (error) {
    if (error.message.includes('TOO_MANY')) {
      throw new Error('TOO_MANY')
    }
    if (error.message.includes('BAD_NAME')) throw new Error('BAD_NAME')
    throw new Error(error.message)
  }
  return data as string
}

/** Look up one certificate. Returns null when the id does not exist. */
export async function verifyCertificate(id: string): Promise<VerifiedCertificate | null> {
  const db = await requireSupabase()
  const { data, error } = await db.rpc('verify_certificate', { p_id: id })
  if (error) throw new Error(error.message)
  const row = Array.isArray(data) ? data[0] : data
  if (!row) return null
  return {
    displayName: row.display_name as string,
    avgScore: (row.avg_score as number | null) ?? null,
    lessonsPassed: row.lessons_passed as number,
    issuedAt: row.issued_at as string,
  }
}

/** The public page a LinkedIn viewer opens to check a credential. */
export function verifyUrl(id: string): string {
  return `${window.location.origin}${import.meta.env.BASE_URL}verify/${id}`.replace(
    /([^:]\/)\/+/g,
    '$1',
  )
}

/**
 * LinkedIn's "add a licence or certification" deep link, pre-filled.
 *
 * Opening it drops the student into the certification form on their own
 * profile with every field already populated. They press save. There is no API
 * involved and nothing to authorise; the parameters are just query string.
 */
export function linkedInAddUrl(id: string, issuedAt: Date): string {
  const params = new URLSearchParams({
    startTask: 'CERTIFICATION_NAME',
    name: CERTIFICATE_NAME,
    issueYear: String(issuedAt.getFullYear()),
    issueMonth: String(issuedAt.getMonth() + 1),
    certUrl: verifyUrl(id),
    certId: id,
  })
  // An id links the entry to the real company page and shows its logo; a name
  // alone fills the field but stays plain text.
  if (ISSUER_LINKEDIN_ID) params.set('organizationId', ISSUER_LINKEDIN_ID)
  else params.set('organizationName', ISSUER_NAME)
  return `https://www.linkedin.com/profile/add?${params.toString()}`
}
