import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// ghpages mode bakes the /fresh-batch/ base path for GitHub Pages deploys
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  base: mode === 'ghpages' ? '/fresh-batch/' : '/',
  build: { outDir: 'dist' },
}))
