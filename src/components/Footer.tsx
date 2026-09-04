import { useTranslations, useLocale, useMessages } from 'next-intl';
import { homeHref, sightsHref } from '@/lib/seo';

type OfficialLink = { key: string; name: string; url: string };

export default function Footer() {
  const t = useTranslations('footer');
  const th = useTranslations('header');
  const locale = useLocale();
  const messages = useMessages() as any;
  const officialLinks = Object.entries(
    (messages?.footer?.officialLinks || {}) as Record<string, { name: string; url: string }>
  ).map(
    ([key, link]): OfficialLink => ({ key, name: link.name, url: link.url })
  );
  const prefix = `/${locale}`;
  const home = homeHref(locale);
  const sights = sightsHref(locale);

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <a
              href={home}
              className="font-display text-lg font-semibold mb-1 inline-block hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-primary)' }}
            >
              Old Bridge Heidelberg
            </a>
            <p className="text-xs mb-4 mt-1" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="flex flex-col gap-2">
              {officialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-sm"
                  style={{ color: 'var(--accent)' }}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-3 text-sm mt-4 sm:mt-0">
            <a href={sights} className="hover:underline font-medium" style={{ color: 'var(--text-primary)' }}>
              {th('sights')}
            </a>
            <div className="flex flex-wrap gap-4">
              <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
                {t('privacy')}
              </a>
              <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
                {t('terms')}
              </a>
              <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
                {t('cookies')}
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('photoCredits')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
