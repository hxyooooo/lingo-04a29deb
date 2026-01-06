import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // 监听所有地址
    
    // 【关键修改】添加 allowedHosts 允许该域名访问
    allowedHosts: [
      'lingo.console.aliyun.com'
    ],
    
    // 如果您不想一个个添加域名，可以使用 'all' 允许所有主机访问（方便开发，但生产环境慎用）
    // allowedHosts: 'all', 
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
})
