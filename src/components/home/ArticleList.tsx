'use client';

import Link from 'next/link';
import { useRef, useState, type ReactNode } from 'react';
import { SoulCursor } from '@/components/ui/game';
import { Arrow, Chip, Label, Rich, cn } from '@/components/ui/primitives';

/** 목록에 필요한 필드만 — 본문(sections)은 클라이언트로 보내지 않음 */
export type ArticleItem = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  minutes: number;
};

const pad = (n: number) => String(n).padStart(2, '0');

/** 아티클 목록 — perPage를 넘으면 하단 페이지네이션 */
export function ArticleList({ items, perPage = 5 }: { items: ArticleItem[]; perPage?: number }) {
  const [page, setPage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const pages = Math.ceil(items.length / perPage);
  const shown = items.slice(page * perPage, (page + 1) * perPage);

  const go = (p: number) => {
    setPage(p);
    // 목록 윗부분이 화면 밖이면 목록 처음으로
    if (ref.current && ref.current.getBoundingClientRect().top < 0) ref.current.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={ref}>
      <ol className="m-0 list-none border-t border-fg p-0">
        {shown.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="group grid grid-cols-12 gap-x-6 gap-y-3 border-b border-line px-2 py-7 transition-colors hover:bg-panel"
            >
              <div className="relative col-span-12 flex gap-4 transition-transform duration-150 ease-pixel group-hover:translate-x-5 group-focus-visible:translate-x-5 sm:col-span-3 sm:flex-col sm:gap-1.5">
                <SoulCursor />
                <span className="font-pixel text-pixel text-mute">
                  <Rich text={a.date} />
                </span>
                <Label as="span">{a.minutes} min read</Label>
              </div>
              <div className="col-span-11 sm:col-span-8">
                <h3 className="m-0 text-[clamp(20px,2vw,24px)] leading-[1.3] font-medium tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent">
                  {a.title}
                </h3>
                <p className="mt-1.5 mb-0 text-[15px] text-sub">{a.summary}</p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
              <span className="col-span-1 justify-self-end pt-1 text-xl">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {pages > 1 && (
        <nav aria-label="아티클 페이지" className="mt-5 flex items-center justify-between gap-4">
          <span className="font-pixel text-pixel text-mute">
            {pad(page + 1)} / {pad(pages)}
          </span>
          <div className="flex items-center gap-1.5">
            <PageButton label="이전 페이지" disabled={page === 0} onClick={() => go(page - 1)}>
              <Arrow dir="left" />
            </PageButton>
            {Array.from({ length: pages }, (_, i) => (
              <PageButton key={i} label={`${i + 1} 페이지`} current={i === page} onClick={() => go(i)}>
                {i + 1}
              </PageButton>
            ))}
            <PageButton label="다음 페이지" disabled={page === pages - 1} onClick={() => go(page + 1)}>
              <Arrow />
            </PageButton>
          </div>
        </nav>
      )}
    </div>
  );
}

function PageButton({
  label,
  current,
  disabled,
  onClick,
  children,
}: {
  label: string;
  current?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        !disabled && 'group',
        'inline-flex size-9 cursor-pointer items-center justify-center rounded-sm border font-pixel text-pixel transition-colors duration-150 ease-pixel disabled:cursor-default disabled:opacity-30',
        current ? 'border-fg bg-fg text-bg' : 'border-line bg-white text-sub enabled:hover:border-fg enabled:hover:text-fg',
      )}
    >
      {children}
    </button>
  );
}
