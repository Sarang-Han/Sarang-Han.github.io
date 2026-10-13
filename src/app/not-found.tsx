import type { Metadata } from 'next';
import { Dialogue } from '@/components/ui/Dialogue';
import { BattleButton } from '@/components/ui/game';
import { arrowLeft } from '@/components/ui/pixel';
import { Label } from '@/components/ui/primitives';

export const metadata: Metadata = { title: '404' };

export default function NotFound() {
  return (
    <main className="flex min-h-svh items-center justify-center px-5 py-24">
      <div className="w-full max-w-[560px]">
        <Label className="mb-4">404 — Not found</Label>
        <Dialogue lines={['But nobody came.']} delay={300} speed={60} />
        <div className="mt-8">
          <BattleButton href="/" icon={arrowLeft}>
            Return home
          </BattleButton>
        </div>
      </div>
    </main>
  );
}
