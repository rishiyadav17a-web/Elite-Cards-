
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../types';

interface FeaturedShowcaseProps {
  cards: Card[];
  onSelect: (card: Card) => void;
}

const FeaturedShowcase: React.FC<FeaturedShowcaseProps> = ({ cards, onSelect }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % cards.length);
  const prev = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);

  const activeCard = cards[index];

  return (
    <section className="relative h-screen min-h-[850px] bg-black flex items-center justify-center overflow-hidden z-20">
      
      {/* Dynamic Background Text */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCard.id}
            initial={{ opacity: 0, scale: 0.7, y: 100 }}
            animate={{ opacity: 0.05, scale: 1.2, y: 0 }}
            exit={{ opacity: 0, scale: 1.5, y: -100 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <h2 className="text-[40vw] font-black text-white leading-none tracking-tighter uppercase whitespace-nowrap">
              {activeCard.name.split(' ')[0]}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Card Showcase - 3D Effect */}
          <div className="lg:col-span-6 flex justify-center perspective-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0, rotateY: -30, x: -100 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: 30, x: 100 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative group cursor-pointer"
                onClick={() => onSelect(activeCard)}
              >
                {/* Visual Glow */}
                <div className="absolute inset-[-60px] bg-blue-600/10 blur-[100px] rounded-full opacity-30 animate-pulse"></div>
                
                <img 
                  src={activeCard.images.large} 
                  alt={activeCard.name}
                  className="w-[340px] md:w-[480px] rounded-[36px] shadow-[0_60px_100px_-20px_rgba(0,0,0,1)] border border-white/10 hover:border-white/30 transition-all duration-700"
                />
                
                <div className="absolute -bottom-8 -right-8 hud-glass px-8 py-6 rounded-[32px] border-blue-500/40">
                   <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Asset Grade</p>
                   <p className="text-6xl font-black text-white tracking-tighter">GEM 10</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Asset Info & Market Value */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard.id + '-meta'}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-[2px] bg-blue-600"></div>
                   <span className="text-blue-500 font-black tracking-[0.4em] uppercase text-[10px]">Vault Asset 00{index + 1}</span>
                </div>
                
                <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none uppercase heading-font text-white italic">
                   {activeCard.name}
                </h2>
                
                <div className="grid grid-cols-2 gap-8 mb-16">
                   <div className="border-l-4 border-blue-900 pl-6 bg-white/5 py-4 rounded-r-2xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Live Stock Value</p>
                      <p className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                        ${activeCard.market_price.usd.toLocaleString()}
                      </p>
                   </div>
                   <div className="border-l-4 border-slate-800 pl-6 bg-white/5 py-4 rounded-r-2xl">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Resale Index</p>
                      <p className="text-4xl md:text-5xl font-black text-green-400 tracking-tighter">+14.2%</p>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button 
                     onClick={() => onSelect(activeCard)}
                     className="px-14 py-6 bg-white text-black rounded-full font-black text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl"
                  >
                    VIEW ASSET DATA
                  </button>
                  <div className="flex gap-3">
                     <button onClick={prev} className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7"/></svg>
                     </button>
                     <button onClick={next} className="w-20 h-20 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7"/></svg>
                     </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedShowcase;
