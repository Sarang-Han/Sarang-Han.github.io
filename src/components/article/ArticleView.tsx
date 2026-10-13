import Link from 'next/link';
import { getAdjacentArticles, readingMinutes } from '@/content/articles';
import { site } from '@/content/site';
import type { Article } from '@/content/types';
import { BlockView } from '@/components/case-study/Blocks';
import { SiteFooter } from '@/components/home/Contact';
import { PageHeader } from '@/components/ui/PageHeader';
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

      <main>
        <article>
          <header className="pt-24 pb-16">
            <Container>
              <div className="reveal mb-10 flex flex-wrap items-center gap-x-6 gap-y-2.5" style={delay(0.05)}>
                <span className="font-pixel text-pixel text-accent">
                  <Rich text={a.date} />
                </span>
                <Label as="span">{a.category}</Label>
              </div>
              <h1
                className="reveal m-0 max-w-[960px] text-[clamp(36px,5.2vw,72px)] leading-[1.05] font-medium tracking-[-0.04em]"
                style={delay(0.16)}
              >
                {a.title}
              </h1>

              <Grid className="reveal mt-14">
                <p className="col-span-12 m-0 text-xl leading-[1.6] lg:col-span-7">
                  <Rich text={a.lede} />
                </p>
                <dl className="col-span-12 m-0 border-t border-fg text-[15px] lg:col-span-4 lg:col-start-9">
                  {meta.map((m) => (
                    <div key={m.label} className="grid grid-cols-[96px_1fr] gap-3 border-b border-line py-3">
                      <Label as="dt" className="pt-1">
                        {m.label}
                      </Label>
                      <dd className="m-0 font-mono">
                        <Rich text={m.value} />
                      </dd>
                    </div>
                  ))}
                  <div className="grid grid-cols-[96px_1fr] gap-3 border-b border-line py-3">
                    <Label as="dt" className="pt-1">
                      Tags
                    </Label>
                    <dd className="m-0 flex flex-wrap gap-1.5">
                      {a.tags.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </dd>
                  </div>
                </dl>
              </Grid>
            </Container>
          </header>

          <div className="border-t border-line pt-16 pb-24 lg:pt-20">
            <Container>
              <Grid>
                <nav aria-label="목차" className="col-span-12 mb-14 lg:col-span-3 lg:mb-0">
                  <div className="lg:sticky lg:top-24">
                    <Label className="mb-3">Contents</Label>
                    <ol className="m-0 list-none border-t border-fg p-0">
                      {a.sections.map((s, i) => (
                        <li key={s.id}>
                          <a href={`#${s.id}`} className="flex items-baseline gap-2.5 border-b border-line py-2.5 text-sm text-sub hover:text-accent">
                            <span className="font-pixel text-pixel text-faint">{pad(i + 1)}</span>
                            <span className="link-ul">{s.title}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                </nav>

                <div className="col-span-12 flex flex-col gap-16 text-[17px] leading-[1.8] lg:col-span-7 lg:col-start-5">
                  {a.sections.map((s, i) => (
                    <section key={s.id} id={s.id} className="flex flex-col gap-5">
                      <h2 className="m-0 flex items-baseline gap-3 text-[28px] leading-[1.25] font-medium tracking-[-0.025em]">
                        <span className="font-pixel text-pixel text-accent">{pad(i + 1)}</span>
                        {s.title}
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
          <nav aria-label="다른 글" className="border-t border-fg">
            <Container>
              <Grid className="gap-y-10 pt-16 pb-20">
                {older && (
                  <Link href={`/articles/${older.slug}`} className="group col-span-12 sm:col-span-6">
                    <Label as="span" className="mb-3 block">
                      <Arrow dir="left" /> Previous
                    </Label>
                    <span className="link-ul text-[clamp(22px,2.4vw,32px)] leading-[1.2] font-medium tracking-[-0.025em]">{older.title}</span>
                  </Link>
                )}
                {newer && (
                  <Link href={`/articles/${newer.slug}`} className="group col-span-12 sm:col-span-6 sm:col-start-7 sm:text-right">
                    <Label as="span" className="mb-3 block">
                      Next <Arrow />
                    </Label>
                    <span className="link-ul text-[clamp(22px,2.4vw,32px)] leading-[1.2] font-medium tracking-[-0.025em]">{newer.title}</span>
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
