import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Comparison from './components/Comparison';
import HowItWorks from './components/HowItWorks';
import Partners from './components/Partners';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-red selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Comparison />
        <HowItWorks />
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default App;