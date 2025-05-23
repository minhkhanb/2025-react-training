import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  compiler: {
    emotion: true,
  },
  experimental: {
    staleTimes: {
      dynamic: 0,
      static: 180,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
};

export default nextConfig;
