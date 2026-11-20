import { bindings, defineConfig } from 'cf/config';

export default defineConfig({
  worker: {
    name: 'fossbilling-org',
    compatibilityDate: '2026-10-01',
    compatibilityFlags: ['global_fetch_strictly_public'],
    workersDev: false,
    previewUrls: true,
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
    domains: ['fossbilling.org'],
    env: {
      ASSETS: bindings.assets(),
    },
  },
});
