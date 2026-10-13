import Link from 'next/link';
import { getAdjacentProject, projects } from '@/content/projects';
import type { CaseSection, Project, Scope } from '@/content/types';
import { SiteFooter } from '@/components/home/Contact';
import { Arrow, Chip, Container, Grid, Label, Rich } from '@/components/ui/primitives';
import { BlockView } from './Blocks';

const delay = (s: number) => ({ animationDelay: `${s}s` });

/** 재사용 가능한 케이스 스터디 템플릿 — 모든 내용은 Project 데이터에서 옴 */
export function CaseStudy({ project: p }: { project: Project }) {
  const index = projects.findIndex((x) => x.slug === p.slug) + 1;
  const next = getAdjacentProject(p.slug);

  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur-sm">
        <Container className="flex h-16 items-center justify-between gap-4 font-mono text-[13px]">
          <Link href="/#projects" className="group inline-flex gap-2 text-sub hover:text-accent">
            <Arrow dir="left" />
            <span className="link-ul">Han Sarang / Work</span>
          </Link>
          <span className="text-mute">
            Case Study {String(index).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          </span>
        </Container>
      </header>

      <main>
        <CaseHero project={p} />
        {p.scope && <ScopeBox scope={p.scope} />}
        <TocAndLegend sections={p.sections} />

        <div className="mt-[72px]">
          {p.sections.map((s, i) => (
            <SectionView key={s.id} section={s} n={i + 1} />
          ))}
        </div>

        {next.slug !== p.slug && (
          <section className="border-t border-fg">
            <Container>
              <Link href={`/projects/${next.slug}`} className="group flex flex-wrap items-end justify-between gap-6 pt-16 pb-20">
                <span>
                  <Label as="span" className="mb-3.5 block">
                    Next — {next.number}
                  </Label>
                  <span className="link-ul text-[clamp(32px,4.4vw,60px)] leading-[1.05] font-medium tracking-[-0.04em]">
                    {next.title}
                  </span>
                </span>
                <Arrow className="text-[40px]" />
              </Link>
            </Container>
          </section>
        )}
      </main>

      <SiteFooter backHref="/" backLabel="All work" />
    </>
  );
}

function CaseHero({ project: p }: { project: Project }) {
  return (
    <section className="pt-24 pb-[72px]">
      <Container>
        <div className="reveal mb-10 flex flex-wrap items-center gap-x-6 gap-y-2.5" style={delay(0.05)}>
          <span className="font-mono text-[13px] text-accent">{p.number}</span>
          <Label as="span">{p.category}</Label>
        </div>
        <h1
          className="reveal m-0 max-w-[1050px] text-[clamp(48px,8vw,128px)] leading-[0.94] font-medium tracking-[-0.048em]"
          style={delay(0.16)}
        >
          {p.title}
        </h1>
        <p className="reveal mt-5 mb-0 text-[clamp(20px,2vw,26px)] tracking-[-0.015em] text-body" style={delay(0.16)}>
          {p.subtitle}
        </p>

        <Grid className="reveal mt-16" >
          <p className="col-span-12 m-0 text-xl leading-[1.6] lg:col-span-6">{p.lede}</p>
          <dl className="col-span-12 m-0 border-t border-fg text-[15px] lg:col-span-5 lg:col-start-8">
            {p.meta.map((m) => (
              <div key={m.label} className="grid grid-cols-[96px_1fr] gap-3 border-b border-line py-3">
                <Label as="dt" className="pt-1">
                  {m.label}
                </Label>
                <dd className={`m-0 ${m.label === 'Duration' ? 'font-mono' : ''}`}>
                  <Rich text={m.value} />
                </dd>
              </div>
            ))}
            {p.hasLinks && (
              <div className="grid grid-cols-[96px_1fr] gap-3 border-b border-line py-3">
                <Label as="dt" className="pt-1">
                  Links
                </Label>
                <dd className="m-0 flex flex-wrap gap-[18px] font-mono">
                  <HeroLink label="GitHub" href={p.links.github} />
                  <HeroLink label="Live Demo" href={p.links.demo} />
                </dd>
              </div>
            )}
          </dl>
        </Grid>

        {p.tags.label === 'Stack' && (
          <div className="reveal mt-8 flex flex-wrap gap-1.5" style={delay(0.3)}>
            {p.tags.items.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

function HeroLink({ label, href }: { label: string; href: string | null }) {
  if (!href)
    return (
      <span>
        {label} ↗ <Rich text="[URL]" />
      </span>
    );
  return (
    <a href={href} target="_blank" rel="noreferrer" className="link-ul hover:text-accent">
      {label} ↗
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
            <ul className="m-0 flex flex-col gap-1 pl-[18px] text-[14.5px]">
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
  // 2열 목차를 세로 순서(1,2,3… 왼쪽 열 먼저)로 배치
  const half = Math.ceil(sections.length / 2);
  return (
    <section className="pt-12">
      <Container>
        <Grid>
          <nav aria-label="케이스 스터디 목차" className="col-span-12 border-t border-fg lg:col-span-7">
            <ol
              className="m-0 grid list-none grid-flow-col gap-x-6 p-0 max-sm:grid-flow-row"
              style={{ gridTemplateRows: `repeat(${half}, auto)` }}
            >
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex items-baseline gap-2.5 border-b border-line py-2.5 text-sm text-sub hover:text-accent">
                    <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, '0')}</span>
                    <span className="link-ul">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="col-span-12 border-t border-fg pt-3.5 text-sm text-sub lg:col-span-4 lg:col-start-9">
            <Label className="mb-3">Reading this page</Label>
            <p className="mt-0 mb-2 flex items-center gap-2.5">
              <span aria-hidden="true" className="inline-block size-2.5 rounded-[2px] bg-fg" />
              확인된 사실 — 프로젝트 정보 그대로
            </p>
            <p className="m-0 flex items-center gap-2.5">
              <span aria-hidden="true" className="inline-block size-2.5 rounded-[2px] border border-dashed border-accent" />
              <span className="ph">작성 필요 — 본인이 채울 자리</span>
            </p>
          </div>
        </Grid>
      </Container>
    </section>
  );
}

function SectionView({ section: s, n }: { section: CaseSection; n: number }) {
  const num = <Label className="mb-3.5">{String(n).padStart(2, '0')}</Label>;
  const title = <h2 className="m-0 text-[34px] leading-[1.2] font-medium tracking-[-0.03em]">{s.title}</h2>;
  const body = s.blocks.map((b, i) => <BlockView key={i} block={b} />);

  return (
    <section id={s.id} className="fade border-t border-line py-[72px] lg:py-24">
      <Container>
        {s.layout === 'split' ? (
          <Grid>
            <div className="col-span-12 lg:col-span-4">
              {num}
              {title}
            </div>
            <div className="col-span-12 flex flex-col gap-[18px] lg:col-span-7 lg:col-start-6">{body}</div>
          </Grid>
        ) : (
          <>
            <Grid className="mb-12">
              <div className="col-span-12 lg:col-span-4">
                {num}
                {title}
              </div>
              {s.intro && <p className="col-span-12 m-0 text-body lg:col-span-7 lg:col-start-6">{s.intro}</p>}
            </Grid>
            {body}
          </>
        )}
      </Container>
    </section>
  );
}
