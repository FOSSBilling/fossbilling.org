import { bindings, defineConfig } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'fossbilling-org',
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
    },
  },
});
