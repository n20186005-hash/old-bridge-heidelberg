'use client';

import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { homeHref, sightsHref } from '@/lib/seo';
import { useState, useEffect } from 'react';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const home = homeHref(locale);
  const sights = sightsHref(locale);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const linkColor = scrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href={home}
          className="font-display text-lg font-semibold tracking-tight"
          style={{ color: scrolled ? 'var(--text-primary)' : '#fff' }}
        >
          Old Bridge Heidelberg
        </a>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href={home}
            className="text-sm font-medium transition-colors"
            style={{ color: linkColor }}
          >
            {t('home')}
          </a>
          <a
            href={sights}
            className="text-sm font-medium transition-colors"
            style={{ color: linkColor }}
          >
            {t('sights')}
          </a>
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`${home}/#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: linkColor }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
