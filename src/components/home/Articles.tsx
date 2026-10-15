import { getArticles, readingMinutes } from '@/content/articles';
import { Container, Label } from '@/components/ui/primitives';
import { ArticleList } from './ArticleList';

export function Articles() {
  const articles = getArticles();
  return (
    <section id="articles" aria-labelledby="articles-title" className="section-space border-b border-line">
      <Container>
        <div className="section-heading fade">
          <div>
            <Label className="mb-5 flex items-center gap-3"><span className="section-marker">03</span> Articles</Label>
            <h2 id="articles-title" className="section-title">Field Notes<span className="px-dot">.</span></h2>
          </div>
          <p className="m-0 font-pixel text-[11px] tracking-wider text-mute">
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
