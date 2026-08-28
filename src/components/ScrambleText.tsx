import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const CHARS_LENGTH = CHARS.length;

export default function ScrambleText({ text }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    if (hasAnimated.current) {
      if (ref.current) ref.current.textContent = text;
      return;
    }

    const chars = text.split('');
    const len = chars.length;
    let frameId: number;
    const startTime = performance.now();
    const duration = 750; // fast 750ms resolve time

    const animate = (now: number) => {
      if (!ref.current) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Calculate how many characters are resolved based on progress (with smooth easing)
      // Reveal characters progressively across the duration
      const resolvedCount = Math.floor(progress * (len + 4));

      let result = '';
      for (let i = 0; i < len; i++) {
        if (chars[i] === ' ') {
          result += ' ';
        } else if (i < resolvedCount) {
          result += chars[i];
        } else {
          result += CHARS[(Math.random() * CHARS_LENGTH) | 0];
        }
      }

      ref.current.textContent = result;

      if (progress < 1 || resolvedCount < len) {
        frameId = requestAnimationFrame(animate);
      } else {
        ref.current.textContent = text;
        hasAnimated.current = true;
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [text, isInView]);

  return <span ref={ref} />;
}
