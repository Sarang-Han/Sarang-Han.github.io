import { about } from '@/content/site';
import { Container, Grid, Label, Rich, TodoBlock } from '@/components/ui/primitives';

export function About() {
  return (
    <section id="about" className="border-b border-line py-32">
      <Container>
        <Grid>
          <div className="fade col-span-12 lg:col-span-4">
            <Label className="mb-5">(02) — About</Label>
            <h2 className="m-0 text-[clamp(32px,3.4vw,46px)] leading-[1.15] font-medium tracking-[-0.03em] whitespace-pre-line">
              {about.heading}
            </h2>
          </div>

          <div className="fade col-span-12 lg:col-span-7 lg:col-start-6">
            <TodoBlock todo={about.intro} />

            <Label className="mt-14 mb-1">Technical Interests</Label>
            <ol className="m-0 list-none p-0">
              {about.interests.map((it, i) => (
                <li key={it.title} className="grid grid-cols-[48px_1fr] gap-3 border-b border-line py-[18px]">
                  <span className="pt-[5px] font-pixel text-pixel text-faint">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <div className="text-[19px] font-medium tracking-[-0.01em]">{it.title}</div>
                    <div className="text-[15px] text-mute">{it.desc}</div>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {about.cards.map((c) => (
                <div key={c.label} className="border-t border-fg pt-4">
                  <Label className="mb-2.5">{c.label}</Label>
                  <p className="m-0 text-base font-medium">{c.title}</p>
                  <p className="mt-0.5 mb-0 text-[15px] text-sub">
                    <Rich text={c.org} />
                  </p>
                  <p className="mt-1.5 mb-0 font-mono text-[12.5px]">
                    <Rich text={c.period} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Grid>
      </Container>
    </section>
  );
}
