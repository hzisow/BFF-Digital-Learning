// Catches any render error below it and shows a friendly recovery card instead
// of a blank white screen. Bilingual copy (it can't use the language hook).

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    // Surface for debugging; no telemetry backend to report to.
    console.error('Unexpected app error:', error, info)
  }

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4">
        <div className="card w-full border-l-4 border-l-amber-400 text-center">
          <div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-[8px] border border-amber-200 bg-amber-50 text-amber-500"
            aria-hidden="true"
          >
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-ink">
            Something went wrong
          </h1>
          <p className="mt-2 text-ink/70">
            The page hit an unexpected snag. Reloading usually fixes it — your saved progress is safe.
          </p>
          <p className="mt-1 text-sm text-ink/50" lang="es">
            Algo salió mal. Recargar suele solucionarlo; tu progreso está a salvo.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              className="btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
            <a href="./" className="btn-ghost">
              Home
            </a>
          </div>
        </div>
      </div>
    )
  }
}
