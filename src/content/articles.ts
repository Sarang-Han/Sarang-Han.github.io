import type { Article } from './types';

/**
 * 아티클(테크 블로그) 데이터. About 하단 목록과 /articles/[slug] 페이지가 모두 여기서 렌더링됩니다.
 * 본문은 sections[].blocks — 케이스 스터디와 같은 블록에 heading · list · code · callout을 더해 씁니다.
 * 새 글: 아래 객체를 복사해 slug · date만 바꾸면 페이지가 생깁니다.
 */
export const articles: Article[] = [
  {
    slug: 'buddybot-hybrid-retrieval',
    title: 'Buddybot에 BM25를 더한 이유',
    summary: 'Dense 임베딩 검색에 BM25 키워드 검색을 결합한 과정과 그 판단 근거를 정리합니다.',
    lede: '[도입 2–3문장 — 이 글이 다루는 문제와, 읽고 나면 얻어 갈 수 있는 것]',
    date: '[YYYY.MM.DD]',
    category: 'RAG · Retrieval',
    tags: ['RAG', 'BM25', 'Embedding', 'ChromaDB'],
    sections: [
      {
        id: 'intro',
        title: '들어가며',
        blocks: [
          { type: 'callout', label: 'TL;DR', text: '[결론 한두 문장 — 바쁜 독자가 여기만 읽어도 되도록]' },
          {
            type: 'prose',
            text: 'Buddybot은 대학생이 자연어로 학사 정보를 찾을 수 있게 돕는 RAG 챗봇입니다. 전체 구조는 [케이스 스터디](/projects/buddybot)에 정리했고, 이 글은 그중 검색 단계만 다룹니다.',
          },
          { type: 'todo', todo: { label: 'To write — 계기', hint: '이 주제를 글로 남기게 된 구체적인 순간 하나.' } },
        ],
      },
      {
        id: 'problem',
        title: '문제 상황',
        blocks: [
          {
            type: 'todo',
            todo: {
              label: 'To write — 문제',
              hint: 'Dense 검색만 썼을 때 결과가 어긋난 질문 유형과 실제 질의 예시 1–2개. 재현 가능한 수준으로.',
            },
          },
        ],
      },
      {
        id: 'approach',
        title: '하이브리드 검색 구성',
        blocks: [
          { type: 'prose', text: '검색은 두 갈래로 나눠 수행한 뒤 결과를 합칩니다.' },
          {
            type: 'list',
            items: ['Dense — SentenceTransformers 임베딩 + ChromaDB 유사도 검색', 'Sparse — BM25 키워드 매칭'],
          },
          { type: 'heading', text: '결과 결합' },
          { type: 'prose', text: '두 결과는 [결합 방식 — 예: RRF, 가중합]으로 합친 뒤 상위 [k]개를 컨텍스트로 사용합니다.' },
          {
            type: 'code',
            lang: 'python',
            caption: '[파일 경로 — 예: backend/retrieval.py]',
            code: `# 예시 — 실제 결합 로직으로 교체하세요
def hybrid_search(query: str, k: int = 5):
    dense = vector_store.similarity_search(query, k=k)
    sparse = bm25.get_top_n(query, documents, n=k)
    return merge(dense, sparse)[:k]`,
          },
          { type: 'prose', text: '위 예시의 `merge()` 자리에 실제 결합 로직이 들어갑니다.' },
        ],
      },
      {
        id: 'result',
        title: '결과와 배운 점',
        blocks: [
          {
            type: 'todo',
            todo: {
              label: 'Results',
              hint: '측정한 지표가 있다면 측정 방법과 함께(예: 평가 질문 n개 기준). 측정하지 않았다면 수치를 적지 않습니다.',
            },
          },
          { type: 'todo', todo: { label: 'Lessons', hint: '다시 한다면 바꿀 것 1–2가지 — 구체적인 기술 판단으로.' } },
        ],
      },
    ],
  },
  // ── 임시 데이터 — 레이아웃 확인용. 실제 글로 교체하거나 삭제하세요 ──
  {
    slug: 'llm-streaming-fastapi',
    title: 'FastAPI로 LLM 응답 스트리밍하기',
    summary: 'StreamingResponse로 토큰 단위 응답을 클라이언트에 바로 흘려보내는 방법을 정리합니다.',
    lede: '[도입 2–3문장 — 스트리밍이 필요했던 상황과 이 글의 범위]',
    date: '2026.09.18',
    category: 'Backend · LLM',
    tags: ['FastAPI', 'Streaming', 'LLM'],
    sections: [
      {
        id: 'intro',
        title: '들어가며',
        blocks: [
          { type: 'callout', label: 'TL;DR', text: '[결론 한두 문장]' },
          { type: 'todo', todo: { label: 'To write — 배경', hint: '응답 대기 시간이 문제가 됐던 구체적인 장면.' } },
        ],
      },
      {
        id: 'implementation',
        title: '구현',
        blocks: [
          { type: 'prose', text: '`StreamingResponse`에 비동기 제너레이터를 넘기면 토큰이 생성되는 대로 응답을 보낼 수 있습니다.' },
          {
            type: 'code',
            lang: 'python',
            caption: '[파일 경로]',
            code: `from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

@app.get("/chat")
async def chat(q: str):
    async def tokens():
        async for chunk in llm.astream(q):
            yield chunk
    return StreamingResponse(tokens(), media_type="text/plain")`,
          },
        ],
      },
      {
        id: 'notes',
        title: '정리',
        blocks: [{ type: 'todo', todo: { label: 'Lessons', hint: '프록시·타임아웃 등 배포 환경에서 확인할 것.' } }],
      },
    ],
  },
  {
    slug: 'rag-chunking-notes',
    title: 'RAG 청킹 기준 정리 노트',
    summary: '청크 길이·오버랩·문서 구조가 검색 결과에 주는 영향을 정리한 노트입니다.',
    lede: '[도입 2–3문장 — 어떤 문서를 대상으로 한 노트인지]',
    date: '2026.08.27',
    category: 'RAG · Notes',
    tags: ['RAG', 'Chunking', 'Retrieval'],
    sections: [
      {
        id: 'intro',
        title: '들어가며',
        blocks: [{ type: 'callout', label: 'TL;DR', text: '[결론 한두 문장]' }],
      },
      {
        id: 'criteria',
        title: '살펴본 기준',
        blocks: [
          {
            type: 'list',
            items: ['청크 길이 — [기준값과 이유]', '오버랩 — [기준값과 이유]', '문서 구조 — 제목·표·목록을 경계로 나눌지'],
          },
          { type: 'todo', todo: { label: 'To write — 비교', hint: '기준별로 검색 결과가 어떻게 달라졌는지, 예시 질의와 함께.' } },
        ],
      },
    ],
  },
];

/** 최신순 */
export function getArticles() {
  return [...articles].sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

/** 최신순 목록 기준 바로 앞(newer) · 뒤(older) 글 */
export function getAdjacentArticles(slug: string) {
  const list = getArticles();
  const i = list.findIndex((a) => a.slug === slug);
  return { newer: list[i - 1], older: list[i + 1] };
}

const collectText = (v: unknown): string =>
  typeof v === 'string'
    ? v
    : Array.isArray(v)
      ? v.map(collectText).join(' ')
      : v && typeof v === 'object'
        ? Object.values(v).map(collectText).join(' ')
        : '';

/** 본문 글자 수 기준 대략적인 읽기 시간 (분당 500자) */
export function readingMinutes(article: Article) {
  return Math.max(1, Math.round(collectText(article.sections).length / 500));
}
