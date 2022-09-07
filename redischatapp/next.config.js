/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'download.logo.wine',
      'avatars.githubusercontent.com'
    ],
  }
}

module.exports = nextConfig
