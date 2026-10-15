import { about, links, site } from '@/content/site';
import { Dialogue } from '@/components/ui/Dialogue';
import { BattleButton } from '@/components/ui/game';
import { PixelIcon, heart, arrowRight, arrowUpRight } from '@/components/ui/pixel';
import { Container, Grid, Label, PixelWords, Rich } from '@/components/ui/primitives';

const delay = (s: number) => ({ animationDelay: `${s}s` });

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="hero-section border-b border-line pt-10 pb-12 lg:pt-14 lg:pb-16">
      <Container>
        <div className="reveal mb-10 flex items-center justify-between gap-4 lg:mb-12" style={delay(0.05)}>
          <Label as="span" className="flex items-center gap-3"><span className="section-marker">01</span> About</Label>
          <span className="font-mono text-[10px] tracking-[0.12em] text-mute uppercase sm:text-xs">Engineering with intention</span>
        </div>

        <div className="relative">
          {/* 사용자가 정한 최대 64px · 두 줄 헤드라인 유지 */}
          <h1 id="about-title" className="m-0 text-[length:min(64px,calc((100vw_-_40px)/10.2))] leading-[1.08] font-medium tracking-[-0.045em]">
            <span className="reveal block whitespace-nowrap" style={delay(0.16)}>
              <PixelWords text={about.headline[0]} />
            </span>
            <span className="reveal block whitespace-nowrap text-accent" style={delay(0.27)}>
              <PixelWords text={about.headline[1]} /><span className="px-dot px-dot-blink">.</span>
            </span>
          </h1>
          <div aria-hidden="true" className="hero-emblem reveal absolute right-4 -top-4 hidden size-40 items-center justify-center xl:flex" style={delay(0.4)}>
            <span className="emblem-cross top-0 left-0">+</span><span className="emblem-cross top-0 right-0">+</span>
            <PixelIcon sprite={heart} scale={13} className="text-accent" />
            <span className="emblem-cross bottom-0 left-0">+</span><span className="emblem-cross bottom-0 right-0">+</span>
            <span className="absolute -bottom-6 font-pixel text-[10px] tracking-[0.16em] text-mute">A LITTLE SOUL</span>
          </div>
        </div>

        <Grid className="mt-12 items-start lg:mt-16">
          <div className="reveal col-span-12 lg:col-span-7 lg:pr-8" style={delay(0.42)}>
            <Label className="mb-4 text-fg">{site.identity}</Label>
            <Dialogue lines={[about.tagline, about.intro]} instantLines={1} delay={700} speed={22} />
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <BattleButton href="#projects" icon={arrowRight}>Projects</BattleButton>
              <a href={links.github ?? '#contact'} target="_blank" rel="noreferrer" className="group inline-flex min-h-12 items-center gap-3 px-3 font-mono text-sm text-sub hover:text-accent">
                <span className="link-ul">GitHub</span><PixelIcon sprite={arrowUpRight} />
              </a>
            </div>
          </div>

          <aside aria-label="프로필" className="profile-card reveal col-span-12 mt-4 lg:col-span-5 lg:mt-0" style={delay(0.48)}>
            <div className="flex items-center justify-between gap-3 border-b border-line pb-4">
              <span className="font-pixel text-pixel text-fg">{site.name} <span className="ml-2 text-faint">/ {site.nameKo}</span></span>
              <span className="font-pixel text-[11px] tracking-wider text-accent">PLAYER 01</span>
            </div>
            <dl className="m-0 py-1">
              {about.facts.map((f) => (
                <div key={f.label} className="grid grid-cols-[62px_minmax(0,1fr)] gap-3 border-b border-line/80 py-3 last:border-0">
                  <Label as="dt" className="pt-[3px] text-[11px]">{f.label}</Label>
                  <dd className="m-0 text-[13px] leading-[1.6] sm:text-sm">
                    {f.value}
                    {f.sub && <span className="mt-0.5 block text-xs text-mute"><Rich text={f.sub} /></span>}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-center gap-4 border-t border-line pt-4 font-pixel text-[11px] tracking-wider text-mute" aria-label={`레벨 ${about.status.lv}, HP ${about.status.hp}/${about.status.hp}`}>
              <PixelIcon sprite={heart} scale={1} className="text-accent" />
              <span>LV {String(about.status.lv).padStart(2, '0')}</span>
              <span className="flex flex-1 items-center gap-2">HP <span aria-hidden="true" className="hp-meter h-2 flex-1" /></span>
              <span>{about.status.hp}/{about.status.hp}</span>
            </div>
          </aside>
        </Grid>
        <div className="reveal mt-10 flex items-center justify-between gap-4 border-t border-line pt-5 lg:mt-12" style={delay(0.6)}>
          <span className="font-mono text-[10px] tracking-[0.12em] text-mute uppercase sm:text-xs">Ideas → Systems → Real-world use</span>
          <a href="#projects" className="group inline-flex min-h-8 items-center gap-3 font-pixel text-[11px] text-mute hover:text-accent">Explore the work <span aria-hidden="true" className="transition-transform group-hover:translate-y-1">↓</span></a>
        </div>
      </Container>
    </section>
  );
}
