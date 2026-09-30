import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BUILDINGS } from '../constants';
import type { Page } from '../types';
import Reveal from './Reveal';

interface BuildingProofProps {
  onNavigate: (page: Page) => void;
}

/** 直接從 /buildings 用的同一份資料算出來。
 *  在 BUILDINGS 新增一棟，這條名條會自己跟上 —— 不會出現「首頁寫 3 棟、內頁列 4 棟」這種說謊畫面。 */
const ALL = Object.values(BUILDINGS).flat();
const OPENED = ALL.filter((b) => b.status === 'opened');
const DEVELOPING_COUNT = ALL.length - OPENED.length;

const BuildingProof: React.FC<BuildingProofProps> = ({ onNavigate }) => {
  return (
    <section id="live-buildings" className="border-y border-gray-100 bg-white py-10 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
            <div className="flex-shrink-0">
              <p className="text-xs font-bold tracking-[0.2em] text-brand-red">已進駐大樓</p>
              <p className="mt-2 text-2xl font-bold text-gray-900 md:text-[1.75rem]">
                {OPENED.length} 棟商辦
                <span className="ml-2 text-base font-semibold text-gray-400">每天在送</span>
              </p>
            </div>

            <ul className="flex flex-wrap gap-2.5 md:flex-1">
              {OPENED.map((building) => (
                <li
                  key={building.name}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-beige/40 px-4 py-2 text-sm font-semibold text-brand-dark ring-1 ring-brand-yellow/40"
                >
                  <span aria-hidden="true" className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-60 motion-reduce:hidden"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  {building.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-2 border-t border-gray-100 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-500">另有 {DEVELOPING_COUNT} 棟洽談與連署中</p>
            <button
              type="button"
              onClick={() => onNavigate('buildingSelection')}
              className="group inline-flex items-center gap-1.5 font-bold text-brand-red transition-colors hover:text-red-700"
            >
              看看有沒有你的大樓
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default BuildingProof;
