import { stack } from '@/content/experience';
import type { StackGroup } from '@/content/types';
import { Container, Grid, Label, Rich } from '@/components/ui/primitives';

const ICONS: Record<StackGroup['icon'], string> = {
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  ai: 'M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0',
  server: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
  db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  ui: 'M3 5h18v14H3zM3 9h18M7 7h.01',
  cloud: 'M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z',
};

export function Stack() {
  return (
    <section id="stack" className="border-b border-line py-32">
      <Container>
        <Grid className="fade mb-14 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Label className="mb-5">(05) — Technical Stack</Label>
            <h2 className="m-0 text-[clamp(40px,5vw,72px)] leading-none font-medium tracking-[-0.04em]">Tools, by use</h2>
          </div>
          <p className="col-span-12 m-0 text-[15px] text-mute lg:col-span-5 lg:col-start-8">
            숙련도 막대 대신, 각 기술을 어느 프로젝트에서 어떤 역할로 썼는지로 표시합니다.
          </p>
        </Grid>

        <div className="fade border-t border-fg">
          <Grid className="hidden border-b border-line py-3 lg:grid">
            <Label as="span" className="col-span-3">Domain</Label>
            <Label as="span" className="col-span-4">Technology</Label>
            <Label as="span" className="col-span-5">Used in</Label>
          </Grid>

          {stack.map((g) => (
            <Grid key={g.domain} className="gap-y-3 border-b border-line py-[22px]">
              <div className="col-span-12 flex items-center gap-3 self-start lg:col-span-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 items-center justify-center rounded-lg border border-line bg-white text-sub"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d={ICONS[g.icon]} />
                  </svg>
                </span>
                <span className="text-base font-medium">{g.domain}</span>
              </div>
              <ul className="col-span-12 m-0 flex list-none flex-col p-0 lg:col-span-9">
                {g.items.map((t) => (
                  <li key={t.name} className="grid grid-cols-1 gap-x-6 py-1 sm:grid-cols-9">
                    <span className="font-mono text-base sm:col-span-4">{t.name}</span>
                    <span className="text-[15px] sm:col-span-5">
                      <Rich text={t.use} />
                    </span>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </div>
      </Container>
    </section>
  );
}
