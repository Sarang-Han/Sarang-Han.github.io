import type { ReactNode } from 'react';
import type { Todo } from '@/content/types';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** max-width 1200px 컨테이너 */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1200px] px-5 lg:px-10', className)}>{children}</div>;
}

/** 12-column grid. 자식은 col-span-12 lg:col-span-N 형태로 배치 */
export function Grid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('grid grid-cols-12 gap-6', className)}>{children}</div>;
}

export function Label({ className, children, as: Tag = 'p' }: { className?: string; children: ReactNode; as?: 'p' | 'span' | 'dt' }) {
  return <Tag className={cn('lbl', className)}>{children}</Tag>;
}

export function Chip({ children, dashed }: { children: ReactNode; dashed?: boolean }) {
  return <span className={cn('chip', dashed && 'border-dashed text-mute')}>{children}</span>;
}

export function Ph({ children }: { children: ReactNode }) {
  return <span className="ph">{children}</span>;
}

export const isPlaceholder = (s: string) => /^\[[^\]]+\]$/.test(s.trim());

/** 문자열 안의 `[...]` 구간을 플레이스홀더로 렌더링 */
export function Rich({ text }: { text: string }) {
  // split에 캡처 그룹을 쓰면 홀수 인덱스가 매칭된 `[...]` 구간
  const parts = text.split(/(\[[^\]]+\])/);
  return <>{parts.map((part, i) => (i % 2 === 1 ? <Ph key={i}>{part}</Ph> : part))}</>;
}

/** 문자열 안의 `{...}` 구간을 픽셀 폰트로 렌더링 — 헤드라인 악센트용 */
export function PixelWords({ text }: { text: string }) {
  const parts = text.split(/\{([^}]+)\}/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          // 픽셀 폰트는 weight가 하나뿐이라 stroke로 Sans Medium의 획 두께에 맞춤
          <span key={i} className="font-pixel tracking-[-0.02em] [-webkit-text-stroke:0.028em_currentColor]">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** 작성 필요 블록 */
export function TodoBlock({ todo, className }: { todo: Todo; className?: string }) {
  return (
    <div className={cn('ph-block', className)}>
      <span className="mb-1 block font-pixel text-pixel text-accent-ink uppercase">{todo.label}</span>
      {todo.hint}
    </div>
  );
}

export function Arrow({ dir = 'right', className }: { dir?: 'right' | 'left' | 'ne' | 'down'; className?: string }) {
  const glyph = { right: '→', left: '←', ne: '↗', down: '↓' }[dir];
  const move = {
    right: 'group-hover:translate-x-[3px]',
    left: 'group-hover:-translate-x-[3px]',
    ne: 'group-hover:translate-x-[2px] group-hover:-translate-y-[2px]',
    down: 'group-hover:translate-y-[2px]',
  }[dir];
  return (
    <span aria-hidden="true" className={cn('inline-block font-pixel transition-transform duration-150 ease-pixel', move, className)}>
      {glyph}
    </span>
  );
}
