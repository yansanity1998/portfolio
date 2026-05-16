import { useState } from 'react';
import { motion } from 'framer-motion';

import img1 from '../assets/gallery/gallery1.jpg';
import img2 from '../assets/gallery/gallery2.jpg';
import img3 from '../assets/gallery/gallery3.jpg';
import img4 from '../assets/gallery/gallery4.jpg';
import img5 from '../assets/gallery/gallery5.jpg';

const images = [img1, img2, img3, img4, img5];

const rawText = "Besides being a developer and content creator, I am big on competitions, like hackathons. It is a great way to work with ambitious people, joining actual problems and meet interesting people. Here are some of the events I've participated in:";
const highlightWords = ["competitions,", "hackathons.", "problems", "interesting", "events"];

// Pre-calculate stable random scattering values for each word
const textArray = rawText.split(" ").map(word => {
  const isHighlight = highlightWords.includes(word);
  return {
    word,
    isHighlight,
    offsetX: (Math.random() - 0.5) * 100, // Random X spread
    offsetY: (Math.random() - 0.5) * 80,  // Random Y spread
    rotate: (Math.random() - 0.5) * 100,  // Random rotation tilt
  };
});

export default function Gallery() {
  const [brokenWords, setBrokenWords] = useState<number[]>([]);

  const handleWordHover = (index: number) => {
    if (!brokenWords.includes(index)) {
      setBrokenWords(prev => [...prev, index]);
    }
  };

  return (
    <section id="gallery" className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-16 md:mb-24 text-center"
        >
          Gallery
        </motion.h2>

        {/* 3D Circle Carousel Container */}
        <div 
          className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center"
          style={{ perspective: '1000px' }}
        >
          <motion.div 
            className="relative w-[220px] h-[300px] md:w-[260px] md:h-[360px]"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateY: [0, -360] }}
            transition={{ 
              repeat: Infinity, 
              duration: 12,
              ease: "linear" 
            }}
          >
            {images.map((src, index) => {
              const angle = index * 72;
              return (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{ 
                    transform: `rotateY(${angle}deg) translateZ(200px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="w-full h-full rounded-lg overflow-hidden border-2 border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.15)] relative bg-black group">
                    <img 
                      src={src} 
                      alt={`Gallery ${index}`} 
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16 md:mt-24 w-full"
        >
          {/* Interactive Hover Scramble Text */}
          <div className="max-w-4xl mx-auto px-4 min-h-[150px] flex items-center justify-center">
            <p className="text-lg md:text-2xl text-gray-400 font-medium leading-relaxed flex flex-wrap justify-center gap-x-[0.4rem] gap-y-1 md:gap-x-[0.5rem] md:gap-y-2 relative z-20">
              {textArray.map((item, i) => {
                const isWordBroken = brokenWords.includes(i);
                return (
                  <motion.span
                    key={i}
                    onMouseEnter={() => handleWordHover(i)}
                    animate={{
                      x: isWordBroken ? item.offsetX : 0,
                      y: isWordBroken ? item.offsetY : 0,
                      rotate: isWordBroken ? item.rotate : 0,
                      scale: isWordBroken ? (item.isHighlight ? 1.1 : 0.9) : 1,
                      color: isWordBroken 
                        ? (item.isHighlight ? '#34d399' : '#ffffff') 
                        : (item.isHighlight ? '#6ee7b7' : '#9ca3af')
                    }}
                    transition={{ type: "spring", stiffness: 120, damping: 12, mass: 0.8 }}
                    className="inline-block whitespace-pre select-none cursor-crosshair"
                  >
                    {item.word}
                  </motion.span>
                );
              })}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
