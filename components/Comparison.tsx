import React from 'react';
import { X, Check } from 'lucide-react';
import { COMPARISON_DATA } from '../constants';

const Comparison: React.FC = () => {
  return (
    <section id="problem" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">為什麼選擇【商辦駝獸】？</h2>
          <p className="text-lg text-gray-600">別再忍受昂貴的外送費與漫長的等待\n讓我們重新定義辦公室午餐！</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Traditional Way */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
            <div className="flex items-center mb-8">
              <div className="bg-gray-200 p-3 rounded-full mr-4">
                <X className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700">傳統外送平台</h3>
            </div>

            <ul className="space-y-6">
              {COMPARISON_DATA.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8">
                    <item.icon className="w-5 h-5 text-gray-400 mt-1" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500 text-sm">{item.feature}</p>
                    <p className="text-lg font-medium text-gray-800">{item.traditional}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Way */}
          <div className="bg-white rounded-2xl p-8 border-2 border-brand-red shadow-xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-red"></div>
            <div className="absolute top-4 right-4 bg-brand-yellow text-brand-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Recommended
            </div>

            <div className="flex items-center mb-8">
              <div className="bg-brand-red/10 p-3 rounded-full mr-4">
                <Check className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="text-2xl font-bold text-brand-red">商辦駝獸</h3>
            </div>

            <ul className="space-y-6">
              {COMPARISON_DATA.map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-8">
                    <item.icon className="w-5 h-5 text-brand-red mt-1" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-red/60 text-sm">{item.feature}</p>
                    <p className="text-lg font-bold text-gray-900">{item.beast}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;