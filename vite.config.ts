import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 或者是 @vitejs/plugin-vue，根据你的项目定

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 这一行必须有，否则阿里云无法访问
    port: 5173,
  }
})
