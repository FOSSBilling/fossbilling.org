import nextra from 'nextra'

const withNextra = nextra({
  latex: true
})

const nextConfig = {
  reactStrictMode: true,
  // Use webpack instead of turbopack for now due to MDX import issues
  experimental: {
    webpackBuildWorker: true
  },
  async redirects() {
    return [
      {
        source: '/bug-report',
        destination: 'https://github.com/FOSSBilling/FOSSBilling/issues/new?assignees=&labels=bug&template=BUG-REPORT.yml&title=%5BBug%5D',
        permanent: true
      },
      {
        source: '/discord',
        destination: 'https://discord.com/invite/bVjMZSgtbY',
        permanent: true
      },
      {
        source: '/donate',
        destination: 'https://github.com/sponsors/FOSSBilling',
        permanent: true
      },
      {
        source: '/feature-request',
        destination: 'https://github.com/FOSSBilling/FOSSBilling/issues/new?assignees=&labels=feature+request&template=feature_request.md&title=%5BFeature+Request%5D',
        permanent: true
      },
      {
        source: '/downloads/stable',
        destination: 'https://github.com/FOSSBilling/FOSSBilling/releases/latest/download/FOSSBilling.zip',
        permanent: true
      },
      {
        source: '/downloads/preview',
        destination: 'https://download.fossbilling.org/FOSSBilling-preview.zip',
        permanent: true
      },
      {
        source: '/api/central-alerts/:path*',
        destination: 'https://api.fossbilling.net/central-alerts/v1/:path*',
        permanent: true
      },
      {
        source: '/docs/contribution-handbook/:slug*',
        destination: '/docs/developing-fossbilling/:slug*',
        permanent: true
      },
      {
        source: '/docs/getting-started/apache',
        destination: '/docs/getting-started/installation',
        permanent: true
      },
      {
        source: '/docs/getting-started/shared',
        destination: '/docs/getting-started/installation',
        permanent: true
      },
      {
        source: '/docs/getting-started/nginx',
        destination: '/docs/getting-started/installation',
        permanent: true
      },
      {
        source: '/docs/getting-started/softaculous',
        destination: '/docs/getting-started/installation',
        permanent: true
      }
    ]
  }
}

export default withNextra(nextConfig)

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
