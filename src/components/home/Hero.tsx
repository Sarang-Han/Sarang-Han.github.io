import Link from 'next/link';
import { hero, links, site } from '@/content/site';
import { Arrow, Container, Grid, Label, Rich } from '@/components/ui/primitives';

const delay = (s: number) => ({ animationDelay: `${s}s` });

export function Hero() {
  return (
    <section id="home" className="border-b border-line pt-28 pb-24">
      <Container>
        <div className="reveal mb-14 flex flex-wrap justify-between gap-3" style={delay(0.05)}>
          <Label as="span">(01) — Index</Label>
          <Label as="span">
            {site.name} · {site.nameKo} — {site.role}
          </Label>
        </div>

        <h1 className="m-0 max-w-[1100px] text-[clamp(48px,7.4vw,112px)] leading-[0.98] font-medium tracking-[-0.045em]">
          <span className="reveal block" style={delay(0.16)}>
            {hero.headline[0]}
          </span>
          <span className="reveal block" style={delay(0.27)}>
            {hero.headline[1]}
            <span className="text-accent">.</span>
          </span>
        </h1>

        <Grid className="mt-[72px] items-end">
          <div className="reveal col-span-12 lg:col-span-6" style={delay(0.42)}>
            <Label className="mb-3.5 text-fg">{site.identity}</Label>
            <p className="m-0 text-[22px] leading-[1.55] tracking-[-0.01em]">{hero.tagline}</p>
            <p className="mt-[18px] mb-0 max-w-[520px] text-base text-sub">{hero.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-fg px-[22px] text-[15px] font-medium text-bg transition-colors hover:bg-accent hover:text-white"
              >
                Explore Projects <Arrow />
              </a>
              <GithubButton href={links.github} />
            </div>
          </div>

          <dl className="reveal col-span-12 m-0 border-t border-fg lg:col-span-5 lg:col-start-8" style={delay(0.48)}>
            {hero.facts.map((f) => (
              <div key={f.label} className="grid grid-cols-[120px_1fr] gap-4 border-b border-line py-3.5">
                <Label as="dt" className="pt-[3px]">
                  {f.label}
                </Label>
                <dd className="m-0 text-[15px]">
                  {f.value}
                  {f.sub && (
                    <>
                      <br />
                      <span className="text-mute">
                        <Rich text={f.sub} />
                      </span>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Grid>

        <Grid className="mt-24 gap-y-8">
          {hero.strengths.map((s) => (
            <div key={s.key} className="reveal col-span-12 border-t border-line pt-[22px] pr-6 lg:col-span-4" style={delay(0.56)}>
              <Label className="mb-2.5 text-accent">
                {s.key} — {s.title}
              </Label>
              <p className="m-0 text-[15px] text-body">{s.body}</p>
              <Link href={s.evidence.href} className="group mt-3 inline-block font-mono text-[12.5px] text-mute hover:text-accent">
                <span className="link-ul">Evidence: {s.evidence.label}</span> <Arrow />
              </Link>
            </div>
          ))}
        </Grid>
      </Container>
    </section>
  );
}

function GithubButton({ href }: { href: string | null }) {
  const cls =
    'group inline-flex h-12 items-center gap-2.5 rounded-full border border-[#d4d4d0] px-[22px] text-[15px] font-medium transition-colors hover:border-fg';
  if (!href) {
    return (
      <a href="#contact" className={cls} title="GitHub URL 미입력 — src/content/site.ts">
        GitHub <Arrow dir="ne" />
      </a>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      GitHub <Arrow dir="ne" />
    </a>
  );
}
