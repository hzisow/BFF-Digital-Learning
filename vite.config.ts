import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' + HashRouter makes the build portable to GitHub Pages,
// a custom domain, or any static host without path configuration.
export default defineConfig({
  base: './',
  plugins: [react()],
})
