# FOSSBilling Website

[![CI/CD](https://github.com/FOSSBilling/website/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/FOSSBilling/website/actions/workflows/ci-cd.yml)

The Astro site for [fossbilling.org](https://fossbilling.org), hosted on Cloudflare Workers. Product documentation lives at [docs.fossbilling.org](https://docs.fossbilling.org).

## Local development

Use Node.js 26 to match CI.

```sh
npm ci
npm run dev
```

Open `http://localhost:4321`. GitHub App credentials are optional for local development. To authenticate the star counter, copy [`.dev.vars.example`](./.dev.vars.example) to `.dev.vars` and fill in the three values.

Run `npm run format:check`, `npm run check`, `npm test`, and `npm run build` to validate changes. See [package.json](./package.json) for all scripts.

## Deployment

[GitHub Actions](./.github/workflows/ci-cd.yml) validates pull requests targeting `main`. After checks pass, pushes to `main` deploy to production and pushes to other branches in this repository deploy public previews at `<preview-slug>.website.fossbilling.foo`. Deployments use the prebuilt output from the current branch head. [Cloudflare Events](./.github/workflows/cloudflare-events.yml) posts preview links on PRs and cleans up branch previews on same-repository PR close or branch deletion. Previews send `X-Robots-Tag: noindex`.

Successful CI for a fork PR targeting `main` publishes its static pages at `pr-<number>.website.fossbilling.foo`. A daily job removes previews for closed fork PRs. Use a same-repository branch preview to test Worker endpoints such as the GitHub star counter.

Configure the `production` and `preview` GitHub environments, the Actions secret `CLOUDFLARE_API_TOKEN`, and the repository variable `CLOUDFLARE_ACCOUNT_ID`. The production token needs Workers Routes Write access to the `fossbilling.foo` zone to configure the preview domain. Keep Cloudflare Workers Builds disabled to avoid duplicate deployments.

Worker settings live in [cloudflare.config.ts](./cloudflare.config.ts). Keep Cloudflare’s Previews Base observability settings in sync with the preview config. For manual deployments, sign in with `npm exec -- cf auth login`, then run `npm run cf-preview` for your branch or `npm run cf-deploy` for production.

### GitHub App authentication

The star counter uses the **FOSSBilling Integrations** GitHub App with read-only Metadata access to `FOSSBilling/FOSSBilling`. In the production Worker and Previews Base, set `GITHUB_APP_CLIENT_ID`, `GITHUB_APP_INSTALLATION_ID`, and `GITHUB_APP_PRIVATE_KEY` as secrets. Use separate PEM keys from the same App for local development, previews, and production.

## Licensing

Code, configuration, and build tooling in this repository are licensed under the GNU Affero General Public License v3.0 or later. See [LICENSE](./LICENSE).

Unless otherwise noted, visible website text, graphics, and design assets are licensed under Creative Commons Attribution-ShareAlike 4.0 International. See [LICENSE-content](./LICENSE-content).

Logos, wordmarks, trademarks, and other brand assets are not licensed under CC BY-SA 4.0. Third-party marks remain subject to their respective owners' rights.
