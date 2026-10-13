import type { MetadataRoute } from 'next';
import { articles } from '@/content/articles';
import { projects } from '@/content/projects';
import { site } from '@/content/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // trailingSlash: true에 맞춰 끝에 / (정적 호스팅에서 리다이렉트 없이 바로 열림)
    { url: `${site.url}/`, priority: 1 },
    ...projects.map((p) => ({ url: `${site.url}/projects/${p.slug}/`, priority: 0.8 })),
    ...articles.map((a) => ({ url: `${site.url}/articles/${a.slug}/`, priority: 0.6 })),
  ];
}
