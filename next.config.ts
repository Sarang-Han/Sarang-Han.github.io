import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // GitHub Pages는 정적 파일만 서빙 — `npm run build` 결과가 out/에 생성됨
  output: 'export',
  // /projects/buddybot → /projects/buddybot/index.html (정적 호스팅에서 경로가 안정적)
  trailingSlash: true,
};

export default nextConfig;
