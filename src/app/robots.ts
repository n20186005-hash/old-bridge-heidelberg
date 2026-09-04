import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

// Generated robots.txt – the sitemap URL always follows the canonical SITE_URL
// (see src/lib/seo.ts), so it can never drift from the deployed domain.
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
