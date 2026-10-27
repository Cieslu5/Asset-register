import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import './src/lib/env';

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  transpilePackages: ['@repo/core', '@repo/db', '@repo/ui'],
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};

export default createNextIntlPlugin()(nextConfig);
