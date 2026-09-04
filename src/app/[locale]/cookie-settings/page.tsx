import { setRequestLocale } from 'next-intl/server';
import {
  SITE_NAME,
  SITE_URL,
  absLocalizedUrl,
  localizedAlternates,
  ogLocale,
} from '@/lib/seo';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

const PAGE_SUFFIX = '/cookie-settings';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const legal = (messages?.legal as any)?.cookies;
  const title =
    legal?.title || messages?.cookieSettings?.title || 'Cookie Settings';
  const description =
    legal?.description || messages?.cookieSettings?.description?.split('\n')[0] || '';
  const selfUrl = absLocalizedUrl(locale, PAGE_SUFFIX);

  return {
    metadataBase: new URL(SITE_URL),
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: localizedAlternates(locale, PAGE_SUFFIX),
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: selfUrl,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      type: 'website',
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
