import React from 'react';
import { MessageCircle } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import Reveal from './Reveal';

/**
 * 全部是會員主動傳進官方帳號的原話，逐字照登、沒有潤稿。
 *
 * 刻意做成對話泡泡：讓「這是 LINE 上的訊息」這件事由版型本身講出來，
 * 而不是我們宣稱。也刻意不放會員的 LINE 暱稱與頭像 —— 他們是寫給客服的，
 * 不是寫給官網的，署名到「大樓＋會員」就夠，多寫就變成未經同意的個資揭露。
 */
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

        <div className="grid gap-5 md:grid-cols-2">
          {TESTIMONIALS.map((item, idx) => (
            <Reveal
              key={item.quote}
              delay={idx * 80}
              className={`h-full ${item.feature ? 'md:col-span-2' : ''}`}
            >
              <figure
                className={`flex h-full flex-col rounded-2xl p-6 ring-1 transition-shadow hover:shadow-md md:p-7 ${
                  item.feature
                    ? 'bg-brand-beige/40 ring-brand-yellow/50'
                    : 'bg-gray-50 ring-gray-100'
                }`}
              >
                <div className="mb-4 flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-[#06C755]" />
                  <span className="text-xs font-semibold tracking-wide text-gray-500">官方帳號訊息</span>
                </div>

                {/* 對話泡泡：左上角切平，看起來就是 LINE 裡對方傳來的那一顆 */}
                <blockquote
                  className={`rounded-2xl rounded-tl-md bg-white px-5 py-4 leading-8 text-gray-800 shadow-sm ring-1 ring-gray-100 ${
                    item.feature ? 'text-lg md:text-xl md:leading-9' : 'text-[15px]'
                  }`}
                >
                  {item.quote}
                </blockquote>

                <figcaption className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <span className="h-1 w-6 rounded-full bg-brand-red/40"></span>
                  {item.source}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
