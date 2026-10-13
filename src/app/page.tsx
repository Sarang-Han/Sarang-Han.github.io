import { SiteHeader } from '@/components/home/SiteHeader';
import { About } from '@/components/home/About';
import { Projects } from '@/components/home/Projects';
import { Experience } from '@/components/home/Experience';
import { Contact, SiteFooter } from '@/components/home/Contact';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <About />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
