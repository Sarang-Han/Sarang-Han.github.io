import type { Block } from '@/content/types';
import { diagrams } from '@/components/diagrams';
import { Label, Rich, TodoBlock, cn } from '@/components/ui/primitives';

/** 본문 블록 렌더러 — 케이스 스터디와 아티클이 공유. content/types.ts의 Block 타입과 1:1 대응 */
export function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'prose':
      return (
        <p className="m-0">
          <Rich text={block.text} />
        </p>
      );

    case 'todo':
      return <TodoBlock todo={block.todo} />;

    case 'todoGrid':
      return (
        <div className={block.items.length === 2 ? 'grid grid-cols-1 gap-6 sm:grid-cols-2' : 'flex flex-col gap-4'}>
          {block.items.map((t) => (
            <TodoBlock key={t.label} todo={t} />
          ))}
        </div>
      );

    case 'columns':
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {block.columns.map((col) => (
            <div key={col.label} className="border-t border-fg pt-3.5">
              <Label className="mb-3">{col.label}</Label>
              <ul className="m-0 flex list-[square] flex-col gap-2 pl-[18px] text-[15px] marker:text-faint">
                {col.items.map((it) => (
                  <li key={it}>
                    <Rich text={it} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case 'diagram': {
      const Diagram = diagrams[block.diagram];
      return <Diagram />;
    }

    case 'stackTable':
      return (
        <div className="border-t border-fg">
          {block.rows.map((r, i) => (
            <div
              key={`${r.name}-${i}`}
              className="grid grid-cols-[96px_minmax(0,1fr)] gap-x-4 gap-y-1 border-b border-line py-3.5 text-[15px] sm:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.4fr)]"
            >
              <Label as="span" className="pt-1">
                {r.layer}
              </Label>
              <span className="min-w-0 font-mono [overflow-wrap:anywhere]">{r.name}</span>
              <span className="col-start-2 text-sub sm:col-start-auto">{r.role}</span>
            </div>
          ))}
        </div>
      );

    case 'decisions':
      return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-6">
          {block.items.map((d) => (
            <article key={d.id} className="border-t border-fg pt-[18px]">
              <p className="m-0 font-pixel text-pixel text-accent">{d.id}</p>
              <h3 className="mt-2 mb-4 text-[21px] leading-[1.35] font-medium tracking-[-0.015em]">{d.question}</h3>
              <dl className="m-0 grid grid-cols-[92px_1fr] gap-x-3 gap-y-2 text-[14.5px]">
                {(
                  [
                    ['Decision', d.decision],
                    ['Compared', d.compared],
                    ['Why', d.why],
                    ['Trade-off', d.tradeoff],
                  ] as const
                ).map(([k, v]) => (
                  <div key={k} className="contents">
                    <Label as="dt" className="pt-[3px]">
                      {k}
                    </Label>
                    <dd className="m-0">
                      <Rich text={v} />
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      );

    case 'challenges':
      return (
        <div className="flex flex-col gap-8">
          {block.items.map((c) => (
            <div key={c.challenge.label} className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-[minmax(0,1fr)_24px_minmax(0,1fr)]">
              <TodoBlock todo={c.challenge} />
              <span aria-hidden="true" className="self-center text-center font-pixel text-faint max-sm:rotate-90">
                →
              </span>
              <TodoBlock todo={c.approach} />
            </div>
          ))}
        </div>
      );

    case 'areas':
      return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-6">
          {block.items.map((a) => (
            <article key={a.id} className="flex flex-col gap-3 border-t border-fg pt-[18px]">
              <p className="m-0 font-pixel text-pixel text-accent">{a.id}</p>
              <h3 className="m-0 text-[22px] leading-[1.3] font-medium tracking-[-0.02em]">{a.title}</h3>
              <TodoBlock todo={{ label: 'To write', hint: a.hint }} />
            </article>
          ))}
        </div>
      );

    case 'heading':
      return <h3 className="mt-4 mb-0 text-[21px] leading-[1.35] font-medium tracking-[-0.015em]">{block.text}</h3>;

    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className={cn('m-0 flex flex-col gap-2 pl-[22px] marker:text-faint', block.ordered ? 'list-decimal' : 'list-[square]')}>
          {block.items.map((it) => (
            <li key={it}>
              <Rich text={it} />
            </li>
          ))}
        </List>
      );
    }

    case 'code':
      return (
        <figure className="m-0 min-w-0 overflow-hidden rounded-lg bg-fg text-bg shadow-px">
          <figcaption className="flex justify-between gap-4 border-b border-white/10 px-5 py-2.5">
            <span className="lbl text-faint">{block.lang}</span>
            {block.caption && (
              <span className="truncate font-mono text-xs text-faint">
                <Rich text={block.caption} />
              </span>
            )}
          </figcaption>
          <pre className="m-0 overflow-x-auto p-5 font-mono text-[13.5px] leading-[1.7]">
            <code>{block.code}</code>
          </pre>
        </figure>
      );

    case 'callout':
      return (
        <aside className="border-l-2 border-accent bg-accent-wash/60 py-4 pr-5 pl-5">
          {block.label && <Label className="mb-1.5 text-accent-ink">{block.label}</Label>}
          <p className="m-0 text-body">
            <Rich text={block.text} />
          </p>
        </aside>
      );
  }
}
