import type { Project } from './types';

/**
 * 프로젝트 데이터. 홈 카드와 케이스 스터디 페이지가 모두 여기서 렌더링됩니다.
 * 확인되지 않은 정보는 `[...]`로 남겨 두세요 — 지표·링크를 지어내지 않습니다.
 */
export const projects: Project[] = [
  {
    slug: 'buddybot',
    number: '01',
    title: 'Buddybot',
    subtitle: 'RAG-powered University Academic Assistant',
    category: 'AI Engineering · RAG',
    summary: '대학생이 자연어로 학사 정보를 찾을 수 있도록 돕는 검색 증강 생성(RAG) 챗봇입니다.',
    lede: '대학생이 자연어 질문만으로 학사 정보를 찾을 수 있도록, Dense 임베딩과 BM25를 결합한 하이브리드 검색 위에 LLM 응답을 생성하는 RAG 챗봇입니다.',
    role: '[역할 — 예: 개인 프로젝트, 설계·구현·배포]',
    tags: {
      label: 'Stack',
      items: ['Python', 'FastAPI', 'Next.js', 'ChromaDB', 'SentenceTransformers', 'BM25', 'Docker', 'Hugging Face Spaces', 'Vercel'],
    },
    meta: [
      { label: 'Role', value: '[역할 · 기여 범위]' },
      { label: 'Duration', value: '[YYYY.MM — YYYY.MM]' },
      { label: 'Type', value: '[개인 / 팀 n명 · 수업 / 사이드]' },
    ],
    links: { github: null, demo: null },
    hasLinks: true,
    preview: {
      id: 'buddybot-flow',
      label: 'Architecture',
      caption: 'Hybrid Retrieval (Dense + BM25) → Context Construction → Response',
    },
    sections: [
      {
        id: 's1',
        title: 'Context & Problem',
        layout: 'split',
        blocks: [
          {
            type: 'prose',
            text: '대학의 학사 정보는 학생에게 꼭 필요하지만, 원하는 답을 찾으려면 여러 문서와 페이지를 직접 뒤져야 하는 경우가 많습니다. Buddybot은 이 정보를 자연어 질문으로 조회할 수 있게 하는 것을 목표로 했습니다.',
          },
          {
            type: 'todo',
            todo: {
              label: 'To write — 구체적 문제',
              hint: '어떤 학사 정보가(예: 학칙, 수강·졸업 요건, 공지) 어디에 흩어져 있었고, 학생이 실제로 어떤 질문에서 막혔는지. 직접 관찰하거나 들은 사례가 있다면 1–2개.',
            },
          },
        ],
      },
      {
        id: 's2',
        title: 'Goals & Constraints',
        layout: 'split',
        blocks: [
          {
            type: 'columns',
            columns: [
              {
                label: 'Goals',
                items: [
                  '자연어 질문으로 학사 정보 조회',
                  '검색된 근거 문서를 바탕으로 한 응답 생성',
                  '[추가 목표 — 예: 출처 표시, 응답 속도]',
                ],
              },
              {
                label: 'Constraints',
                items: ['[데이터 범위 · 수집 방식]', '[비용 · 무료 호스팅 제약]', '[개발 기간 · 인원]'],
              },
            ],
          },
        ],
      },
      {
        id: 's3',
        title: 'System Architecture',
        layout: 'wide',
        intro:
          '요청은 Next.js 클라이언트에서 FastAPI 백엔드로 전달되고, 백엔드는 Dense 검색과 BM25 검색을 함께 수행한 뒤 결과로 컨텍스트를 구성해 LLM에 응답을 요청합니다.',
        blocks: [{ type: 'diagram', diagram: 'buddybot-architecture' }],
      },
      {
        id: 's4',
        title: 'Technology Stack',
        layout: 'split',
        blocks: [
          {
            type: 'stackTable',
            rows: [
              { layer: 'Frontend', name: 'Next.js', role: '채팅 클라이언트' },
              { layer: 'Backend', name: 'FastAPI', role: 'API 서버 (Python)' },
              { layer: 'Embedding', name: 'SentenceTransformers', role: 'Dense 검색용 임베딩' },
              { layer: 'Vector DB', name: 'ChromaDB', role: '임베딩 저장 · 유사도 검색' },
              { layer: 'Sparse', name: 'BM25', role: '키워드 기반 검색' },
              { layer: 'Container', name: 'Docker', role: '실행 환경 패키징' },
              { layer: 'Hosting', name: 'Hugging Face Spaces', role: '배포' },
              { layer: 'Hosting', name: 'Vercel', role: '배포' },
            ],
          },
        ],
      },
      {
        id: 's5',
        title: 'Implementation',
        layout: 'split',
        blocks: [
          {
            type: 'todoGrid',
            items: [
              { label: '5.1 — Data ingestion', hint: '문서 수집 경로, 전처리, 청킹 기준(길이·오버랩)과 그렇게 정한 이유.' },
              { label: '5.2 — Retrieval API', hint: 'FastAPI 엔드포인트 구성, 요청·응답 스키마, Dense / BM25 인덱스를 어떻게 로드·조회하는지.' },
              { label: '5.3 — Context construction', hint: '검색 결과를 어떤 순서·형식으로 프롬프트에 넣는지, 토큰 한도를 어떻게 다루는지.' },
              { label: '5.4 — Frontend & deployment', hint: 'Next.js 채팅 UI, Docker 이미지 구성, Hugging Face Spaces · Vercel 배포 흐름.' },
            ],
          },
        ],
      },
      {
        id: 's6',
        title: 'Engineering Decisions',
        layout: 'wide',
        intro: '각 결정을 같은 형식으로 정리합니다: 무엇을 골랐고, 무엇과 비교했고, 무엇을 포기했는가.',
        blocks: [
          {
            type: 'decisions',
            items: [
              {
                id: 'D-01',
                question: '왜 Dense 단독이 아닌 Dense + BM25 하이브리드인가?',
                decision: 'Dense(SentenceTransformers) + Sparse(BM25) 결합',
                compared: '[대안]',
                why: '[이 데이터에서 각 방식이 놓친 질문 유형]',
                tradeoff: '[포기한 것]',
              },
              {
                id: 'D-02',
                question: '왜 Next.js와 별도의 FastAPI 백엔드인가?',
                decision: 'Next.js 클라이언트 + FastAPI 백엔드 분리',
                compared: '[대안]',
                why: '[분리한 이유 — 예: Python ML 생태계 활용]',
                tradeoff: '[포기한 것]',
              },
              {
                id: 'D-03',
                question: '벡터 저장소로 왜 ChromaDB인가?',
                decision: 'ChromaDB',
                compared: '[대안]',
                why: '[선택 근거 — 규모, 설정 난이도 등]',
                tradeoff: '[포기한 것]',
              },
              {
                id: 'D-04',
                question: '배포를 왜 HF Spaces와 Vercel로 나눴는가?',
                decision: 'Docker + Hugging Face Spaces / Vercel',
                compared: '[대안]',
                why: '[구성 요소별 배포 위치와 이유]',
                tradeoff: '[포기한 것]',
              },
            ],
          },
        ],
      },
      {
        id: 's7',
        title: 'Challenges & Trade-offs',
        layout: 'split',
        blocks: [
          {
            type: 'challenges',
            items: [
              {
                challenge: { label: 'Challenge 1', hint: '실제로 부딪힌 문제 (예: 특정 유형 질문에서 검색 실패)' },
                approach: { label: 'Approach', hint: '시도한 방법과 결과, 남은 한계' },
              },
              {
                challenge: { label: 'Challenge 2', hint: '배포·성능·비용 측면의 문제' },
                approach: { label: 'Approach', hint: '시도한 방법과 결과, 남은 한계' },
              },
            ],
          },
        ],
      },
      {
        id: 's8',
        title: 'Results & Lessons',
        layout: 'split',
        blocks: [
          {
            type: 'prose',
            text: 'Next.js · FastAPI · 하이브리드 검색 · LLM으로 이어지는 전체 파이프라인을 구성하고, Docker · Hugging Face Spaces · Vercel로 배포했습니다.',
          },
          {
            type: 'todo',
            todo: {
              label: 'Results',
              hint: '측정한 지표가 있다면 측정 방법과 함께 적습니다(예: 평가 질문 n개 기준). 측정하지 않았다면 수치를 적지 않습니다.',
            },
          },
          { type: 'todo', todo: { label: 'Lessons', hint: '다시 만든다면 바꿀 것 1–2가지 — 구체적인 기술 판단으로.' } },
        ],
      },
    ],
  },
  {
    slug: 'ai-character-chat',
    number: '02',
    title: 'AI Character Chat Platform',
    subtitle: 'LLM-powered Interactive Conversation Experience',
    category: 'AI Product · System Planning',
    summary: '초기 스타트업에서 LLM 기반 인터랙티브 대화 플랫폼의 설계에 참여한 제품 중심 케이스 스터디입니다.',
    lede: '초기 스타트업에서 LLM 기반 인터랙티브 대화 플랫폼의 설계에 참여했습니다. 이 페이지는 구현이 아닌 제품·시스템 기획 관점의 케이스 스터디입니다.',
    role: 'AI Product / System Planning',
    cardMeta: [{ label: 'Scope', value: '제품·시스템 기획 — 엔지니어링 구현과 구분하여 기술' }],
    tags: {
      label: 'Focus',
      items: ['LLM Conversation', 'Context & Lorebook', 'AI Feature Planning', 'System Architecture', 'Cross-functional'],
    },
    meta: [
      { label: 'Role', value: 'AI Product / System Planning' },
      { label: 'Org', value: 'Early-stage AI Startup' },
      { label: 'Duration', value: '[YYYY.MM — 현재]' },
      { label: 'Team', value: '[협업 직군 구성]' },
    ],
    links: { github: null, demo: null },
    hasLinks: false,
    preview: {
      id: 'context-layers',
      label: 'Context composition — concept',
      caption: '일반적인 캐릭터 대화 컨텍스트 구성 개념도 — 실제 서비스 구조가 아님',
    },
    scope: {
      note: '기획 책임과 엔지니어링 구현을 구분해 적습니다.',
      owned: ['LLM 대화 시스템 기획', '컨텍스트 · 로어북 설계', 'AI 기능 기획', '제품 시스템 아키텍처'],
      collaborated: ['엔지니어링 팀과의 협업으로 진행', '[직접 구현한 부분이 있다면 명시, 없으면 “해당 없음”]'],
      notShown: '회사 내부 정보, 비즈니스 지표, 미공개 사양은 포함하지 않습니다.',
    },
    sections: [
      {
        id: 'c1',
        title: 'Context & Problem',
        layout: 'split',
        blocks: [
          {
            type: 'prose',
            text: 'LLM 기반 캐릭터 대화는 한 번의 좋은 응답보다, 긴 대화 동안 캐릭터와 세계관이 일관되게 유지되는 경험이 중요합니다. 이 프로젝트에서는 그 경험을 만드는 대화 시스템과 제품 구조를 기획했습니다.',
          },
          {
            type: 'todo',
            todo: {
              label: 'To write — 내가 다룬 문제',
              hint: '공개 가능한 범위에서, 기획 과정에서 실제로 정의한 문제 1–2개. (예: 어떤 상황에서 대화 경험이 깨지는가)',
            },
          },
        ],
      },
      {
        id: 'c2',
        title: 'Goals & Constraints',
        layout: 'split',
        blocks: [
          {
            type: 'todoGrid',
            items: [
              { label: 'Goals', hint: '사용자 경험 목표와 시스템 목표를 구분해서.' },
              { label: 'Constraints', hint: '초기 스타트업 환경의 제약 — 일정, 인력, 모델 비용 등 공개 가능한 수준으로.' },
            ],
          },
        ],
      },
      {
        id: 'c3',
        title: 'System Concept',
        layout: 'wide',
        intro:
          '캐릭터 대화에서 LLM이 받는 컨텍스트를 층위로 나누어 보는 일반적인 개념도입니다. 실제 서비스의 구조나 사양을 나타내지 않습니다.',
        blocks: [{ type: 'diagram', diagram: 'context-layers' }],
      },
      {
        id: 'c4',
        title: 'Planning Work',
        layout: 'wide',
        intro: '담당 영역별로, 무엇을 정의했고 어떤 산출물로 남겼는지.',
        blocks: [
          {
            type: 'areas',
            items: [
              { id: 'A-01', title: 'LLM Conversation Systems', hint: '대화 흐름에서 정의한 규칙이나 상태. 어떤 경험 문제를 풀기 위한 것이었는지.' },
              { id: 'A-02', title: 'Context & Lorebook Design', hint: '컨텍스트를 어떤 단위로 나누고, 어떤 조건에서 어떤 정보를 넣도록 설계했는지.' },
              { id: 'A-03', title: 'AI Feature Planning', hint: '기획한 AI 기능과 그 기능의 사용자 시나리오.' },
              { id: 'A-04', title: 'Product System Architecture', hint: '기능 간 관계를 정리한 방식 — 다이어그램이나 명세 구조.' },
              { id: 'A-05', title: 'Cross-functional Collaboration', hint: '엔지니어링 등 유관 직군과 의사결정을 맞춘 구체적 장면.' },
            ],
          },
        ],
      },
      {
        id: 'c5',
        title: 'Decisions & Trade-offs',
        layout: 'split',
        blocks: [
          { type: 'todo', todo: { label: 'Decision 1', hint: '선택지 · 결정 · 근거 · 포기한 것. 기획 판단이 시스템 구조에 어떻게 반영됐는지.' } },
          { type: 'todo', todo: { label: 'Decision 2', hint: '사용자 경험과 기술·비용 제약이 충돌했던 지점과 그 조율 방식.' } },
        ],
      },
      {
        id: 'c6',
        title: 'Collaboration & Lessons',
        layout: 'split',
        blocks: [
          { type: 'todo', todo: { label: 'Collaboration', hint: '엔지니어와 기획 의도를 어떤 형식(명세, 다이어그램, 리뷰)으로 맞췄는지.' } },
          { type: 'todo', todo: { label: 'Lessons', hint: '엔지니어로서 이 경험에서 가져가는 것 — 모델 동작과 제품 구조 사이에서 배운 점.' } },
        ],
      },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
