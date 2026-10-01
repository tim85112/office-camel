import React from 'react';
import { PARTNER_CATEGORIES, type Partner } from '../constants';
import Reveal from './Reveal';

/** 每秒跑幾個 px。所有排共用同一個速度，否則店家多的那排看起來會比較快。 */
const SPEED_PX_PER_SEC = 34;
/** 一格的寬 + 間距，要跟下面 className 的 w-28/gap-3 對得上 */
const TILE_PITCH = 112 + 12;
/** 容器最寬就是 max-w-6xl 的 1152px。一排的內容若沒超過它，
 *  用來接回原點的那份複製品會跟本尊同時出現在畫面上 —— 就會看到同一家店出現兩次。
 *  1152 / 124 ≈ 9.3，所以一排至少要 10 家。分類直接當排用會有三類不夠，因此改成混排。 */
const ROWS = 3;

const ALL: Partner[] = PARTNER_CATEGORIES.flatMap((c) => c.partners);

/** 輪流發牌，讓每一排都混到各種類型，不會整排都是飲料店 */
const ROW_ITEMS: Partner[][] = Array.from({ length: ROWS }, (_, r) =>
  ALL.filter((_, i) => i % ROWS === r),
);

const Tile: React.FC<{ partner: Partner; duplicate: boolean }> = ({ partner, duplicate }) => (
  <div
    /* 複製出來那一份只是為了讓跑馬燈接得上，不要讓讀螢幕軟體唸兩次 */
    aria-hidden={duplicate || undefined}
    title={partner.name}
    className="aspect-square w-28 flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-yellow"
  >
    {partner.logo ? (
      <img
        src={partner.logo}
        alt={duplicate ? '' : partner.name}
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
);

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-20 md:py-24 bg-brand-beige/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand-red">BRAND WALL</p>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">精選合作夥伴</h2>
            <p className="text-lg text-gray-600">從巷弄小店到連鎖品牌，50 家以上台中餐廳，每天換菜單。</p>
          </div>
        </Reveal>

        {/* 分類改成一條摘要列 —— 排數由「要幾家才不會看到重複」決定，不由分類決定 */}
        <Reveal delay={60}>
          <ul className="mb-8 flex flex-wrap items-center justify-center gap-2.5">
            {PARTNER_CATEGORIES.map((category) => (
              <li
                key={category.label}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-dark shadow-sm ring-1 ring-gray-100"
              >
                <category.icon className="h-4 w-4 text-brand-red" />
                {category.label}
                <span className="text-gray-400">{category.partners.length}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="space-y-3">
          {ROW_ITEMS.map((items, idx) => {
            const duration = (items.length * TILE_PITCH) / SPEED_PX_PER_SEC;
            return (
              <Reveal key={idx} delay={idx * 80}>
                {/*
                  左右用 mask 淡出，不用漸層色塊蓋 —— 這樣不必跟區塊底色對齊。
                  關掉動畫偏好時改成可以自己橫向捲，不會有人看不到後半排。
                */}
                <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
                  <ul
                    style={{
                      animationDuration: `${duration}s`,
                      animationDirection: idx % 2 ? 'reverse' : 'normal',
                    }}
                    className="flex w-max gap-3 animate-marquee group-hover/row:[animation-play-state:paused] motion-reduce:animate-none"
                  >
                    {items.map((partner) => (
                      <li key={partner.name}>
                        <Tile partner={partner} duplicate={false} />
                      </li>
                    ))}
                    {items.map((partner) => (
                      <li key={partner.name + '-dup'}>
                        <Tile partner={partner} duplicate />
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
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
