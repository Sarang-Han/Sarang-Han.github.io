import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { about, site } from '@/content/site';
import { heart, spritePath } from '@/components/ui/pixel';

/** 링크 공유 미리보기 이미지 — 빌드 시 정적으로 생성 (site.ts 내용 기반) */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const C = { bg: '#f6f6f4', fg: '#171717', mute: '#6a6a68', accent: '#3455d1' };
const font = (p: string) => readFile(join(process.cwd(), 'node_modules', p));

export default async function Image() {
  const [geist, geistMono, galmuri] = await Promise.all([
    font('geist/dist/fonts/geist-sans/Geist-Medium.ttf'),
    font('geist/dist/fonts/geist-mono/GeistMono-Regular.ttf'),
    font('galmuri/dist/Galmuri11.ttf'),
  ]);
  const [line1, line2] = about.headline.map((l) => l.replace(/[{}]/g, ''));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px 64px',
          background: C.bg,
          color: C.fg,
          fontFamily: 'Geist',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width={28} height={24} viewBox="0 0 7 6" shapeRendering="crispEdges">
              <path d={spritePath(heart)} fill={C.accent} />
            </svg>
            <span style={{ fontSize: 30 }}>{site.name}</span>
            <span style={{ fontSize: 22, color: C.mute, fontFamily: 'Geist Mono' }}>{site.role}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 24, color: C.mute, fontFamily: 'Galmuri' }}>
            <span>LV {about.status.lv}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              HP
              <span style={{ width: 120, height: 18, background: C.accent }} />
              {about.status.hp} / {about.status.hp}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 104, lineHeight: 1, letterSpacing: '-0.045em' }}>
          <span>{line1}</span>
          <span style={{ display: 'flex', alignItems: 'flex-end' }}>
            {line2}
            <span style={{ width: 15, height: 15, marginLeft: 5, marginBottom: 14, background: C.accent }} />
          </span>
        </div>

        {/* 대화창 */}
        <div style={{ display: 'flex', padding: 6, background: C.fg }}>
          <div
            style={{
              display: 'flex',
              flex: 1,
              gap: 18,
              padding: '20px 26px',
              border: '4px solid #fff',
              color: '#fff',
              fontFamily: 'Galmuri',
              fontSize: 24,
            }}
          >
            <span>*</span>
            <span>{about.tagline}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Geist', data: geist, weight: 500 },
        { name: 'Geist Mono', data: geistMono, weight: 400 },
        { name: 'Galmuri', data: galmuri, weight: 400 },
      ],
    },
  );
}
