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
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import LegalPage from './components/LegalPage';
import NotFound from './components/NotFound';
import { PRIVACY_DOC, TERMS_DOC, ROUTES, SITE_ORIGIN, pathToPage } from './constants';
import type { Page } from './types';

/** 換頁時同步 head。
 *  靜態的那一份由 scripts/prerender-meta.mjs 在建置時寫進各頁 HTML
 *  （LINE / FB 的預覽機器人不跑 JS，只能靠那份）；
 *  這裡處理的是站內切換後、Google 跑完 JS 看到的版本。 */
function syncHead(page: Page) {
  const meta = ROUTES[page];
  const url = SITE_ORIGIN + meta.path;
  document.title = meta.title;

  const set = (selector: string, attr: string, value: string) => {
    const el = document.head.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  set('meta[name="description"]', 'content', meta.description);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[name="twitter:title"]', 'content', meta.title);
  set('meta[name="twitter:description"]', 'content', meta.description);

  /* 找不到的頁面不要被索引，也不要宣告 canonical —— 否則又變成「我是首頁」 */
  const canonical = document.head.querySelector('link[rel="canonical"]');
  let robots = document.head.querySelector('meta[name="robots"]');
  if (page === 'notFound') {
    canonical?.setAttribute('href', '');
    canonical?.remove();
    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }
    robots.setAttribute('content', 'noindex, follow');
  } else {
    robots?.remove();
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      document.head.appendChild(link);
    }
    set('meta[property="og:url"]', 'content', url);
  }
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(() => pathToPage(window.location.pathname));

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
    const path = ROUTES[page].path;
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

  useEffect(() => {
    syncHead(currentPage);
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
            <Testimonials />
            <RoleCards onNavigate={navigate} />
            <Partners />
          </>
        ) : currentPage === 'buildingSelection' ? (
          <BuildingSelection onBack={backHome} />
        ) : currentPage === 'buildingIntake' ? (
          <BuildingIntake onBack={backHome} onNavigate={navigate} />
        ) : currentPage === 'faq' ? (
          <Faq onBack={backHome} onNavigate={navigate} />
        ) : currentPage === 'privacy' ? (
          <LegalPage doc={PRIVACY_DOC} onBack={backHome} />
        ) : currentPage === 'terms' ? (
          <LegalPage doc={TERMS_DOC} onBack={backHome} />
        ) : (
          <NotFound onNavigate={navigate} />
        )}
      </main>
      {/* Footer 移出首頁分支：每一頁都要能點到隱私權政策與服務條款 */}
      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
