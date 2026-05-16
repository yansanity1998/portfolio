import { motion } from 'framer-motion';

import img1 from '../assets/gallery/gallery1.jpg';
import img2 from '../assets/gallery/gallery2.jpg';
import img3 from '../assets/gallery/gallery3.jpg';
import img4 from '../assets/gallery/gallery4.jpg';
import img5 from '../assets/gallery/gallery5.jpg';

const images = [img1, img2, img3, img4, img5];

export default function Gallery() {
  return (
    <section id="gallery" className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center overflow-hidden py-32">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-32"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4">Gallery</h2>
          <p className="text-gray-400 max-w-lg mx-auto tracking-widest uppercase text-xs">Memories</p>
        </motion.div>

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
              duration: 12, // Very fast 12-second continuous rotation
              ease: "linear" 
            }}
          >
            {images.map((src, index) => {
              const angle = index * 72; // 360 / 5 items = 72 degrees each
              return (
                <div
                  key={index}
                  className="absolute inset-0"
                  style={{ 
                    transform: `rotateY(${angle}deg) translateZ(200px)`, // Pushesh the cards out into a circle
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
      </div>
    </section>
  );
}
