import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { IBM_Plex_Sans_KR } from 'next/font/google';
import { site } from '@/content/site';
import './globals.css';

const plexKr = IBM_Plex_Sans_KR({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-plex-kr',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#FAFAF8',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${GeistMono.variable} ${plexKr.variable}`}>
      <body className={site.highlightPlaceholders ? 'show-ph' : undefined}>{children}</body>
    </html>
  );
}
