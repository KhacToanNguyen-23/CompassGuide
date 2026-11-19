import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // Khi chạy `npm run dev`, chuyển /api sang api-gateway chạy bằng Docker Compose
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
