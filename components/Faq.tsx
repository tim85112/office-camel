import React from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { FAQ_CATEGORIES, LINKS, REPLY_SLA } from '../constants';
import Reveal from './Reveal';

interface FaqProps {
  onBack: () => void;
}

const Faq: React.FC<FaqProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-brand-beige/20 pt-24 pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="mb-10 flex items-center font-medium text-gray-600 transition-colors hover:text-brand-red"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          返回首頁
        </button>

        <Reveal>
          <header className="mb-14 md:mb-20">
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-brand-red">FAQ・常見問題</p>
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
              想問的，
              <span className="text-brand-red">這裡都有答案</span>
            </h1>
            <p className="mt-5 text-gray-600">
              找不到答案？直接{' '}
              <a
                href={LINKS.consumerLine}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-brand-red underline decoration-brand-yellow decoration-2 underline-offset-4 hover:text-red-700"
              >
                加 LINE 問我們
              </a>
              ，{REPLY_SLA}內回覆。
            </p>
          </header>
        </Reveal>

        <div className="space-y-14">
          {FAQ_CATEGORIES.map((category, catIdx) => (
            <Reveal key={category.label} delay={catIdx * 60}>
              <section>
                <div className="mb-2 flex items-baseline gap-3 border-b border-gray-200 pb-4">
                  <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{category.label}</h2>
                  <span className="text-sm text-gray-400">{category.items.length} 題</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {category.items.map((item, idx) => (
                    <details key={item.q} className="group py-1">
                      <summary className="flex cursor-pointer list-none items-start gap-3 py-5 pr-2 [&::-webkit-details-marker]:hidden">
                        <span className="flex-shrink-0 pt-0.5 text-sm font-bold text-brand-red">
                          Q{idx + 1}
                        </span>
                        <span className="flex-1 font-bold leading-relaxed text-gray-900">{item.q}</span>
                        <ChevronDown
                          aria-hidden="true"
                          className="mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                        />
                      </summary>
                      <div className="pb-6 pl-9 pr-8">
                        {item.a.map((paragraph) => (
                          <p key={paragraph} className="mb-2 text-[15px] leading-7 text-gray-600 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-20 overflow-hidden rounded-2xl bg-brand-dark p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold text-white md:text-3xl">還沒解決？找人問最快</h2>
            <p className="mt-3 text-gray-400">挑一個跟你身分相符的入口，{REPLY_SLA}內會有人回你。</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={LINKS.consumerLine}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-brand-yellow px-6 py-3 font-bold text-brand-dark shadow-lg transition-colors hover:bg-yellow-400"
              >
                我要訂餐
              </a>
              <a
                href={LINKS.restaurantLine}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/25 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                我是餐廳
              </a>
              <a
                href={LINKS.logisticsLine}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-white/25 px-6 py-3 font-bold text-white transition-colors hover:bg-white/10"
              >
                我想配送
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Faq;
