'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API를 못 쓰는 환경(비보안 컨텍스트 등) 폴백
    const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const selection = window.getSelection();
    const ranges = selection ? Array.from({ length: selection.rangeCount }, (_, i) => selection.getRangeAt(i).cloneRange()) : [];
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.setAttribute('aria-hidden', 'true');
    ta.tabIndex = -1;
    ta.style.position = 'fixed';
    ta.style.top = '0';
    ta.style.left = '0';
    ta.style.opacity = '0';
    try {
      document.body.appendChild(ta);
      ta.focus({ preventScroll: true });
      ta.select();
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      ta.remove();
      active?.focus({ preventScroll: true });
      if (selection) {
        selection.removeAllRanges();
        ranges.forEach((range) => selection.addRange(range));
      }
    }
  }
}

/**
 * 클릭하면 value를 복사. 복사 직후 잠시 `data-copied`가 붙으므로
 * 자식에서 `group-data-copied:` 변형으로 피드백을 표시하세요.
 */
export function CopyButton({
  value,
  className,
  label,
  children,
}: {
  value: string;
  className?: string;
  label?: string;
  children: ReactNode;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const pending = useRef(false);
  const mounted = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    if (pending.current) return;
    pending.current = true;
    clearTimeout(timer.current);
    const copied = await writeClipboard(value);
    pending.current = false;
    if (!mounted.current) return;
    setStatus(copied ? 'copied' : 'error');
    if (copied) timer.current = setTimeout(() => setStatus('idle'), 2200);
  };

  return (
    <>
      <button type="button" onClick={copy} aria-label={label} data-copied={status === 'copied' || undefined} className={className}>
        {children}
      </button>
      <span className={status === 'error' ? 'block px-2 pt-2 pb-3 text-sm text-current' : 'sr-only'} aria-live="polite" aria-atomic="true">
        {status === 'copied' ? '복사되었습니다' : status === 'error' ? (
          <>
            복사하지 못했습니다. 아래 주소를 직접 선택해 주세요.
            <span className="mt-1 block cursor-text text-current select-all [overflow-wrap:anywhere]">{value}</span>
          </>
        ) : ''}
      </span>
    </>
  );
}
