'use client';

import { useEffect, useRef, useState } from 'react';
import { PixelIcon, asterisk } from './pixel';
import { cn } from './primitives';

/**
 * Undertale식 대화창 — `* ` 줄을 한 글자씩 타이핑. 클릭하면 바로 끝까지 표시.
 * 아직 안 나온 글자는 `invisible`로 자리만 차지해 레이아웃이 흔들리지 않음.
 */
export function Dialogue({
  lines,
  instantLines = 0,
  delay = 0,
  speed = 26,
  className,
}: {
  lines: string[];
  /** 앞에서부터 n줄은 처음부터 다 보여 줌 — 핵심 문장을 기다리게 하지 않도록 */
  instantLines?: number;
  /** 타이핑 시작 전 대기(ms) — 등장 애니메이션과 맞출 때 */
  delay?: number;
  /** 글자당 ms */
  speed?: number;
  className?: string;
}) {
  const total = lines.reduce((n, l) => n + l.length, 0);
  const instant = lines.slice(0, instantLines).reduce((n, l) => n + l.length, 0);
  const contentKey = lines.join('\n');
  const [shown, setShown] = useState(instant);
  const startRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tickRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const typing = shown < total;

  const finish = () => {
    clearTimeout(startRef.current);
    clearInterval(tickRef.current);
    setShown(total);
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const stop = () => {
      clearTimeout(startRef.current);
      clearInterval(tickRef.current);
    };
    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      stop();
      setShown(total);
    };
    stop();
    setShown(reducedMotion.matches || speed <= 0 ? total : instant);
    if (!reducedMotion.matches && speed > 0 && instant < total) {
      let current = instant;
      startRef.current = setTimeout(() => {
        tickRef.current = setInterval(() => {
          current = Math.min(current + 1, total);
          setShown(current);
          if (current >= total) stop();
        }, speed);
      }, Math.max(0, delay));
    }
    reducedMotion.addEventListener('change', onMotionChange);
    return () => {
      stop();
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, [contentKey, total, instant, speed, delay]);

  let budget = shown;
  return (
    <div className={cn('dialogue', typing ? 'cursor-pointer' : 'cursor-default', className)} onClick={typing ? finish : undefined}>
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
      {instant < total && (
        <div className="dialogue-skip mt-4 flex justify-end border-t border-white/15 pt-1">
          <button
            type="button"
            onClick={finish}
            aria-disabled={!typing}
            tabIndex={typing ? 0 : -1}
            className={cn(
              'inline-flex min-h-11 items-center gap-2 px-1 font-pixel text-[12px] leading-none transition-colors',
              typing ? 'cursor-pointer text-white/75 hover:text-white focus-visible:text-white' : 'cursor-default text-white/60',
            )}
          >
            <span aria-hidden="true">{typing ? '↵' : '✓'}</span>
            {typing ? '전체 보기' : '모두 표시됨'}
          </button>
        </div>
      )}
      {/* JS가 없으면 전체 문장을 그대로 보여 줌 */}
      <noscript>
        <style>{'.tw-rest{visibility:visible}.dialogue-skip{display:none}'}</style>
      </noscript>
    </div>
  );
}
