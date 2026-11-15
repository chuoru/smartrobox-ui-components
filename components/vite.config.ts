import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: './tsconfig.json' })],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'sr-ui-components',
      formats: ['es'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['@heroicons/vue', 'sweetalert2', 'vue', 'vue-loading-overlay'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.names?.some((n) => n.endsWith('.css'))) {
            return 'style.css';
          }
          return assetInfo.names?.[0] ?? 'assets/[name][extname]';
        },
      },
    },
  },
});
