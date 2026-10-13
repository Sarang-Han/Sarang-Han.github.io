import { contact, links, site } from '@/content/site';
import { Arrow, Container, Label, Rich } from '@/components/ui/primitives';

export function Contact() {
  return (
    <section id="contact" className="pt-36 pb-16">
      <Container>
        <Label className="fade mb-7">(06) — Contact</Label>
        <h2 className="fade m-0 max-w-[1000px] text-[clamp(48px,7.4vw,112px)] leading-[0.98] font-medium tracking-[-0.045em]">
          {contact.headline}
          <span className="text-accent">.</span>
        </h2>
        <p className="fade mt-8 mb-0 text-xl text-sub">{contact.body}</p>

        <ul className="fade mt-20 mb-0 list-none border-t border-fg p-0">
          {contact.rows.map((row) => {
            const value = links[row.key];
            const href = value ? (row.key === 'email' ? `mailto:${value}` : value) : null;
            const inner = (
              <>
                <Label as="span" className="col-span-12 sm:col-span-3">
                  {row.label}
                </Label>
                <span className="col-span-10 text-[22px] tracking-[-0.01em] sm:col-span-8">
                  {value ? row.display(value) : <Rich text={row.placeholder} />}
                </span>
                <span className="col-span-2 justify-self-end text-xl sm:col-span-1">
                  <Arrow dir={row.key === 'resume' ? 'down' : 'ne'} />
                </span>
              </>
            );
            const cls = 'group grid grid-cols-12 items-center gap-x-6 gap-y-1 border-b border-line px-2 py-6 transition-colors hover:bg-panel';
            return (
              <li key={row.key}>
                {href ? (
                  <a className={cls} href={href} {...(row.key !== 'email' ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    {inner}
                  </a>
                ) : (
                  <div className={cls}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

export function SiteFooter({ backHref = '#home', backLabel = 'Back to top ↑' }: { backHref?: string; backLabel?: string }) {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap justify-between gap-4 pt-7 pb-10 font-mono text-[12.5px] text-mute">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>
          Last updated <Rich text={site.lastUpdated} />
        </span>
        <a href={backHref} className="link-ul hover:text-fg">
          {backLabel}
        </a>
      </Container>
    </footer>
  );
}
