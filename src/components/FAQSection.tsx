import { useTranslations, useMessages } from 'next-intl';

type FaqItem = { q: string; a: string };

/**
 * FAQ block (visible content + matching FAQPage JSON-LD) on the homepage.
 * The visible questions and the structured data read the same source of
 * truth so Google's Featured Snippet requirements are met (Q&A visible).
 */
export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as FaqItem[];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': items.map((item) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.a,
      },
    })),
  };

  return (
    <>
      <section id="faq" className="section-padding">
        <div className="max-w-4xl mx-auto">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg mb-6" style={{ color: 'var(--text-secondary)' }}>
            {t('subtitle')}
          </p>
          <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

          <div className="space-y-3">
            {items.map((item, i) => (
              <details
                key={i}
                className="rounded-xl overflow-hidden group"
                style={{ border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}
              >
                <summary
                  className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 cursor-pointer list-none select-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span className="font-display text-base sm:text-lg font-semibold leading-snug">
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white group-open:rotate-45 transition-transform"
                    style={{ background: 'var(--accent)' }}
                    aria-hidden="true"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </summary>
                <div
                  className="px-5 sm:px-6 pb-5 text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
