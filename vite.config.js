import { resolve } from 'path';
import viteImagemin from 'vite-plugin-imagemin';
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
  plugins: [
    viteImagemin({
      gifsicle: true,
      optipng: false,
      jpegTran: false,
      svgo: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false, // https://github.com/svg/svgo/issues/1128
                addAttributesToSVGElement: {
                  params: {
                    attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                  },
                },
              },
            },
          },
          'sortAttrs',
        ],
      },
    }),
  ],
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
