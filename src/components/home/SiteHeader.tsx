'use client';

import { useEffect, useRef, useState } from 'react';
import { nav, site } from '@/content/site';
import { Container, cn } from '@/components/ui/primitives';
import { PixelIcon, heart } from '@/components/ui/pixel';

/**
 * 홈 상단 고정 내비게이션 — 스크롤 위치에 따라 현재 섹션 표시.
 * md 미만에서는 MENU 버튼 → Undertale식 메뉴창으로 전환.
 */
export function SiteHeader() {
  const [active, setActive] = useState(nav[0].id);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  // 메뉴창: 열리면 현재 섹션에 포커스, Esc · 바깥 클릭 · 데스크톱 폭이면 닫힘
  // (고정 헤더 안 요소라 focus 시 scroll-padding 때문에 페이지가 튀지 않도록 preventScroll)
  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]')?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus({ preventScroll: true });
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    const wide = window.matchMedia('(min-width: 768px)');
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm backdrop-saturate-150">
      <Container className="relative flex h-16 items-center justify-between gap-6">
        <a href="#about" className="flex shrink-0 items-baseline gap-2.5">
          <PixelIcon sprite={heart} scale={2} className="self-center text-accent" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">{site.name}</span>
          <span className="hidden font-mono text-xs text-mute lg:inline">{site.role}</span>
        </a>

        <nav aria-label="주요 섹션" className="hidden items-center gap-[18px] md:flex lg:gap-7">
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

        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls="menu-window"
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'inline-flex h-9 items-center border-2 border-fg px-3 font-pixel text-pixel uppercase transition-[translate,box-shadow] duration-100 ease-pixel md:hidden',
            open ? 'translate-x-[2px] translate-y-[2px] bg-fg text-bg' : 'bg-white shadow-[2px_2px_0_var(--color-fg)]',
          )}
        >
          Menu
        </button>

        {open && (
          <nav
            ref={menuRef}
            id="menu-window"
            aria-label="주요 섹션"
            className="dialogue absolute top-[calc(100%+10px)] right-5 w-[248px] px-5 py-4 md:hidden"
          >
            <ol className="m-0 list-none p-0">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="group flex items-center gap-3 py-1.5 uppercase outline-none"
                  >
                    <PixelIcon
                      sprite={heart}
                      scale={2}
                      className={cn(
                        'text-[#7d95ff]',
                        active === item.id ? 'visible' : 'invisible group-hover:visible group-focus-visible:visible',
                      )}
                    />
                    <span className="text-[#8c8c8c]">{item.n}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </Container>
    </header>
  );
}
