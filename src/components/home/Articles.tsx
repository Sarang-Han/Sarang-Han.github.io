import { getArticles, readingMinutes } from '@/content/articles';
import { Container, Label } from '@/components/ui/primitives';
import { ArticleList } from './ArticleList';

export function Articles() {
  const articles = getArticles();
  return (
    <section id="articles" className="border-b border-line py-32">
      <Container>
        <div className="fade mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Label className="mb-5">(03) — Articles</Label>
            <h2 className="m-0 text-[clamp(40px,5vw,72px)] leading-none font-medium tracking-[-0.04em]">Writing</h2>
          </div>
          <p className="m-0 font-pixel text-pixel text-mute">
            {String(articles.length).padStart(2, '0')} articles — tech notes
          </p>
        </div>

        <div className="fade">
          <ArticleList
            items={articles.map((a) => ({
              slug: a.slug,
              title: a.title,
              summary: a.summary,
              date: a.date,
              tags: a.tags,
              minutes: readingMinutes(a),
            }))}
          />
        </div>
      </Container>
    </section>
  );
}
