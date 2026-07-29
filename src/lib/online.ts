// Knowing whether the network is there.
//
// `navigator.onLine` is only trustworthy in one direction: when it is FALSE the
// device genuinely has no connection, so we can skip a doomed request and say
// so immediately. When it is TRUE it means "a network interface exists", which
// on school wifi is regularly a lie — captive portals, filtered domains, and
// dead uplinks all report online. So the app never treats `true` as a promise;
// it just tries, and treats a network-shaped failure as offline after the fact.

import { useEffect, useState } from 'react'

/** False means definitely offline. True means "worth trying". */
export function isOnline(): boolean {
  return typeof navigator === 'undefined' || navigator.onLine !== false
}

/**
 * Did this failure come from the network rather than the server? A server that
 * answers with an error still proves the connection works, and should not be
 * reported to a student as "you are offline".
 */
export function isNetworkError(err: unknown): boolean {
  if (!isOnline()) return true
  if (err instanceof TypeError) return true // fetch() rejects with TypeError
  const msg = err instanceof Error ? err.message : String(err ?? '')
  return /failed to fetch|networkerror|network request failed|load failed|err_internet|err_network|err_name_not_resolved|failed to send a request/i.test(
    msg,
  )
}

type Listener = (online: boolean) => void
const listeners = new Set<Listener>()

if (typeof window !== 'undefined') {
  window.addEventListener('online', () => listeners.forEach((l) => l(true)))
  window.addEventListener('offline', () => listeners.forEach((l) => l(false)))
}

/** Subscribe to connection changes. Returns an unsubscribe function. */
export function onConnectionChange(fn: Listener): () => void {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/**
 * Connection state for components. Also reports whether the connection was
 * lost at some point, so a UI can show a short "back online" confirmation
 * instead of silently flipping back to normal.
 */
export function useOnline(): { online: boolean; recovered: boolean } {
  const [online, setOnline] = useState(isOnline)
  const [recovered, setRecovered] = useState(false)

  useEffect(() => {
    return onConnectionChange((next) => {
      setOnline(next)
      if (!next) {
        setRecovered(false)
      } else {
        // Show the confirmation briefly, then get out of the way.
        setRecovered(true)
        window.setTimeout(() => setRecovered(false), 4000)
      }
    })
  }, [])

  return { online, recovered }
}
