# Han Sarang — Portfolio

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## 구조

```
src/
  app/
    layout.tsx               폰트(Geist, Geist Mono, IBM Plex Sans KR) · 메타데이터
    page.tsx                 홈
    projects/[slug]/page.tsx 케이스 스터디 (generateStaticParams로 정적 생성)
    sitemap.ts
    globals.css              디자인 토큰(@theme) · 공용 클래스 · 모션
  content/                   ← 텍스트는 전부 여기서 수정
    types.ts                 콘텐츠 타입
    site.ts                  이름 · 링크 · 히어로 · About · Contact · 내비
    projects.ts              프로젝트 카드 + 케이스 스터디 섹션/블록
    experience.ts            경력 타임라인 · 기술 스택
  components/
    home/                    홈 섹션 (SiteHeader만 client component — 스크롤 스파이)
    case-study/              CaseStudy 템플릿 + Blocks (블록 타입별 렌더러)
    diagrams/                카드 미리보기 · 아키텍처 다이어그램
    ui/primitives.tsx        Container, Grid, Label, Chip, Rich, TodoBlock, Arrow
```

## 콘텐츠 편집 규칙

- 문자열 안의 `[...]`는 **작성 필요 플레이스홀더**로 자동 렌더링됩니다(`<Rich>`).
  확정되면 대괄호를 지우세요. 남은 항목 찾기: `grep -rn "\[" src/content`
- 링크는 `src/content/site.ts`의 `links`, 프로젝트별 `links`에서 `null` → URL로 바꾸면 실제 링크가 됩니다.
- 공개 전 `site.highlightPlaceholders`를 `false`로, `site.url`을 실제 도메인으로.
- 케이스 스터디 섹션은 `sections[].blocks` 배열로 구성됩니다. 블록 타입:
  `prose · todo · todoGrid · columns · diagram · stackTable · decisions · challenges · areas`
  새 블록이 필요하면 `types.ts`의 `Block` 유니온과 `case-study/Blocks.tsx`의 switch에 추가하세요.
- 새 프로젝트: `projects.ts`에 객체 추가 → 홈 카드와 `/projects/<slug>` 페이지가 함께 생깁니다.
  미리보기·다이어그램은 `components/diagrams`에 컴포넌트를 만들고 `previews` / `diagrams` 맵에 등록.

## 디자인 토큰 (globals.css `@theme`)

| token | value | Tailwind |
|---|---|---|
| bg | `#FAFAF8` | `bg-bg` |
| fg | `#171717` | `text-fg` |
| mute | `#737373` | `text-mute` |
| accent | `#3455D1` | `text-accent` |
| line | `#E8E8E5` | `border-line` |

모션: `.reveal`(첫 로드), `.fade`(스크롤 연동, `animation-timeline` 지원 브라우저만), `prefers-reduced-motion`에서 모두 꺼짐.
