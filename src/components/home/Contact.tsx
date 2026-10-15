import { contact, links, site } from '@/content/site';
import { Arrow, Container, Label, Rich } from '@/components/ui/primitives';
import { PixelIcon, check, copy, star } from '@/components/ui/pixel';
import { CopyButton } from '@/components/ui/CopyButton';

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="contact-surface section-space">
      <Container>
        <Label className="fade mb-8 flex items-center gap-3"><span className="section-marker">05</span> Contact</Label>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="fade">
            <h2 id="contact-title" className="m-0 text-[clamp(40px,5vw,60px)] leading-[1.08] font-medium tracking-[-0.045em]">Let’s build<br />what’s next<span className="text-[#91a6ff]">.</span></h2>
            <a href={`mailto:${links.email}`} className="group mt-7 inline-flex min-h-11 items-center gap-3 border border-white/30 px-4 font-mono text-xs transition-colors hover:border-[#a8b9ff] hover:text-[#a8b9ff]">Say hello <Arrow dir="ne" /></a>
          </div>
          <ul className="fade m-0 list-none self-center border-t border-white/30 p-0">
            {contact.rows.map((row) => {
              const value = links[row.key];
              if (!value) return null;
              const isCopy = row.action === 'copy';
              const inner = <>
                <span className="min-w-0">
                  <span className="mb-2 block font-pixel text-[11px] tracking-wider text-[#a0a09c] uppercase">{row.label} <span className="ml-2 text-[9px] text-[#a0a09c]">{isCopy ? '/ CLICK TO COPY' : '/ ELSEWHERE'}</span></span>
                  <span className="block text-[clamp(15px,2vw,21px)] leading-snug tracking-[-0.02em] [overflow-wrap:anywhere]">{row.display(value)}</span>
                  {isCopy && <span className="mt-1 hidden font-pixel text-[10px] text-[#a8b9ff] group-data-copied:block">COPIED TO CLIPBOARD</span>}
                </span>
                <span className="text-[#a8b9ff]">{isCopy ? <><PixelIcon sprite={copy} scale={2} className="group-data-copied:hidden" /><PixelIcon sprite={check} scale={2} className="hidden group-data-copied:block" /></> : <Arrow dir={row.action === 'download' ? 'down' : 'ne'} />}</span>
              </>;
              const cls = 'group flex w-full cursor-pointer items-center justify-between gap-4 border-b border-white/20 py-6 text-left transition-colors hover:bg-white/5';
              return <li key={row.key}>{isCopy ? <CopyButton value={value} label={`${row.label} 주소 복사: ${value}`} className={cls}>{inner}</CopyButton> : <a className={cls} href={value} target="_blank" rel="noreferrer" download={row.action === 'download' || undefined}>{inner}</a>}</li>;
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function SiteFooter({ backHref = '#about', backLabel = 'Back to top ↑' }: { backHref?: string; backLabel?: string }) {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 py-6 font-pixel text-[11px] tracking-wide text-mute">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="inline-flex items-center gap-2.5"><PixelIcon sprite={star} scale={2} className="twinkle text-save" />Last saved <Rich text={site.lastUpdated} /></span>
        <a href={backHref} className="link-ul inline-flex min-h-10 items-center hover:text-accent">{backLabel}</a>
      </Container>
    </footer>
  );
}
