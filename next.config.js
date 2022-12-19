/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["tipsscore.com"],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/signin',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
