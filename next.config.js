const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
]

const moduleExports = {
  reactStrictMode: false,
  i18n: {
    locales: ['ko', 'cn', 'en', 'ja'],
    defaultLocale: 'ja',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      loader: 'html-loader',
    })
    return config
  },
  images: {
    domains: ['console.vcborn.com', 'snapcraft.io', 'get.microsoft.com'],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/twitter',
        destination: 'https://twitter.com/vcborn_support',
        permanent: false,
        basePath: false,
      },
      {
        source: '/youtube',
        destination: 'https://www.youtube.com/@vcborn',
        permanent: false,
        basePath: false,
      },
      {
        source: '/github',
        destination: 'https://github.com/vcborn',
        permanent: false,
        basePath: false,
      },
      {
        source: '/misskey',
        destination: 'https://honi.club/@vcborn_support',
        permanent: false,
        basePath: false,
      },
      {
        source: '/booth',
        destination: 'https://vcborn.booth.pm',
        permanent: false,
        basePath: false,
      },
      {
        source: '/services/:path*',
        destination: '/projects/:path*',
        permanent: true,
      },
      {
        source: '/contact',
        destination: 'https://help.vcborn.com',
        permanent: true,
        basePath: false,
      },
    ]
  },
  publicRuntimeConfig: {
    url: process.env.DIRECTUS_URL,
  },
  serverRuntimeConfig: {
    token: process.env.DIRECTUS_STATIC_TOKEN,
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(moduleExports)
