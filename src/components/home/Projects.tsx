import Link from 'next/link';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { previews } from '@/components/diagrams';
import { Arrow, Chip, Container, Grid, Label, Rich, cn } from '@/components/ui/primitives';

export function Projects() {
  return (
    <section id="projects" className="border-b border-line py-16 lg:py-20">
      <Container>
        <div className="fade mb-10 flex flex-wrap items-end justify-between gap-6 lg:mb-12">
          <div>
            <Label className="mb-5">(02) — Featured Projects</Label>
            <h2 className="m-0 text-[clamp(40px,5vw,72px)] leading-none font-medium tracking-[-0.04em]">Selected Work</h2>
          </div>
          <p className="m-0 font-pixel text-pixel text-mute">
            {String(projects.length).padStart(2, '0')} projects — engineering &amp; product
          </p>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const Preview = previews[p.preview.id];
  const meta = [{ label: 'Role', value: p.role }, ...(p.cardMeta ?? [])];

  return (
    <article className="fade border-t border-fg pt-7">
      <Link href={`/projects/${p.slug}`} className="group block" aria-label={`${p.title} 케이스 스터디 보기`}>
        <Grid>
          {/* Preview */}
          <div className="col-span-12 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-line bg-panel transition-shadow duration-150 ease-pixel group-hover:shadow-[4px_4px_0_var(--color-line-strong)]">
              <div
                className={cn(
                  'flex aspect-[16/10] flex-col justify-between p-6 transition-transform duration-[900ms] ease-(--ease-soft) group-hover:scale-[1.025] sm:p-8',
                  p.preview.id === 'buddybot-flow' && 'dot-grid',
                )}
              >
                <div className="flex justify-between">
                  <Label as="span">{p.preview.label}</Label>
                  <Label as="span">fig. {p.number}</Label>
                </div>
                <Preview />
                <div className="font-mono text-[11px] text-mute">{p.preview.caption}</div>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="col-span-12 flex flex-col lg:col-span-4 lg:col-start-9">
            <div className="flex items-baseline justify-between">
              <span className="font-pixel text-pixel text-accent">{p.number}</span>
              <Label as="span">{p.category}</Label>
            </div>
            <h3 className="mt-7 mb-1.5 text-[44px] leading-none font-medium tracking-[-0.035em] transition-colors duration-200 group-hover:text-accent">
              {p.title}
            </h3>
            <p className="m-0 text-base text-sub">{p.subtitle}</p>
            <p className="mt-6 mb-0 text-base">{p.summary}</p>

            <dl className="mt-7 mb-0 grid grid-cols-[64px_1fr] gap-x-3 gap-y-2.5 text-sm">
              {meta.map((m) => (
                <div key={m.label} className="contents">
                  <Label as="dt" className="pt-0.5">
                    {m.label}
                  </Label>
                  <dd className="m-0">
                    <Rich text={m.value} />
                  </dd>
                </div>
              ))}
              <Label as="dt" className="pt-0.5">
                {p.tags.label}
              </Label>
              <dd className="m-0 flex flex-wrap gap-1.5">
                {p.tags.items.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </dd>
            </dl>

            <span className="mt-auto inline-flex gap-2 pt-8 font-mono text-sm">
              <span className="link-ul">Read case study</span> <Arrow />
            </span>
          </div>
        </Grid>
      </Link>

      {p.hasLinks && (
        <div className="mt-[18px] flex justify-end gap-5 font-mono text-[13px] text-mute">
          <ExtLink label="GitHub" href={p.links.github} />
          <ExtLink label="Live Demo" href={p.links.demo} />
        </div>
      )}
    </article>
  );
}

function ExtLink({ label, href }: { label: string; href: string | null }) {
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
