import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
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
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          filename: 'build-stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
