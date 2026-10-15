import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow, Container } from './primitives';

/** 서브 페이지(케이스 스터디 · 아티클) 상단 고정 바 — 왼쪽 뒤로 가기, 오른쪽 보조 정보 */
export function PageHeader({ backHref, backLabel, children }: { backHref: string; backLabel: string; children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-md">
      <a href="#main-content" className="absolute top-3 left-5 z-30 -translate-y-24 border-2 border-fg bg-bg px-4 py-3 text-sm font-medium focus:translate-y-0">본문으로 바로가기</a>
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3 font-mono text-xs sm:text-[13px]">
        <Link href={backHref} className="group inline-flex min-h-10 min-w-0 items-center gap-3 text-sub transition-colors hover:text-accent">
          <span className="flex size-8 shrink-0 items-center justify-center border border-line bg-white transition-colors group-hover:border-accent group-hover:bg-accent-wash">
            <Arrow dir="left" />
          </span>
          <span className="link-ul min-w-0">{backLabel}</span>
        </Link>
        {children && <span className="shrink-0 border-l border-line pl-3 text-right text-[10px] text-mute sm:pl-5 sm:text-xs">{children}</span>}
      </Container>
    </header>
  );
}
