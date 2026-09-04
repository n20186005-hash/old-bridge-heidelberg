import { useTranslations, useMessages } from 'next-intl';

type PracticalGroup = {
  id: string;
  title: string;
  items: string[];
};

function GroupIcon({ id }: { id: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (id) {
    case 'wc':
      return (
        <svg {...common}>
          <circle cx="12" cy="6" r="2.6" />
          <path d="M12 10c-3.2 0-5.6 2.6-5.6 5.8V19h11.2v-3.2c0-3.2-2.4-5.8-5.6-5.8z" />
          <path d="M4.5 21h15" />
        </svg>
      );
    case 'parking':
      return (
        <svg {...common}>
          <path d="M4 21V5a2 2 0 0 1 2-2h8a6 6 0 0 1 0 12H4" />
          <path d="M7.5 15v6" />
        </svg>
      );
    case 'dining':
      return (
        <svg {...common}>
          <path d="M6 3v7l2 1.5V21" />
          <path d="M10 3v7l-2 1.5" />
          <path d="M6.5 7.5H9" />
          <path d="M18 3c-1.5 1.5-2.5 3.5-2.5 6v12" />
          <path d="M18 3c1.8 1.2 3 3 3 5.5 0 1.5-.9 2.5-3 2.5" />
        </svg>
      );
    case 'stay':
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9.5 21v-6h5v6" />
        </svg>
      );
    case 'daily':
      return (
        <svg {...common}>
          <path d="M6 7V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
          <path d="M6 7h12l-1.2 13.2a2 2 0 0 1-2 1.8H9.2a2 2 0 0 1-2-1.8L6 7z" />
          <path d="M9 10.5v2" />
          <path d="M15 10.5v2" />
        </svg>
      );
    case 'fuel':
      return (
        <svg {...common}>
          <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8h1.5a2.5 2.5 0 0 1 2.5 2.5V18" />
          <path d="M18 3v8" />
          <path d="M6 9h8" />
          <path d="M5 21h12" />
        </svg>
      );
    default:
      return null;
  }
}

export default function PracticalInfoSection() {
  const t = useTranslations('practicalInfo');
  const messages = useMessages() as any;
  const groups = (messages?.practicalInfo?.groups || []) as PracticalGroup[];

  return (
    <section id="practical-info" className="section-padding" style={{ background: 'var(--bg-tertiary)' }}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {groups.map((group) => (
            <div
              key={group.id}
              className="rounded-xl p-6"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--bg-tertiary)', color: 'var(--accent)', border: '1px solid var(--border-color)' }}
                >
                  <span className="p-2.5 flex">{<GroupIcon id={group.id} />}</span>
                </span>
                <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {group.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {group.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--accent)', opacity: 0.7 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-xs sm:text-sm text-center max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
