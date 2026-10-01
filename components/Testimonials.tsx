import React from 'react';
import { Building2, MessageCircle } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '../constants';
import Reveal from './Reveal';

/**
 * 全部是會員主動傳進官方帳號的原話，逐字照登、沒有潤稿。
 *
 * 刻意沒有的兩樣東西：
 * 1. 頭像照片 —— 會員的 LINE 頭像是個資，拿不到同意；放 stock photo 或 AI 臉
 *    反而扣分（看的人認得出來）。改用大樓圖示。
 * 2. 星級評分 —— 我們從來沒收過評分。標上去就是捏造數據。
 */

/** 把重點句反白。找不到就整段照常輸出，不要默默吃掉文字。 */
function renderQuote(item: Testimonial) {
  if (!item.highlight) return item.quote;
  const at = item.quote.indexOf(item.highlight);
  if (at < 0) return item.quote;
  return (
    <>
      {item.quote.slice(0, at)}
      <mark className="bg-brand-yellow/45 px-0.5 text-gray-900">{item.highlight}</mark>
      {item.quote.slice(at + item.highlight.length)}
    </>
  );
}

const Testimonials: React.FC = () => {
  return (
    <section id="voices" className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 text-center md:mb-14">
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brand-red">REAL MESSAGES</p>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">會員在 LINE 上跟我們說的話</h2>
            <p className="text-gray-600">以下都是會員主動傳進官方帳號的訊息，逐字照登、沒有潤稿。</p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item, idx) => (
            <Reveal key={item.quote} delay={idx * 70} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-brand-yellow/60">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-beige/60 ring-1 ring-brand-yellow/40">
                    <Building2 className="h-5 w-5 text-brand-red" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">來自 {item.source}</p>
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                      <MessageCircle className="h-3 w-3 text-[#06C755]" />
                      官方帳號訊息
                    </p>
                  </div>
                </div>

                <blockquote className="text-[15px] leading-8 text-gray-700">
                  {renderQuote(item)}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
