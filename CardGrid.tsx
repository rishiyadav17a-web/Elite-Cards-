
import React from 'react';
import { Card } from '../types';
import CardCard from './CardCard';

interface CardGridProps {
  cards: Card[];
  onCardClick: (card: Card) => void;
  onCompare: (card: Card) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onCardClick, onCompare }) => {
  if (cards.length === 0) {
    return (
      <div className="text-center py-32 bg-white/5 rounded-[40px] border-2 border-dashed border-white/10">
        <p className="text-2xl text-slate-500 font-black uppercase tracking-widest">No Encrypted Data Found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
      {cards.map((card, idx) => (
        <div key={card.id} className="scroll-reveal" style={{ transitionDelay: `${(idx % 4) * 150}ms` }}>
          <CardCard 
            card={card} 
            onClick={() => onCardClick(card)} 
            onCompare={() => onCompare(card)}
          />
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
