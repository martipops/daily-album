/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy(),
    basicSsl()
  ],
  server: {
    port: 3000,
    host: '127.0.0.1'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Icons': path.resolve(__dirname, './resources/icons'),
      '@Components': path.resolve(__dirname, './src/components'),
      '@Pages': path.resolve(__dirname, './src/views'),
      '@Composables': path.resolve(__dirname, '.src/composables'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
