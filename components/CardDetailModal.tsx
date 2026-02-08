
import React, { useEffect, useState } from 'react';
import { Card } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { USD_TO_INR } from '../constants';

interface CardDetailModalProps {
  card: Card;
  onClose: () => void;
  onCompare: (card: Card) => void;
}

const CardDetailModal: React.FC<CardDetailModalProps> = ({ card, onClose, onCompare }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'market'>('details');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const formatUSD = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  const formatINR = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        
        {/* Left Side: Visuals */}
        <div className="md:w-1/2 bg-slate-100 flex items-center justify-center p-8 relative">
           <div className="absolute top-8 left-8">
              <span className="text-slate-400 font-black text-6xl opacity-20 select-none">#{card.id.toUpperCase()}</span>
           </div>
           <img 
              src={card.images.large} 
              alt={card.name} 
              className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl transition-transform hover:scale-105 duration-500"
            />
            <div className="absolute bottom-8 right-8 flex flex-col gap-2 items-end">
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Certified Grade</span>
                <span className="text-4xl font-black text-slate-900">PSA {card.psa_grade || '10'}</span>
            </div>
        </div>

        {/* Right Side: Content */}
        <div className="md:w-1/2 flex flex-col h-full overflow-y-auto">
          <div className="p-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <nav className="flex gap-4 mb-4">
                  <button 
                    onClick={() => setActiveTab('details')}
                    className={`text-sm font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${activeTab === 'details' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => setActiveTab('market')}
                    className={`text-sm font-bold uppercase tracking-widest pb-1 border-b-2 transition-colors ${activeTab === 'market' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'}`}
                  >
                    Market Analysis
                  </button>
                </nav>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">{card.name}</h2>
                <p className="text-lg text-blue-600 font-bold mt-1">{card.set} ({card.year})</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {activeTab === 'details' ? (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-slate-50 p-6 rounded-3xl">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Last Sale</p>
                    <p className="text-2xl font-black text-slate-900">{formatUSD(card.market_price.usd)}</p>
                    <p className="text-sm text-slate-500 font-medium">≈ {formatINR(card.market_price.usd * USD_TO_INR)}</p>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-3xl">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Scarcity Score</p>
                    <div className="flex items-center gap-2">
                       <p className="text-2xl font-black text-slate-900">{card.scarcity_score}/100</p>
                       <div className="h-2 w-16 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: `${card.scarcity_score}%` }}></div>
                       </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Card Information</h4>
                  <ul className="space-y-4">
                    <li className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-500">Edition</span>
                      <span className="font-bold">{card.edition}</span>
                    </li>
                    <li className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-500">Language</span>
                      <span className="font-bold">{card.language}</span>
                    </li>
                    <li className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-slate-500">Top Provenance</span>
                      <span className="font-bold text-blue-600">{card.provenance}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase mb-3">Curator Notes</h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl italic border-l-4 border-blue-600">
                    "{card.notes}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <div className="h-64 w-full bg-slate-50 rounded-3xl p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={card.price_history}>
                      <Tooltip 
                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        formatter={(value: number) => [formatUSD(value), 'Price']}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#2563eb" 
                        strokeWidth={4} 
                        dot={{ r: 4, fill: '#2563eb' }} 
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-slate-900 uppercase">Live Marketplace Links</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <a href="#" className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl hover:scale-[1.02] transition-transform">
                      <span className="font-bold">eBay Sold Listings</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                    <a href="#" className="flex items-center justify-between p-4 bg-blue-600 text-white rounded-2xl hover:scale-[1.02] transition-transform">
                      <span className="font-bold">TCGPlayer Direct</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
                    Last Verified: {new Date(card.market_price.lastUpdated).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-auto p-10 bg-slate-50 flex gap-4">
             <button 
              onClick={() => onCompare(card)}
              className="flex-1 py-4 bg-white border-2 border-slate-200 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
             >
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
               Add to Compare
             </button>
             <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all">
               Buy Now
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;
