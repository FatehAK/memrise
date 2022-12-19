import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import viteImagemin from 'vite-plugin-imagemin';
import { ViteMinifyPlugin as viteHTMLMinify } from 'vite-plugin-minify';
import { VitePWA as vitePWAPlugin } from 'vite-plugin-pwa';
import strip from '@rollup/plugin-strip';
import { visualizer } from 'rollup-plugin-visualizer';
import viteHTMLConfig from 'vite-plugin-html-config';
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
      legacy({
        // inject polyfills here for modern features if needed
        modernPolyfills: [],
        renderLegacyChunks: false,
      }),
      viteHTMLConfig({ metas: META_TAGS }),
      isProd &&
        viteHTMLMinify({
          sortAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeScriptTypeAttributes: true,
          removeRedundantAttributes: true,
        }),
      viteImagemin({
        verbose: false,
        gifsicle: false,
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
      vitePWAPlugin(PWA_CONFIG),
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
