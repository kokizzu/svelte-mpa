import { defineConfig } from 'vite'
import path from 'path'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import mpa from './src/vite-plugin-mpa/dist/index'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [svelte(), mpa()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/pages/index.html'),
      }
    }
  }
})
