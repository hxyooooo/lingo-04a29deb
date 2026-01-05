import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // ✅ 关键：这里填入报错提示的那个域名
    allowedHosts: ['lingo.console.aliyun.com'],
    
    // 确保监听所有网卡（云环境通常需要）
    host: '0.0.0.0', 

    // 之前的代理配置继续保留
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
