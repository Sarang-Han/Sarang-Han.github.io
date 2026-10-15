import Link from 'next/link';
import { getAdjacentArticles, readingMinutes } from '@/content/articles';
import { site } from '@/content/site';
import type { Article } from '@/content/types';
import { BlockView } from '@/components/case-study/Blocks';
import { SiteFooter } from '@/components/home/Contact';
import { PageHeader } from '@/components/ui/PageHeader';
import { ContentsNav } from '@/components/ui/ContentsNav';
import { Arrow, Chip, Container, Grid, Label, Rich } from '@/components/ui/primitives';

const delay = (s: number) => ({ animationDelay: `${s}s` });
const pad = (n: number) => String(n).padStart(2, '0');

/** 아티클 템플릿 — 케이스 스터디 구조를 읽기용 한 열 본문 + 목차로 단순화 */
export function ArticleView({ article: a }: { article: Article }) {
  const minutes = readingMinutes(a);
  const { newer, older } = getAdjacentArticles(a.slug);
  const meta = [
    { label: 'Published', value: a.date },
    ...(a.updated ? [{ label: 'Updated', value: a.updated }] : []),
    { label: 'Reading', value: `${minutes} min` },
  ];

  return (
    <>
      <PageHeader backHref="/#articles" backLabel={`${site.name} / Articles`}>
        {minutes} min read
      </PageHeader>

      <main id="main-content" tabIndex={-1}>
        <article>
          <header className="pt-12 pb-12 sm:pt-16 lg:pt-20 lg:pb-16">
            <Container>
              <div className="reveal mb-7 flex flex-wrap items-center gap-x-4 gap-y-2.5" style={delay(0.05)}>
                <span aria-hidden="true" className="size-2 bg-accent" />
                <Label as="span" className="text-accent">Engineering notes</Label>
                <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
                <Label as="span">{a.category}</Label>
              </div>
              <h1
                className="reveal m-0 max-w-[900px] text-[clamp(32px,5vw,64px)] leading-[1.22] font-medium tracking-[-0.045em] [overflow-wrap:anywhere]"
                style={delay(0.16)}
              >
                {a.title}
              </h1>

              <Grid className="reveal mt-8 lg:mt-10">
                <p className="col-span-12 m-0 min-w-0 text-[18px] leading-[1.85] tracking-[-0.015em] text-body lg:col-span-7 lg:text-[19px]">
                  <Rich text={a.lede} />
                </p>
                <dl className="col-span-12 m-0 min-w-0 border-t border-fg text-[14px] lg:col-span-4 lg:col-start-9">
                  {meta.map((m) => (
                    <div key={m.label} className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 border-b border-line py-3 sm:grid-cols-[96px_minmax(0,1fr)]">
                      <Label as="dt" className="pt-1">
                        {m.label}
                      </Label>
                      <dd className="m-0 min-w-0 font-mono [overflow-wrap:anywhere]">
                        <Rich text={m.value} />
                      </dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 border-b border-line py-3 sm:grid-cols-[96px_minmax(0,1fr)]">
                    <Label as="dt" className="pt-1">
                      Tags
                    </Label>
                    <dd className="m-0 flex min-w-0 flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Grid>
            </Container>
          </header>

          <div className="border-t border-line pt-10 pb-16 lg:pt-16 lg:pb-24">
            <Container>
              <Grid>
                <aside className="col-span-12 mb-8 min-w-0 lg:col-span-3 lg:mb-0">
                  <div className="lg:sticky lg:top-28">
                    <ContentsNav items={a.sections.map(({ id, title }) => ({ id, title }))} label="아티클 목차" />
                    <Link href="/#articles" className="group mt-6 hidden items-center gap-2 font-mono text-xs text-mute transition-colors hover:text-accent lg:inline-flex">
                      <Arrow dir="left" /><span className="link-ul">All articles</span>
                    </Link>
                  </div>
                </aside>

                <div className="col-span-12 flex min-w-0 max-w-[720px] flex-col gap-12 text-[16px] leading-[1.9] [overflow-wrap:anywhere] lg:col-span-8 lg:col-start-5 lg:gap-16 lg:text-[17px]">
                  {a.sections.map((s, i) => (
                    <section key={s.id} id={s.id} className="flex min-w-0 flex-col gap-5">
                      <h2 className="m-0 mb-1 flex items-baseline gap-3 text-[25px] leading-[1.35] font-medium tracking-[-0.03em] lg:text-[28px]">
                        <span className="shrink-0 font-pixel text-pixel text-accent">{pad(i + 1)}</span>
                        <span className="min-w-0">{s.title}</span>
                      </h2>
                      {s.blocks.map((b, j) => (
                        <BlockView key={j} block={b} />
                      ))}
                    </section>
                  ))}
                </div>
              </Grid>
            </Container>
          </div>
        </article>

        {(newer || older) && (
          <nav aria-label="다른 글" className="border-t border-line bg-panel/50">
            <Container>
              <Grid className="gap-y-5 py-10 lg:py-14">
                {older && (
                  <Link href={`/articles/${older.slug}`} className="group col-span-12 min-w-0 border border-line bg-white/80 p-5 transition-colors hover:border-accent/40 sm:col-span-6 lg:p-7">
                    <Label as="span" className="mb-5 block">
                      <Arrow dir="left" /> Previous
                    </Label>
                    <span className="link-ul text-[clamp(20px,2.2vw,27px)] leading-[1.4] font-medium tracking-[-0.025em]">{older.title}</span>
                  </Link>
                )}
                {newer && (
                  <Link href={`/articles/${newer.slug}`} className="group col-span-12 min-w-0 border border-line bg-white/80 p-5 transition-colors hover:border-accent/40 sm:col-span-6 sm:col-start-7 sm:text-right lg:p-7">
                    <Label as="span" className="mb-5 block">
                      Next <Arrow />
                    </Label>
                    <span className="link-ul text-[clamp(20px,2.2vw,27px)] leading-[1.4] font-medium tracking-[-0.025em]">{newer.title}</span>
                  </Link>
                )}
              </Grid>
            </Container>
          </nav>
        )}
      </main>

      <SiteFooter backHref="/#articles" backLabel="All articles" />
    </>
  );
}
