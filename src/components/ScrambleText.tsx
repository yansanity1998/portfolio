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
    const randomIdx = new Uint8Array(chars.length);
    const updateRandom = () => {
      for (let i = 0; i < chars.length; i++) {
        randomIdx[i] = (Math.random() * CHARS_LENGTH) | 0;
      }
    };
    updateRandom();

    let iteration = -10;
    let frameCount = 0;
    let frameId: number;

    const animate = () => {
      if (!ref.current) return;
      frameCount++;

      if ((frameCount & 1) === 0) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      updateRandom();

      const out = [];
      for (let i = 0; i < chars.length; i++) {
        if (i < iteration) {
          out.push(chars[i]);
        } else if (chars[i] === ' ') {
          out.push(' ');
        } else {
          out.push(CHARS[randomIdx[i]]);
        }
      }
      ref.current.textContent = out.join('');

      if (iteration >= chars.length) {
        hasAnimated.current = true;
        return;
      }

      iteration += 1;
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [text, isInView]);

  return <span ref={ref} />;
}
