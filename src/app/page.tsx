import { SiteHeader } from '@/components/home/SiteHeader';
import { About } from '@/components/home/About';
import { Projects } from '@/components/home/Projects';
import { Articles } from '@/components/home/Articles';
import { Experience } from '@/components/home/Experience';
import { Contact, SiteFooter } from '@/components/home/Contact';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <About />
        <Projects />
        <Articles />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
