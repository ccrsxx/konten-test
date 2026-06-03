import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.2', 'dev-frontend.ccrsxx.my.id']
};

export default nextConfig;
