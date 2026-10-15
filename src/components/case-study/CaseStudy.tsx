import Link from 'next/link';
import { getAdjacentProject, projects } from '@/content/projects';
import { site } from '@/content/site';
import type { CaseSection, Project, Scope } from '@/content/types';
import { SiteFooter } from '@/components/home/Contact';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContentsNav } from '@/components/ui/ContentsNav';
import { Arrow, Chip, Container, Grid, Label, Rich } from '@/components/ui/primitives';
import { BlockView } from './Blocks';

const delay = (s: number) => ({ animationDelay: `${s}s` });

/** 재사용 가능한 케이스 스터디 템플릿 — 모든 내용은 Project 데이터에서 옴 */
export function CaseStudy({ project: p }: { project: Project }) {
  const index = projects.findIndex((x) => x.slug === p.slug) + 1;
  const next = getAdjacentProject(p.slug);

  return (
    <>
      <PageHeader backHref="/#projects" backLabel={`${site.name} / Work`}>
        <span className="hidden sm:inline">Case study </span>{String(index).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
      </PageHeader>

      <main id="main-content" tabIndex={-1}>
        <CaseHero project={p} />
        {p.scope && <ScopeBox scope={p.scope} />}
        <TocAndLegend sections={p.sections} />

        <div className="mt-14 lg:mt-20">
          {p.sections.map((s, i) => (
            <SectionView key={s.id} section={s} n={i + 1} />
          ))}
        </div>

        <section className="border-t border-line bg-panel/50">
          <Container>
            <Link href={next.slug !== p.slug ? `/projects/${next.slug}` : '/#projects'} className="group flex flex-wrap items-center justify-between gap-6 py-12 lg:py-16">
              <span className="min-w-0">
                <Label as="span" className="mb-3.5 block">
                  {next.slug !== p.slug ? `Next — ${next.number}` : 'Explore more'}
                </Label>
                <span className="link-ul text-[clamp(28px,3.8vw,48px)] leading-[1.15] font-medium tracking-[-0.04em]">
                  {next.slug !== p.slug ? next.title : 'Back to selected work'}
                </span>
              </span>
              <span className="flex size-12 shrink-0 items-center justify-center border border-line-strong bg-white text-accent transition-colors group-hover:border-accent group-hover:bg-accent-wash">
                <Arrow className="text-2xl" />
              </span>
            </Link>
          </Container>
        </section>
      </main>

      <SiteFooter backHref="/" backLabel="All work" />
    </>
  );
}

function CaseHero({ project: p }: { project: Project }) {
  return (
    <section className="pt-12 pb-12 sm:pt-16 lg:pt-20 lg:pb-16">
      <Container>
        <div className="reveal mb-7 flex flex-wrap items-center gap-x-4 gap-y-2.5" style={delay(0.05)}>
          <span className="flex size-9 items-center justify-center border border-accent/25 bg-accent-wash font-pixel text-pixel text-accent">{p.number}</span>
          <Label as="span">{p.category}</Label>
        </div>
        <h1
          className="reveal m-0 max-w-[960px] text-[clamp(48px,7.5vw,96px)] leading-[1.02] font-medium tracking-[-0.055em] [overflow-wrap:anywhere]"
          style={delay(0.16)}
        >
          {p.title}
        </h1>
        <p className="reveal mt-4 mb-0 max-w-[760px] text-[clamp(17px,2vw,23px)] leading-[1.5] tracking-[-0.02em] text-sub" style={delay(0.16)}>
          {p.subtitle}
        </p>

        <Grid className="reveal mt-10 border-t border-line pt-8 lg:mt-12 lg:pt-10">
          <div className="col-span-12 min-w-0 lg:col-span-6">
            <Label className="mb-4 text-accent">Project overview</Label>
            <p className="m-0 text-[18px] leading-[1.85] tracking-[-0.015em] text-body lg:text-[19px]">{p.lede}</p>
            {p.tags.label === 'Stack' && (
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.tags.items.map((t) => <Chip key={t}>{t}</Chip>)}
              </div>
            )}
          </div>
          <dl className="col-span-12 m-0 min-w-0 border-t border-fg text-[14px] lg:col-span-5 lg:col-start-8">
            {p.meta.map((m) => (
              <div key={m.label} className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 border-b border-line py-3.5 sm:grid-cols-[96px_minmax(0,1fr)]">
                <Label as="dt" className="pt-1">
                  {m.label}
                </Label>
                <dd className={`m-0 min-w-0 [overflow-wrap:anywhere] ${m.label === 'Duration' ? 'font-mono' : ''}`}>
                  <Rich text={m.value} />
                </dd>
              </div>
            ))}
            {p.hasLinks && (
              <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 border-b border-line py-3.5 sm:grid-cols-[96px_minmax(0,1fr)]">
                <Label as="dt" className="pt-1">
                  Links
                </Label>
                <dd className="m-0 flex min-w-0 flex-wrap gap-x-[18px] gap-y-2 font-mono">
                  <HeroLink label="GitHub" href={p.links.github} />
                  <HeroLink label="Live Demo" href={p.links.demo} />
                </dd>
              </div>
            )}
          </dl>
        </Grid>
      </Container>
    </section>
  );
}

function HeroLink({ label, href }: { label: string; href: string | null }) {
  if (!href)
    return (
      <span>
        {label} <Arrow dir="ne" /> <Rich text="[URL]" />
      </span>
    );
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group hover:text-accent">
      <span className="link-ul">{label}</span> <Arrow dir="ne" />
    </a>
  );
}

function ScopeBox({ scope }: { scope: Scope }) {
  return (
    <section className="pb-6">
      <Container>
        <Grid className="rounded-2xl border border-fg bg-white p-6 lg:p-8">
          <div className="col-span-12 lg:col-span-3">
            <Label className="mb-2 text-fg">Scope of my work</Label>
            <p className="m-0 text-sm text-mute">{scope.note}</p>
          </div>
          <div className="col-span-12 border-line lg:col-span-3 lg:border-l lg:pl-5">
            <Label className="mb-2.5 text-accent">Owned — 기획</Label>
            <ul className="m-0 flex list-[square] flex-col gap-1 pl-[18px] text-[14.5px] marker:text-faint">
              {scope.owned.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 border-line lg:col-span-3 lg:border-l lg:pl-5">
            <Label className="mb-2.5">Collaborated — 구현</Label>
            {scope.collaborated.map((x) => (
              <p key={x} className="mt-0 mb-2 text-[14.5px]">
                <Rich text={x} />
              </p>
            ))}
          </div>
          <div className="col-span-12 border-line lg:col-span-3 lg:border-l lg:pl-5">
            <Label className="mb-2.5">Not shown</Label>
            <p className="m-0 text-[14.5px] text-sub">{scope.notShown}</p>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

function TocAndLegend({ sections }: { sections: CaseSection[] }) {
  return (
    <section>
      <Container>
        <Grid className="items-start">
          <div className="col-span-12 min-w-0 lg:col-span-8">
            <ContentsNav items={sections.map(({ id, title }) => ({ id, title }))} label="케이스 스터디 목차" columns />
          </div>
          <aside className="col-span-12 border border-line bg-white/70 p-5 text-[13px] leading-relaxed text-sub lg:col-span-3 lg:col-start-10">
            <Label className="mb-4 text-fg">Reading notes</Label>
            <p className="mt-0 mb-3 flex items-baseline gap-2.5">
              <span aria-hidden="true" className="inline-block size-2 shrink-0 bg-fg" />
              확인된 사실 — 프로젝트 정보 그대로
            </p>
            <p className="m-0 flex items-baseline gap-2.5">
              <span aria-hidden="true" className="inline-block size-2 shrink-0 border border-dashed border-accent" />
              <span className="ph">작성 필요 — 본인이 채울 자리</span>
            </p>
          </aside>
        </Grid>
      </Container>
    </section>
  );
}

function SectionView({ section: s, n }: { section: CaseSection; n: number }) {
  const num = <Label className="mb-4 inline-flex items-center gap-3 text-accent"><span aria-hidden="true" className="h-px w-6 bg-accent" />{String(n).padStart(2, '0')}</Label>;
  const title = <h2 className="m-0 text-[clamp(26px,3vw,32px)] leading-[1.25] font-medium tracking-[-0.035em]">{s.title}</h2>;
  const body = s.blocks.map((b, i) => <BlockView key={i} block={b} />);

  return (
    <section id={s.id} className="fade border-t border-line py-12 lg:py-20">
      <Container>
        {s.layout === 'split' ? (
          <Grid>
            <div className="col-span-12 min-w-0 self-start lg:sticky lg:top-28 lg:col-span-4">
              {num}
              {title}
            </div>
            <div className="col-span-12 flex min-w-0 flex-col gap-5 text-[16px] leading-[1.85] [overflow-wrap:anywhere] lg:col-span-7 lg:col-start-6 lg:text-[17px]">{body}</div>
          </Grid>
        ) : (
          <>
            <Grid className="mb-8 lg:mb-10">
              <div className="col-span-12 min-w-0 lg:col-span-4">
                {num}
                {title}
              </div>
              {s.intro && <p className="col-span-12 m-0 min-w-0 self-end text-[16px] leading-[1.85] text-body lg:col-span-7 lg:col-start-6 lg:text-[17px]">{s.intro}</p>}
            </Grid>
            <div className="min-w-0 [overflow-wrap:anywhere]">{body}</div>
          </>
        )}
      </Container>
    </section>
  );
}
