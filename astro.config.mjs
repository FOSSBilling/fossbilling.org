// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://fossbilling.org',
  output: 'server',
  adapter: cloudflare(),
  integrations: [sitemap()],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "base-uri 'self'",
        "object-src 'none'",
        "frame-ancestors 'none'",
        "img-src 'self' data: blob: https://raw.githubusercontent.com",
        "font-src 'self' data:",
        "connect-src 'self' https://api.github.com https://api.fossbilling.net",
      ],
      scriptDirective: {
        resources: ['https://static.cloudflareinsights.com'],
      },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
