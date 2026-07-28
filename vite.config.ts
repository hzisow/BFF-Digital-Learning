import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'

// The app uses clean URLs (BrowserRouter), so the base must be an ABSOLUTE
// path. With a relative './' base, a deep link such as
// /BFF-Digital-Learning/lessons/earning-income resolves assets against
// .../lessons/ and 404s.
//
// Default is the GitHub Pages project path. On a custom domain (or any host
// serving from the root) build with VITE_BASE=/ to override.
const base = process.env.VITE_BASE ?? '/BFF-Digital-Learning/'

/**
 * GitHub Pages has no server-side rewrites, so refreshing or sharing a deep
 * link would 404. Pages does serve 404.html for unknown paths, so we ship a
 * byte-identical copy of index.html under that name: the SPA boots and the
 * router renders the requested route with the URL preserved.
 */
function spaFallback() {
  return {
    name: 'spa-fallback-404',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), spaFallback()],
})
