
import React from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  onViewChange: (view: ViewMode) => void;
  onAdminToggle: () => void;
  currentView: ViewMode;
}

const Navbar: React.FC<NavbarProps> = ({ onViewChange, onAdminToggle, currentView }) => {
  return (
    <nav className="fixed top-0 w-full z-40 hud-glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-red-600 rounded-full border-2 border-black relative flex items-center justify-center overflow-hidden">
                <div className="w-full h-1/2 bg-white absolute bottom-0"></div>
                <div className="w-full h-1 bg-black absolute top-1/2 -translate-y-1/2"></div>
                <div className="w-3 h-3 bg-white border-2 border-black rounded-full z-10"></div>
            </div>
            <span className="text-2xl font-black tracking-tighter text-white uppercase">
              ELITE<span className="text-blue-500">CARDS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onViewChange('grid')}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'grid' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}
            >
              The Collection
            </button>
            <button 
              onClick={() => onViewChange('timeline')}
              className={`text-xs font-black uppercase tracking-widest transition-colors ${currentView === 'timeline' ? 'text-blue-500' : 'text-slate-400 hover:text-white'}`}
            >
              Asset Evolution
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onAdminToggle}
              className="px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-white text-black rounded-full hover:bg-blue-600 hover:text-white transition-all active:scale-95"
            >
              Admin Access
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
