import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

export default function TypewriterText({ text, speed = 15 }: TypewriterTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    if (hasAnimated.current) {
      if (ref.current) ref.current.textContent = text;
      return;
    }

    if (ref.current) ref.current.textContent = '';

    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex++;
      if (currentIndex > text.length) {
        hasAnimated.current = true;
        clearInterval(interval);
        return;
      }
      if (ref.current) ref.current.textContent = text.slice(0, currentIndex);
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [text, isInView, speed]);

  return <span ref={ref} />;
}
