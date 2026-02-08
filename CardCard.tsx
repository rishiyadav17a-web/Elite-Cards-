
import React from 'react';
import { Card } from '../types';

interface CardCardProps {
  card: Card;
  onClick: () => void;
  onCompare: () => void;
}

const CardCard: React.FC<CardCardProps> = ({ card, onClick, onCompare }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(card.market_price.usd);

  return (
    <div className="group relative flex flex-col bg-slate-900 rounded-[32px] overflow-hidden border border-white/5 hover:border-blue-500/50 transition-all duration-700 hover:-translate-y-4 shadow-2xl">
      {/* Holofoil Shimmer Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.4)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shine_3s_infinite]"></div>

      <div 
        className="relative aspect-[3.5/5] overflow-hidden cursor-pointer bg-slate-800"
        onClick={onClick}
      >
        <img 
          src={card.images.small} 
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Top HUD */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
           <div className="bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">
              PSA {card.psa_grade}
           </div>
           <button 
            onClick={(e) => { e.stopPropagation(); onCompare(); }}
            className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all scale-0 group-hover:scale-100 duration-500 shadow-xl"
           >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4"/></svg>
           </button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
      </div>

      <div className="p-8 flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-black text-white truncate heading-font tracking-tight uppercase leading-none">{card.name}</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-2">{card.set} — {card.year}</p>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Current Index</p>
             <p className="text-2xl font-black text-white">{formattedPrice}</p>
          </div>
          <div className="text-right">
             <span className="px-3 py-1 bg-white/5 text-slate-400 text-[8px] font-black rounded-lg uppercase tracking-widest border border-white/5">
               {card.era}
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCard;
