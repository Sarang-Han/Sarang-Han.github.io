/**
 * 콘텐츠 타입 정의.
 * 문자열 안의 `[...]` 구간은 <Rich>가 자동으로 "작성 필요" 플레이스홀더로 렌더링합니다.
 * 값이 확정되면 대괄호를 지우고 실제 내용만 남기면 됩니다.
 */

export type NavItem = { id: string; label: string; n: string };

export type Fact = { label: string; value: string; sub?: string };

export type ExternalLinks = {
  email: string | null;
  github: string | null;
  resume: string | null;
};

/** 아직 작성하지 않은 블록 — 무엇을 써야 하는지 안내 문구를 함께 둡니다. */
export type Todo = { label: string; hint: string };

export type PreviewId = 'buddybot-flow' | 'context-layers';
export type DiagramId = 'buddybot-architecture' | 'context-layers';

export type Block =
  | { type: 'prose'; text: string }
  | { type: 'todo'; todo: Todo }
  | { type: 'todoGrid'; items: Todo[] }
  | { type: 'columns'; columns: { label: string; items: string[] }[] }
  | { type: 'diagram'; diagram: DiagramId }
  | { type: 'stackTable'; rows: { layer: string; name: string; role: string }[] }
  | {
      type: 'decisions';
      items: {
        id: string;
        question: string;
        decision: string;
        compared: string;
        why: string;
        tradeoff: string;
      }[];
    }
  | { type: 'challenges'; items: { challenge: Todo; approach: Todo }[] }
  | { type: 'areas'; items: { id: string; title: string; hint: string }[] };

export type CaseSection = {
  id: string;
  title: string;
  /** split: 제목 좌측 + 본문 우측 / wide: 제목·도입 한 줄 + 전체 폭 본문 */
  layout: 'split' | 'wide';
  intro?: string;
  blocks: Block[];
};

export type Scope = {
  note: string;
  owned: string[];
  collaborated: string[];
  notShown: string;
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  /** 홈 카드용 한 문장 설명 */
  summary: string;
  /** 케이스 스터디 상단 도입 문단 */
  lede: string;
  role: string;
  /** 홈 카드에 표시되는 추가 메타 (예: 담당 범위) */
  cardMeta?: Fact[];
  tags: { label: 'Stack' | 'Focus'; items: string[] };
  /** 케이스 스터디 히어로 메타 */
  meta: Fact[];
  links: { github: string | null; demo: string | null };
  /** 코드 저장소·데모가 없는 프로젝트는 false */
  hasLinks: boolean;
  preview: { id: PreviewId; label: string; caption: string };
  scope?: Scope;
  sections: CaseSection[];
};

export type ExperienceEntry = {
  period: string;
  kind: 'Industry' | 'Education';
  current: boolean;
  role: string;
  org: string;
  listLabel: string;
  list: string[];
  technologies: string[];
  contributions: Todo;
};

export type StackGroup = {
  domain: string;
  icon: 'code' | 'ai' | 'server' | 'db' | 'ui' | 'cloud';
  items: string[];
};
