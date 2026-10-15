import type { DiagramId, PreviewId } from '@/content/types';
import { Chip, Ph } from '@/components/ui/primitives';

/* ─────────────────────────────────────────────────────────────
 * 프로젝트 카드 미리보기 (홈)
 * ──────────────────────────────────────────────────────────── */

function FlowStep({ number, label, children }: { number: string; label: string; children: React.ReactNode }) {
  return <div className="flex items-center gap-3 border border-accent/15 bg-white px-4 py-3.5 shadow-[3px_3px_0_#3455d112]">
    <span className="font-pixel text-[11px] text-accent/70">{number}</span>
    <div className="flex min-w-0 flex-1 items-center justify-between gap-2"><span className="text-sm font-medium">{label}</span><span className="font-mono text-[10px] text-mute">{children}</span></div>
  </div>;
}

export function BuddybotFlowMini() {
  return (
    <div className="mx-auto w-full max-w-[380px]" role="img" aria-label="Next.js 질문을 FastAPI가 받아 Dense와 BM25로 검색하고, 컨텍스트를 구성하여 LLM 응답을 생성하는 구조">
      <FlowStep number="01" label="Question">Next.js → FastAPI</FlowStep>
      <div aria-hidden="true" className="mx-auto h-5 w-px bg-accent/30" />
      <div className="border border-accent/30 bg-white p-4 shadow-[3px_3px_0_#3455d112]">
        <div className="mb-3 flex items-center justify-between"><span className="font-pixel text-[11px] text-accent">02 / HYBRID RETRIEVAL</span><span aria-hidden="true" className="size-1.5 bg-accent" /></div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-accent px-2 py-4 text-center text-white"><div className="font-pixel text-sm">Dense</div><div className="mt-1 font-mono text-[10px] text-white/75">Semantic search</div></div>
          <div className="border border-accent/20 bg-accent-wash px-2 py-4 text-center text-accent-ink"><div className="font-pixel text-sm">BM25</div><div className="mt-1 font-mono text-[10px]">Keyword search</div></div>
        </div>
        <div className="mt-3 text-center font-mono text-[10px] text-mute">↓ Context construction</div>
      </div>
      <div aria-hidden="true" className="mx-auto h-5 w-px bg-accent/30" />
      <div className="flex items-center gap-3 bg-fg px-4 py-3.5 text-bg shadow-[3px_3px_0_#3455d120]"><span className="font-pixel text-[11px] text-bg/50">03</span><span className="flex-1 text-sm font-medium">Grounded response</span><span className="font-pixel text-[11px] text-bg/60">LLM ↗</span></div>
    </div>
  );
}

export const previews: Record<PreviewId, () => React.JSX.Element> = {
  'buddybot-flow': BuddybotFlowMini,
};

/* ─────────────────────────────────────────────────────────────
 * 케이스 스터디 다이어그램
 * ──────────────────────────────────────────────────────────── */

function Node({ k, title, note, dark }: { k: string; title: string; note: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`flex min-w-0 flex-col items-start justify-between gap-2 rounded-lg sm:flex-row sm:items-center sm:gap-3 border px-[18px] py-3.5 shadow-px ${
        dark ? 'border-fg bg-fg text-bg' : 'border-line-strong bg-white'
      }`}
    >
      <div>
        <div className={`lbl text-[11px] ${dark ? 'text-faint' : ''}`}>{k}</div>
        <div className="text-lg font-medium">{title}</div>
      </div>
      <span className={`min-w-0 font-mono text-xs [overflow-wrap:anywhere] sm:text-right ${dark ? 'text-faint' : 'text-mute'}`}>{note}</span>
    </div>
  );
}

export function BuddybotArchitecture() {
  return (
    <figure className="dot-grid m-0 rounded-2xl border border-line bg-panel px-4 py-8 sm:px-6 sm:py-14">
      <div className="mx-auto flex max-w-[640px] flex-col" role="img" aria-label="Buddybot 요청 흐름: Next.js → FastAPI → 하이브리드 검색(Dense + BM25) → 컨텍스트 구성 → LLM 응답">
        <Node k="Client" title="Next.js Frontend" note="사용자 질문 입력 · 응답 표시" />
        <div className="vline" aria-hidden="true" />
        <Node k="API" title="FastAPI Backend" note="Python" />
        <div className="vline" aria-hidden="true" />
        <div className="rounded-lg border border-accent bg-white/60 p-3.5">
          <div className="lbl mb-2.5 text-[11px] text-accent-ink">Hybrid Retrieval</div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 rounded-md bg-accent px-3.5 py-3 text-white">
              <div className="font-mono text-[11px] opacity-80">DENSE</div>
              <div className="text-[15px] font-medium">SentenceTransformers</div>
              <div className="text-[13px] opacity-85">+ ChromaDB</div>
            </div>
            <div className="flex-1 rounded-md border border-accent bg-white px-3.5 py-3 text-accent-ink">
              <div className="font-mono text-[11px]">SPARSE</div>
              <div className="text-[15px] font-medium">BM25</div>
              <div className="text-[13px]">키워드 매칭</div>
            </div>
          </div>
          <div className="mt-2.5 text-center font-mono text-xs">
            <Ph>[결과 결합 방식 — 예: RRF, 가중합]</Ph>
          </div>
        </div>
        <div className="vline" aria-hidden="true" />
        <Node k="Build" title="Context Construction" note={<Ph>[top-k · 청크 구성]</Ph>} />
        <div className="vline" aria-hidden="true" />
        <Node k="Generate" title="LLM Response" note="[사용 모델 입력]" dark />
      </div>
      <div className="mx-auto mt-10 flex max-w-[640px] flex-wrap items-center gap-2 border-t border-dashed border-[#c6c6c2] pt-4">
        <span className="lbl mr-2">Deployment</span>
        <Chip>Docker</Chip>
        <Chip>Hugging Face Spaces</Chip>
        <Chip>Vercel</Chip>
        <span className="mt-1.5 basis-full font-mono text-xs">
          <Ph>[어느 구성 요소가 어디에 배포되는지]</Ph>
        </span>
      </div>
      <figcaption className="mx-auto mt-6 max-w-[640px] font-mono text-xs text-mute">
        fig. 03 — Request flow. 실선 박스는 확인된 구성, 강조 칩은 작성 필요.
      </figcaption>
    </figure>
  );
}

export const diagrams: Record<DiagramId, () => React.JSX.Element> = {
  'buddybot-architecture': BuddybotArchitecture,
};
