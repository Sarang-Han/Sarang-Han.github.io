import { contact, links, site } from '@/content/site';
import { Arrow, Container, Label, Rich } from '@/components/ui/primitives';
import { PixelIcon, check, copy, star } from '@/components/ui/pixel';
import { SoulCursor } from '@/components/ui/game';
import { CopyButton } from '@/components/ui/CopyButton';

export function Contact() {
  return (
    <section id="contact" className="pt-36 pb-16">
      <Container>
        <Label className="fade mb-5">(05) — Contact</Label>

        <ul className="fade m-0 list-none border-t border-fg p-0">
          {contact.rows.map((row) => {
            const value = links[row.key];
            // 링크가 null인 항목은 숨김 — site.ts에 값을 넣으면 나타남
            if (!value) return null;
            const isCopy = row.action === 'copy';
            const inner = (
              <>
                {/* 선택된 메뉴처럼 SOUL 커서가 나타나고 레이블이 한 칸 밀림 */}
                <Label
                  as="span"
                  className="relative col-span-12 transition-transform duration-150 ease-pixel group-hover:translate-x-5 group-focus-visible:translate-x-5 sm:col-span-3"
                >
                  <SoulCursor />
                  {row.label}
                </Label>
                <span className="col-span-10 text-[22px] tracking-[-0.01em] sm:col-span-8">
                  {row.display(value)}
                  {isCopy && (
                    <span className="ml-3 hidden align-middle font-pixel text-pixel text-accent uppercase group-data-copied:inline">
                      Copied
                    </span>
                  )}
                </span>
                <span className="col-span-2 justify-self-end text-xl sm:col-span-1">
                  {isCopy ? (
                    <>
                      <PixelIcon sprite={copy} scale={2} className="group-data-copied:hidden" />
                      <PixelIcon sprite={check} scale={2} className="hidden text-accent group-data-copied:block" />
                    </>
                  ) : (
                    <Arrow dir={row.action === 'download' ? 'down' : 'ne'} />
                  )}
                </span>
              </>
            );
            const cls =
              'group grid w-full cursor-pointer grid-cols-12 items-center gap-x-6 gap-y-1 border-b border-line px-2 py-6 text-left transition-colors hover:bg-panel';
            return (
              <li key={row.key}>
                {isCopy ? (
                  <CopyButton value={value} label={`${row.label} 주소 복사: ${value}`} className={cls}>
                    {inner}
                  </CopyButton>
                ) : (
                  <a className={cls} href={value} target="_blank" rel="noreferrer">
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function SiteFooter({ backHref = '#about', backLabel = 'Back to top ↑' }: { backHref?: string; backLabel?: string }) {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap justify-between gap-4 pt-7 pb-10 font-pixel text-pixel text-mute">
        <span>© {new Date().getFullYear()} {site.name}</span>
        {/* 세이브 포인트 */}
        <span className="inline-flex items-center gap-2.5">
          <PixelIcon sprite={star} scale={2} className="twinkle text-save" />
          Last saved <Rich text={site.lastUpdated} />
        </span>
        <a href={backHref} className="link-ul hover:text-fg">
          {backLabel}
        </a>
      </Container>
    </footer>
  );
}
