import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const publicCsp = [
  "default-src * 'unsafe-inline' 'unsafe-eval' data: blob: ws: wss:",
  "img-src * data: blob: https:",
  "style-src * 'unsafe-inline' https: data:",
  "font-src * data:",
  "connect-src * ws: wss: http: https:",
  "form-action * https://translate.googleapis.com https://translate.google.com",
  "frame-src *",
  "frame-ancestors *",
  "object-src 'none'",
  "base-uri 'self'",
].join('; ')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({ filename: 'dist/bundle-stats.html', template: 'treemap', gzipSize: true, brotliSize: true, open: false })
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    headers: {
      'Content-Security-Policy': publicCsp,
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    headers: {
      'Content-Security-Policy': publicCsp,
    },
  },
})
