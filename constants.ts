import { Utensils, Soup, Salad, Sandwich, CupSoda, Truck, DollarSign, Clock, ShieldCheck, Box } from 'lucide-react';
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

export const B_SIDE_BENEFITS = [
  {
    title: "預約制產能優化",
    description: "不壓縮現場客量，產能利用最大化。\n提前接單，從容備餐。",
    icon: Clock,
  },
  {
    title: "單筆大宗穩單",
    description: "一單即數十份，大幅提升出餐效率。\n不再為了一碗麵跑一趟。",
    icon: Box,
  },
  {
    title: "免三費",
    description: "免上架費、免月租、免機器費。\n用 Line 即可接單，利潤回歸店家。",
    icon: DollarSign,
  },
  {
    title: "客訴我來扛",
    description: "餐點瑕疵、漏送由平台先行補償，無耗時處理抱怨，專注做菜即可。",
    icon: ShieldCheck,
  },
];
