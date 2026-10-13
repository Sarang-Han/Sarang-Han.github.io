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
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
