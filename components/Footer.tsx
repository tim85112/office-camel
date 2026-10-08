import React from 'react';
import { MessageCircle, Mail } from 'lucide-react';
import { CONTACTS, LEGAL_ENTITY, LINKS } from '../constants';
import type { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">

          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/icon-192.png" width="192" height="192" alt="" className="h-10 w-10 rounded-full" />
              <span className="ml-3 flex flex-col leading-none">
                <span className="text-xl font-bold text-white tracking-tight">商辦駝獸</span>
                <span className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-gray-400">OFFICE CAMEL</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              專注於商辦大樓的午餐合單平台。<br />
              我們相信，吃得好、省得多，工作效率會更好。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-6 text-brand-beige">快速連結</h2>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('buildingSelection')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  商辦員工訂餐 (Line)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('buildingIntake')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  公司行政申請進駐
                </button>
              </li>
              <li>
                <a href={LINKS.restaurantLine} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  餐廳夥伴加盟 (Line)
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  常見問題
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold mb-6 text-brand-beige">聯繫我們</h2>
            <div className="flex flex-col gap-6">
              {CONTACTS.map((contact, index) => (
                <div key={index} className="min-w-0 space-y-2">
                  <div className="flex items-start">
                    <UserIcon className="w-5 h-5 text-brand-red mr-3 mt-1" />
                    <div>
                      <p className="text-sm text-gray-400">合作聯繫專員</p>
                      <p className="text-white font-medium">{contact.name}</p>
                    </div>
                  </div>
                  {contact.line && (
                    <div className="flex items-center">
                      <MessageCircle className="w-5 h-5 text-[#06C755] mr-3" />
                      <a href={contact.line} target="_blank" rel="noreferrer" className="text-white hover:text-brand-yellow transition-colors">
                        加 LINE 好友
                      </a>
                    </div>
                  )}
                </div>
              ))}

              <div className="min-w-0 border-t border-gray-800 pt-5">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-brand-red mr-3 mt-1" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400">客服信箱</p>
                    <a
                      href={`mailto:${LEGAL_ENTITY.email}`}
                      className="block break-all text-white hover:text-brand-yellow transition-colors"
                    >
                      {LEGAL_ENTITY.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} 商辦駝獸 Office Camel. All rights reserved.</p>
            <p className="mt-1.5">
              {LEGAL_ENTITY.name}
              <span className="mx-2 text-gray-600">|</span>
              統一編號 {LEGAL_ENTITY.taxId}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">隱私權政策</button>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">服務條款</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const UserIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
)

export default Footer;
