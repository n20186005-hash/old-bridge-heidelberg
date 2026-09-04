import { useTranslations, useLocale, useMessages } from 'next-intl';

type HistoryItem = {
  period: string;
  title: string;
  text: string;
};

export default function HistorySection() {
  const t = useTranslations('history');
  const locale = useLocale();
  const messages = useMessages() as any;
  const timeline = (messages?.history?.timeline || []) as HistoryItem[];
  const facts = (messages?.history?.facts || []) as string[];

  return (
    <section id="history" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-2 flex-wrap">
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('title')}
          </h2>
          <span
            className="text-xs font-medium rounded-full px-3 py-1"
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
          >
            {locale === 'de' ? 'Seit 1284' : locale === 'zh' ? '1284 年至今' : 'Since 1284'}
          </span>
        </div>
        <p className="text-base sm:text-lg mb-6 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {timeline.map((item) => (
            <div
              key={item.period + item.title}
              className="rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <span
                className="font-display font-bold text-sm sm:text-base rounded-lg px-3 py-1.5 h-fit shrink-0"
                style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
              >
                {item.period}
              </span>
              <div>
                <h3 className="font-display text-lg sm:text-xl font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        <blockquote
          className="rounded-xl px-6 py-5 my-6 text-sm sm:text-base italic leading-relaxed"
          style={{
            background: 'var(--bg-tertiary)',
            borderLeft: '3px solid var(--accent)',
            color: 'var(--text-secondary)',
          }}
        >
          {t('quote')}
        </blockquote>

        <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <h3 className="font-display text-xl font-semibold mb-5" style={{ color: 'var(--text-primary)' }}>
            {t('factsTitle')}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {facts.map((fact, i) => (
              <li key={i} className="flex gap-3 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
