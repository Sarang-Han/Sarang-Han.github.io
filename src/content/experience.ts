import type { ExperienceEntry } from './types';

export const experience: ExperienceEntry[] = [
  {
    period: '[YYYY.MM — 현재]',
    kind: 'Industry',
    current: true,
    role: 'AI Product / System Planning',
    org: 'Early-stage AI Startup [회사명 공개 여부 결정]',
    listLabel: 'Responsibilities',
    list: [
      'LLM 기반 대화 시스템 기획',
      '캐릭터 컨텍스트 · 로어북 구조 설계',
      'AI 기능 기획 및 명세',
      '제품 시스템 아키텍처 정리',
      '엔지니어링 등 유관 직군과의 협업',
    ],
    technologies: ['LLM', '[도구·기술 입력]'],
    contributions: {
      label: 'To write — Key contributions',
      hint: '본인이 직접 정의·결정한 것 2–3가지. 회사 내부 지표나 비공개 정보는 제외하고, 산출물의 종류(정책 문서, 시스템 명세 등)와 결과를 적습니다.',
    },
  },
  {
    period: '[YYYY.MM — YYYY.MM]',
    kind: 'Education',
    current: false,
    role: "Master's Program — Artificial Intelligence",
    org: '[대학원명 · 학과]',
    listLabel: 'Research & Coursework',
    list: ['[연구 주제 또는 연구실]', '[주요 수강 과목]'],
    technologies: ['[도구·기술 입력]'],
    contributions: {
      label: 'To write — Key contributions',
      hint: '논문, 과제, 프로젝트 등 확인 가능한 결과물만 적습니다. (Buddybot이 과정 중 프로젝트라면 여기서 연결)',
    },
  },
];
