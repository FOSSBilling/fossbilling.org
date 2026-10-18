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
- `npm test`: run the release metadata tests (CI uses this)
- `npm run format`: format source with Prettier
- `npm run format:check`: verify formatting without writing
- `npm run cf-typegen`: generate Cloudflare env types in `worker-configuration.d.ts`
- `npm run cf-deploy`: deploy to Cloudflare Workers and promote to production traffic (requires Wrangler auth)
- `npm run cf-preview`: deploy a Worker Preview for the current branch (requires Wrangler auth)

## Deployment

[CI](.github/workflows/ci-cd.yml) runs formatting, Astro/TypeScript checks, tests, and a build on branch pushes and PRs targeting `main`. Deployment requires checks and build to pass.

- `main` deploys to production at [fossbilling.org](https://fossbilling.org).
- Other branches deploy previews. Matching PRs receive a comment with preview links and build/deployment history.
- PR runs validate changes without deploying; forks receive no deployment credentials.

Deployments use the shared workflow in [FOSSBilling/.workflows](https://github.com/FOSSBilling/.workflows). The local [Cloudflare Events](.github/workflows/cloudflare-events.yml) workflow keeps PR comments in sync. Renovate updates the pinned workflow references together.

Configure the `production` and `preview` GitHub environments and the Actions secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Manage runtime secrets in Cloudflare, including Previews Base settings. Keep Cloudflare Workers Builds disabled to avoid duplicate deployments.

To deploy locally, authenticate Wrangler, run `npm run build`, then `npm run cf-deploy` or `npm run cf-preview`.

### OpenGraph Image Generation

Social preview images are generated at build time using [satori](https://github.com/vercel/satori) and [@resvg/resvg-js](https://github.com/yisibl/resvg-js) in `src/pages/og-image/[route].png.ts`. Fonts in `src/assets/fonts/` are used exclusively by this pipeline. The `prerenderEnvironment: 'node'` adapter option enables Node-only APIs (`node:fs`, `node:path`) during prerendering.

### Code Review

[Cubic](https://cubic.dev) provides automated AI code review, configured via `cubic.yaml` at the repository root. [Renovate](https://docs.renovatebot.com/) handles dependency updates, configured via `.github/renovate.json`.

## Licensing

Code, configuration, and build tooling in this repository are licensed under the GNU Affero General Public License v3.0 or later. See [LICENSE](./LICENSE).

Website content is licensed under Creative Commons Attribution-ShareAlike 4.0 International. See [LICENSE-content](./LICENSE-content).

Unless otherwise noted, the content license applies to the visible website text, graphics, and design assets.

Logos, wordmarks, trademarks, and other brand assets are not licensed under CC BY-SA 4.0. Third-party marks remain subject to their respective owners' rights.
