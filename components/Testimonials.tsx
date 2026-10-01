import React from 'react';
import { Building2, MessageCircle, Star } from 'lucide-react';
import { TESTIMONIALS, type Testimonial } from '../constants';
import Reveal from './Reveal';

/**
 * 全部是會員主動傳進官方帳號的原話，逐字照登、沒有潤稿。
 *
 * 做成跑馬燈的前提：一份內容要比容器寬，否則用來接回原點的複製品會跟本尊
 * 同時出現在畫面上（品牌牆就是栽在這裡）。
 * 五張卡 × 340px + 間距 ≈ 1780px > 容器 1152px，所以不會看到同一則兩次。
 * 之後若刪到剩三則以下，要先回頭確認這個數字。
 *
 * 刻意沒有的：
 * - 頭像照片。會員的 LINE 頭像是個資、沒有同意；stock photo 看的人認得出來反而扣分。
 * - 「5.0」那個數字。星星是情緒標記，寫出平均分數就等於宣稱有一套我們沒有的評分系統。
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

const Card: React.FC<{ item: Testimonial; duplicate: boolean }> = ({ item, duplicate }) => (
  <figure
    /* 複製出來那一份只是為了讓跑馬燈接得上，不要讓讀螢幕軟體唸兩次 */
    aria-hidden={duplicate || undefined}
    className="flex h-full w-[300px] flex-shrink-0 flex-col rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100 transition-all duration-300 hover:bg-white hover:shadow-md hover:ring-brand-yellow/60 sm:w-[340px]"
  >
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

    <div aria-hidden="true" className="mb-3 flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className="h-4 w-4 fill-brand-yellow text-brand-yellow" />
      ))}
    </div>

    <blockquote className="text-[15px] leading-8 text-gray-700">{renderQuote(item)}</blockquote>
  </figure>
);

/** 一輪跑完要幾秒。慢一點，因為這裡是要讓人讀完的，不是看熱鬧的。 */
const DURATION_SEC = 58;

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

        <Reveal delay={80}>
          {/* 左右用 mask 淡出；關掉動態效果偏好時停住並改成可手動橫向捲 */}
          <div className="group/row relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_3%,#000_97%,transparent)] motion-reduce:overflow-x-auto motion-reduce:[mask-image:none]">
            <ul
              style={{ animationDuration: `${DURATION_SEC}s` }}
              className="flex w-max items-stretch gap-5 py-1 animate-marquee group-hover/row:[animation-play-state:paused] motion-reduce:animate-none"
            >
              {TESTIMONIALS.map((item) => (
                <li key={item.quote} className="flex">
                  <Card item={item} duplicate={false} />
                </li>
              ))}
              {TESTIMONIALS.map((item) => (
                <li key={item.quote + '-dup'} className="flex">
                  <Card item={item} duplicate />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <p className="mt-6 text-center text-sm text-gray-400">滑鼠移上去會暫停，方便讀完</p>
      </div>
    </section>
  );
};

export default Testimonials;
