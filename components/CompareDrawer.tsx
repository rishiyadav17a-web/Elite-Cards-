
import React from 'react';
import { Card } from '../types';

interface CompareDrawerProps {
  items: Card[];
  onRemove: (id: string) => void;
  onClose: () => void;
}

const CompareDrawer: React.FC<CompareDrawerProps> = ({ items, onRemove, onClose }) => {
  const formatUSD = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-4xl mx-auto mb-6 px-4">
        <div className="bg-slate-900 rounded-[32px] p-6 shadow-2xl border border-slate-700/50 backdrop-blur-xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
               <span className="bg-blue-600 text-white text-xs font-black px-2 py-1 rounded-md">{items.length}/3</span>
               <h3 className="text-white font-bold text-lg tracking-tight">Compare Assets</h3>
            </div>
            <div className="flex gap-4">
               <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors text-sm font-bold">Clear All</button>
               <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-bold hover:bg-blue-700 transition-colors">Compare Analysis</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => {
              const card = items[i];
              return (
                <div key={i} className="relative aspect-[3/4] rounded-2xl bg-slate-800/50 border border-dashed border-slate-700 flex items-center justify-center overflow-hidden">
                  {card ? (
                    <>
                      <img src={card.images.small} className="w-full h-full object-cover opacity-80" alt={card.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 flex flex-col justify-end p-4">
                         <p className="text-white text-xs font-bold truncate">{card.name}</p>
                         <p className="text-blue-400 text-sm font-black">{formatUSD(card.market_price.usd)}</p>
                      </div>
                      <button 
                        onClick={() => onRemove(card.id)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-lg leading-none"
                      >
                        ×
                      </button>
                    </>
                  ) : (
                    <span className="text-slate-600 text-xs font-bold uppercase tracking-widest">Select Card</span>
                  )}
                </div>
              );
            })}
          </div>
          
          {items.length > 1 && (
             <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-3 gap-6 text-center">
                <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Price Growth</p>
                   <p className="text-green-400 text-sm font-bold">+12.4%</p>
                </div>
                <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Avg Grade</p>
                   <p className="text-white text-sm font-bold">PSA 9.8</p>
                </div>
                <div>
                   <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Market Sentiment</p>
                   <p className="text-blue-400 text-sm font-bold">Bullish</p>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompareDrawer;
