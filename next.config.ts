import type { NextConfig } from 'next';
import withTwin from './withTwin.mjs';

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  compiler: {
    emotion: true,
  },
};

export default withTwin(nextConfig);
