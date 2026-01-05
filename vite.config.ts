import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 允许云端环境访问
    host: '0.0.0.0',
    allowedHosts: ['lingo.console.aliyun.com', '.aliyun.com'],
    
    // 代理配置（虽然现在是纯前端，留着也不影响）
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
