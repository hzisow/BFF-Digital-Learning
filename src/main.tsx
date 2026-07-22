import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { SessionProvider } from './lib/session'
import { LanguageProvider } from './lib/i18n'
import { ToastProvider } from './components/ToastProvider'
import ErrorBoundary from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <HashRouter>
        <LanguageProvider>
          <SessionProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </SessionProvider>
        </LanguageProvider>
      </HashRouter>
    </ErrorBoundary>
  </StrictMode>,
)
