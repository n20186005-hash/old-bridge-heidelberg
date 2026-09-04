import { useTranslations, useLocale, useMessages } from 'next-intl';
import { sightsHref } from '@/lib/seo';

type SightItem = {
  name: string;
  distance: string;
  desc: string;
};

export default function TopSights() {
  const t = useTranslations('topSights');
  const locale = useLocale();
  const messages = useMessages() as any;
  const items = (messages?.topSights?.items || []) as SightItem[];

  return (
    <section id="top-sights" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="text-base sm:text-lg mb-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {items.map((item, index) => (
            <div
              key={item.name}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span
                  className="text-3xl font-display font-bold"
                  style={{ color: 'var(--accent)', opacity: 0.9 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-xs font-medium rounded-full px-3 py-1 flex-shrink-0"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {item.distance}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={sightsHref(locale)}
            className="inline-flex flex-col items-center gap-1.5 rounded-full px-8 py-3 text-white font-medium transition-all hover:opacity-90"
            style={{ background: 'var(--accent)' }}
          >
            <span>{t('cta')}</span>
            <span className="text-xs font-normal opacity-80">{t('ctaHint')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
