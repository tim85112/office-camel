import { Utensils, Soup, Salad, Sandwich, CupSoda, Truck, DollarSign, Clock, ShieldCheck } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const LINKS = {
  consumerLine: "https://lin.ee/CAkrvvv",
  restaurantLine: "https://lin.ee/W9liNZZ",
  logisticsLine: "https://lin.ee/MrkTwKS",
  buildingIntakeApi: "https://cowork-admin-mu.vercel.app/api/public/building-intake",
  buildingWishesApi: "https://cowork-admin-mu.vercel.app/api/public/building-wishes",
};

export const CONTACTS = [
  {
    name: "Ivan Lee",
    phone: "0938-089609",
    line: "https://line.me/ti/p/DyoGGgwKTv"
  },
  {
    name: "Chiu",
    phone: "0978-521989",
    line: "https://line.me/ti/p/UInmpX-4TS"
  }
];

export interface Partner {
  name: string;
  logo?: string;
  /** 自帶底色的圖直接填滿整格（cover），乾淨標誌置中留白（contain）。
   *  這是整面牆看起來整齊的關鍵，不是縮放能解決的。 */
  fit?: 'cover' | 'contain';
}

export interface PartnerCategory {
  label: string;
  icon: LucideIcon;
  partners: Partner[];
}

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    label: '便當・飯食',
    icon: Utensils,
    partners: [
      { name: '一粒麥子陳傳盛爌肉飯', logo: '/logos/p08.webp', fit: 'contain' },
      { name: '鹿港洪爌肉飯', logo: '/logos/p18.webp', fit: 'cover' },
      { name: '上舫港式燒臘', logo: '/logos/p15.webp', fit: 'contain' },
      { name: '昇牛肉飯', logo: '/logos/p16.webp', fit: 'cover' },
      { name: '本便當', logo: '/logos/p19.webp', fit: 'contain' },
      { name: '叁時叁便當', logo: '/logos/p32.webp', fit: 'cover' },
      { name: '炒飯超人', logo: '/logos/p26.webp', fit: 'cover' },
      { name: '九菜盒子', logo: '/logos/p14.webp', fit: 'contain' },
      { name: '自慢嗑旅', logo: '/logos/p31.webp', fit: 'cover' },
      { name: '無限好油飯' },
      { name: '意品香佛跳牆' },
    ],
  },
  {
    label: '麵食・湯品',
    icon: Soup,
    partners: [
      { name: '湘春家鍋燒意麵', logo: '/logos/p01.webp', fit: 'cover' },
      { name: '麵涼涼麵', logo: '/logos/p22.webp', fit: 'cover' },
      { name: '澎發號小卷米粉', logo: '/logos/p24.webp', fit: 'contain' },
      { name: '三分味牛肉麵' },
      { name: '糊塗麵' },
    ],
  },
  {
    label: '健康餐盒',
    icon: Salad,
    partners: [
      { name: '蛋白盒子', logo: '/logos/p07.webp', fit: 'contain' },
      { name: '簡簡JianJian健康餐盒', logo: '/logos/p29.webp', fit: 'cover' },
      { name: '隨主飡法式水煮', logo: '/logos/p12.webp', fit: 'contain' },
      { name: '食見生活', logo: '/logos/p05.webp', fit: 'contain' },
      { name: '日青優格', logo: '/logos/p23.webp', fit: 'contain' },
      { name: '發居齋素食' },
    ],
  },
  {
    label: '異國・早午餐',
    icon: Sandwich,
    partners: [
      { name: '8私廚小餐館', logo: '/logos/p04.webp', fit: 'cover' },
      { name: 'OKKO義式小館', logo: '/logos/p10.webp', fit: 'cover' },
      { name: '裡好早午餐', logo: '/logos/p28.webp', fit: 'cover' },
      { name: '吐司男', logo: '/logos/p21.webp', fit: 'cover' },
      { name: 'Le Walthert 瑞士乾酪', logo: '/logos/p30.webp', fit: 'cover' },
      { name: '丰樂食堂', logo: '/logos/p02.webp', fit: 'contain' },
    ],
  },
  {
    label: '咖啡・手搖',
    icon: CupSoda,
    partners: [
      { name: '迷客夏', logo: '/logos/p03.webp', fit: 'contain' },
      { name: 'Mr.Wish', logo: '/logos/p25.webp', fit: 'cover' },
      { name: '青序智茶', logo: '/logos/p06.webp', fit: 'cover' },
      { name: "TEA'S原味", logo: '/logos/p09.webp', fit: 'cover' },
      { name: '丘森茶室', logo: '/logos/p20.webp', fit: 'cover' },
      { name: '耶濃搖滾豆漿', logo: '/logos/p17.webp', fit: 'contain' },
      { name: 'WAYMAKER COFFEE', logo: '/logos/p11.webp', fit: 'cover' },
      { name: 'Gatewell Coffee Roasters', logo: '/logos/p13.webp', fit: 'contain' },
      { name: '芮可咖啡', logo: '/logos/p27.webp', fit: 'contain' },
      { name: '麻古' },
    ],
  },
];

export const COMPARISON_DATA = [
  {
    feature: "餐點價格",
    traditional: "遠高於店內價",
    beast: "店內價 (省荷包)",
    icon: DollarSign,
  },
  {
    feature: "運費門檻",
    traditional: "平台費＋運費",
    beast: "1人即免運",
    icon: Truck,
  },
  {
    feature: "配送品質",
    traditional: "外送員隨機、易冷掉",
    beast: "高等保溫箱、準時抵達！",
    icon: ShieldCheck,
  },
  {
    feature: "訂餐流程",
    traditional: "揪團、找零錢、算人頭",
    beast: "個人點餐、電子支付",
    icon: Clock,
  },
];

/* ---- 大樓清單：/buildings 與首頁「已進駐大樓」名條共用同一份 ---- */

export type District = '市政中心' | '台灣大道' | '捷運文心';

export const DISTRICTS: { id: District; name: string; desc: string }[] = [
    { id: '市政中心', name: '【七期市政中心】', desc: '西屯/南屯核心' },
    { id: '台灣大道', name: '【台灣大道廊道】', desc: '西區/北區金融區' },
    { id: '捷運文心', name: '【捷運文心軸線】', desc: '北屯/南屯發展區' }
];

export interface Building {
    name: string;
    status: 'opened' | 'developing';
    slug?: string;
    lineUrl?: string;
    note?: string;
}

export const BUILDINGS: Record<District, Building[]> = {
    '市政中心': [
        { name: '凱基人壽市政大樓', status: 'opened', lineUrl: 'https://lin.ee/uTQG4LH', note: '持續配送中' },
        { name: '順天經貿廣場 (STTC)', status: 'opened', lineUrl: 'https://lin.ee/ZP3h0Xp', note: '持續配送中' },
        { name: '中國信託銀行－市政分行', status: 'opened', lineUrl: 'https://lin.ee/NeUeKvn', note: '近期正式啟用' },
        { name: '誠品生活480', status: 'opened', lineUrl: 'https://lin.ee/w4bJSYj', note: '近期正式啟用' },
        { name: '興富發鼎盛 BHW', slug: 'hfh-dingsheng-bhw', status: 'developing' },
        { name: 'W 國際商務中心－七期旗艦館', slug: 'w-international-qiqi', status: 'developing' },
        { name: 'NTC 國家商貿中心', slug: 'ntc-national-trade', status: 'developing' },
        { name: 'CBD 時代廣場', slug: 'cbd-times-square', status: 'developing' },
        { name: '臺中銀行總行大樓', slug: 'taichung-bank-headquarters', status: 'developing' },
        { name: '豐邑市政都心廣場', slug: 'fongyi-civic-center', status: 'developing' },
        { name: 'TOP1 環球經貿中心', slug: 'top1-global-trade', status: 'developing' },
        { name: '聯聚中雍大廈', slug: 'lianju-zhongyong', status: 'developing' },
    ],
    '台灣大道': [
        { name: '龍邦世貿', status: 'developing' },
        { name: '中港通商', status: 'developing' },
        { name: '亞太雲端', status: 'developing' },
        { name: '世紀金龍', status: 'developing' },
        { name: '遠東金融', status: 'developing' },
    ],
    '捷運文心': [
        { name: '環球企業巨星', status: 'developing' },
        { name: '生產力大樓', status: 'developing' },
        { name: '龍觀天下', status: 'developing' },
        { name: '宏全世界廣場', status: 'developing' },
    ]
};

export * from './siteContent';
export * from './routes';
