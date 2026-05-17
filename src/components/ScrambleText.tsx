import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface ScrambleTextProps {
  text: string;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function ScrambleText({ text }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;

    let iteration = -10;
    let frameId: number;

    const animate = () => {
      if (!ref.current) return;

      const displayText = text
        .split('')
        .map((letter, index) => {
          if (index < iteration) return letter;
          if (letter === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      ref.current.textContent = displayText;

      if (iteration >= text.length) return;

      iteration += 1 / 2;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [text, isInView]);

  return <span ref={ref} />;
}
