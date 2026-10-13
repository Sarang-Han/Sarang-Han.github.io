import type { ExternalLinks, Fact, NavItem, StackGroup } from './types';

export const site = {
  name: 'Han Sarang',
  nameKo: '한사랑',
  role: 'Junior AI Engineer',
  identity: 'AI Engineer & Product Builder',
  /** TODO: 배포 도메인으로 교체 (metadataBase, sitemap에 사용) */
  url: 'https://example.com',
  description:
    'AI 엔지니어 한사랑의 포트폴리오',
  /** true면 `[...]` 플레이스홀더를 파란 하이라이트로 표시. 공개 전 false로. */
  highlightPlaceholders: true,
  lastUpdated: '[YYYY.MM.DD]',
} as const;

/** null인 항목은 Contact에서 숨겨짐 */
export const links: ExternalLinks = {
  email: 'hangpfm0518@ewhain.net',
  github: 'https://github.com/Sarang-Han',
  resume: null, // '/resume.pdf' — public/ 폴더에 넣으면 Contact에 나타남
};

export const nav: NavItem[] = [
  { id: 'about', label: 'About', n: '01' },
  { id: 'projects', label: 'Projects', n: '02' },
  { id: 'experience', label: 'Experience', n: '03' },
  { id: 'contact', label: 'Contact', n: '04' },
];

export const about = {
  /** `{...}` 구간은 픽셀 폰트로 렌더링 */
  headline: ['Building AI that', 'works in the real world'],
  tagline: 'LLM과 AI 기술을 실제 사용자가 경험하는 서비스로 연결하는 주니어 개발자입니다.',
  intro:
    '하이브리드 검색 기반 RAG 챗봇을 직접 설계·배포했고, 초기 AI 스타트업에서 LLM 대화 시스템의 제품·시스템 기획을 맡고 있습니다.',
  facts: [
    { label: 'Role', value: 'Junior AI Engineer' },
    { label: 'Focus', value: 'LLM · RAG · Backend · AI Product' },
    { label: 'Now', value: 'AI Product / System Planning', sub: 'Early-stage AI Startup' },
    { label: 'Study', value: 'M.S. Artificial Intelligence', sub: '[대학원명 · 기간]' },
  ] satisfies Fact[],
  stack: [
    { domain: 'Languages', icon: 'code', items: ['Python', 'TypeScript'] },
    { domain: 'AI / ML', icon: 'ai', items: ['LLM Applications', 'RAG', 'LangChain', 'SentenceTransformers'] },
    { domain: 'Backend', icon: 'server', items: ['FastAPI', 'Uvicorn'] },
    { domain: 'Retrieval / DB', icon: 'db', items: ['ChromaDB', 'BM25'] },
    { domain: 'Frontend', icon: 'ui', items: ['Next.js'] },
    { domain: 'Infrastructure', icon: 'cloud', items: ['Docker', 'Hugging Face Spaces', 'Vercel'] },
  ] satisfies StackGroup[],
};

export const contact = {
  /** action — copy: 클릭 시 값 복사 · link: 새 탭으로 열기 · download: 파일 링크 */
  rows: [
    { label: 'Email', key: 'email', action: 'copy', display: (v: string) => v },
    { label: 'GitHub', key: 'github', action: 'link', display: (v: string) => v.replace(/^https?:\/\//, '') },
    { label: 'Resume', key: 'resume', action: 'download', display: () => 'Resume PDF' },
  ] as const,
};
