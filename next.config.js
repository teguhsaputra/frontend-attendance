/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['ext.same-assets.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['locomotive-scroll'],
};

module.exports = nextConfig;
