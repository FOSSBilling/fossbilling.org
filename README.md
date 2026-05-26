# fossbilling.org
[![GitHub branch checks state](https://img.shields.io/github/checks-status/fossbilling/fossbilling.org/main)](https://github.com/fossbilling/fossbilling.org/actions/workflows)

FOSSBilling's website. Built with Next.js, deployed to Cloudflare Workers, and available at [fossbilling.org](https://fossbilling.org).

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

This command starts a local development server at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

## Scripts

- `npm run dev`: local development server
- `npm run build`: production build
- `npm run start`: serve the production build with Next.js
- `npm run preview`: build + run the OpenNext Cloudflare preview
- `npm run deploy`: build + deploy to Cloudflare Workers (requires Wrangler auth)
- `npm run upload`: build + upload to Cloudflare Workers (requires Wrangler auth)
- `npm run cf-typegen`: generate Cloudflare env types in `cloudflare-env.d.ts`
- `npm run typecheck`: TypeScript typecheck (CI uses this)

## Deployment Notes

OpenNext handles the Cloudflare Workers build output. The `wrangler.jsonc` configuration and `.open-next` artifacts are produced by the OpenNext build step. Use the `preview`, `deploy`, or `upload` scripts after configuring Wrangler for your Cloudflare account.
