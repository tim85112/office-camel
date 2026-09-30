import React from 'react';
import { Check, X } from 'lucide-react';
import { COMPARISON_DATA } from '../constants';
import Reveal from './Reveal';

const Comparison: React.FC = () => {
  return (
    <section id="problem" className="py-20 md:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <Reveal>
          <div className="text-center mb-12 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">為什麼選擇商辦駝獸？</h2>
            <p className="text-lg text-gray-600">同一家店、同一份餐，差別在中間那一段。</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-100">

            {/* 桌機：三欄對照表，商辦駝獸那一欄整條打亮 */}
            <div className="hidden md:block">
              <div className="grid grid-cols-[1fr_1.05fr_1.15fr]">

                <div className="px-6 py-5"></div>
                <div className="flex items-center justify-center gap-2 px-6 py-5">
                  <X className="h-5 w-5 text-gray-400" />
                  <span className="text-lg font-bold text-gray-500">傳統外送平台</span>
                </div>
                <div className="flex items-center justify-center gap-2 bg-brand-red px-6 py-5">
                  <Check className="h-5 w-5 text-white" />
                  <span className="text-lg font-extrabold text-white">商辦駝獸</span>
                </div>

                {COMPARISON_DATA.map((item) => (
                  <React.Fragment key={item.feature}>
                    <div className="flex items-center gap-3 border-t border-gray-100 px-6 py-6">
                      <item.icon className="h-5 w-5 flex-shrink-0 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-500">{item.feature}</span>
                    </div>
                    <div className="flex items-center justify-center border-t border-gray-100 px-6 py-6 text-center">
                      <span className="text-base text-gray-400">{item.traditional}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 border-t border-brand-red/10 bg-brand-red/[0.05] px-6 py-6 text-center">
                      <Check className="h-4 w-4 flex-shrink-0 text-brand-red" />
                      <span className="text-base font-bold text-gray-900">{item.beast}</span>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* 手機：一個項目一組，右邊那張打亮 */}
            <div className="divide-y divide-gray-100 md:hidden">
              {COMPARISON_DATA.map((item) => (
                <div key={item.feature} className="p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-500">{item.feature}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gray-50 p-3">
                      <p className="mb-1 text-xs text-gray-400">傳統外送平台</p>
                      <p className="text-sm text-gray-400">{item.traditional}</p>
                    </div>
                    <div className="rounded-xl bg-brand-red/[0.06] p-3 ring-1 ring-brand-red/15">
                      <p className="mb-1 flex items-center gap-1 text-xs font-medium text-brand-red"><Check className="h-3 w-3" />商辦駝獸</p>
                      <p className="text-sm font-bold text-gray-900">{item.beast}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Comparison;
