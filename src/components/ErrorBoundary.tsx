// Catches any render error below it and shows a friendly recovery card instead
// of a blank white screen. Bilingual copy (it can't use the language hook).

import { Component, type ErrorInfo, type ReactNode } from 'react'

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
      <div className="mx-auto flex min-h-screen max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl" aria-hidden="true">
          🙈
        </div>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-slate-600">
          The page hit an unexpected snag. Reloading usually fixes it — your saved progress is safe.
        </p>
        <p className="mt-1 text-sm text-slate-400" lang="es">
          Algo salió mal. Recargar suele solucionarlo; tu progreso está a salvo.
        </p>
        <div className="mt-6 flex gap-3">
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
    )
  }
}
