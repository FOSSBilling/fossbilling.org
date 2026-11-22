// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fossbilling.org',
  trailingSlash: 'always',
  output: 'static',
  adapter: cloudflare({
    prerenderEnvironment: 'node',
    imageService: 'passthrough',
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: { exclude: ['@resvg/resvg-js'] },
    ssr: {
      external: ['@resvg/resvg-js'],
    },
  },
  session: false,
});
