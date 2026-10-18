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

## Deployment Notes

The site is built by Astro into `dist/` and deployed to Cloudflare Workers using Wrangler. The site uses `output: 'static'` with Server Islands for dynamic content (GitHub star count, release version info). Redirects and security headers are configured via `public/_redirects` and `public/_headers`, which are served as static assets.

[GitHub Actions](.github/workflows/ci-cd.yml) runs Astro checks (including TypeScript), formatting checks, tests, and a build on every branch push and on pull requests targeting `main`. Astro checks, formatting, and tests share the Validation job, with separate steps that report all results even if an earlier check fails. The build also validates the generated Worker configuration with a Wrangler deployment dry run. Deployment jobs wait for Validation and Build and reuse that build, including Astro's generated `dist/server/wrangler.json` and static assets in `dist/client/`.

- Pushes to `main` deploy to production at `https://fossbilling.org`, using the GitHub `production` environment.
- Pushes to other branches deploy a [Worker Preview](https://developers.cloudflare.com/workers/previews/) named after the branch. The job summary links to the latest branch preview and the specific build. [Preview Comment](.github/workflows/preview-comment.yml) creates or updates one comment on matching open PRs with both links and the CI run. It also handles PRs opened after a successful branch build (preview links are retained for 30 days). No GitHub Deployment is created for previews.
- Pull requests validate the proposed merge without deploying. Fork pull requests run the same checks without Cloudflare credentials.

The comment workflow must exist on `main` before its triggers become active. It reads preview metadata through the GitHub API and never checks out or executes PR code. Fork PRs receive CI checks but no preview comment. Comments show the commit they refer to; a failed build does not replace the previous successful preview.

To configure the migration:

1. Add the repository Actions secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Use a Cloudflare API token scoped to the target account with Workers deployment permissions, including the permissions required by this Worker's custom domain and Images binding. See [Cloudflare's GitHub Actions setup](https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/).
2. Configure the GitHub `production` environment to allow deployments from `main` and apply any desired protection rules.
3. Configure any runtime secrets needed by previews in Cloudflare's Previews Base settings. Production runtime secrets remain managed in Cloudflare; the Actions `GITHUB_TOKEN` is used by the comment workflow and is not passed to the Worker.
4. Disable automatic Cloudflare Workers Builds for this Worker when enabling these workflows, so each push is deployed by GitHub Actions alone.

For a local deployment, run `npm run build` followed by `npm run cf-deploy` or `npm run cf-preview` after configuring Wrangler authentication. Local commands use Astro's `.wrangler/deploy/config.json` redirect; CI passes the generated configuration explicitly because only `dist/` is transferred between jobs. Wrangler is a direct development dependency, so CI and local commands use the version in `package-lock.json`.

### OpenGraph Image Generation

Social preview images are generated at build time using [satori](https://github.com/vercel/satori) and [@resvg/resvg-js](https://github.com/yisibl/resvg-js) in `src/pages/og-image/[route].png.ts`. Fonts in `src/assets/fonts/` are used exclusively by this pipeline. The `prerenderEnvironment: 'node'` adapter option enables Node-only APIs (`node:fs`, `node:path`) during prerendering.

### Code Review

[Cubic](https://cubic.dev) provides automated AI code review, configured via `cubic.yaml` at the repository root. [Renovate](https://docs.renovatebot.com/) handles dependency updates, configured via `.github/renovate.json`.

## Licensing

Code, configuration, and build tooling in this repository are licensed under the GNU Affero General Public License v3.0 or later. See [LICENSE](./LICENSE).

Website content is licensed under Creative Commons Attribution-ShareAlike 4.0 International. See [LICENSE-content](./LICENSE-content).

Unless otherwise noted, the content license applies to the visible website text, graphics, and design assets.

Logos, wordmarks, trademarks, and other brand assets are not licensed under CC BY-SA 4.0. Third-party marks remain subject to their respective owners' rights.
