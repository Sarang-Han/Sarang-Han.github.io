'use client';

import { useEffect, useState } from 'react';
import { nav, site } from '@/content/site';
import { Container } from '@/components/ui/primitives';
import { PixelIcon, heart } from '@/components/ui/pixel';

/** 홈 상단 고정 내비게이션 — 스크롤 위치에 따라 현재 섹션 표시 */
export function SiteHeader() {
  const [active, setActive] = useState(nav[0].id);

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 160) current = id;
      }
      // 페이지 끝에 닿으면 마지막 섹션
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm backdrop-saturate-150">
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#about" className="flex shrink-0 items-baseline gap-2.5">
          <PixelIcon sprite={heart} scale={2} className="self-center text-accent" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">{site.name}</span>
          <span className="hidden font-mono text-xs text-mute lg:inline">{site.role}</span>
        </a>
        <nav aria-label="주요 섹션" className="flex items-center gap-[18px] overflow-x-auto [scrollbar-width:none] lg:gap-7">
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="nav-link" aria-current={active === item.id ? 'true' : undefined}>
              {/* 현재 섹션은 번호 대신 SOUL 하트 */}
              <span className="inline-flex w-[18px] self-center">
                {active === item.id ? (
                  <PixelIcon sprite={heart} scale={2} className="text-accent" />
                ) : (
                  <span className="font-pixel text-pixel text-faint">{item.n}</span>
                )}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}
