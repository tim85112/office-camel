import type { Page } from './types';

export const SITE_ORIGIN = 'https://office-camel.vercel.app';

export interface RouteMeta {
  path: string;
  /** <title>。首頁沿用原本那句，其餘統一「<頁名>｜商辦駝獸」 */
  title: string;
  /** meta description + og:description + twitter:description。
   *  這段是分享到 LINE 時真正被看到的字，LINE 的預覽機器人不跑 JS，
   *  所以一定要靜態寫進各自的 HTML，不能只在前端換。 */
  description: string;
  /** 進 sitemap 的優先度；notFound 不進 sitemap */
  priority?: number;
}

export const ROUTES: Record<Page, RouteMeta> = {
  home: {
    path: '/',
    title: '商辦駝獸｜商辦午餐 訂餐平台',
    description:
      '專為台中商辦大樓設計的合單撮合午餐平台。一人點餐、免運費、免低消。協助餐廳擴大產能、降低抽成。',
    priority: 1.0,
  },
  buildingSelection: {
    path: '/buildings',
    title: '查看大樓｜商辦駝獸',
    description:
      '查詢你的辦公大樓是否已開通商辦駝獸午餐配送。還沒開通的大樓可以按連署，讓我們知道那裡有需求。',
    priority: 0.9,
  },
  buildingIntake: {
    path: '/apply',
    title: '公司合作申請｜商辦駝獸',
    description:
      '想在自己的大樓開一個午餐入口？零導入費用、不佔大樓空間、不需要出人力。填表後兩個工作日內專人聯繫。',
    priority: 0.8,
  },
  faq: {
    path: '/faq',
    title: '常見問題｜商辦駝獸',
    description:
      '員工訂餐、公司與大樓導入、餐廳合作、配送夥伴——四大類常見問題一次答完。找不到答案可以直接加 LINE 問。',
    priority: 0.7,
  },
  privacy: {
    path: '/privacy',
    title: '隱私權政策｜商辦駝獸',
    description: '商辦駝獸如何蒐集、使用、分享與保護你的個人資料，以及你可以行使哪些權利。',
    priority: 0.3,
  },
  terms: {
    path: '/terms',
    title: '服務條款｜商辦駝獸',
    description: '使用商辦駝獸訂餐、配送與取餐服務的權利義務說明。',
    priority: 0.3,
  },
  notFound: {
    path: '/404',
    title: '找不到這個頁面｜商辦駝獸',
    description: '找不到這個頁面。',
  },
};

/** 會進 sitemap、也會在建置時各自產一份 HTML 的頁面 */
export const INDEXABLE_PAGES = (Object.keys(ROUTES) as Page[]).filter(
  (p) => ROUTES[p].priority !== undefined,
);

/** 網址 → 頁面。結尾多一條斜線不算找不到。 */
export const pathToPage = (pathname: string): Page => {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const hit = (Object.keys(ROUTES) as Page[]).find(
    (p) => ROUTES[p].path === clean && p !== 'notFound',
  );
  return hit ?? 'notFound';
};
