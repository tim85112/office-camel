import React from 'react';
import { Smartphone, ClipboardList, Package, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

interface HowItWorksProps {
  onNavigate: (page: 'home' | 'buildingSelection') => void;
}

/**
 * 這一區固定只講消費者。
 *
 * 原本這裡有一顆「我是員工／我是餐廳」切換鈕，但底下的「你是哪一種身分？」
 * 已經在做身分分流了 —— 同一頁問兩次「你是誰」，而且兩邊分類還不一樣
 * （這裡兩種、角色卡三種）。餐廳那半邊的內容也跟角色卡重複。
 * 切換鈕拿掉後，餐廳的說法全部集中在角色卡一個地方。
 */
const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <section id="how-it-works" className="py-20 bg-brand-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">簡單三步驟，輕鬆搞定</h2>
          </div>
        </Reveal>

        {/* User Flow Cards */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2 scale-x-75"></div>

          <Reveal delay={0} className="h-full">
            <StepCard
              number="01"
              icon={<Smartphone className="w-8 h-8 text-white" />}
              title="加入大樓官方 LINE"
              description="點擊按鈕加入大樓專屬 LINE 帳號，每天收到當日菜單。"
            />
          </Reveal>
          <Reveal delay={110} className="h-full">
            <StepCard
              number="02"
              icon={<ClipboardList className="w-8 h-8 text-white" />}
              title="平台網站選餐"
              description="瀏覽合作餐廳，一鍵下單，支援多元支付。"
            />
          </Reveal>
          <Reveal delay={220} className="h-full">
            <StepCard
              number="03"
              icon={<Package className="w-8 h-8 text-white" />}
              title="1F 憑碼取餐"
              description="中午在大樓指定取餐處，憑取餐碼快速取走餐點。"
            />
          </Reveal>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('buildingSelection')}
            className="inline-flex items-center bg-brand-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg"
          >
            立即加入點餐
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

interface StepCardProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, icon, title, description }) => (
  <div className="h-full bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-red relative group hover:-translate-y-2 transition-transform duration-300">
    <div aria-hidden="true" className="absolute top-4 right-4 text-4xl font-black text-gray-100 group-hover:text-brand-red/10 transition-colors">
      {number}
    </div>
    <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center mb-6 shadow-md rotate-3 group-hover:rotate-6 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default HowItWorks;
