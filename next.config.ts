import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
};

export default nextConfig;
