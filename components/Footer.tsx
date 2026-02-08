
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/5 text-slate-500 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-3xl font-black mb-8 tracking-tighter">ELITE<span className="text-blue-500">CARDS</span></h3>
            <p className="max-w-md leading-relaxed text-lg font-medium">
              The premier intelligence platform for ultra-high-end trading card assets. 
              Real-time validation, historical provenance, and market-ready insights for the world's most elite collectors.
            </p>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-blue-500 transition-colors">The Vault</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Market Intel</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Whitepaper</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase text-xs tracking-[0.3em] mb-8">Protocol</h4>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Legal Framework</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Shield</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Support Hub</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] font-black mb-6 text-slate-700">Legal Notice & Intellectual Property Disclosure</p>
          <p className="text-[10px] max-w-5xl mx-auto leading-loose uppercase tracking-widest opacity-40">
            ELITE CARDS IS AN INDEPENDENT RESEARCH AND DATA AGGREGATION PLATFORM. WE ARE NOT AFFILIATED WITH, ENDORSED BY, OR SPONSORED BY THE POKÉMON COMPANY, NINTENDO, CREATURES, OR GAME FREAK. 
            POKÉMON AND ALL CHARACTER NAMES ARE TRADEMARKS OF NINTENDO. PRODUCT IMAGERY IS UTILIZED FOR NOMINATIVE FAIR USE PURPOSES TO IDENTIFY AUTHENTIC ASSETS. 
            SCANS ARE USER-GENERATED OR SOURCED FROM PUBLIC DOMAIN MARKETPLACES.
          </p>
          <p className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-blue-900">© 2024 ELITE CARDS INTELLIGENCE v2.0.4. ALL SYSTEMS OPERATIONAL.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
