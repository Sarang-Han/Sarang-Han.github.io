import { about, links, site } from '@/content/site';
import type { StackGroup } from '@/content/types';
import { Arrow, Chip, Container, Grid, Label, PixelWords, Rich } from '@/components/ui/primitives';
import { PixelIcon, browser, chip, cloud, code, database, server, type Sprite } from '@/components/ui/pixel';

const ICONS: Record<StackGroup['icon'], Sprite> = { code, ai: chip, server, db: database, ui: browser, cloud };

const delay = (s: number) => ({ animationDelay: `${s}s` });

export function About() {
  return (
    <section id="about" className="border-b border-line pt-28 pb-24">
      <Container>
        <div className="reveal mb-14 flex flex-wrap justify-between gap-3" style={delay(0.05)}>
          <Label as="span">(01) — About</Label>
          <Label as="span">
            {site.name} · {site.nameKo} — {site.role}
          </Label>
        </div>

        <h1 className="m-0 max-w-[1100px] text-[clamp(48px,7.4vw,112px)] leading-[0.98] font-medium tracking-[-0.045em]">
          <span className="reveal block" style={delay(0.16)}>
            <PixelWords text={about.headline[0]} />
          </span>
          <span className="reveal block" style={delay(0.27)}>
            <PixelWords text={about.headline[1]} />
            <span className="px-dot px-dot-blink">.</span>
          </span>
        </h1>

        <Grid className="mt-[72px] items-end">
          <div className="reveal col-span-12 lg:col-span-6" style={delay(0.42)}>
            <Label className="mb-3.5 text-fg">{site.identity}</Label>
            <p className="m-0 text-[22px] leading-[1.55] tracking-[-0.01em]">{about.tagline}</p>
            <p className="mt-[18px] mb-0 max-w-[520px] text-base text-sub">{about.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center gap-2.5 rounded-md bg-fg px-[22px] text-[15px] font-medium text-bg transition-colors hover:bg-accent hover:text-white"
              >
                Explore Projects <Arrow />
              </a>
              <GithubButton href={links.github} />
            </div>
          </div>

          <dl className="reveal col-span-12 m-0 border-t border-fg lg:col-span-5 lg:col-start-8" style={delay(0.48)}>
            {about.facts.map((f) => (
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

        <div className="fade mt-24">
          <Label className="mb-4">Technical Stack</Label>
          <dl className="m-0 grid grid-cols-1 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
            {about.stack.map((g) => (
              <div key={g.domain} className="border-t border-line pt-4 pb-7">
                <dt className="mb-3 flex items-center gap-2.5 text-[15px] font-medium">
                  <PixelIcon sprite={ICONS[g.icon]} className="text-sub" />
                  {g.domain}
                </dt>
                <dd className="m-0 flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}

function GithubButton({ href }: { href: string | null }) {
  const cls =
    'group inline-flex h-12 items-center gap-2.5 rounded-md border border-[#d4d4d0] bg-white px-[22px] text-[15px] font-medium transition-[border-color,box-shadow] duration-150 ease-pixel hover:border-fg hover:shadow-px';
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
