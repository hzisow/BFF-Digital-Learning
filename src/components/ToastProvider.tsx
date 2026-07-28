// App-wide toast notifications. Wrap the app once; call useToast().toast(msg)
// anywhere for a small, auto-dismissing confirmation.

/* eslint-disable react-refresh/only-export-components */

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { CheckCircle2, XCircle, Info } from 'lucide-react'

type ToastKind = 'info' | 'success' | 'error'

interface ToastItem {
  id: number
  message: string
  kind: ToastKind
}

interface ToastContextValue {
  toast: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

export function useToast(): ToastContextValue {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])
  const idRef = useRef(0)

  const toast = useCallback((message: string, kind: ToastKind = 'info') => {
    const id = ++idRef.current
    setItems((prev) => [...prev, { id, message, kind }])
    setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id))
    }, 3200)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[9998] flex flex-col items-center gap-2 px-4"
        role="status"
        aria-live="polite"
      >
        {items.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2 animate-slide-up rounded-[6px] border border-l-4 border-ink/10 bg-white px-4 py-2.5 text-sm font-semibold text-ink shadow-card ${
              t.kind === 'success'
                ? 'border-l-green-500'
                : t.kind === 'error'
                  ? 'border-l-red-500'
                  : 'border-l-bff-600'
            }`}
          >
            {t.kind === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
            ) : t.kind === 'error' ? (
              <XCircle className="h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
            ) : (
              <Info className="h-4 w-4 shrink-0 text-bff-600" aria-hidden="true" />
            )}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
