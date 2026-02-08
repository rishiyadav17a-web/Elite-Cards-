
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  // Title animations - subtle parallax and fade
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const titleScale = useTransform(scrollY, [0, 400], [1, 0.95]);
  const titleY = useTransform(scrollY, [0, 400], [0, -40]);
  
  // Pokéball movement logic
  // Adjusted scroll range from 1200 to 1000 to match the shorter h-screen height
  const ballX = useTransform(scrollY, [0, 1000], [-400, 2400]);
  const ballRotate = useTransform(scrollY, [0, 1000], [0, 1440]);
  const ballOpacity = useTransform(scrollY, [0, 100, 700, 1000], [0, 1, 1, 0]);
  
  // Adjust vertical position to be right below the text
  const ballTop = "68%"; 

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black z-30">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.12),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <motion.div 
        style={{ opacity: titleOpacity, scale: titleScale, y: titleY }}
        className="relative z-10 text-center px-4 max-w-7xl flex flex-col items-center select-none"
      >
        <h1 className="text-[16vw] font-black leading-none tracking-tighter mb-4 heading-font uppercase flex flex-col items-center">
          <motion.span 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="shiny-elite"
          >
            ELITE
          </motion.span>
          <motion.span 
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]"
          >
            CARDS
          </motion.span>
        </h1>
        
        {/* Subtle ground line for the ball to roll on */}
        <motion.div 
           initial={{ width: 0, opacity: 0 }}
           animate={{ width: "80%", opacity: 0.2 }}
           transition={{ delay: 0.8, duration: 1.5 }}
           className="h-[1px] bg-gradient-to-r from-transparent via-white to-transparent mt-12"
        />
      </motion.div>

      {/* The Rolling Pokeball with High-Fidelity Shine */}
      <motion.div 
        style={{ 
          x: ballX, 
          rotate: ballRotate,
          opacity: ballOpacity,
          top: ballTop
        }}
        className="absolute left-0 w-36 h-36 md:w-56 md:h-56 pointer-events-none z-20"
      >
        <div className="w-full h-full bg-red-600 rounded-full border-[10px] md:border-[12px] border-black relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.9),inset_0_-15px_30px_rgba(0,0,0,0.4)]">
            {/* White Bottom Half */}
            <div className="w-full h-1/2 bg-white absolute bottom-0 shadow-[inset_0_15px_30px_rgba(0,0,0,0.1)]"></div>
            
            {/* Middle Black Band */}
            <div className="w-full h-5 md:h-8 bg-black absolute top-1/2 -translate-y-1/2 z-10"></div>
            
            {/* Center Button - Multi-layered for depth */}
            <div className="w-16 h-16 md:w-24 md:h-24 bg-white border-[8px] md:border-[10px] border-black rounded-full z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center shadow-xl">
                <div className="w-8 h-8 md:w-12 md:h-12 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-inner">
                    <div className="w-3 h-3 md:w-5 md:h-5 bg-slate-50 rounded-full shadow-inner animate-pulse"></div>
                </div>
            </div>

            {/* THE SHINE - Ultra Premium Gloss Effect */}
            <motion.div 
              animate={{ 
                x: ['-200%', '400%'],
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.2
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent w-full h-full skew-x-[35deg] z-30 pointer-events-none"
            />

            {/* Volume-defining specular highlights */}
            <div className="absolute top-[8%] left-[18%] w-1/3 h-1/3 bg-white/25 blur-2xl rounded-full z-30"></div>
            <div className="absolute top-[5%] left-[12%] w-10 h-10 bg-white/60 blur-md rounded-full z-30"></div>

            {/* Ambient Occlusion / Shadowing */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/80 pointer-events-none"></div>
        </div>
        
        {/* Dynamic Shadow on the 'floor' */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%] h-6 bg-black/60 blur-2xl rounded-full -z-10"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
