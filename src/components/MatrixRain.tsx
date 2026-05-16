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
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters (Alphanumeric + Katakana)
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const charArray = chars.split('');

    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);

    // Drops coordinates
    let drops: number[] = [];
    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // start drops at random negative positions
      }
    };
    initDrops();

    const draw = () => {
      // Clear canvas completely to keep it 100% transparent and prevent layering issues
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      const trailLength = 15;

      for (let i = 0; i < drops.length; i++) {
        // Draw the trail of characters above drops[i]
        for (let j = 0; j < trailLength; j++) {
          const y = (drops[i] - j) * fontSize;

          // Skip if character is above the top of the canvas
          if (y < 0) continue;

          // Calculate opacity: head (j = 0) is brightest, tail is dimmest
          const opacity = (1 - j / trailLength) * 0.45;

          const char = charArray[Math.floor(Math.random() * charArray.length)];
          const x = i * fontSize;

          if (j === 0) {
            // Head character is extra bright/solid
            ctx.fillStyle = theme === 'dark' 
              ? 'rgba(167, 243, 208, 0.95)' 
              : 'rgba(15, 23, 42, 0.85)';
          } else {
            // Trail characters
            ctx.fillStyle = theme === 'dark' 
              ? `rgba(16, 185, 129, ${opacity})` 
              : `rgba(15, 23, 42, ${opacity * 0.7})`; // Dark slate in light mode
          }

          ctx.fillText(char, x, y);
        }

        // Reset drop when it goes off screen with a slight random chance
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment drop position
        drops[i] += 0.5; // Slightly slower speed (0.5 instead of 1) for a smoother look
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

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
