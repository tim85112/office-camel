import React from 'react';

const DeliveryShowcase: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">專業保溫，專人直送</h2>
          <p className="text-xl text-gray-600">從出餐到取餐，全程嚴格控溫，確保每一口都是剛剛好的溫度。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* EPP高級保溫箱 - Vertical image */}
          <div className="md:col-span-5 relative group overflow-hidden rounded-2xl shadow-lg h-[400px] md:h-[600px]">
            <img 
              src="https://i.meee.com.tw/hoVCCG2.jpg" 
              alt="EPP高級保溫箱" 
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <span className="inline-block px-3 py-1 bg-brand-red text-xs font-bold rounded-full mb-3 shadow-md">專業保溫</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">EPP 高級保溫箱</h3>
              <p className="text-white/90 leading-relaxed max-w-sm">高效鎖溫抗震設計，完美抵抗外部氣溫變化，讓每一餐都像剛出爐般熱騰騰。</p>
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col gap-6">
            {/* 專用保溫袋 - Horizontal image */}
            <div className="relative group overflow-hidden rounded-2xl shadow-lg h-[250px] md:h-[288px]">
              <img 
                src="https://i.meee.com.tw/78vIUQa.jpg" 
                alt="專用保溫袋" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                 <span className="inline-block px-3 py-1 bg-brand-yellow/90 text-brand-dark text-xs font-bold rounded-full mb-3 shadow-md">獨立包裝</span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">專屬保溫袋</h3>
                <p className="text-white/90 text-sm md:text-base">分開包裝不混味，獨立保溫更衛生，乾淨送到手上。</p>
              </div>
            </div>

            {/* 發餐現場 - Horizontal image */}
            <div className="relative group overflow-hidden rounded-2xl shadow-lg h-[250px] md:h-[288px] flex-grow">
              <img 
                src="https://i.meee.com.tw/NgNsJ17.jpg" 
                alt="一樓發餐現場" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 bg-brand-red text-xs font-bold rounded-full mb-3 shadow-md">快速取餐</span>
                <h3 className="text-xl md:text-2xl font-bold mb-2">大樓專屬發餐點</h3>
                <p className="text-white/90 text-sm md:text-base">12:00準時抵達指定取餐處，憑取餐碼秒速領取，免吹風淋雨下樓找外送員，午休時間全歸你。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryShowcase;
