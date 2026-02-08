
import React, { useState } from 'react';
import { Card } from '../types';

interface AdminPanelProps {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ cards, setCards }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const toggleEliteStatus = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, isElite: !c.isElite } : c));
  };

  const refreshPrices = async () => {
    setIsRefreshing(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setCards(prev => prev.map(c => ({
      ...c,
      market_price: {
        ...c.market_price,
        usd: Math.round(c.market_price.usd * (1 + (Math.random() - 0.45) * 0.05)), // Slight fluctuation
        lastUpdated: new Date().toISOString()
      }
    })));
    
    setIsRefreshing(false);
    alert('Prices updated via simulated TCGPlayer & eBay API connector.');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-blue-50 p-6 rounded-3xl border border-blue-100">
        <div>
           <h4 className="text-xl font-bold text-slate-900">Data Synchronization</h4>
           <p className="text-slate-500 text-sm">Refresh market values from external connectors.</p>
        </div>
        <button 
          onClick={refreshPrices}
          disabled={isRefreshing}
          className={`px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-95'}`}
        >
          {isRefreshing ? 'Fetching Data...' : 'Sync Market Prices'}
        </button>
      </div>

      <div className="overflow-hidden border border-slate-200 rounded-3xl">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Card Asset</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Grade</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Market Val</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Elite Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {cards.slice(0, 15).map((card) => (
              <tr key={card.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={card.images.small} className="w-10 h-14 object-cover rounded shadow" alt="" />
                    <div>
                       <p className="font-bold text-slate-900">{card.name}</p>
                       <p className="text-xs text-slate-400">{card.set}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded uppercase">PSA {card.psa_grade}</span>
                </td>
                <td className="px-6 py-4">
                   <p className="font-black text-slate-900">${card.market_price.usd.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleEliteStatus(card.id)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-colors ${card.isElite ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'}`}
                  >
                    {card.isElite ? 'Elite Active' : 'Archive'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-6 bg-slate-50 border-t border-slate-200 text-center">
           <p className="text-xs text-slate-400">Displaying top 15 of {cards.length} records. Use the primary API for full CSV export.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
