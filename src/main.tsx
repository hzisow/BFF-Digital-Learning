import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { SessionProvider } from './lib/session'
import { LanguageProvider } from './lib/i18n'
import { ToastProvider } from './components/ToastProvider'
import ErrorBoundary from './components/ErrorBoundary'
import ConnectionBanner from './components/ConnectionBanner'
import { startProgressSyncRetry } from './lib/progressQueue'

// Retry any classroom progress that failed to reach the server last time.
startProgressSyncRetry()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      {/* basename comes from Vite's base, so the same code works on the
          GitHub Pages project path and on a custom domain at the root. */}
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <LanguageProvider>
          <SessionProvider>
            <ToastProvider>
              {/* Above every route — the global layout, the lesson canvas, and
                  the full-screen live game screens all sit below it. */}
              <ConnectionBanner />
              <App />
            </ToastProvider>
          </SessionProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
