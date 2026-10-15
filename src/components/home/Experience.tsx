import { experience } from '@/content/experience';
import { Chip, Container, Grid, Label, Rich, TodoBlock, cn, isPlaceholder } from '@/components/ui/primitives';

export function Experience() {
  const entries = experience.filter((e) => !e.hidden);
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-space border-b border-line bg-white/40">
      <Container>
        <div className="fade mb-10 lg:mb-12">
          <Label className="mb-5 flex items-center gap-3"><span className="section-marker">04</span> Experience</Label>
          <h2 id="experience-title" className="section-title">The path so far<span className="px-dot">.</span></h2>
        </div>

        <ol className="m-0 list-none p-0">
          {entries.map((e, idx) => (
            <li key={e.role} className={cn('fade border-t border-line-strong pt-8', idx === entries.length - 1 ? 'pb-4' : 'pb-12')}>
              <Grid>
                <div className="col-span-12 lg:col-span-3">
                  <p className="m-0 flex items-center gap-2.5 font-pixel text-pixel">
                    <span
                      aria-hidden="true"
                      className={cn('inline-block size-2', e.current ? 'bg-accent' : 'border border-fg')}
                    />
                    <Rich text={e.period} />
                  </p>
                  <Label className="mt-3 mb-0">{e.kind}</Label>
                </div>

                <div className="col-span-12 min-w-0 lg:col-span-9 lg:border-l lg:border-line lg:pl-8">
                  <h3 className="m-0 text-[28px] leading-[1.2] font-medium tracking-[-0.025em]">{e.role}</h3>
                  <p className="mt-1 mb-0 text-base text-sub">
                    <Rich text={e.org} />
                  </p>

                  <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-9">
                    <div className="md:col-span-5">
                      <Label className="mb-2.5">{e.listLabel}</Label>
                      <ul className="m-0 flex list-[square] flex-col gap-1.5 pl-[18px] text-[15px] text-body marker:text-faint">
                        {e.list.map((item) => (
                          <li key={item}>
                            <Rich text={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:col-span-4">
                      <Label className="mb-2.5">Technologies</Label>
                      <div className="flex flex-wrap gap-1.5">
                        {e.technologies.map((t) => (
                          <Chip key={t} dashed={isPlaceholder(t)}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </div>

                  <TodoBlock todo={e.contributions} className="mt-7" />
                </div>
              </Grid>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
