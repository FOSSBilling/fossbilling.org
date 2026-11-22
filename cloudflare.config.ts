import { bindings, defineConfig } from 'cf/config';

const githubAppClientId = process.env.GITHUB_APP_CLIENT_ID;
const githubAppInstallationId = process.env.GITHUB_APP_INSTALLATION_ID;

export default defineConfig(({ isPreview }) => ({
  worker: {
    name: 'website',
    compatibilityDate: '2026-10-01',
    compatibilityFlags: ['global_fetch_strictly_public'],
    workersDev: false,
    previewUrls: false,
    observability: {
      logs: {
        enabled: true,
        invocationLogs: true,
      },
      traces: {
        enabled: true,
      },
      issues: {
        enabled: true,
      },
    },
    assets: {
      htmlHandling: 'force-trailing-slash',
    },
    domains: [
      'fossbilling.org',
      {
        hostname: 'website.fossbilling.foo',
        production: false,
        previews: true,
      },
    ],
    env: {
      ASSETS: bindings.assets(),
      GITHUB_APP_CLIENT_ID:
        !isPreview && githubAppClientId
          ? bindings.text(githubAppClientId)
          : undefined,
      GITHUB_APP_INSTALLATION_ID:
        !isPreview && githubAppInstallationId
          ? bindings.text(githubAppInstallationId)
          : undefined,
    },
  },
}));
