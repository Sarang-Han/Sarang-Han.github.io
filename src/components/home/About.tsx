import { about, links, site } from '@/content/site';
import { Dialogue } from '@/components/ui/Dialogue';
import { BattleButton } from '@/components/ui/game';
import { arrowRight, arrowUpRight } from '@/components/ui/pixel';
import { Container, Grid, Label, PixelWords, Rich } from '@/components/ui/primitives';

const delay = (s: number) => ({ animationDelay: `${s}s` });

export function About() {
  return (
    <section id="about" className="border-b border-line pt-14 pb-16 lg:pt-16 lg:pb-20">
      <Container>
        <div className="reveal mb-10 flex flex-wrap justify-between gap-3 lg:mb-12" style={delay(0.05)}>
          <Label as="span">(01) — About</Label>
          {/* Undertale 전투 HUD */}
          <p className="m-0 flex items-center gap-5 font-pixel text-pixel text-mute uppercase">
            <span className="text-fg">{site.name}</span>
            <span>LV {about.status.lv}</span>
            <span className="flex items-center gap-2">
              HP
              <span aria-hidden="true" className="inline-block h-3 w-20 bg-accent" />
              {about.status.hp} / {about.status.hp}
            </span>
          </p>
        </div>

        <h1 className="m-0 max-w-[1100px] text-[clamp(48px,5.6vw,80px)] leading-[1.02] font-medium tracking-[-0.045em]">
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
            <Dialogue lines={[about.tagline, about.intro]} instantLines={1} delay={700} speed={22} />
            <div className="mt-8 flex flex-wrap gap-4">
              <BattleButton href="#projects" icon={arrowRight}>
                Projects
              </BattleButton>
              <BattleButton href={links.github ?? '#contact'} icon={arrowUpRight}>
                GitHub
              </BattleButton>
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
      </Container>
    </section>
  );
}
