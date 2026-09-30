import React, { useCallback, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BuildingProof from './components/BuildingProof';
import Comparison from './components/Comparison';
import HowItWorks from './components/HowItWorks';
import Partners from './components/Partners';
import Footer from './components/Footer';
import BuildingSelection from './components/BuildingSelection';
import DeliveryShowcase from './components/DeliveryShowcase';
import BuildingIntake from './components/BuildingIntake';
import RoleCards from './components/RoleCards';
import Faq from './components/Faq';
import LegalPage from './components/LegalPage';
import { PRIVACY_DOC, TERMS_DOC } from './constants';
import type { Page } from './types';

const PAGE_PATHS: Record<Page, string> = {
  home: '/',
  buildingSelection: '/buildings',
  buildingIntake: '/apply',
  faq: '/faq',
  privacy: '/privacy',
  terms: '/terms',
};

const PAGE_TITLES: Record<Page, string> = {
  home: '商辦駝獸｜商辦午餐 訂餐平台',
  buildingSelection: '查看大樓｜商辦駝獸',
  buildingIntake: '公司合作申請｜商辦駝獸',
  faq: '常見問題｜商辦駝獸',
  privacy: '隱私權政策｜商辦駝獸',
  terms: '服務條款｜商辦駝獸',
};

const pathToPage = (pathname: string): Page => {
  const match = (Object.entries(PAGE_PATHS) as [Page, string][]).find(([, path]) => path === pathname);
  return match ? match[0] : 'home';
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => pathToPage(window.location.pathname));

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    const path = PAGE_PATHS[page];
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onPopState = () => setCurrentPage(pathToPage(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  /* 分頁標題跟著換。SPA 不換的話，分享出去每一頁的標題都一樣。 */
  useEffect(() => {
    document.title = PAGE_TITLES[currentPage];
  }, [currentPage]);

  const backHome = useCallback(() => navigate('home'), [navigate]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-red selection:text-white">
      <Navbar onNavigate={navigate} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={navigate} />
            <BuildingProof onNavigate={navigate} />
            <Comparison />
            <HowItWorks onNavigate={navigate} />
            <DeliveryShowcase />
            <RoleCards onNavigate={navigate} />
            <Partners />
          </>
        ) : currentPage === 'buildingSelection' ? (
          <BuildingSelection onBack={backHome} />
        ) : currentPage === 'buildingIntake' ? (
          <BuildingIntake onBack={backHome} onNavigate={navigate} />
        ) : currentPage === 'faq' ? (
          <Faq onBack={backHome} />
        ) : currentPage === 'privacy' ? (
          <LegalPage doc={PRIVACY_DOC} onBack={backHome} />
        ) : (
          <LegalPage doc={TERMS_DOC} onBack={backHome} />
        )}
      </main>
      {/* Footer 移出首頁分支：每一頁都要能點到隱私權政策與服務條款 */}
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
