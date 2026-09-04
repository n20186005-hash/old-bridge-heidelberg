import './globals.css';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Root layout imports the global stylesheet. The actual <html> shell for
// localized pages lives in `src/app/[locale]/layout.tsx`; a root not-found
// renders inside this boundary for unknown URLs (`not-found.tsx`).
export default function RootLayout({ children }: Props) {
  return children;
}
