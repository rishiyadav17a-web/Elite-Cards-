
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PokeCentre: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Section visibility and scaling - faster fade in to remove visual gaps
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const mainScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.95, 1, 1, 0.95]);

  // Scanning laser dynamics
  const laserPos = useTransform(scrollYProgress, [0.3, 0.9], ["-5%", "105%"]);
  
  // Card movement and 3D Rotation
  const cardY = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [40, 0, -40]);
  const cardRotateX = useTransform(scrollYProgress, [0, 1], [12, -12]);
  
  // THE FLIP: Starts on the back and turns around to reveal Charizard
  const cardRotateY = useTransform(scrollYProgress, [0.4, 0.7], [180, 0]);
  
  // Text reveal pacing
  const textY = useTransform(scrollYProgress, [0.05, 0.25], [40, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  const words = "Every card in the Elite Index is subjected to molecular validation within our proprietary Restoration Chambers.".split(" ");

  const getWordClass = (word: string) => {
    const clean = word.replace(/[.,]/g, '').toUpperCase();
    const goldWords = ['ELITE', 'INDEX', 'MOLECULAR', 'VALIDATION', 'RESTORATION'];
    if (goldWords.includes(clean)) return 'shiny-gold';
    return 'shiny-white';
  };

  return (
    <section ref={containerRef} className="relative h-[180vh] bg-black overflow-visible">
      {/* Dynamic Fire Background Effect */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Warm Glow Base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(239,68,68,0.25),transparent_60%)]"></div>
        
        {/* Animated Embers / Flames */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: 500, 
              x: Math.random() * 2000 - 1000,
              scale: Math.random() * 0.6 + 0.4
            }}
            animate={{ 
              opacity: [0, 0.8, 0], 
              y: -900,
              x: (Math.random() * 2000 - 1000) + (Math.random() * 400 - 200)
            }}
            transition={{ 
              duration: Math.random() * 3 + 4, 
              repeat: Infinity, 
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute bottom-[-10%] left-1/2 w-72 h-72 rounded-full blur-[90px] bg-gradient-to-t from-orange-500 via-red-600 to-transparent"
          />
        ))}
        
        {/* Heat Distort/Pulse */}
        <motion.div 
           animate={{ 
             opacity: [0.2, 0.5, 0.2],
             scale: [1, 1.2, 1]
           }}
           transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(251,146,60,0.2),transparent_50%)]"
        />
      </div>

      <motion.div 
        style={{ opacity, scale: mainScale }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Futuristic Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,100,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse:60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        {/* Diagnostic Lab Header - Removed pt-24 to close the gap with Hero section */}
        <div className="relative z-10 text-center max-w-6xl px-6 pointer-events-none pb-8">
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase leading-none pb-4">
              DIAGNOSTIC <span className="text-blue-500">LAB</span>
            </h2>
            
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-4xl mx-auto">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  className={`text-lg md:text-3xl font-black tracking-tight uppercase leading-tight block sm:inline ${getWordClass(word)}`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* The Scanning Chamber */}
        <div className="relative w-full max-w-lg aspect-[3/4.2] flex items-center justify-center mt-8">
          
          <div className="absolute inset-0 border border-blue-500/20 rounded-[40px] shadow-[inset_0_0_80px_rgba(37,99,235,0.2)]"></div>

          {/* Laser Grid Overlay */}
          <motion.div 
            style={{ top: laserPos }}
            className="absolute left-[-15%] right-[-15%] h-[4px] bg-blue-400 shadow-[0_0_40px_rgba(34,211,238,1)] z-40 flex items-center justify-between"
          >
            <div className="w-5 h-5 bg-blue-400 rounded-full animate-ping"></div>
            <div className="w-5 h-5 bg-blue-400 rounded-full animate-ping"></div>
          </motion.div>

          {/* Floating Asset with 3D Flip */}
          <motion.div 
            style={{ 
              y: cardY, 
              rotateX: cardRotateX,
              rotateY: cardRotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative z-20 w-[260px] md:w-[360px] perspective-container cursor-pointer transition-shadow duration-500"
          >
             {/* Glow matched to the "Fire" theme */}
             <div className="absolute inset-[-90px] bg-orange-600/20 blur-[110px] rounded-full animate-glow"></div>
             
             {/* Front Side: Charizard (Visible after turn around) */}
             <div className="w-full rounded-[24px] md:rounded-[30px] border-2 border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)] overflow-hidden bg-slate-900 relative" style={{ backfaceVisibility: 'hidden' }}>
               <img 
                 src="https://images.pokemontcg.io/base1/4_hires.png" 
                 alt="Scanning Asset Front"
                 className="w-full h-auto block"
               />
               
               {/* THE HOLO SHINE - Metallic sweep across the card */}
               <motion.div 
                 animate={{ 
                   left: ['-100%', '200%'],
                   opacity: [0, 0.4, 0]
                 }}
                 transition={{ 
                   duration: 3, 
                   repeat: Infinity, 
                   ease: "easeInOut"
                 }}
                 className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[25deg] pointer-events-none z-10"
               />

               <div className="absolute inset-0 bg-gradient-to-t from-orange-600/15 to-transparent pointer-events-none"></div>
             </div>

             {/* Back Side: Iconic Card Back (Visible initially) */}
             <div 
              className="absolute inset-0 w-full rounded-[24px] md:rounded-[30px] border-2 border-white/10 shadow-[0_60px_120px_rgba(0,0,0,1)] overflow-hidden bg-[#1a2b45]" 
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
             >
               <img 
                 src="https://images.pokemontcg.io/xy12/108_hires.png" 
                 alt="Scanning Asset Back"
                 className="w-full h-auto block"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent pointer-events-none"></div>
             </div>
             
             {/* Dynamic HUD Labels */}
             <div className="absolute -left-32 top-10 hud-glass p-5 rounded-2xl w-48 hidden lg:block border-l-4 border-blue-500" style={{ transform: 'translateZ(60px)' }}>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Authenticity</p>
                <p className="text-xl font-black text-white">VERIFIED</p>
                <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ width: ["0%", "100%", "94%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="h-full bg-blue-500"
                    />
                </div>
             </div>

             <div className="absolute -right-32 bottom-10 hud-glass p-5 rounded-2xl w-48 hidden lg:block border-r-4 border-red-500" style={{ transform: 'translateZ(60px)' }}>
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Status Report</p>
                <p className="text-xl font-black text-white">OPTIMAL</p>
                <p className="text-[9px] text-slate-500 font-mono mt-3 tracking-tighter leading-none">
                  INTEGRITY: 99.8%<br/>
                  REF: ALPHA-9
                </p>
             </div>
          </motion.div>
        </div>

        {/* Real-time Console Log */}
        <div className="absolute bottom-10 right-10 text-[10px] font-mono text-orange-900/50 text-right leading-loose hidden lg:block uppercase tracking-widest">
           <p>> SCANNING BIO-METRIC DATA</p>
           <p>> HARMONIC FREQUENCY: 442.12 HZ</p>
           <p>> HOLO-DEPTH ANALYZED</p>
           <p>> PSA PROTOCOL SECURED</p>
           <p>> DATA SYNC: 100%</p>
        </div>
      </motion.div>
    </section>
  );
};

export default PokeCentre;
