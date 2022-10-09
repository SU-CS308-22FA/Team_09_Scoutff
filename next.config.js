/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.tobi.sh',
      'cloudflare-ipfs.com',
      'asdsadsads'
      'loremflickr.com'
    ]
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true
  }
};

module.exports = nextConfig;
