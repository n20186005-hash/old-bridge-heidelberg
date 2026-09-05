import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // NOTE: `output: 'export'` must NOT be enabled here. The site is deployed to
  // Cloudflare through @opennextjs/cloudflare, which requires a regular
  // (standalone-capable) `next build`. A pure static export does not produce
  // `.next/standalone` and makes OpenNext fail while bundling cache assets
  // (ENOENT pages-manifest.json). `opennextjs-cloudflare build` switches the
  // output to standalone itself.
};

export default withNextIntl(nextConfig);

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
