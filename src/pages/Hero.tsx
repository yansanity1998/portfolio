import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

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
          <a href="#gallery" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Gallery</a>
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
        className="fixed bottom-10 right-10 z-50 flex flex-col gap-6"
      >
        <a href="https://github.com/yansanity1998" className="text-gray-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200">
          <FaGithub size={24} />
        </a>
        <a href="https://www.linkedin.com/in/jesper-ian-barila-269086334/?locale=en" className="text-gray-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200">
          <FaLinkedin size={24} />
        </a>
        <a href="https://www.facebook.com/jesper.ian.villacorte.barila" className="text-gray-500 hover:text-white transition-colors hover:-translate-y-1 transform duration-200">
          <FaFacebook size={24} />
        </a>
      </motion.div>

    </div>
  );
}
