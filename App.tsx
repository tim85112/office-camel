import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import HowItWorks from './components/HowItWorks';
import Partners from './components/Partners';
import Footer from './components/Footer';
import BuildingSelection from './components/BuildingSelection';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'buildingSelection'>('home');

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-red selection:text-white">
      <Navbar onNavigate={setCurrentPage} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onNavigate={setCurrentPage} />
            <Comparison />
            <HowItWorks onNavigate={setCurrentPage} />
            <Partners />
            <Footer />
          </>
        ) : (
          <BuildingSelection onBack={() => setCurrentPage('home')} />
        )}
      </main>
    </div>
  );
};

export default App;