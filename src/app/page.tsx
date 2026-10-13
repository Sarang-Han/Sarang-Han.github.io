import { SiteHeader } from '@/components/home/SiteHeader';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Projects } from '@/components/home/Projects';
import { Experience } from '@/components/home/Experience';
import { Stack } from '@/components/home/Stack';
import { Contact, SiteFooter } from '@/components/home/Contact';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
