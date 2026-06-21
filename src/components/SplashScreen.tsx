import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrambleText from './ScrambleText';
import ianImg from '../assets/ian.jpg';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    // Lock scrolling while splash screen is active
    document.body.style.overflow = 'hidden';
    
    // Simulate loading time
    const timer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(timer);
    };
  }, [onComplete]);

  const [bgText, setBgText] = useState<string>('');

  useEffect(() => {
    const generateITBackground = () => {
      const itWords = [
        ' <SYSTEM_CORE_INIT> ', ' [OK] ', ' <LOAD_MODULE> ', 
        ' [0x00FF] ', ' <AWAITING_PROMISE> ', ' { status: 200 } ', 
        ' root@jesper:~# ', ' <AUTH_GRANTED> ', ' [CONNECTION_ESTABLISHED] ', 
        ' function() ', ' <SCANNING_USER> ', ' 127.0.0.1 ', ' [BUFFER_OVERFLOW] ',
        ' SYS_INIT ', ' [KERNEL_OK] '
      ];
      let fullString = '';
      // Increased to 35000 to ensure it covers even ultra-wide/4K monitors completely
      for (let i = 0; i < 35000; i++) {
        fullString += Math.random() > 0.5 ? '1' : '0';
        if (Math.random() > 0.99) {
          fullString += itWords[Math.floor(Math.random() * itWords.length)];
        }
      }
      return fullString;
    };
    
    setBgText(generateITBackground());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
      }}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
    >
      {/* Background Binary / Tech details */}
      <div className="absolute inset-0 opacity-[0.08] text-[10px] sm:text-xs text-white font-mono select-none break-all leading-none overflow-hidden pointer-events-none">
        {bgText}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Profile Image Scanner */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotateX: 45 }}
          animate={{ scale: 1, opacity: 1, rotateX: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-32 h-32 sm:w-48 sm:h-48 flex items-center justify-center p-1"
        >
          {/* Target Box Corners */}
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.4)] z-20"></span>
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.4)] z-20"></span>
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.4)] z-20"></span>
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white shadow-[0_0_10px_rgba(255,255,255,0.4)] z-20"></span>

          <div className="relative w-full h-full overflow-hidden border border-white/20 bg-[#0a0a0a]">
            {/* The Image */}
            <motion.img 
              src={ianImg}
              alt="Jesper Ian"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div 
          className="mt-12 text-white/80 tracking-[0.3em] text-xs sm:text-sm uppercase font-mono flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <span>Authenticating</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mt-4 w-48 sm:w-64 h-[1px] bg-gray-800 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.0, delay: 1.0, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.div
          className="mt-6 text-gray-500 text-[10px] sm:text-xs font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <ScrambleText text="BIOMETRICS_VERIFIED: Jesper Ian" />
        </motion.div>
      </div>
      
      {/* Decorative center lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[1px] bg-white/5 blur-[1px] -rotate-45 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[1px] bg-white/5 blur-[1px] rotate-45 pointer-events-none" />
    </motion.div>
  );
}
