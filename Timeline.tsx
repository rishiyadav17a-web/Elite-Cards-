
import React, { useRef } from 'react';
import { Card } from '../types';
import { ERAS } from '../constants';

interface TimelineProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
}

const Timeline: React.FC<TimelineProps> = ({ cards, onCardClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const getCardsByEra = (eraId: string) => {
    return cards.filter(c => c.era === eraId).slice(0, 3);
  };

  return (
    <div className="py-12">
      <h2 className="text-4xl font-black mb-12 text-center tracking-tighter">THE <span className="shiny-gold">CHRONOLOGY</span> OF RARITY</h2>
      
      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-12 gap-12 snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none' }}
      >
        {ERAS.map((era) => {
          const eraCards = getCardsByEra(era.id);
          return (
            <div key={era.id} className="min-w-[400px] snap-center">
              <div className="mb-6 flex items-center gap-4">
                 <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                 <h3 className="text-2xl font-black text-slate-900">{era.label}</h3>
              </div>
              
              <div className="flex gap-4">
                {eraCards.map((card) => (
                  <div 
                    key={card.id} 
                    onClick={() => onCardClick(card)}
                    className="flex-1 group cursor-pointer"
                  >
                    <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-lg relative bg-white border border-slate-100">
                      <img 
                        src={card.images.small} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                        alt={card.name} 
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <span className="text-white text-xs font-bold uppercase tracking-widest border-2 border-white px-4 py-2 rounded-full">View Details</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm font-bold text-slate-800 truncate">{card.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{card.year}</p>
                  </div>
                ))}
                {eraCards.length === 0 && (
                   <div className="flex-1 aspect-[3/4] bg-slate-100 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs uppercase text-center p-4">
                      No Records in Database
                   </div>
                )}
              </div>
              
              {/* Connecting Line */}
              <div className="mt-12 h-0.5 bg-slate-200 relative">
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-4 h-4 bg-white border-4 border-blue-600 rounded-full"></div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-center mt-6 gap-2">
         <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
         <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
         <div className="w-12 h-1 bg-slate-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default Timeline;
