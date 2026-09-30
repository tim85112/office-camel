import React from 'react';
import { PARTNER_CATEGORIES } from '../constants';
import Reveal from './Reveal';

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-20 md:py-24 bg-brand-beige/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="mb-12 text-center md:mb-14">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand-red">BRAND WALL</p>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">精選合作夥伴</h2>
            <p className="text-lg text-gray-600">從巷弄小店到連鎖品牌，50 家以上台中餐廳，每天換菜單。</p>
          </div>
        </Reveal>

        <div className="space-y-10">
          {PARTNER_CATEGORIES.map((category, idx) => (
            <Reveal key={category.label} delay={idx * 70}>
              <div>
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100">
                    <category.icon className="h-4 w-4 text-brand-red" />
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{category.label}</h3>
                  <span className="text-sm text-gray-400">{category.partners.length}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {category.partners.map((partner) => (
                    <div
                      key={partner.name}
                      title={partner.name}
                      className="aspect-square overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-yellow"
                    >
                      {partner.logo ? (
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          loading="lazy"
                          decoding="async"
                          /* 自帶底色的圖填滿整格，乾淨標誌置中留白 —— 這是整面牆看起來整齊的關鍵 */
                          className={
                            partner.fit === 'cover'
                              ? 'h-full w-full object-cover'
                              : 'h-full w-full object-contain p-3'
                          }
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-brand-beige/50 p-2 text-center text-xs font-bold leading-tight text-brand-dark/70">
                          {partner.name}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="relative mt-16 flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-brand-dark p-8 text-center md:flex-row md:p-12 md:text-left">
            <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"></div>
            <div className="relative z-10 mb-8 md:mb-0">
              <h3 className="mb-2 text-2xl font-bold text-white">您也是餐廳老闆嗎？</h3>
              <p className="text-gray-400">加入商辦駝獸，立即解決外送人力與抽成問題。</p>
            </div>
            <div className="relative z-10">
              <a
                href="https://lin.ee/W9liNZZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-brand-yellow px-8 py-3 font-bold text-brand-dark shadow-lg transition-colors hover:bg-yellow-400"
              >
                免費申請合作
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Partners;
