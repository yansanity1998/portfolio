import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MonitorPlay } from 'lucide-react';

const words = ["Full Stack Developer", "UI/UX Designer", "Web Developer"];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-hidden relative font-sans selection:bg-emerald-500/30">
      
      {/* Background Waves */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
         <motion.div 
           initial={{ opacity: 0 }} 
           animate={{ opacity: 1 }} 
           transition={{ duration: 2 }}
           className="w-full h-full relative flex items-center justify-center"
         >
           <svg className="absolute w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
             {Array.from({ length: 60 }).map((_, i) => (
               <motion.path
                 key={i}
                  d={`M0,500 C300,${50 + i * 20} 700,${950 - i * 20} 1000,500`}
                  fill="none"
                  stroke={`rgba(255,255,255,${0.02 + i * 0.005})`}
                  strokeWidth={1}
                  animate={{
                    d: [
                      `M0,500 C300,${50 + i * 20} 700,${950 - i * 20} 1000,500`,
                      `M0,500 C300,${950 - i * 20} 700,${50 + i * 20} 1000,500`,
                      `M0,500 C300,${50 + i * 20} 700,${950 - i * 20} 1000,500`
                    ]
                 }}
                 transition={{ duration: 10 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
               />
             ))}
           </svg>
         </motion.div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full px-8 md:px-16 py-8 flex justify-between items-center z-50">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-bold text-3xl tracking-tighter cursor-pointer"
        >
          Jesper
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-8 items-center"
        >
          <a href="#" className="px-6 py-2.5 bg-white text-black rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">Home</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Awards</a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact</a>
        </motion.div>
      </nav>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center min-h-screen relative z-10 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-[4rem] sm:text-6xl md:text-8xl lg:text-[8rem] font-bold tracking-tight mb-4 text-center pointer-events-auto bg-clip-text text-transparent bg-[length:200%_100%] bg-gradient-to-r from-white/20 via-white to-white/20 animate-shimmer"
          style={{ textShadow: "0 10px 40px rgba(255,255,255,0.15)" }}
        >
          Jesper Ian V. Barila
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 sm:gap-6 md:gap-10 text-lg sm:text-xl md:text-3xl font-medium mt-4 pointer-events-auto"
        >
          {words.map((word, idx) => {
            const isActive = idx === activeIndex;
            return (
              <div key={word} className="relative px-4 py-2 flex items-center justify-center">
                <span className={`transition-all duration-700 z-10 ${isActive ? 'text-white' : 'text-gray-500 blur-[1px] opacity-50'}`}>
                  {word}
                </span>
                
                {/* Targeting Box */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      layoutId="targetBox"
                      className="absolute inset-0 border border-emerald-400/20 z-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {/* Corners */}
                      <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                      <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                      <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
                      
                      {/* Scanning line animation */}
                      <motion.div 
                        className="absolute left-0 right-0 h-[1px] bg-emerald-400/50 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                        initial={{ top: 0, opacity: 0 }}
                        animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Left Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-10 left-10 z-50 flex items-center justify-center cursor-pointer"
      >
      </motion.div>

      {/* Bottom Right Socials */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-10 right-10 z-50 flex flex-col gap-6"
      >
        <a href="#" className="text-gray-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
        </a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a href="#" className="text-gray-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5441 11.4528C13.5441 15.0506 10.6358 17.9678 7.04207 17.9678C3.44837 17.9678 0.539062 15.0506 0.539062 11.4528C0.539062 7.85494 3.44837 4.93781 7.04207 4.93781C10.6358 4.93781 13.5441 7.85494 13.5441 11.4528ZM21.3283 11.4528C21.3283 14.8519 19.8601 17.608 18.0494 17.608C16.2387 17.608 14.7705 14.8519 14.7705 11.4528C14.7705 8.05362 16.2387 5.29759 18.0494 5.29759C19.8601 5.29759 21.3283 8.05362 21.3283 11.4528ZM23.4619 11.4528C23.4619 14.3316 22.9568 16.6669 22.3339 16.6669C21.7109 16.6669 21.2058 14.3316 21.2058 11.4528C21.2058 8.57393 21.7109 6.2386 22.3339 6.2386C22.9568 6.2386 23.4619 8.57393 23.4619 11.4528Z" />
          </svg>
        </a>
      </motion.div>

    </div>
  );
}
