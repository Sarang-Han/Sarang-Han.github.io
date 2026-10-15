import Link from 'next/link';
import { projects } from '@/content/projects';
import type { Project } from '@/content/types';
import { previews } from '@/components/diagrams';
import { Arrow, Chip, Container, Label, Rich } from '@/components/ui/primitives';

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-space border-b border-line">
      <Container>
        <div className="section-heading fade">
          <div>
            <Label className="mb-5 flex items-center gap-3"><span className="section-marker">02</span> Featured Projects</Label>
            <h2 id="projects-title" className="section-title">Selected Work<span className="px-dot">.</span></h2>
          </div>
          <p className="m-0 font-pixel text-[11px] tracking-wider text-mute">{String(projects.length).padStart(2, '0')} PROJECT / ENGINEERING &amp; PRODUCT</p>
        </div>
        <div className="flex flex-col gap-16">{projects.map((p) => <ProjectCard key={p.slug} project={p} />)}</div>
      </Container>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  const Preview = previews[p.preview.id];
  const meta = [{ label: 'Role', value: p.role }, ...(p.cardMeta ?? [])];
  return (
    <article className="fade">
      <Link href={`/projects/${p.slug}`} className="project-card group grid overflow-hidden border border-line bg-white lg:grid-cols-[1.15fr_1fr]" aria-label={`${p.title} 케이스 스터디 보기`}>
        <div className="project-preview relative flex min-w-0 flex-col justify-between gap-7 bg-accent-wash p-6 sm:p-9 lg:p-10">
          <div className="relative flex items-center justify-between gap-4">
            <Label as="span" className="text-accent-ink">{p.preview.label}</Label>
            <span className="font-pixel text-[11px] text-accent-ink">FIG. {p.number}</span>
          </div>
          <div className="relative py-2 transition-transform duration-500 ease-(--ease-soft) group-hover:-translate-y-1"><Preview /></div>
          <p className="relative m-0 border-t border-accent/15 pt-4 font-mono text-[10px] leading-relaxed text-accent-ink">{p.preview.caption}</p>
        </div>
        <div className="flex min-w-0 flex-col p-6 sm:p-9 lg:p-10">
          <div className="flex items-center justify-between gap-3">
            <span className="font-pixel text-pixel text-accent">PROJECT / {p.number}</span>
            <span className="project-arrow flex size-9 items-center justify-center border border-line text-lg text-accent"><Arrow dir="ne" /></span>
          </div>
          <h3 className="mt-7 mb-2 text-[clamp(36px,4vw,48px)] leading-none font-medium tracking-[-0.045em] transition-colors group-hover:text-accent">{p.title}</h3>
          <p className="m-0 font-mono text-[11px] leading-relaxed text-mute">{p.subtitle}</p>
          <p className="mt-6 mb-0 text-base leading-[1.8] text-body">{p.summary}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">{p.tags.items.map((t) => <Chip key={t}>{t}</Chip>)}</div>
          <dl className="mt-6 mb-0 border-t border-line pt-4 text-sm">
            {meta.map((m) => <div key={m.label} className="grid grid-cols-[52px_minmax(0,1fr)] gap-3 py-1"><Label as="dt" className="pt-1 text-[11px]">{m.label}</Label><dd className="m-0 text-[13px] text-sub"><Rich text={m.value} /></dd></div>)}
          </dl>
          <span className="mt-auto flex items-center justify-between gap-4 pt-7 font-mono text-xs"><span className="link-ul">Explore case study</span><Arrow /></span>
        </div>
      </Link>
      {p.hasLinks && (p.links.github || p.links.demo) && (
        <div className="mt-4 flex justify-end gap-5 font-mono text-xs text-mute">
          <ExtLink label="GitHub" href={p.links.github} /><ExtLink label="Live Demo" href={p.links.demo} />
        </div>
      )}
    </article>
  );
}

function ExtLink({ label, href }: { label: string; href: string | null }) {
  if (!href) return null;
  return <a href={href} target="_blank" rel="noreferrer" className="group inline-flex min-h-10 items-center gap-2 hover:text-accent"><span className="link-ul">{label}</span><Arrow dir="ne" /></a>;
}
