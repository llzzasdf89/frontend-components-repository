import vuePlugin from '@vitejs/plugin-vue2'
import { defineConfig } from 'vite'
import * as path from 'path'
export default defineConfig(() => {
  return {
    plugins: [vuePlugin()],
    build: {
      rollupOptions: {
        external: ['elementUi', 'vue'],
      },
      lib: {
        entry: path.resolve(__dirname, './components/index.js'),
        name: 'FCRElementComponents',
        fileName: 'FCR-components',
        formats: ['es', 'cjs', 'iife'],
      },
    },
  }
})
