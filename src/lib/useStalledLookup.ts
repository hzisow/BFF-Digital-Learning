// "Finding your game…" that never finds anything is the worst state in the app.
//
// The live screens look a session up by code and render a loading line until it
// arrives. A rejected request already has an error path — but a request that
// simply never comes back (dead uplink, captive portal swallowing the call) has
// no path at all, so the student stares at a hopeful spinner until they give
// up. This hook watches for that and lets the screen say something true.

import { useEffect, useState } from 'react'
import { isOnline, onConnectionChange } from './online'

/**
 * True once a lookup has plainly failed to arrive: either the device is offline
 * right now, or `resolved` is still false after `ms`.
 *
 * @param resolved whether the thing being waited on has landed
 * @param ms how long to wait before calling it stalled
 */
export function useStalledLookup(resolved: boolean, ms = 6000): boolean {
  const [stalled, setStalled] = useState(() => !isOnline())

  useEffect(() => {
    if (resolved) {
      setStalled(false)
      return
    }
    const timer = window.setTimeout(() => setStalled(true), ms)
    // Losing the connection mid-wait is immediate proof; no need to sit out the
    // rest of the timer.
    const off = onConnectionChange((online) => {
      if (!online) setStalled(true)
    })
    return () => {
      window.clearTimeout(timer)
      off()
    }
  }, [resolved, ms])

  return stalled
}
