import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../out/webview-ui',
    emptyOutDir: true,
    rollupOptions: {
      input: './index.html',
      output: {
        format: 'iife',
        entryFileNames: '[name].js',
      },
    },
  },
});
