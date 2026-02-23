import React, { useState } from 'react';
import { User, Smartphone, MapPin, ClipboardList, Package, Truck, ArrowRight } from 'lucide-react';
import { B_SIDE_BENEFITS, LINKS } from '../constants';

const HowItWorks: React.FC = () => {
  const [role, setRole] = useState<'consumer' | 'restaurant'>('consumer');

  return (
    <section id="how-it-works" className="py-20 bg-brand-beige/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">簡單三步驟，輕鬆搞定</h2>
        
          {/* Toggle Switch */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-200 p-1 rounded-xl inline-flex relative">
              <button
                onClick={() => setRole('consumer')}
                className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-200 z-10 ${
                  role === 'consumer' 
                    ? 'bg-white text-brand-red shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                我是員工 (訂餐)
              </button>
              <button
                onClick={() => setRole('restaurant')}
                className={`px-8 py-3 rounded-lg text-sm font-bold transition-all duration-200 z-10 ${
                  role === 'restaurant' 
                    ? 'bg-brand-red text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                我是餐廳 (接單)
              </button>
            </div>
          </div>
        </div>

        {/* User Flow Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2 scale-x-75"></div>

            {role === 'consumer' ? (
              <>
                <StepCard 
                  number="01"
                  icon={<Smartphone className="w-8 h-8 text-white" />}
                  title="加入 LINE 群組"
                  description="點擊按鈕加入大樓專屬 LINE 群組，獲取每日菜單。"
                />
                <StepCard 
                  number="02"
                  icon={<ClipboardList className="w-8 h-8 text-white" />}
                  title="平台網站選餐"
                  description="瀏覽合作餐廳，一鍵下單，支援多元支付。"
                />
                <StepCard 
                  number="03"
                  icon={<Package className="w-8 h-8 text-white" />}
                  title="1F 憑碼取餐"
                  description="12:00於大樓指定取餐處，憑取餐碼快速取走餐點。"
                />
              </>
            ) : (
              <>
                <StepCard 
                  number="01"
                  icon={<ClipboardList className="w-8 h-8 text-white" />}
                  title="接收彙整訂單"
                  description="每日截單後，接收整合好的大單，無需處理零散客製化。"
                />
                <StepCard 
                  number="02"
                  icon={<Package className="w-8 h-8 text-white" />}
                  title="依公司分袋"
                  description="只需依照訂單上的「取餐碼」分袋包裝，流程標準化。"
                />
                <StepCard 
                  number="03"
                  icon={<Truck className="w-8 h-8 text-white" />}
                  title="平台專員取餐"
                  description="我們派專人準時到店取餐，您只需專注店內生意。"
                />
              </>
            )}
        </div>

        {/* Restaurant Specific Benefits Section */}
        {role === 'restaurant' && (
          <div className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
             <div className="text-center mb-12">
                <span className="text-brand-red font-bold tracking-wider uppercase text-sm">For Partners</span>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">我們是你最忠誠的「商辦駝獸」</h3>
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">幫你把美食送進商辦心臟，解決外送平台高抽成與運送痛點。</p>
             </div>
             
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {B_SIDE_BENEFITS.map((benefit, idx) => (
                  <div key={idx} className="bg-gray-50 p-6 rounded-xl hover:bg-brand-beige/30 transition-colors duration-300">
                    <div className="w-12 h-12 bg-brand-yellow/20 rounded-lg flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6 text-brand-dark" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
             </div>
             
             <div className="mt-12 text-center">
                <a 
                  href={LINKS.restaurantLine}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-brand-dark text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-all"
                >
                  成為合作餐廳
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
             </div>
          </div>
        )}
        
         {role === 'consumer' && (
           <div className="mt-12 text-center">
              <a 
                href={LINKS.consumerLine}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center bg-brand-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-all shadow-lg"
              >
                立即加入點餐
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
           </div>
         )}

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
  <div className="bg-white p-8 rounded-2xl shadow-lg border-b-4 border-brand-red relative group hover:-translate-y-2 transition-transform duration-300">
    <div className="absolute top-4 right-4 text-4xl font-black text-gray-100 group-hover:text-brand-red/10 transition-colors">
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