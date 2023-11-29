import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
    // 导入时想要省略的扩展名列表
    extensions: ['.js', '.jsx'],
  },
  plugins: [react()],
})
