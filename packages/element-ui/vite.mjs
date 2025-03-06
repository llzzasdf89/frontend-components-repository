import vuePlugin from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'
import * as path from 'path'
export default defineConfig({
  plugins: [vuePlugin()],
  build: {
    rollupOptions: {
      external: ['element-ui', 'vue'],
    },
    lib: {
      entry: path.resolve(__dirname, './components/index.js'),
      name: 'fcr-element',
      fileName: 'fcr-element-components',
      formats: ['es', 'cjs', 'mjs', 'iife'],
    },
  },
})
