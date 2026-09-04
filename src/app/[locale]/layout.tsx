import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import {
  SITE_NAME,
  SITE_URL,
  absLocalizedUrl,
  localizedAlternates,
  ogLocale,
} from '@/lib/seo';
import { SITE_OG_IMAGE } from '@/lib/entity';
import type { Metadata, Viewport } from 'next';

// PWA / brand colours (matches globals.css palette).
const THEME_COLOR = '#234d5c';
const MANIFEST = '/site.webmanifest';

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const selfUrl = absLocalizedUrl(locale);
  const ogImageAlt = messages.meta.ogImageAlt || messages.meta.title;

  return {
    metadataBase: new URL(SITE_URL),
    title: messages.meta.title,
    description: messages.meta.description,
    applicationName: SITE_NAME,
    manifest: MANIFEST,
    icons: {
      icon: [
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: 'default',
    },
    alternates: localizedAlternates(locale),
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      type: 'website',
      images: [{ url: SITE_OG_IMAGE, alt: ogImageAlt }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const langMap: Record<string, string> = {
    'zh': 'zh-CN',
    'en': 'en',
    'de': 'de',
  };

  return (
    <html lang={langMap[locale] || 'de'} suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 – G-HXM22WWPKP (Consent Mode v2: analytics storage is
            denied by default and only enabled once the visitor grants the
            Analytics cookie in /cookie-settings). */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-HXM22WWPKP" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                functionality_storage: 'granted',
                personalization_storage: 'denied',
                security_storage: 'granted',
                wait_for_update: 500
              });
              try {
                var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || 'null');
                if (prefs && prefs.analytics === true) {
                  gtag('consent', 'update', { analytics_storage: 'granted' });
                }
              } catch (e) {}
              gtag('js', new Date());
              gtag('config', 'G-HXM22WWPKP', { anonymize_ip: true });
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        {/* Register the static-export service worker for PWA / offline support. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js').catch(function () {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
