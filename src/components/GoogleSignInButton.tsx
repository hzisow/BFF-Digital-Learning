// Google sign-in via Google Identity Services (GIS). Google mints an ID token
// right in the page; we hand it to Supabase with signInWithIdToken. Unlike the
// redirect OAuth flow, the browser never bounces through the *.supabase.co
// domain — the whole thing stays on our own site.

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GOOGLE_CLIENT_ID } from '../lib/config'
import { supabase } from '../lib/supabase'

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
      reject(new Error('Could not load Google sign-in.'))
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
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !supabase) {
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
            const sb = supabase
            if (!sb) return
            const { error } = await sb.auth.signInWithIdToken({
              provider: 'google',
              token: res.credential,
              nonce: rawNonce,
            })
            if (error) {
              onError(error.message)
              return
            }
            navigate('/admin')
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
          onError(err instanceof Error ? err.message : 'Google sign-in unavailable.')
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [navigate, onError])

  // No client ID configured yet → render nothing (email sign-in still works).
  if (!GOOGLE_CLIENT_ID) return null

  return (
    <div>
      <div ref={holderRef} className="flex min-h-[44px] justify-center" />
      {loading && (
        <p className="text-center text-xs text-slate-400">Loading Google sign-in…</p>
      )}
    </div>
  )
}
