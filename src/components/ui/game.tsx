import Link from 'next/link';
import type { ReactNode } from 'react';
import { PixelIcon, heart, type Sprite } from './pixel';
import { cn } from './primitives';

/**
 * SOUL 커서 — 부모 `.group`이 hover/포커스되면 왼쪽에 하트가 나타남.
 * 부모는 `relative`, 그리고 `group-hover:translate-x-5`로 한 칸 밀어 자리를 만듦.
 */
export function SoulCursor({ className }: { className?: string }) {
  return (
    <PixelIcon
      sprite={heart}
      scale={2}
      className={cn(
        'absolute top-[2px] -left-5 text-accent opacity-0 transition-opacity duration-150 ease-pixel group-hover:opacity-100 group-focus-visible:opacity-100',
        className,
      )}
    />
  );
}

/**
 * Undertale 전투 메뉴 버튼 — 굵은 픽셀 라벨 + 하드 섀도.
 * hover · 포커스 시 아이콘이 SOUL 하트로 바뀌고, 누르면 섀도만큼 내려앉음.
 */
export function BattleButton({ href, icon, children }: { href: string; icon: Sprite; children: ReactNode }) {
  const cls = cn(
    'group inline-flex h-12 items-center gap-3 border-2 border-fg bg-white pr-6 pl-5 font-dialogue text-[18px] font-bold uppercase',
    'shadow-[3px_3px_0_var(--color-fg)] transition-[translate,box-shadow,color,border-color] duration-100 ease-pixel',
    'hover:border-accent hover:text-accent hover:shadow-[3px_3px_0_var(--color-accent)]',
    'focus-visible:border-accent focus-visible:text-accent focus-visible:shadow-[3px_3px_0_var(--color-accent)]',
    'active:translate-x-[3px] active:translate-y-[3px] active:shadow-none',
  );
  const inner = (
    <>
      <span className="relative inline-flex size-[14px] items-center justify-center">
        <PixelIcon sprite={icon} className="group-hover:invisible group-focus-visible:invisible" />
        <PixelIcon sprite={heart} scale={2} className="invisible absolute group-hover:visible group-focus-visible:visible" />
      </span>
      {children}
    </>
  );
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  const external = href.startsWith('http');
  return (
    <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {inner}
    </a>
  );
}
