import { cn } from './primitives';

/** 픽셀 스프라이트 — 한 줄이 한 행, `#`이 칠해지는 픽셀 */
export type Sprite = readonly string[];

/**
 * 스프라이트를 crisp한 SVG로 렌더링. 기본 1픽셀 = 1px.
 * 흐려지지 않도록 scale은 정수로 쓰세요.
 */
export function PixelIcon({ sprite, scale = 1, className }: { sprite: Sprite; scale?: number; className?: string }) {
  const w = sprite[0].length;
  const h = sprite.length;
  // 행마다 연속된 `#` 구간을 사각형 하나로 합침
  let d = '';
  sprite.forEach((row, y) => {
    for (const m of row.matchAll(/#+/g)) d += `M${m.index} ${y}h${m[0].length}v1h-${m[0].length}z`;
  });
  return (
    <svg
      aria-hidden="true"
      width={w * scale}
      height={h * scale}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      fill="currentColor"
      className={cn('shrink-0', className)}
    >
      <path d={d} />
    </svg>
  );
}

/** 로고 마크 — 사랑 */
export const heart: Sprite = [
  '.##.##.',
  '#######',
  '#######',
  '.#####.',
  '..###..',
  '...#...',
];

/** 메뉴 선택 커서 */
export const cursor: Sprite = [
  '#..',
  '##.',
  '###',
  '##.',
  '#..',
];

/** 복사 */
export const copy: Sprite = [
  '..######',
  '..#....#',
  '######.#',
  '#....#.#',
  '#....#.#',
  '#....###',
  '#....#..',
  '######..',
];

/** 완료 */
export const check: Sprite = [
  '........',
  '......##',
  '.....##.',
  '#...##..',
  '##.##...',
  '.###....',
  '..#.....',
  '........',
];
