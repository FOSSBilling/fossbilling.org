# fossbilling.org
[![GitHub branch checks state](https://img.shields.io/github/checks-status/fossbilling/fossbilling.org/main)](https://github.com/fossbilling/fossbilling.org/actions/workflows)

FOSSBilling's website. Built with Astro, deployed to Cloudflare Workers, and available at [fossbilling.org](https://fossbilling.org).

Documentation is hosted separately at [docs.fossbilling.org](https://docs.fossbilling.org).

## Installation

```
$ npm ci
```

Use `npm install` instead if you are not working from a clean install.

## Local Development

```
$ npm run dev
```

This command starts a local development server at `http://localhost:4321`. Most changes are reflected live without having to restart the server.

## Scripts

- `npm run dev`: local development server
- `npm run build`: production build
- `npm run preview`: preview the production build locally
- `npm run check`: TypeScript & Astro diagnostics (CI uses this)
- `npm run format`: format source with Prettier
- `npm run format:check`: verify formatting without writing
- `npm run cf-typegen`: generate Cloudflare env types in `worker-configuration.d.ts`
- `npm run deploy`: deploy to Cloudflare Workers (requires Wrangler auth)

## Deployment Notes

The site is built by Astro into `dist/` and deployed to Cloudflare Workers using Wrangler. Redirects and security headers are configured via `public/_redirects` and `public/_headers`, which are served as static assets. Use `npm run deploy` after configuring Wrangler for your Cloudflare account.

## Licensing

Code, configuration, and build tooling in this repository are licensed under the GNU Affero General Public License v3.0 or later. See [LICENSE](./LICENSE).

Website content is licensed under Creative Commons Attribution-ShareAlike 4.0 International. See [LICENSE-content](./LICENSE-content).

Unless otherwise noted, the content license applies to the visible website text, graphics, and design assets.

Logos, wordmarks, trademarks, and other brand assets are not licensed under CC BY-SA 4.0. Third-party marks remain subject to their respective owners' rights.
