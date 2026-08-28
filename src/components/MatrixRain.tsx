import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾔﾕﾗﾘﾜ';
    const charLen = chars.length;
    const fontSize = 16;
    const spacing = 36; // Wide spacing for a clean, minimal aesthetic (fewer columns)

    let columns = Math.floor((canvas.width || window.innerWidth) / spacing);
    
    // Structure each rain drop column
    interface Drop {
      x: number;
      y: number;
      speed: number;
      chars: string[];
      length: number;
    }

    let drops: Drop[] = [];

    const initDrops = () => {
      columns = Math.floor(canvas.width / spacing);
      drops = [];
      for (let i = 0; i < columns; i++) {
        // Only activate ~40% of columns for a minimal, non-crowded look
        if (Math.random() > 0.45) continue;

        const length = 6 + ((Math.random() * 8) | 0);
        const columnChars: string[] = [];
        for (let k = 0; k < length; k++) {
          columnChars.push(chars[(Math.random() * charLen) | 0]);
        }

        drops.push({
          x: i * spacing + 10,
          y: Math.random() * -canvas.height,
          speed: 1.2 + Math.random() * 1.5,
          chars: columnChars,
          length
        });
      }
    };

    initDrops();

    const isLight = theme === 'light';
    let lastTime = performance.now();

    const draw = (now: number) => {
      const delta = Math.min((now - lastTime) / 16.66, 2); // Frame-rate independent
      lastTime = now;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        drop.y += drop.speed * delta;

        // Draw each character in this drop trail
        for (let j = 0; j < drop.length; j++) {
          const charY = drop.y - j * fontSize;

          if (charY < 0 || charY > canvas.height + fontSize) continue;

          // Head character is slightly brighter; tail fades out
          if (j === 0) {
            ctx.fillStyle = isLight 
              ? 'rgba(15, 23, 42, 0.45)' 
              : 'rgba(255, 255, 255, 0.7)';
          } else {
            const alpha = (1 - j / drop.length) * (isLight ? 0.15 : 0.22);
            ctx.fillStyle = isLight
              ? `rgba(15, 23, 42, ${alpha})`
              : `rgba(255, 255, 255, ${alpha})`;
          }

          ctx.fillText(drop.chars[j], drop.x, charY);
        }

        // Randomly mutate 1 character occasionally for digital flicker without heavy per-frame random calls
        if (Math.random() < 0.05) {
          const mutateIdx = (Math.random() * drop.length) | 0;
          drop.chars[mutateIdx] = chars[(Math.random() * charLen) | 0];
        }

        // Reset drop to top when it falls below screen
        if (drop.y - drop.length * fontSize > canvas.height) {
          drop.y = Math.random() * -120;
          drop.speed = 1.2 + Math.random() * 1.5;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
