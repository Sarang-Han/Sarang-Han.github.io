import type { ExternalLinks, Fact, NavItem } from './types';

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

export const links: ExternalLinks = {
  email: null, // 'name@example.com'
  github: null, // 'https://github.com/username'
  blog: null,
  resume: null, // '/resume.pdf' — public/ 폴더에 넣으면 됨
};

export const nav: NavItem[] = [
  { id: 'home', label: 'Home', n: '01' },
  { id: 'about', label: 'About', n: '02' },
  { id: 'projects', label: 'Projects', n: '03' },
  { id: 'experience', label: 'Experience', n: '04' },
  { id: 'contact', label: 'Contact', n: '06' },
];

export const hero = {
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
  strengths: [
    {
      key: 'A',
      title: 'AI Engineering',
      body: '검색·임베딩·LLM을 하나의 응답 파이프라인으로 설계하고 구현합니다.',
      evidence: { label: 'Buddybot', href: '/projects/buddybot' },
    },
    {
      key: 'B',
      title: 'Problem Solving',
      body: '문제를 먼저 정의하고, 제약 안에서 기술을 고르고, 동작하는 형태까지 배포합니다.',
      evidence: { label: 'Engineering decisions', href: '/projects/buddybot#s6' },
    },
    {
      key: 'C',
      title: 'Product Thinking',
      body: '모델의 동작을 사용자가 겪는 대화 경험과 제품 구조로 번역합니다.',
      evidence: { label: 'AI Character Chat', href: '/projects/ai-character-chat' },
    },
  ],
};

export const about = {
  heading: '모델 자체보다,\n모델이 쓰이는\n시스템에 관심이 있습니다.',
  intro: {
    label: 'To write — 자기소개',
    hint: '2–3문장. AI를 시작하게 된 구체적 계기, 지금 붙잡고 있는 기술적 질문, 일하는 방식을 사실 중심으로 적습니다.',
  },
  interests: [
    { title: 'Large Language Models', desc: '프롬프트·컨텍스트 구성과 대화 시스템에서의 LLM 동작' },
    { title: 'Retrieval-Augmented Generation', desc: 'Dense·Sparse 검색을 결합한 근거 기반 응답 생성' },
    { title: 'AI Application Development', desc: '모델을 실제로 호출·배포 가능한 애플리케이션으로 만드는 일' },
    { title: 'Backend Engineering', desc: 'API 설계, 서비스 구성, 컨테이너 기반 배포' },
    { title: 'AI Product Architecture', desc: 'AI 기능을 제품의 구조와 사용자 흐름 안에 배치하는 설계' },
  ],
  cards: [
    { label: 'Education', title: '인공지능 석사 과정', org: '[대학원명]', period: '[YYYY.MM — YYYY.MM]' },
    {
      label: 'Currently',
      title: 'AI Product / System Planning',
      org: 'Early-stage AI Startup',
      period: '[YYYY.MM — 현재]',
    },
  ],
};

export const contact = {
  headline: "Let's build something meaningful",
  body: 'AI 기술을 활용해 실제 문제를 해결하는 일에 관심이 있습니다.',
  rows: [
    { label: 'Email', key: 'email', placeholder: '[name@example.com]', display: (v: string) => v },
    { label: 'GitHub', key: 'github', placeholder: '[github.com/username]', display: (v: string) => v.replace(/^https?:\/\//, '') },
    { label: 'Technical Blog', key: 'blog', placeholder: '[blog URL]', display: (v: string) => v.replace(/^https?:\/\//, '') },
    { label: 'Resume', key: 'resume', placeholder: 'Resume PDF [PDF 링크]', display: () => 'Resume PDF' },
  ] as const,
};
