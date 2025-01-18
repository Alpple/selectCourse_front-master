import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 设置局域网访问
  server:{
    host:'0.0.0.0',
  },
  // 设置 @ 别名指向 src 目录
  resolve:{
    alias:{
      '@':resolve(__dirname,'./src')
    }
  }
})
