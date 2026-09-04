import { useTranslations } from 'next-intl';
import { ATTRACTION } from '@/lib/entity';

export default function MapEmbed() {
  const t = useTranslations('mapSection');

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Location facts: geographic hierarchy + semantic landmark cluster */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-px overflow-hidden rounded-xl mb-8"
          style={{ border: '1px solid var(--map-border)', background: 'var(--border-color)' }}
        >
          <div className="p-5" style={{ background: 'var(--bg-secondary)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
              {t('location')}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('regionLine')}
            </p>
            <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
              {ATTRACTION.displayAddress}
            </p>
          </div>
          <div className="p-5" style={{ background: 'var(--bg-secondary)' }}>
            <p className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: 'var(--text-muted)' }}>
              {t('nearbyTitle')}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('nearbyLine')}
            </p>
          </div>
        </div>

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          <iframe
            src={ATTRACTION.mapsEmbedSrc}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Google Maps - Old Bridge Heidelberg, Alte Brücke, 69117 Heidelberg"
          />
        </div>

        {/* Open in Google Maps */}
        <div className="mt-6 flex justify-center">
          <a
            href={ATTRACTION.mapsShareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Official tourism info */}
        <div
          className="mt-8 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          style={{ border: '1px solid var(--map-border)', background: 'var(--bg-tertiary)' }}
        >
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('tourismTitle')}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {t('phoneLabel')} <a href={`tel:${ATTRACTION.phoneRaw}`} className="hover:underline" style={{ color: 'var(--accent)' }}>{t('phoneValue')}</a>
            </p>
          </div>
          <a
            href={ATTRACTION.tourismUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium hover:underline flex-shrink-0"
            style={{ color: 'var(--accent)' }}
          >
            {t('tourismName')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
