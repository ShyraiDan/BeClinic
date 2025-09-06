import createNextIntlPlugin from 'next-intl/plugin'

import type { NextConfig } from 'next'

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
})

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default withNextIntl(nextConfig)
