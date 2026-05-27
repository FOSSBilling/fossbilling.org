const isDev = process.env.NODE_ENV === 'development'

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://api.github.com https://api.fossbilling.net`
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  }
]

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ]
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
        source: '/public/img/wordmark-black.png',
        destination: 'https://raw.githubusercontent.com/FOSSBilling/branding/refs/heads/main/logo-png/fossb_logo-black_text.png',
        permanent: true
      },
      {
        source: '/public/img/wordmark-white.png',
        destination: 'https://raw.githubusercontent.com/FOSSBilling/branding/refs/heads/main/logo-png/fossb_logo-white_text.png',
        permanent: true
      },
      {
        source: '/public/img/logo-black.png',
        destination: 'https://raw.githubusercontent.com/FOSSBilling/branding/refs/heads/main/logo-png/fossb_logo-black_text.png',
        permanent: true
      },
      {
        source: '/public/img/logo.png',
        destination: 'https://raw.githubusercontent.com/FOSSBilling/branding/refs/heads/main/logo-png/fossb_logo-on-white.png',
        permanent: true
      },
      {
        source: '/public/logo.png',
        destination: 'https://raw.githubusercontent.com/FOSSBilling/branding/refs/heads/main/logo-png/fossb_logo-on-white.png',
        permanent: true
      },
      {
        source: '/public/img/logo-black.svg',
        destination: '/public/img/logo.svg',
        permanent: true
      },
      {
        source: '/public/img/gh-download-button.png',
        destination: '/public/img/gh/download-button.png',
        permanent: true
      }
    ]
  }
}

export default nextConfig

if (process.env.NODE_ENV === 'development') {
  import('@opennextjs/cloudflare')
    .then(({ initOpenNextCloudflareForDev }) => {
      initOpenNextCloudflareForDev()
    })
    .catch((error) => {
      console.error('Failed to initialize OpenNext Cloudflare dev helper:', error)
    })
}
