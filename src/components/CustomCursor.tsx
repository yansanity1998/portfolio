import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  
  // Motion values for instant updates (Inner Dot)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring physics for smooth trailing (Outer Ring)
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      // Check if we are hovering over something clickable
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
          className="w-full h-full rounded-full border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)] flex items-center justify-center relative"
          animate={{
            scale: isHovering ? 1.6 : 1,
            backgroundColor: isHovering ? "rgba(52, 211, 153, 0.15)" : "rgba(52, 211, 153, 0)",
            borderColor: isHovering ? "rgba(52, 211, 153, 0.8)" : "rgba(52, 211, 153, 0.5)",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
           {/* Tech rotating dashed element inside the ring */}
           <motion.div 
             className="absolute w-[130%] h-[130%] rounded-full border border-dashed border-emerald-400/40"
             animate={{ rotate: 360 }}
             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
           />
        </motion.div>
      </motion.div>

      {/* Instant Following Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[10000] bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.9)]"
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
