import type { Metadata } from 'next';

/**
 * Canonical host of the published site.
 *
 * Build-time override: set `NEXT_PUBLIC_SITE_URL` (a full origin without a
 * trailing slash, e.g. "https://www.example.com") when building to publish
 * this codebase under a different domain. Without the variable the default
 * canonical host below is used. Every canonical / hreflang / OG / sitemap /
 * robots URL is derived from this single constant, so there is no other place
 * where a site URL can be hardcoded.
 *
 * NOTE: the default host is the *www* variant — the apex domain currently
 * issues a 307 redirect to https://www.oldbridgeheidelberg.com. All canonicals,
 * hreflang links and the sitemap therefore use the www host to avoid pointing
 * at a redirecting URL.
 */
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.oldbridgeheidelberg.com').replace(/\/+$/, '') ||
  'https://www.oldbridgeheidelberg.com';
export const SITE_NAME = 'Old Bridge Heidelberg';
export const SITE_LOCALES = ['de', 'en', 'zh'] as const;
export type SiteLocale = (typeof SITE_LOCALES)[number];

/**
 * Locale used as the x-default / language-neutral fallback.
 * `de` is the site's default language: users reaching the bare domain
 * (and unconfigured crawlers) are served the German version first.
 */
export const FALLBACK_LOCALE: SiteLocale = 'de';

/**
 * Path suffix of the attractions hub page, identical across locales.
 *
 * NOTE: the site is built with `output: 'export'` where the next-intl
 * middleware does not run, so pathnames cannot differ per locale (a
 * middleware would be required to translate them at request time). Keep the
 * segment identical to the route folder name so the generated static files
 * match the public URLs.
 */
export const SIGHTS_PATH = '/attractions';

/** e.g. locale 'de' + suffix '/privacy-policy' -> '/de/privacy-policy' */
export function localizedPath(locale: string, suffix = ''): string {
  return suffix ? `/${locale}${suffix}` : `/${locale}`;
}

/** Absolute canonical URL for a localized page. */
export function absLocalizedUrl(locale: string, suffix = ''): string {
  return `${SITE_URL}${localizedPath(locale, suffix)}`;
}

/** Absolute URL for the localized attractions hub page. */
export function absSightsUrl(locale: string): string {
  return absLocalizedUrl(locale, SIGHTS_PATH);
}

/** Open Graph locale per language variant. */
export function ogLocale(locale: string): string {
  const map: Record<string, string> = { de: 'de_DE', en: 'en_US', zh: 'zh_CN' };
  return map[locale] || 'de_DE';
}

/** Client-safe relative hrefs used inside components. */
export function homeHref(locale: string): string {
  return localizedPath(locale);
}
export function sightsHref(locale: string): string {
  return `/${locale}${SIGHTS_PATH}`;
}

/**
 * Builds canonical + hreflang alternates for every language variant of the
 * same page (including the x-default entry).
 */
export function localizedAlternates(
  locale: string,
  suffix = ''
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {};
  for (const l of SITE_LOCALES) {
    languages[l] = absLocalizedUrl(l, suffix);
  }
  languages['x-default'] = absLocalizedUrl(FALLBACK_LOCALE, suffix);
  return { canonical: absLocalizedUrl(locale, suffix), languages };
}
