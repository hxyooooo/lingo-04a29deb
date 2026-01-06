import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: true
  },
  define: {
    global: 'globalThis',
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
    }
  },
  optimizeDeps: {
    include: ['buffer', 'stream-browserify']
  }
	server: {
    host: '0.0.0.0', // 这一行是解决阿里云访问不了的关键
    port: 5173,      // 端口号
  }
})
