import React from 'react';
import { ArrowRight, Home } from 'lucide-react';
import type { Page } from '../types';

interface NotFoundProps {
  onNavigate: (page: Page) => void;
}

const LINKS: { page: Page; label: string; desc: string }[] = [
  { page: 'buildingSelection', label: '查看大樓', desc: '看看你的辦公大樓開通了沒' },
  { page: 'faq', label: '常見問題', desc: '訂餐、導入、合作，四大類 25 題' },
  { page: 'buildingIntake', label: '公司合作申請', desc: '想在自己的大樓開午餐入口' },
];

const NotFound: React.FC<NotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-beige/20 px-4 pt-24 pb-20 text-center">
      <p className="text-7xl font-black tracking-tight text-brand-red/25 md:text-8xl">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl">這個頁面不在這裡</h1>
      <p className="mt-3 max-w-md leading-7 text-gray-600">
        網址可能打錯了，或這個頁面已經搬走。下面幾個地方應該有你要找的東西。
      </p>

      <div className="mt-10 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
        {LINKS.map((link) => (
          <button
            key={link.page}
            type="button"
            onClick={() => onNavigate(link.page)}
            className="group rounded-xl bg-white p-5 text-left shadow-sm ring-1 ring-gray-100 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-yellow"
          >
            <span className="flex items-center justify-between font-bold text-gray-900">
              {link.label}
              <ArrowRight className="h-4 w-4 text-brand-red transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-1.5 block text-sm leading-6 text-gray-500">{link.desc}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-red-700"
      >
        <Home className="h-4 w-4" />
        回首頁
      </button>
    </div>
  );
};

export default NotFound;
