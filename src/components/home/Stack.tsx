import { stack } from '@/content/experience';
import type { StackGroup } from '@/content/types';
import { Container, Grid, Label, Rich } from '@/components/ui/primitives';
import { PixelIcon, type Sprite } from '@/components/ui/pixel';

/** 16×16 픽셀 아이콘 */
const ICONS: Record<StackGroup['icon'], Sprite> = {
  code: [
    '................',
    '................',
    '................',
    '................',
    '....#....#.#....',
    '...#.....#..#...',
    '..#.....#....#..',
    '.#......#.....#.',
    '.#.....#......#.',
    '..#....#.....#..',
    '...#..#.....#...',
    '....#.#....#....',
    '................',
    '................',
    '................',
    '................',
  ],
  ai: [
    '.....#.#.#......',
    '.....#.#.#......',
    '...#########....',
    '..#.........#...',
    '..#.........#...',
    '###.........###.',
    '..#...###...#...',
    '###...###...###.',
    '..#...###...#...',
    '###.........###.',
    '..#.........#...',
    '..#.........#...',
    '...#########....',
    '.....#.#.#......',
    '.....#.#.#......',
    '................',
  ],
  server: [
    '................',
    '................',
    '..############..',
    '.#............#.',
    '.#.##.........#.',
    '.#............#.',
    '..############..',
    '................',
    '................',
    '..############..',
    '.#............#.',
    '.#.##.........#.',
    '.#............#.',
    '..############..',
    '................',
    '................',
  ],
  db: [
    '................',
    '.....######.....',
    '...##......##...',
    '..#..........#..',
    '..###......###..',
    '..#..######..#..',
    '..#..........#..',
    '..#..........#..',
    '..##........##..',
    '..#.##....##.#..',
    '..#...####...#..',
    '..#..........#..',
    '..##........##..',
    '...##......##...',
    '.....######.....',
    '................',
  ],
  ui: [
    '................',
    '................',
    '..############..',
    '.#.#.#.#......#.',
    '.##############.',
    '.#............#.',
    '.#............#.',
    '.#.######.....#.',
    '.#............#.',
    '.#.####.......#.',
    '.#............#.',
    '.#............#.',
    '.#............#.',
    '..############..',
    '................',
    '................',
  ],
  cloud: [
    '................',
    '................',
    '................',
    '................',
    '......####......',
    '.....#....#.....',
    '..###......#....',
    '.#..........###.',
    '#..............#',
    '#..............#',
    '#..............#',
    '.#............#.',
    '..############..',
    '................',
    '................',
    '................',
  ],
};

export function Stack() {
  return (
    <section id="stack" className="border-b border-line py-32">
      <Container>
        <Grid className="fade mb-14 items-end">
          <div className="col-span-12 lg:col-span-6">
            <Label className="mb-5">(05) — Technical Stack</Label>
            <h2 className="m-0 text-[clamp(40px,5vw,72px)] leading-none font-medium tracking-[-0.04em]">Tools, by use</h2>
          </div>
          <p className="col-span-12 m-0 text-[15px] text-mute lg:col-span-5 lg:col-start-8">
            숙련도 막대 대신, 각 기술을 어느 프로젝트에서 어떤 역할로 썼는지로 표시합니다.
          </p>
        </Grid>

        <div className="fade border-t border-fg">
          <Grid className="hidden border-b border-line py-3 lg:grid">
            <Label as="span" className="col-span-3">Domain</Label>
            <Label as="span" className="col-span-4">Technology</Label>
            <Label as="span" className="col-span-5">Used in</Label>
          </Grid>

          {stack.map((g) => (
            <Grid key={g.domain} className="gap-y-3 border-b border-line py-[22px]">
              <div className="col-span-12 flex items-center gap-3 self-start lg:col-span-3">
                <span
                  aria-hidden="true"
                  className="inline-flex size-8 items-center justify-center rounded-md border border-line bg-white text-sub shadow-px"
                >
                  <PixelIcon sprite={ICONS[g.icon]} />
                </span>
                <span className="text-base font-medium">{g.domain}</span>
              </div>
              <ul className="col-span-12 m-0 flex list-none flex-col p-0 lg:col-span-9">
                {g.items.map((t) => (
                  <li key={t.name} className="grid grid-cols-1 gap-x-6 py-1 sm:grid-cols-9">
                    <span className="font-mono text-base sm:col-span-4">{t.name}</span>
                    <span className="text-[15px] sm:col-span-5">
                      <Rich text={t.use} />
                    </span>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </div>
      </Container>
    </section>
  );
}
