const { withSentryConfig } = require('@sentry/nextjs')

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  staticImage: true,
  flexsearch: {
    codeblocks: false
  },
  defaultShowCopyCode: true,
})

module.exports = withSentryConfig(withNextra())
