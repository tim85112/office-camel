import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '../constants';
import type { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const STATS = [
  { value: '$0', label: '運費・低消・平台費' },
  { value: '50+ 家', label: '合作餐廳，天天換菜單' },
  { value: '12:00', label: '準時送達大樓一樓' },
];

const secondaryLinkClass =
  'underline decoration-gray-300 underline-offset-4 hover:text-brand-red hover:decoration-brand-red transition-colors';

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative pt-24 pb-14 md:pt-28 md:pb-20 overflow-hidden bg-brand-beige/30">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-yellow/20 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-red/10 rounded-full blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: the promise */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-red/10 text-brand-red font-medium text-sm mb-6 border border-brand-red/20">
              <span className="flex h-2 w-2 relative mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
              </span>
              台中商辦午餐救星
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              用<span className="text-brand-red relative whitespace-nowrap">
                <span className="relative z-10">「店內價」</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-yellow/60 -z-10 transform -rotate-2"></span>
              </span>吃午餐，<br />
              剩下的錢拿來買咖啡。
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              不需揪團、不用找零錢。一人就能點，
              <br className="hidden sm:block" />
              免運費、全程保溫箱直送大樓一樓。
            </p>

            <button
              onClick={() => onNavigate('buildingSelection')}
              className="group inline-flex items-center justify-center bg-brand-red text-white px-9 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              立即點餐
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="mt-5 text-sm text-gray-500">
              我是
              <button onClick={() => onNavigate('buildingIntake')} className={`mx-1.5 ${secondaryLinkClass}`}>
                公司窗口
              </button>
              ·
              <a href={LINKS.restaurantLine} target="_blank" rel="noopener noreferrer" className={`mx-1.5 ${secondaryLinkClass}`}>
                餐廳老闆
              </a>
              ·
              <a href={LINKS.logisticsLine} target="_blank" rel="noopener noreferrer" className={`mx-1.5 ${secondaryLinkClass}`}>
                想跑物流
              </a>
            </p>
          </div>

          {/* Right: what it actually looks like */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img
                src="/showcase/hero-pickup.webp"
                width="1080"
                height="900"
                decoding="async"
                alt="配送員在商辦大樓一樓取餐處，桌上放著標有取餐碼的保溫袋，同仁前來領餐"
                className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-flex items-center rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-gray-800 shadow-md">
                  <span className="mr-2 h-2 w-2 flex-shrink-0 rounded-full bg-brand-red"></span>
                  順天經貿廣場 1F・每個袋子都有取餐碼
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Proof strip */}
        <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 rounded-2xl bg-white shadow-lg ring-1 ring-black/5 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {STATS.map((stat) => (
            <div key={stat.label} className="px-6 py-5 sm:py-6 text-center">
              <dt className="text-3xl font-extrabold text-brand-red">{stat.value}</dt>
              <dd className="mt-1 text-sm text-gray-600">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

export default Hero;
