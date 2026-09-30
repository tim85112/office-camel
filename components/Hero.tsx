import React from 'react';
import { ArrowRight, Building2, Store, Truck } from 'lucide-react';
import { LINKS } from '../constants';
import type { Page } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const STATS = [
  { value: '1,500+', label: '位商辦會員在用' },
  { value: '$0', label: '運費・低消・平台費' },
  { value: '50+ 家', label: '合作餐廳，天天換菜單' },
];

const chipClass =
  'inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-red/40 hover:text-brand-red hover:shadow-md sm:gap-2 sm:px-4';

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

            <div className="mt-7 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3 sm:justify-center lg:justify-start">
              <button onClick={() => onNavigate('buildingIntake')} className={chipClass}>
                <Building2 className="h-4 w-4" />
                公司合作
              </button>
              <a href={LINKS.restaurantLine} target="_blank" rel="noopener noreferrer" className={chipClass}>
                <Store className="h-4 w-4" />
                餐廳合作
              </a>
              <a href={LINKS.logisticsLine} target="_blank" rel="noopener noreferrer" className={chipClass}>
                <Truck className="h-4 w-4" />
                配送夥伴
              </a>
            </div>
          </div>

          {/* Right: what it actually looks like */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              <img
                src="/showcase/hero-pickup.webp"
                width="1080"
                height="900"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                alt="配送員在商辦大樓一樓取餐處，桌上放著標有取餐碼的保溫袋，同仁前來領餐"
                className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover object-center"
              />
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
