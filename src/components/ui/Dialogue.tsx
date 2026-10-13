'use client';

import { useEffect, useState } from 'react';
import { PixelIcon, asterisk } from './pixel';
import { cn } from './primitives';

/**
 * Undertale식 대화창 — `* ` 줄을 한 글자씩 타이핑. 클릭하면 바로 끝까지 표시.
 * 아직 안 나온 글자는 `invisible`로 자리만 차지해 레이아웃이 흔들리지 않음.
 */
export function Dialogue({
  lines,
  delay = 0,
  speed = 26,
  className,
}: {
  lines: string[];
  /** 타이핑 시작 전 대기(ms) — 등장 애니메이션과 맞출 때 */
  delay?: number;
  /** 글자당 ms */
  speed?: number;
  className?: string;
}) {
  const total = lines.reduce((n, l) => n + l.length, 0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(total);
      return;
    }
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      tick = setInterval(() => {
        setShown((n) => {
          if (n + 1 >= total) clearInterval(tick);
          return Math.min(n + 1, total);
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(tick);
    };
  }, [total, speed, delay]);

  let budget = shown;
  return (
    <div className={cn('dialogue cursor-default', className)} onClick={() => setShown(total)}>
      <p className="sr-only">{lines.join(' ')}</p>
      <div aria-hidden="true" className="flex flex-col gap-2.5">
        {lines.map((line, i) => {
          const n = Math.max(0, Math.min(line.length, budget));
          budget -= line.length;
          return (
            <p key={i} className="m-0 grid grid-cols-[1.5em_1fr]">
              <PixelIcon sprite={asterisk} scale={2} className={cn('mt-[10px]', n === 0 && 'tw-rest invisible')} />
              <span>
                {line.slice(0, n)}
                <span className="tw-rest invisible">{line.slice(n)}</span>
              </span>
            </p>
          );
        })}
      </div>
      {/* JS가 없으면 전체 문장을 그대로 보여 줌 */}
      <noscript>
        <style>{'.tw-rest{visibility:visible}'}</style>
      </noscript>
    </div>
  );
}
