import React from 'react';
import { ArrowRight, Building2, Store, Truck } from 'lucide-react';
import { LINKS } from '../constants';
import type { Page } from '../types';
import Reveal from './Reveal';

interface RoleCardsProps {
  onNavigate: (page: Page) => void;
}

interface Role {
  eyebrow: string;
  title: string;
  icon: typeof Building2;
  image: string;
  alt: string;
  desc: string;
  points: string[];
  cta: string;
  /** 站內頁用 page，外部 LINE 用 href */
  page?: Page;
  href?: string;
}

const ROLES: Role[] = [
  {
    eyebrow: 'FOR OFFICE BUILDINGS',
    title: '我是公司／大樓管理處',
    icon: Building2,
    image: '/showcase/role-office.webp',
    alt: '辦公室同仁圍著木桌一起吃午餐餐盒',
    desc: '想在自己的大樓開一個午餐入口，又不想多請人、不想改空間。',
    points: ['零導入費用', '不佔大樓空間，1F 一張桌子就夠', '每天固定時間送達'],
    cta: '立即申請導入',
    page: 'buildingIntake',
  },
  {
    eyebrow: 'FOR RESTAURANTS',
    title: '我是餐廳老闆',
    icon: Store,
    image: '/showcase/role-restaurant.webp',
    alt: '餐廳老闆在出餐檯把餐盒裝進紙袋，旁邊排著一列打包好的袋子',
    desc: '想多一條商辦團膳的出貨線，又不想被高抽成和外送平台綁住。',
    points: ['免上架費、免月租、免機器費', '單筆大宗訂單，不用為一份餐跑一趟', '只要依取餐碼分袋', '我們派專人到店取餐'],
    cta: '加入合作餐廳',
    href: LINKS.restaurantLine,
  },
  {
    eyebrow: 'FOR DELIVERY PARTNERS',
    title: '我想加入配送',
    icon: Truck,
    image: '/showcase/role-delivery.webp',
    alt: '配送夥伴推著載有保溫箱的平台車經過商辦大樓電梯廳',
    desc: '中午一段時間的固定路線，不是搶單制。',
    points: ['固定班表，不用搶單', '公司提供保溫設備', '路線集中在同一區商辦', '高時薪 280 起'],
    cta: '了解配送夥伴',
    href: LINKS.logisticsLine,
  },
];

const ctaClass =
  'group/cta mt-auto flex w-full items-center justify-between border-t border-gray-100 pt-4 text-sm font-bold text-brand-red transition-colors hover:text-red-700';

const RoleCards: React.FC<RoleCardsProps> = ({ onNavigate }) => {
  return (
    <section id="roles" className="py-20 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="mb-12 text-center md:mb-14">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand-red">找到你的入口</p>
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">你是哪一種身分？</h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {ROLES.map((role, idx) => (
            <Reveal key={role.title} delay={idx * 110} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-48">
                  <img
                    src={role.image}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    alt={role.alt}
                    className="h-full w-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
                  <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-md">
                    <role.icon className="h-5 w-5 text-brand-red" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-[10px] font-bold tracking-[0.18em] text-white/75">{role.eyebrow}</p>
                    <h3 className="mt-1 text-xl font-bold text-white">{role.title}</h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="text-sm leading-relaxed text-gray-600">{role.desc}</p>
                  <ul className="mb-6 mt-5 space-y-2.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-gray-700">
                        <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-red"></span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {role.page ? (
                    <button type="button" onClick={() => onNavigate(role.page as Page)} className={ctaClass}>
                      {role.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                    </button>
                  ) : (
                    <a href={role.href} target="_blank" rel="noopener noreferrer" className={ctaClass}>
                      {role.cta}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
                    </a>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleCards;
