import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { SessionProvider } from './lib/session'
import { LanguageProvider } from './lib/i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LanguageProvider>
        <SessionProvider>
          <App />
        </SessionProvider>
      </LanguageProvider>
    </HashRouter>
  </StrictMode>,
)
