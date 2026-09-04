import { MetadataRoute } from 'next';
import { SITE_URL, SITE_LOCALES } from '@/lib/seo';

export const dynamic = 'force-static';

type PageDef = {
  // Path suffix relative to the locale prefix, e.g. '' for the homepage.
  suffix: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
};

const PAGES: PageDef[] = [
  {
    suffix: '',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    suffix: '/attractions',
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    suffix: '/privacy-policy',
    changeFrequency: 'monthly',
    priority: 0.3,
  },
  {
    suffix: '/terms-of-service',
    changeFrequency: 'monthly',
    priority: 0.3,
  },
  {
    suffix: '/cookie-settings',
    changeFrequency: 'monthly',
    priority: 0.2,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const sitemap: MetadataRoute.Sitemap = [];

  for (const locale of SITE_LOCALES) {
    for (const page of PAGES) {
      sitemap.push({
        url: `${SITE_URL}/${locale}${page.suffix}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return sitemap;
}
