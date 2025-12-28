import nextra from 'nextra'

const withNextra = nextra({
  latex: true
})

const nextConfig = {
  reactStrictMode: true,
  // Use webpack instead of turbopack for now due to MDX import issues
  experimental: {
    webpackBuildWorker: true
  }
}

export default withNextra(nextConfig)
