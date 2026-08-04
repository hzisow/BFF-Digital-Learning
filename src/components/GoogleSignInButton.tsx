// Google sign-in via Google Identity Services (GIS). Google mints an ID token
// right in the page; we hand it to Supabase with signInWithIdToken. Unlike the
// redirect OAuth flow, the browser never bounces through the *.supabase.co
// domain — the whole thing stays on our own site.

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { GOOGLE_CLIENT_ID } from '../lib/config'
import { getSupabase } from '../lib/supabase'
import { BACKEND_ENABLED } from '../lib/config'
import { useLang } from '../lib/i18n'

// ---- Minimal typings for the GIS client ----
interface CredentialResponse {
  credential: string
}
interface GoogleId {
  initialize(config: {
    client_id: string
    callback: (res: CredentialResponse) => void
    nonce?: string
    use_fedcm_for_prompt?: boolean
  }): void
  renderButton(el: HTMLElement, opts: Record<string, string | number>): void
}
declare global {
  interface Window {
    google?: { accounts: { id: GoogleId } }
  }
}

const GSI_SRC = 'https://accounts.google.com/gsi/client'

// Thrown from loadGsi(), which runs outside React and so has no access to the
// language context. The caller swaps it for a translated message; the sentinel
// is what lets it tell this failure apart from an error text from Google.
export const GSI_LOAD_FAILED = 'GSI_LOAD_FAILED'
let gsiPromise: Promise<void> | null = null

function loadGsi(): Promise<void> {
  if (window.google?.accounts?.id) return Promise.resolve()
  if (gsiPromise) return gsiPromise
  gsiPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = GSI_SRC
    s.async = true
    s.defer = true
    s.onload = () => resolve()
    s.onerror = () => {
      gsiPromise = null
      reject(new Error(GSI_LOAD_FAILED))
    }
    document.head.appendChild(s)
  })
  return gsiPromise
}

// A nonce ties the ID token to this attempt. We send Google the SHA-256 hash
// and Supabase the raw value; Supabase re-hashes and compares.
function randomNonce(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

async function sha256(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
}

export default function GoogleSignInButton({
  onError,
}: {
  onError: (message: string) => void
}) {
  const holderRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const { lang } = useLang()
  const es = lang === 'es'
  const zh = lang === 'zh'

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !BACKEND_ENABLED) {
      setLoading(false)
      return
    }
    let cancelled = false
    const rawNonce = randomNonce()

    ;(async () => {
      try {
        const hashedNonce = await sha256(rawNonce)
        await loadGsi()
        if (cancelled || !holderRef.current || !window.google) return

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          nonce: hashedNonce,
          callback: async (res) => {
            // Signing in is exactly when the client is worth loading.
            const sb = await getSupabase()
            if (!sb) return
            const { error } = await sb.auth.signInWithIdToken({
              provider: 'google',
              token: res.credential,
              nonce: rawNonce,
            })
            if (error) {
              onError(error.message)
            }
            // On success, the auth state changes and TeamAuth redirects to
            // /admin on its own — no manual navigation (avoids a redirect race).
          },
        })

        const width = Math.min(holderRef.current.offsetWidth || 320, 400)
        window.google.accounts.id.renderButton(holderRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'center',
          width,
        })
        if (!cancelled) setLoading(false)
      } catch (err) {
        if (!cancelled) {
          setLoading(false)
          // Two failure shapes: our own sentinel for "the script never
          // loaded", which we can phrase properly, and anything Google itself
          // reports, which is already in the browser's language.
          const raw = err instanceof Error ? err.message : ''
          onError(
            raw && raw !== GSI_LOAD_FAILED
              ? raw
              : zh
                ? '无法加载 Google 登录，请检查网络后重试。'
                : es
                  ? 'No se pudo cargar el acceso con Google. Revisa tu conexión e inténtalo de nuevo.'
                  : 'Could not load Google sign-in. Check your connection and try again.',
          )
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [onError, es, zh])

  // No client ID configured yet, so render nothing (email sign-in still works).
  if (!GOOGLE_CLIENT_ID) return null

  return (
    <div>
      <div ref={holderRef} className="flex min-h-[44px] justify-center" />
      {loading && (
        <p className="flex items-center justify-center gap-1.5 text-center text-xs font-medium text-ink/50">
          <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          {zh ? '正在加载 Google 登录…' : es ? 'Cargando el inicio de sesión con Google…' : 'Loading Google sign-in…'}
        </p>
      )}
    </div>
  )
}
