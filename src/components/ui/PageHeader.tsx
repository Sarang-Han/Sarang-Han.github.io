import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow, Container } from './primitives';

/** 서브 페이지(케이스 스터디 · 아티클) 상단 고정 바 — 왼쪽 뒤로 가기, 오른쪽 보조 정보 */
export function PageHeader({ backHref, backLabel, children }: { backHref: string; backLabel: string; children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-4 font-mono text-[13px]">
        <Link href={backHref} className="group inline-flex gap-2 text-sub hover:text-accent">
          <Arrow dir="left" />
          <span className="link-ul">{backLabel}</span>
        </Link>
        <span className="font-pixel text-pixel text-mute">{children}</span>
      </Container>
    </header>
  );
}
