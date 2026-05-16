import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

export default function TypewriterText({ text, speed = 15 }: TypewriterTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });

  useEffect(() => {
    if (!isInView) {
      setCurrentIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [text, isInView, speed]);

  return (
    <span ref={ref} className="inline">
      <span>{text.slice(0, currentIndex)}</span>
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {text.slice(currentIndex)}
      </span>
    </span>
  );
}
