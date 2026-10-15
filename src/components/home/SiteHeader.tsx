'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
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
  const desktopNavRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const focusFrame = useRef<number>(undefined);

  useEffect(() => {
    const ids = nav.map((n) => n.id);
    let frame: number | undefined;
    const update = () => {
      frame = undefined;
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
      const distance = document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      if (focusFrame.current !== undefined) window.cancelAnimationFrame(focusFrame.current);
    };
  }, []);

  // 메뉴창: 열리면 현재 섹션에 포커스, Esc · 바깥 클릭 · 데스크톱 폭이면 닫힘
  // (고정 헤더 안 요소라 focus 시 scroll-padding 때문에 페이지가 튀지 않도록 preventScroll)
  useEffect(() => {
    if (!open) return;
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]')
      ?? menuRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      setOpen(false);
      buttonRef.current?.focus({ preventScroll: true });
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    const onFocus = (e: FocusEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false);
    };
    const wide = window.matchMedia('(min-width: 768px)');
    const onWide = () => {
      if (!wide.matches) return;
      if (menuRef.current?.contains(document.activeElement) || document.activeElement === buttonRef.current) {
        desktopNavRef.current?.querySelector<HTMLAnchorElement>('[aria-current="true"]')?.focus({ preventScroll: true });
      }
      setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('focusin', onFocus);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('focusin', onFocus);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  const chooseSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setOpen(false);
    if (focusFrame.current !== undefined) window.cancelAnimationFrame(focusFrame.current);
    focusFrame.current = window.requestAnimationFrame(() => {
      const section = document.getElementById(id);
      if (!section) return;
      const previousTabIndex = section.getAttribute('tabindex');
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
      section.addEventListener('blur', () => {
        if (previousTabIndex === null) section.removeAttribute('tabindex');
        else section.setAttribute('tabindex', previousTabIndex);
      }, { once: true });
    });
  };

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm backdrop-saturate-150">
      <a href="#main-content" className="absolute top-3 left-5 z-30 -translate-y-24 border-2 border-fg bg-bg px-4 py-3 text-sm font-medium shadow-[3px_3px_0_var(--color-fg)] focus:translate-y-0">
        본문으로 바로가기
      </a>
      <Container className="relative flex h-16 items-center justify-between gap-6">
        <a href="#about" className="flex shrink-0 items-baseline gap-2.5">
          <PixelIcon sprite={heart} scale={2} className="self-center text-accent" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">{site.name}</span>
        </a>

        <nav ref={desktopNavRef} aria-label="주요 섹션" className="hidden items-center gap-[18px] md:flex lg:gap-7">
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
          aria-label={open ? '섹션 메뉴 닫기' : '섹션 메뉴 열기'}
          onClick={() => setOpen((o) => !o)}
          className={cn(
            'inline-flex h-11 min-w-[76px] items-center justify-center border-2 border-fg px-3 font-pixel text-pixel uppercase transition-[translate,box-shadow] duration-100 ease-pixel md:hidden',
            open ? 'translate-x-[2px] translate-y-[2px] bg-fg text-bg' : 'bg-white shadow-[2px_2px_0_var(--color-fg)]',
          )}
        >
          {open ? 'Close' : 'Menu'}
        </button>

        {open && (
          <nav
            ref={menuRef}
            id="menu-window"
            aria-label="주요 섹션"
            className="dialogue absolute top-[calc(100%+10px)] right-5 w-[min(280px,calc(100vw-40px))] px-5 py-4 md:hidden"
          >
            <p className="mb-3 border-b border-white/20 pb-3 font-pixel text-[10px] tracking-[0.08em] text-white/55">SELECT A SECTION</p>
            <ol className="m-0 list-none p-0">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => chooseSection(event, item.id)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className="group -mx-2 flex min-h-11 items-center gap-3 px-2 py-1.5 uppercase transition-colors hover:bg-white/10 focus-visible:bg-white/10 aria-[current=true]:bg-white/10"
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
      <div ref={progressRef} aria-hidden="true" style={{ transform: 'scaleX(0)' }} className="pointer-events-none absolute -bottom-px left-0 h-[2px] w-full origin-left bg-accent" />
    </header>
  );
}
