/**
 * 建置後，替每一個路由各產一份 HTML，把 title / description / canonical / og:url
 * 換成該頁自己的。
 *
 * 為什麼一定要靜態產，不能只在 React 裡換：
 *   LINE、Facebook 的連結預覽機器人不執行 JavaScript。只在前端改 og:*，
 *   分享 /faq 出去，對方看到的永遠是首頁的標題和描述。
 *   canonical 同理 —— 六頁都說自己是首頁，Google 會把其餘五頁丟掉。
 *
 * 順便產 sitemap.xml 與 llms.txt，讓路由清單只有 routes.ts 一份。
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ROUTES, INDEXABLE_PAGES, SITE_ORIGIN } from '../routes.ts';
import { FAQ_CATEGORIES } from '../siteContent.ts';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const TEMPLATE = join(DIST, 'index.html');

if (!existsSync(TEMPLATE)) {
  console.error('[prerender-meta] 找不到 dist/index.html，請先跑 vite build');
  process.exit(1);
}

const escapeAttr = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const template = readFileSync(TEMPLATE, 'utf8');

/** 把單一個 tag 的某個屬性值換掉；換不到就整支失敗，不要靜默產出錯的 meta */
function swap(html, pattern, replacement, label) {
  const hits = html.match(pattern);
  if (!hits || hits.length !== 1) {
    throw new Error(`[prerender-meta] ${label}: 預期命中 1 次，實際 ${hits ? hits.length : 0} 次`);
  }
  return html.replace(pattern, replacement);
}

function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '商辦駝獸',
    alternateName: 'Office Camel',
    url: SITE_ORIGIN + '/',
    logo: SITE_ORIGIN + '/icon-512.png',
    image: SITE_ORIGIN + '/og-image.jpg',
    description: ROUTES.home.description,
    areaServed: { '@type': 'City', name: '臺中市' },
  };
}

function faqLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
      })),
    ),
  };
}

function build(page) {
  const meta = ROUTES[page];
  const url = SITE_ORIGIN + (meta.path === '/' ? '/' : meta.path);
  const title = escapeAttr(meta.title);
  const desc = escapeAttr(meta.description);

  let html = template;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${meta.title}</title>`, 'title');
  html = swap(html, /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${desc}" />`, 'description');
  html = swap(html, /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`, 'canonical');
  html = swap(html, /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`, 'og:url');
  html = swap(html, /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${title}" />`, 'og:title');
  html = swap(html, /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${desc}" />`, 'og:description');
  html = swap(html, /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${title}" />`, 'twitter:title');
  html = swap(html, /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${desc}" />`, 'twitter:description');

  const blocks = [organizationLd()];
  if (page === 'faq') blocks.push(faqLd());
  const ld = blocks
    .map((b) => `  <script type="application/ld+json">${JSON.stringify(b)}</script>`)
    .join('\n');
  html = swap(html, /<\/head>/, `${ld}\n</head>`, '</head>');

  const file = page === 'home' ? 'index.html' : `${meta.path.replace(/^\//, '')}.html`;
  writeFileSync(join(DIST, file), html, 'utf8');
  return file;
}

const written = INDEXABLE_PAGES.map(build);

// 找不到頁面也產一份，Vercel 的 catch-all rewrite 會用到
const notFoundHtml = (() => {
  const meta = ROUTES.notFound;
  let html = template;
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${meta.title}</title>`, '404 title');
  html = swap(html, /<link rel="canonical" href="[^"]*" \/>/,
    '<meta name="robots" content="noindex, follow" />', '404 canonical→noindex');
  return html;
})();
writeFileSync(join(DIST, '404.html'), notFoundHtml, 'utf8');

// ---------------------------------------------------------------- sitemap
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  INDEXABLE_PAGES.map((p) => {
    const m = ROUTES[p];
    return (
      `  <url>\n` +
      `    <loc>${SITE_ORIGIN}${m.path}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${p === 'home' ? 'weekly' : 'monthly'}</changefreq>\n` +
      `    <priority>${m.priority.toFixed(1)}</priority>\n` +
      `  </url>`
    );
  }).join('\n') +
  `\n</urlset>\n`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap, 'utf8');

// ---------------------------------------------------------------- llms.txt
const llms =
  `# 商辦駝獸 Office Camel\n\n` +
  `> 台中商辦大樓的午餐合單平台。員工用大樓專屬 LINE 官方帳號訂餐，` +
  `一個人就能點、免運費、免低消；平台自營物流，每天固定時段送到大樓 1F 指定取餐處，憑取餐碼取餐。\n\n` +
  `## 頁面\n\n` +
  INDEXABLE_PAGES.map((p) => `- [${ROUTES[p].title}](${SITE_ORIGIN}${ROUTES[p].path})：${ROUTES[p].description}`).join('\n') +
  `\n\n## 合作方式\n\n` +
  `- 公司／大樓管理處：零導入費用，1F 一張桌子即可導入，不需出人力。\n` +
  `- 餐廳：免上架費、免月租、免機器費，用 LINE 接單，每週五結算撥款。\n` +
  `- 配送夥伴：固定班表非搶單制，公司提供保溫設備，總路線 3～7 公里。\n`;
writeFileSync(join(DIST, 'llms.txt'), llms, 'utf8');

console.log(`[prerender-meta] HTML: ${written.join(', ')}, 404.html`);
console.log(`[prerender-meta] sitemap.xml ${INDEXABLE_PAGES.length} 筆（lastmod ${today}）、llms.txt`);
