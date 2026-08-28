import { useEffect, useRef } from 'react';

interface HeroWavesProps {
  theme: string;
}

export default function HeroWaves({ theme }: HeroWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const isLight = theme === 'light';
    const linesCount = 45;
    
    // Pre-calculate line configs
    const lines = Array.from({ length: linesCount }, (_, i) => ({
      y1Offset: 50 + i * (900 / linesCount),
      y2Offset: 950 - i * (900 / linesCount),
      speed: 0.00035 + (i * 0.000008),
      alpha: 0.03 + i * (0.35 / linesCount),
    }));

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const midY = height * 0.5;

      for (let i = 0; i < linesCount; i++) {
        const line = lines[i];
        // Calculate oscillation smoothly between y1Offset and y2Offset
        const t = (Math.sin(time * line.speed) + 1) / 2; // 0 to 1
        const currentY1 = (line.y1Offset * (1 - t) + line.y2Offset * t) * (height / 1000);
        const currentY2 = (line.y2Offset * (1 - t) + line.y1Offset * t) * (height / 1000);

        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.bezierCurveTo(
          width * 0.3, currentY1,
          width * 0.7, currentY2,
          width, midY
        );

        ctx.strokeStyle = isLight
          ? `rgba(15, 23, 42, ${line.alpha})`
          : `rgba(255, 255, 255, ${line.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [theme]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
