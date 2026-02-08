
import React, { useState, useEffect, useMemo } from 'react';
import { Card, ViewMode } from './types';
import { SEED_CARDS } from './constants';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PokeCentre from './components/PokeCentre';
import FeaturedShowcase from './components/FeaturedShowcase';
import CardGrid from './components/CardGrid';
import CardDetailModal from './components/CardDetailModal';
import Timeline from './components/Timeline';
import CompareDrawer from './components/CompareDrawer';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(SEED_CARDS);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [compareList, setCompareList] = useState<Card[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showAdmin, setShowAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    return cards.filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch && card.isElite;
    });
  }, [cards, searchQuery]);

  const featuredCards = useMemo(() => cards.filter(c => c.isElite).slice(0, 5), [cards]);

  const addToCompare = (card: Card) => {
    if (compareList.length < 3 && !compareList.find(c => c.id === card.id)) {
      setCompareList([...compareList, card]);
    }
  };

  const removeFromCompare = (id: string) => {
    setCompareList(compareList.filter(c => c.id !== id));
  };

  // Intersection Observer for scroll-reveal effects
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [viewMode, filteredCards]);

  return (
    <div className="min-h-screen flex flex-col bg-black selection:bg-blue-500 selection:text-white">
      <Navbar 
        onViewChange={setViewMode} 
        onAdminToggle={() => setShowAdmin(!showAdmin)} 
        currentView={viewMode}
      />
      
      <main className="flex-grow">
        {viewMode === 'grid' && (
          <div className="flex flex-col">
            <Hero />
            
            <PokeCentre />
            
            <FeaturedShowcase cards={featuredCards} onSelect={setSelectedCard} />
            
            <div id="index-section" className="max-w-7xl mx-auto px-6 py-40">
              <div className="mb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
                <div className="scroll-reveal">
                   <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-[2px] bg-blue-600"></div>
                      <span className="text-blue-500 font-black text-xs uppercase tracking-[0.4em]">Asset Collection v2.0</span>
                   </div>
                  <h2 className="text-7xl md:text-9xl font-black text-white tracking-tighter heading-font leading-none uppercase">
                    THE <span className="shiny-elite">ELITE</span><br />INDEX
                  </h2>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl scroll-reveal">
                  <div className="relative flex-1 group">
                    <div className="absolute inset-0 bg-blue-600/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                    <input 
                      type="text"
                      placeholder="SCANNING DATABASE..."
                      className="relative w-full px-10 py-6 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-blue-500 outline-none text-white font-black placeholder:text-slate-700 tracking-wider transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <CardGrid 
                cards={filteredCards} 
                onCardClick={setSelectedCard} 
                onCompare={addToCompare}
              />
            </div>
          </div>
        )}

        {viewMode === 'timeline' && (
           <div className="pt-32 max-w-7xl mx-auto px-6 min-h-screen">
              <Timeline cards={cards} onCardClick={setSelectedCard} />
           </div>
        )}
      </main>

      <Footer />

      {selectedCard && (
        <CardDetailModal 
          card={selectedCard} 
          onClose={() => setSelectedCard(null)} 
          onCompare={addToCompare}
        />
      )}

      {compareList.length > 0 && (
        <CompareDrawer 
          items={compareList} 
          onRemove={removeFromCompare}
          onClose={() => setCompareList([])}
        />
      )}

      {showAdmin && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="hud-glass rounded-[40px] w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5 text-white">
              <h3 className="text-3xl font-black tracking-tighter uppercase">VAULT PROTOCOL</h3>
              <button onClick={() => setShowAdmin(false)} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-600 transition-colors font-black">×</button>
            </div>
            <div className="overflow-y-auto p-10 bg-black/40">
              <AdminPanel cards={cards} setCards={setCards} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
