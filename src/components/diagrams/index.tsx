import type { DiagramId, PreviewId } from '@/content/types';
import { Chip, Ph } from '@/components/ui/primitives';

/* ─────────────────────────────────────────────────────────────
 * 프로젝트 카드 미리보기 (홈)
 * ──────────────────────────────────────────────────────────── */

function MiniNode({ k, v, tone = 'plain' }: { k: string; v: string; tone?: 'plain' | 'dark' }) {
  return (
    <div
      className={
        tone === 'dark'
          ? 'rounded-lg bg-fg px-3.5 py-3 text-center text-bg'
          : 'rounded-lg border border-line-strong bg-white px-3.5 py-3 text-center'
      }
    >
      <div className={`font-mono text-[10.5px] ${tone === 'dark' ? 'opacity-70' : 'text-mute'}`}>{k}</div>
      <div className="text-sm font-medium">{v}</div>
    </div>
  );
}

const Sep = () => (
  <span aria-hidden="true" className="font-mono text-faint">
    →
  </span>
);

export function BuddybotFlowMini() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      <MiniNode k="client" v="Next.js" />
      <Sep />
      <MiniNode k="api" v="FastAPI" />
      <Sep />
      <div className="flex flex-col gap-1.5">
        <div className="rounded-lg bg-accent px-3.5 py-2 text-center text-white">
          <div className="font-mono text-[10.5px] opacity-80">dense</div>
          <div className="text-[13px] font-medium">Embedding</div>
        </div>
        <div className="rounded-lg border border-accent bg-white px-3.5 py-2 text-center text-accent">
          <div className="font-mono text-[10.5px]">sparse</div>
          <div className="text-[13px] font-medium">BM25</div>
        </div>
      </div>
      <Sep />
      <MiniNode k="build" v="Context" />
      <Sep />
      <MiniNode k="generate" v="LLM" tone="dark" />
    </div>
  );
}

const LAYERS = [
  { id: 'L1', name: 'System instructions', desc: '응답 규칙 · 안전 정책' },
  { id: 'L2', name: 'Character profile', desc: '성격 · 말투 · 관계' },
  { id: 'L3', name: 'Lorebook entries', desc: '조건에 따라 주입되는 세계관 정보', highlight: true },
  { id: 'L4', name: 'Conversation memory', desc: '최근 대화 · 요약' },
  { id: 'L5', name: 'User turn', desc: '현재 입력' },
];

export function ContextLayersMini() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <div className="flex w-[280px] flex-col gap-1.5">
        {LAYERS.map((l, i) => (
          <div
            key={l.id}
            style={{ marginLeft: i * 12 }}
            className={`flex justify-between rounded-md border px-3 py-2 ${
              l.highlight ? 'border-accent bg-accent-wash' : 'border-line-strong bg-white'
            }`}
          >
            <span className={`text-[13px] ${l.highlight ? 'font-medium text-accent-ink' : ''}`}>{l.name}</span>
            <span className={`font-mono text-[10.5px] ${l.highlight ? 'text-accent' : 'text-faint'}`}>{l.id}</span>
          </div>
        ))}
      </div>
      <Sep />
      <div className="flex size-22 flex-col items-center justify-center rounded-full bg-fg text-bg">
        <span className="font-mono text-[10.5px] opacity-70">reply</span>
        <span className="text-[15px] font-medium">LLM</span>
      </div>
    </div>
  );
}

export const previews: Record<PreviewId, () => React.JSX.Element> = {
  'buddybot-flow': BuddybotFlowMini,
  'context-layers': ContextLayersMini,
};

/* ─────────────────────────────────────────────────────────────
 * 케이스 스터디 다이어그램
 * ──────────────────────────────────────────────────────────── */

function Node({ k, title, note, dark }: { k: string; title: string; note: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-[10px] border px-[18px] py-3.5 ${
        dark ? 'border-fg bg-fg text-bg' : 'border-line-strong bg-white'
      }`}
    >
      <div>
        <div className={`lbl text-[11px] ${dark ? 'text-faint' : ''}`}>{k}</div>
        <div className="text-lg font-medium">{title}</div>
      </div>
      <span className={`text-right font-mono text-xs ${dark ? 'text-faint' : 'text-mute'}`}>{note}</span>
    </div>
  );
}

export function BuddybotArchitecture() {
  return (
    <figure className="dot-grid m-0 rounded-2xl border border-line bg-panel px-6 py-14">
      <div className="mx-auto flex max-w-[640px] flex-col" role="img" aria-label="Buddybot 요청 흐름: Next.js → FastAPI → 하이브리드 검색(Dense + BM25) → 컨텍스트 구성 → LLM 응답">
        <Node k="Client" title="Next.js Frontend" note="사용자 질문 입력 · 응답 표시" />
        <div className="vline" aria-hidden="true" />
        <Node k="API" title="FastAPI Backend" note="Python" />
        <div className="vline" aria-hidden="true" />
        <div className="rounded-xl border border-accent bg-white/60 p-3.5">
          <div className="lbl mb-2.5 text-[11px] text-accent-ink">Hybrid Retrieval</div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex-1 rounded-lg bg-accent px-3.5 py-3 text-white">
              <div className="font-mono text-[11px] opacity-80">DENSE</div>
              <div className="text-[15px] font-medium">SentenceTransformers</div>
              <div className="text-[13px] opacity-85">+ ChromaDB</div>
            </div>
            <div className="flex-1 rounded-lg border border-accent bg-white px-3.5 py-3 text-accent-ink">
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
      <div className="mx-auto mt-10 flex max-w-[640px] flex-wrap items-center gap-2 border-t border-dashed border-[#c9c9c4] pt-4">
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

export function ContextLayers() {
  return (
    <figure className="m-0 rounded-2xl border border-line bg-panel px-6 py-14">
      <div className="mx-auto flex max-w-[720px] flex-col gap-2.5">
        {LAYERS.map((l, i) => (
          <div
            key={l.id}
            className={`flex items-center justify-between gap-4 rounded-[10px] border px-[18px] py-3.5 max-lg:!ml-0 ${
              l.highlight ? 'border-accent bg-accent-wash' : 'border-line-strong bg-white'
            }`}
            style={{ marginLeft: i * 24 }}
          >
            <span>
              <span className={`lbl block text-[11px] ${l.highlight ? 'text-accent-ink' : ''}`}>{l.id}</span>
              <span className={`text-[17px] font-medium ${l.highlight ? 'text-accent-ink' : ''}`}>{l.name}</span>
            </span>
            <span className={`text-right text-sm ${l.highlight ? 'text-accent-ink' : 'text-mute'}`}>{l.desc}</span>
          </div>
        ))}
        <div className="mt-3 flex items-center justify-end gap-4">
          <span className="font-mono text-xs text-mute">assembled context →</span>
          <span className="rounded-full bg-fg px-6 py-3 text-base font-medium text-bg">LLM → Character reply</span>
        </div>
      </div>
      <figcaption className="mx-auto mt-8 max-w-[720px] font-mono text-xs text-mute">
        fig. 02 — Conceptual. 일반적인 캐릭터 대화 컨텍스트 구성. 실제 서비스 구조가 아님.
      </figcaption>
    </figure>
  );
}

export const diagrams: Record<DiagramId, () => React.JSX.Element> = {
  'buddybot-architecture': BuddybotArchitecture,
  'context-layers': ContextLayers,
};
