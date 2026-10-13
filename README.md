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
    layout.tsx               폰트(Geist, Geist Mono, Geist Pixel, IBM Plex Sans KR, Galmuri11) · 메타데이터
    icon.svg                 파비콘 (픽셀 하트)
    page.tsx                 홈
    not-found.tsx            404 (* But nobody came.)
    projects/[slug]/page.tsx 케이스 스터디 (generateStaticParams로 정적 생성)
    articles/[slug]/page.tsx 아티클 (테크 블로그 글, 정적 생성)
    sitemap.ts
    opengraph-image.tsx      링크 공유 미리보기 이미지 (빌드 시 site.ts 내용으로 생성)
    globals.css              디자인 토큰(@theme) · 공용 클래스 · 모션
  content/                   ← 텍스트는 전부 여기서 수정
    types.ts                 콘텐츠 타입
    site.ts                  이름 · 링크 · About · Contact · 내비
    projects.ts              프로젝트 카드 + 케이스 스터디 섹션/블록
    articles.ts              아티클 목록 + 본문 섹션/블록 · 정렬 · 읽기 시간
    experience.ts            경력 타임라인
  components/
    home/                    홈 섹션 (client: SiteHeader 스크롤 스파이 · 모바일 메뉴창, ArticleList 페이지네이션)
    case-study/              CaseStudy 템플릿 + Blocks (블록 렌더러 — 아티클과 공유)
    article/                 ArticleView 템플릿 (목차 + 한 열 본문)
    diagrams/                카드 미리보기 · 아키텍처 다이어그램
    ui/primitives.tsx        Container, Grid, Label, Chip, Rich, PixelWords, TodoBlock, Arrow
    ui/pixel.tsx             PixelIcon (ASCII 스프라이트 → SVG) · 아이콘 스프라이트
    ui/CopyButton.tsx        클릭 시 클립보드 복사 (client)
    ui/Dialogue.tsx          Undertale식 대화창 — `* ` 줄 타이핑 (client)
    ui/game.tsx              SoulCursor (hover 하트 커서) · BattleButton (굵은 픽셀 라벨 · 하드 섀도 · 선택 시 아이콘 → 하트)
    ui/PageHeader.tsx        서브 페이지 상단 바 (뒤로 가기 + 보조 정보)
```

## 콘텐츠 편집 규칙

- 문자열 안의 `[...]`는 **작성 필요 플레이스홀더**로 자동 렌더링됩니다(`<Rich>`).
  확정되면 대괄호를 지우세요. 남은 항목 찾기: `grep -rn "\[" src/content`
- 같은 `<Rich>`에서 `[텍스트](URL)`은 링크(`/`로 시작하면 내부 링크), 백틱 구간은 인라인 코드가 됩니다.
- 헤드라인 문자열 안의 `{...}`는 픽셀 폰트로 렌더링됩니다(`<PixelWords>`, 예: `'Building {AI} that'`).
- 링크는 `src/content/site.ts`의 `links`, 프로젝트별 `links`에서 `null` → URL로 바꾸면 실제 링크가 됩니다.
  Contact 목록은 `null`인 항목을 숨깁니다(예: `resume`에 `'/resume.pdf'`를 넣으면 Resume 행이 나타남).
  각 행의 `action`으로 동작을 정합니다: `copy`(클릭 시 복사) · `link`(새 탭) · `download`.
- 공개 전 `site.highlightPlaceholders`를 `false`로, `site.url`을 실제 도메인으로.
- Path(`experience.ts`) 항목은 `hidden: true`면 데이터는 남기고 화면에서만 숨깁니다(현재 대학원 항목 — 입학 후 해제).
- 케이스 스터디·아티클 섹션은 `sections[].blocks` 배열로 구성됩니다. 블록 타입:
  `prose · todo · todoGrid · columns · diagram · stackTable · decisions · challenges · areas`
  `heading · list · code · callout` (주로 아티클용 — 소제목, 목록, 코드 블록, TL;DR·노트 박스)
  새 블록이 필요하면 `types.ts`의 `Block` 유니온과 `case-study/Blocks.tsx`의 switch에 추가하세요.
- 새 프로젝트: `projects.ts`에 객체 추가 → 홈 카드와 `/projects/<slug>` 페이지가 함께 생깁니다.
  미리보기·다이어그램은 `components/diagrams`에 컴포넌트를 만들고 `previews` / `diagrams` 맵에 등록.
- 새 아티클: `articles.ts`에 객체 추가 → 홈 Articles 섹션 목록과 `/articles/<slug>` 페이지가 함께 생깁니다.
  목록은 5개를 넘으면 하단 페이지네이션으로 넘어갑니다(`home/Articles.tsx`의 `<ArticleList perPage>`로 조정).
  `date`(`YYYY.MM.DD`) 기준 최신순으로 정렬되고, 읽기 시간은 본문 글자 수로 자동 계산됩니다.

## 디자인 토큰 (globals.css `@theme`)

| token | value | Tailwind |
|---|---|---|
| bg | `#FAFAF8` | `bg-bg` |
| fg | `#171717` | `text-fg` |
| mute | `#737373` | `text-mute` |
| accent | `#3455D1` | `text-accent` |
| line | `#E8E8E5` | `border-line` |
| font-pixel | Geist Pixel Square | `font-pixel` |
| text-pixel | `13.158px` / 자간 1px | `text-pixel` |
| text-pixel-md | `19.737px` (1픽셀 = 1.5px) | `text-pixel-md` |
| font-dialogue | Galmuri11 (400 대화창 · 700 버튼) → Plex KR | `font-dialogue` |
| save | `#EEB000` (세이브 포인트 별) | `text-save` |
| shadow-px | `2px 2px 0` line-strong | `shadow-px` |
| ease-pixel | `steps(3)` | `ease-pixel` |

### 8-bit 디테일

- **타이포**: 본문·제목은 Geist Sans, 레이블·번호·화살표만 Geist Pixel. 작은 픽셀 텍스트는 `text-pixel`
  (폰트의 1픽셀 = 정확히 1px)로 써야 획이 뭉개지지 않습니다. Geist Pixel엔 한글이 없어 Plex KR로 폴백.
- **모서리**: `rounded-*`는 `corner-shape: notch`로 한 칸 계단 모서리가 됩니다. 미지원 브라우저는 직각.
  `rounded-full`은 쓰지 않습니다.
- **아이콘**: `PixelIcon`에 `#`/`.` 문자열 배열을 넘기면 crisp SVG로 렌더링. `scale`은 정수만.
- **모션**: 큰 등장 모션은 부드럽게, hover·밑줄·내비 표시줄 같은 마이크로 인터랙션만 `steps()`로 끊어서.

### Undertale 디테일 (과하지 않게)

밝은 미니멀 화면은 그대로 두고, 게임 UI는 아래 몇 곳에만 씁니다.

- **SOUL**: 로고 하트 = 파란 SOUL. 선택 커서로 쓰임 — 내비 현재 섹션, 리스트 hover(`SoulCursor`),
  버튼 hover·키보드 포커스(`BattleButton`).
- **대화창**: 히어로 소개문(`Dialogue`). 첫 줄은 처음부터 보이고(`instantLines`) 둘째 줄부터 타이핑.
  클릭하면 타이핑을 건너뜀, `prefers-reduced-motion`이면 바로 전체 표시.
  한글까지 픽셀로 보이도록 [Galmuri11](https://github.com/quiple/galmuri)(OFL-1.1)을 씁니다 — 12px 배수에서 선명해서 18px.
  폰트가 504KB라 `preload: false`로 대화창이 있는 페이지에서만 로드됩니다.
- **HUD**: `LV · HP` 한 줄(`site.ts`의 `about.status`).
- **모바일 메뉴**: 768px 미만에서 내비 대신 `MENU` 버튼 → 대화창 스타일 메뉴(현재 섹션에 SOUL). Esc · 바깥 탭으로 닫힘.
- **세이브 포인트**: 푸터 "Last saved"의 별.
- **404**: `* But nobody came.`

모션: `.reveal`(첫 로드), `.fade`(스크롤 연동, `animation-timeline` 지원 브라우저만), `prefers-reduced-motion`에서 모두 꺼짐.
