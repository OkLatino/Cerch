import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// HashRouter is used so the app works on GitHub Pages and `vite preview`
// without any server-side routing configuration.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: true },
})
