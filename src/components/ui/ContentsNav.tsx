'use client';

import { useEffect, useState } from 'react';
import { Arrow, Label, cn } from './primitives';

type ContentsItem = { id: string; title: string };

/** 같은 순서의 목차를 모든 화면 크기에서 유지하고, 현재 읽는 섹션을 표시합니다. */
export function ContentsNav({
  items,
  label = '목차',
  columns = false,
}: {
  items: ContentsItem[];
  label?: string;
  columns?: boolean;
}) {
  const [active, setActive] = useState('');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = '';
      for (const item of items) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= 180) current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [items]);

  return (
    <nav aria-label={label}>
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <Label className="m-0 text-fg">On this page</Label>
        <span className="font-mono text-[11px] text-mute">{String(items.length).padStart(2, '0')} sections</span>
      </div>
      <ol className={cn('m-0 grid list-none border-t border-fg p-0', columns && 'gap-x-6 sm:grid-cols-2')}>
        {items.map((item, i) => (
          <li key={item.id} className="min-w-0 border-b border-line">
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
              className={cn(
                'group flex min-h-12 items-baseline gap-3 px-1 py-3 text-[13px] leading-relaxed transition-colors hover:text-accent',
                active === item.id ? 'bg-accent-wash text-accent-ink' : 'text-sub',
              )}
            >
              <span className={cn('shrink-0 font-pixel text-pixel', active === item.id ? 'text-accent' : 'text-mute')}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="link-ul min-w-0 flex-1 [overflow-wrap:anywhere]">{item.title}</span>
              <Arrow dir="down" className={cn('shrink-0 self-center text-xs', active === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100')} />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
