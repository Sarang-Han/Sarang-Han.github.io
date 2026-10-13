import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { GeistPixelSquare } from 'geist/font/pixel';
import { IBM_Plex_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import { site } from '@/content/site';
import './globals.css';

const plexKr = IBM_Plex_Sans_KR({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-plex-kr',
  display: 'swap',
  preload: false,
});

/** 한글 픽셀 폰트 — 대화창(400) · 전투 버튼(700). 무거워서 미리 받지 않고 쓰일 때 로드 */
const galmuri = localFont({
  src: [
    { path: '../../node_modules/galmuri/dist/Galmuri11.woff2', weight: '400' },
    { path: '../../node_modules/galmuri/dist/Galmuri11-Bold.woff2', weight: '700' },
  ],
  variable: '--font-galmuri',
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
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.role}` }],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export const viewport: Viewport = {
  themeColor: '#F6F6F4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} ${plexKr.variable} ${galmuri.variable}`}>
      <body className={site.highlightPlaceholders ? 'show-ph' : undefined}>{children}</body>
    </html>
  );
}
