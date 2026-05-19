import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  // Motion values for instant updates (Inner Dot)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth trailing (Outer Ring)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.closest('a, button, [role="button"]')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Hide the default cursor globally */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Smooth Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] flex items-center justify-center rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className={`w-full h-full rounded-full border flex items-center justify-center relative transition-shadow duration-300 ${
            isLight 
              ? "border-black/30 shadow-[0_0_12px_rgba(0,0,0,0.08)]" 
              : "border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.15)]"
          }`}
          animate={{
            scale: isHovering ? 1.6 : 1,
            backgroundColor: isHovering 
              ? (isLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.12)") 
              : "rgba(0, 0, 0, 0)",
            borderColor: isHovering 
              ? (isLight ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.7)") 
              : (isLight ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.4)"),
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
           {/* Tech rotating dashed element inside the ring */}
           <motion.div 
             className={`absolute w-[130%] h-[130%] rounded-full border border-dashed transition-colors duration-300 ${
               isLight ? "border-black/20" : "border-white/20"
             }`}
             animate={{ rotate: 360 }}
             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
           />
        </motion.div>
      </motion.div>

      {/* Instant Following Inner Dot */}
      <motion.div
        className={`fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10000] rounded-full transition-all duration-300 ${
          isLight 
            ? "bg-black shadow-[0_0_8px_rgba(0,0,0,0.3)]" 
            : "bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
