import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

const officialLinks = [
  { name: '德国国家旅游局', url: 'https://www.germany.travel/en/home.html' },
  { name: '巴登-符腾堡州旅游局', url: 'https://www.visit-bw.com/de' },
  { name: '德国数字图书馆文化遗产库', url: 'https://www.deutsche-digitale-bibliothek.de/' },
  { name: '德国联邦政府', url: 'https://www.bundesregierung.de/breg-de' },
  { name: '巴登-符腾堡州文物保护局', url: 'https://www.denkmalpflege-bw.de/' },
  { name: '海德堡市文物保护局', url: 'https://www.heidelberg.de/HD/Leben/Denkmalschutz.html' },
  { name: '巴符州建筑研究与修复数据库', url: 'https://www.bauforschung-bw.de/' },
  { name: '德国联邦外交部', url: 'https://www.auswaertiges-amt.de/' },
];

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Old Bridge Heidelberg
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="flex flex-col gap-2">
              {officialLinks.map((link, i) => (
                <a 
                  key={i}
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
          <div className="flex flex-wrap gap-4 text-sm mt-4 sm:mt-0">
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

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
