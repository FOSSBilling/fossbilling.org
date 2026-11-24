import { bindings, defineConfig } from 'cf/config';

export default defineConfig(({ isPreview }) => ({
  worker: {
    name: 'website',
    compatibilityDate: '2026-11-24',
    compatibilityFlags: ['global_fetch_strictly_public'],
    workersDev: false,
    previewUrls: false,
    observability: {
      ...(isPreview && { enabled: true }),
      redactQueryString: true,
      logs: {
        enabled: true,
        headSamplingRate: 1,
        invocationLogs: true,
      },
      traces: {
        enabled: true,
        headSamplingRate: isPreview ? 1 : 0.05,
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
}));
