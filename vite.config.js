import { resolve } from 'path';
import { defineConfig } from 'vite';
import ViteLegacy from '@vitejs/plugin-legacy';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';
import ViteHTMLConfig from 'vite-plugin-html-config';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import strip from '@rollup/plugin-strip';
import { visualizer } from 'rollup-plugin-visualizer';
import getTargetBrowsers from 'browserslist-to-esbuild';
import { META_TAGS, PWA_CONFIG } from './appConfig';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  console.log(`✨ Running in ${isProd ? 'Production' : 'Development'}.\n`);

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        appConfig: resolve(__dirname, './appConfig'),
      },
    },
    plugins: [
      ViteLegacy({
        // inject polyfills here for modern features if needed
        modernPolyfills: [],
        renderLegacyChunks: false,
      }),
      ViteHTMLConfig({ metas: META_TAGS }),
      isProd &&
        ViteMinifyPlugin({
          // only used to minify html files
          sortAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeScriptTypeAttributes: true,
          removeRedundantAttributes: true,
        }),
      VitePWA(PWA_CONFIG),
      ViteImageOptimizer(),
    ],
    preview: { open: true },
    server: {
      open: true,
      port: 3000,
      hmr: { overlay: false },
    },
    build: {
      minify: isProd ? 'esbuild' : false,
      target: getTargetBrowsers(),
      sourcemap: isProd ? 'hidden' : true,
      rollupOptions: {
        output: {
          entryFileNames: '[name].[hash].js',
          chunkFileNames: 'chunks/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
        },
        plugins: [
          isProd && strip(),
          visualizer({
            filename: 'reports/build-stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    },
  };
});
