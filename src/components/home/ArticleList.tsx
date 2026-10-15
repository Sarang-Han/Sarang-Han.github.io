'use client';

import Link from 'next/link';
import { useRef, useState, type ReactNode } from 'react';
import { PixelIcon, heart } from '@/components/ui/pixel';
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
  const [announcement, setAnnouncement] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const pageSize = Math.max(1, Math.floor(perPage));
  const pages = Math.ceil(items.length / pageSize);
  const currentPage = Math.min(page, Math.max(0, pages - 1));
  const shown = items.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const go = (p: number) => {
    if (p === currentPage || p < 0 || p >= pages) return;
    setPage(p);
    setAnnouncement(`${pages}페이지 중 ${p + 1}페이지. ${p * pageSize + 1}번째부터 ${Math.min((p + 1) * pageSize, items.length)}번째 아티클을 표시합니다.`);
    // 목록 윗부분이 화면 밖이면 목록 처음으로
    if (ref.current && ref.current.getBoundingClientRect().top < 0) ref.current.scrollIntoView({ block: 'start' });
  };

  return (
    <div ref={ref} className="scroll-mt-24">
      <ol start={currentPage * pageSize + 1} role="list" className="m-0 list-none border-t-2 border-fg p-0">
        {shown.map((a, index) => (
          <li key={a.slug}>
            <Link
              href={`/articles/${a.slug}`}
              className="group grid grid-cols-[28px_minmax(0,1fr)_36px] gap-x-3 gap-y-3 border-b border-line px-1 py-7 transition-colors hover:bg-panel/70 focus-visible:bg-panel/70 sm:grid-cols-[36px_112px_minmax(0,1fr)_44px] sm:gap-x-5 sm:px-3 lg:grid-cols-[44px_132px_minmax(0,1fr)_44px]"
            >
              <span aria-hidden="true" className="relative col-start-1 row-span-2 row-start-1 pt-0.5 font-pixel text-pixel text-faint sm:row-span-1">
                <span className="transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0">{pad(currentPage * pageSize + index + 1)}</span>
                <PixelIcon sprite={heart} scale={2} className="absolute top-1 left-0 text-accent opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
              </span>
              <div className="col-start-2 row-start-1 flex flex-wrap items-center gap-x-3 gap-y-1 sm:flex-col sm:items-start sm:gap-2 sm:pt-0.5">
                <span className="font-pixel text-[11px] text-mute">
                  <Rich text={a.date} />
                </span>
                <Label as="span" className="text-[10px] text-mute">{a.minutes} min read</Label>
              </div>
              <div className="col-start-2 row-start-2 min-w-0 sm:col-start-3 sm:row-start-1">
                <h3 className="m-0 text-[clamp(19px,2vw,24px)] leading-[1.4] font-semibold tracking-[-0.03em] transition-colors duration-200 group-hover:text-accent-ink group-focus-visible:text-accent-ink">
                  {a.title}
                </h3>
                <p className="mt-2 mb-0 text-[14px] leading-[1.75] text-sub sm:text-[15px]">{a.summary}</p>
                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
              <span className="col-start-3 row-span-2 row-start-1 flex size-9 items-center justify-center justify-self-end border border-line bg-bg text-lg text-mute transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white group-focus-visible:border-accent group-focus-visible:bg-accent group-focus-visible:text-white sm:col-start-4 sm:row-span-1 sm:size-11">
                <Arrow />
              </span>
            </Link>
          </li>
        ))}
      </ol>

      {pages > 1 && (
        <nav aria-label="아티클 페이지" className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <span className="font-pixel text-pixel text-mute">
            {pad(currentPage + 1)} <span className="px-1 text-faint">/</span> {pad(pages)}
          </span>
          <div className="flex items-center gap-1.5">
            <PageButton label="이전 페이지" disabled={currentPage === 0} onClick={() => go(currentPage - 1)}>
              <Arrow dir="left" />
            </PageButton>
            {Array.from({ length: pages }, (_, i) => (
              <PageButton key={i} label={`${i + 1} 페이지`} current={i === currentPage} onClick={() => go(i)}>
                {i + 1}
              </PageButton>
            ))}
            <PageButton label="다음 페이지" disabled={currentPage === pages - 1} onClick={() => go(currentPage + 1)}>
              <Arrow />
            </PageButton>
          </div>
        </nav>
      )}
      <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
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
        'inline-flex size-11 cursor-pointer items-center justify-center border font-pixel text-pixel transition-colors duration-150 ease-pixel disabled:cursor-default disabled:opacity-30',
        current ? 'border-fg bg-fg text-bg' : 'border-line bg-white text-sub enabled:hover:border-fg enabled:hover:text-fg',
      )}
    >
      {children}
    </button>
  );
}
