import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  preview: {
    open: true,
  },
  server: {
    open: true,
    port: 3000,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
