import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-2xl font-bold text-brand-red tracking-tight">商辦駝獸</span>
            <span className="ml-2 text-xs bg-brand-yellow px-2 py-0.5 rounded-full font-medium text-brand-dark">訂餐平台</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('problem')} className="text-gray-600 hover:text-brand-red transition-colors">為什麼選擇我們</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-600 hover:text-brand-red transition-colors">運作流程</button>
            <button onClick={() => scrollToSection('partners')} className="text-gray-600 hover:text-brand-red transition-colors">合作夥伴</button>
            <div className="flex space-x-4">
               <a 
                href={LINKS.restaurantLine} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-brand-red font-medium hover:text-red-700 px-3 py-2"
              >
                餐廳合作
              </a>
              <a 
                href={LINKS.consumerLine}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-red text-white px-5 py-2 rounded-lg hover:bg-red-700 transition-all shadow-md hover:shadow-lg font-medium"
              >
                立即點餐
              </a>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-brand-red">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('problem')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-brand-red hover:bg-brand-beige/30 rounded-md">為什麼選擇我們</button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-brand-red hover:bg-brand-beige/30 rounded-md">運作流程</button>
            <button onClick={() => scrollToSection('partners')} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-brand-red hover:bg-brand-beige/30 rounded-md">合作夥伴</button>
            <div className="mt-4 flex flex-col space-y-2 px-3">
               <a 
                href={LINKS.restaurantLine}
                className="block w-full text-center border-2 border-brand-red text-brand-red px-4 py-2 rounded-lg font-medium"
              >
                餐廳合作
              </a>
              <a 
                href={LINKS.consumerLine}
                className="block w-full text-center bg-brand-red text-white px-4 py-2 rounded-lg font-medium shadow-sm"
              >
                立即點餐
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;