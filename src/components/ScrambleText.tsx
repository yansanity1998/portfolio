import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function ScrambleText({ text }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    // Only run the animation when the element is in view
    if (!isInView) {
      // Optional: Reset to full text or keep it as is when out of view. 
      // Keeping it as is avoids flicker before the animation restarts.
      return;
    }

    let iteration = -10; 
    const maxIterations = text.length;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return letter;
            }
            if (letter === ' ') return ' ';
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= maxIterations) {
        clearInterval(interval);
      }

      iteration += 1 / 2; 
    }, 30); 

    return () => clearInterval(interval);
  }, [text, isInView]);

  return <span ref={ref}>{displayText}</span>;
}
