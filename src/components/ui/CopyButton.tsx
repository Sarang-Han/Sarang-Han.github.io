'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API를 못 쓰는 환경(비보안 컨텍스트 등) 폴백
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
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
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    if (!(await writeClipboard(value))) return;
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      <button type="button" onClick={copy} aria-label={label} data-copied={copied || undefined} className={className}>
        {children}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? '복사되었습니다' : ''}
      </span>
    </>
  );
}
