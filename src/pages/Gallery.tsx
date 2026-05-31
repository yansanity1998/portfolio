import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import AnimatedTitle from '../components/AnimatedTitle';

import img1 from '../assets/gallery/gallery1.jpg';
import img2 from '../assets/gallery/gallery2.jpg';
import img3 from '../assets/gallery/gallery3.jpg';
import img4 from '../assets/gallery/gallery4.jpg';
import img5 from '../assets/gallery/gallery5.jpg';
import img6 from '../assets/gallery/gallery6.jpg';
import img7 from '../assets/gallery/gallery7.jpg';
import img8 from '../assets/gallery/gallery8.jpg';
import img9 from '../assets/gallery/gallery9.jpg';
import img10 from '../assets/gallery/gallery10.png';
import img11 from '../assets/gallery/gallery11.jpg';
import img12 from '../assets/gallery/gallery12.jpg';
import img13 from '../assets/gallery/gallery13.jpg';
import img14 from '../assets/gallery/gallery14.jpg';
import img15 from '../assets/gallery/gallery15.jpg';

const leftImages = [img11, img12, img13, img14, img15];
const centerImages = [img1, img2, img3, img4, img5];
const rightImages = [img6, img7, img8, img9, img10];

const rawText = "A collection of moments from my journey as a developer and creator — building projects, exploring new technologies, and constantly pushing creative boundaries. Here are some snapshots along the way:";
const highlightWords = ["moments", "building", "exploring", "boundaries", "snapshots"];

// Pre-calculate stable random scattering values for each word
const textArray = rawText.split(" ").map(word => {
    const isHighlight = highlightWords.includes(word);
    return {
        word,
        isHighlight,
        offsetX: (Math.random() - 0.5) * 100,
        offsetY: (Math.random() - 0.5) * 80,
        rotate: (Math.random() - 0.5) * 100,
    };
});

export default function Gallery() {
    const [brokenWords, setBrokenWords] = useState<number[]>([]);
    const [activeCarousel, setActiveCarousel] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const { theme } = useTheme();

    const touchStartX = useRef(0);
    const isSwipingRef = useRef(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
        isSwipingRef.current = false;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (Math.abs(e.touches[0].clientX - touchStartX.current) > 20) {
            isSwipingRef.current = true;
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) {
            setActiveCarousel(prev => {
                if (diff > 0) return prev > 0 ? prev - 1 : 2;
                return prev < 2 ? prev + 1 : 0;
            });
        }
    };

    const handleWordHover = (index: number) => {
        if (!brokenWords.includes(index)) {
            setBrokenWords(prev => [...prev, index]);
        }
    };

    return (
        <section id="gallery" className="min-h-screen bg-[#050505] relative flex flex-col items-center justify-center overflow-hidden py-32">

            {/* Background Ambient Glow */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none z-0 transition-colors duration-300 ${
                theme === 'light' ? 'bg-slate-200/30' : 'bg-white/5'
            }`}></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
                <AnimatedTitle 
                    text="Gallery"
                    className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-16 md:mb-24 justify-center"
                />

                {/* 3D Circle Carousels Container */}
                <div
                    className="relative w-full flex items-center justify-center gap-0 md:gap-40 h-[350px] md:h-[450px] overflow-hidden"
                    style={{ touchAction: 'pan-y' }}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {[0, 1, 2].map((carouselIndex) => {
                        const isActive = activeCarousel === carouselIndex;
                        return (
                            <motion.div
                                key={carouselIndex}
                                className="relative flex items-center justify-center cursor-pointer"
                                style={{ perspective: '1000px' }}
                                animate={{
                                    scale: isActive ? 1 : (isMobile ? 0.6 : 0.45),
                                    opacity: isActive ? 1 : (isMobile ? 0.7 : 0.4),
                                    zIndex: isActive ? 10 : 1,
                                    x: isActive ? 0 : (
                                        isMobile
                                            ? (carouselIndex < activeCarousel ? 60 : -60)
                                            : (carouselIndex < activeCarousel ? -60 : 60)
                                    )
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                onClick={() => {
                                    if (!isSwipingRef.current) setActiveCarousel(carouselIndex);
                                }}
                            >
                                <motion.div
                                    className="relative w-[140px] h-[200px] md:w-[220px] md:h-[300px]"
                                    style={{ transformStyle: 'preserve-3d' }}
                                    animate={{ rotateY: [0, carouselIndex % 2 === 0 ? -360 : 360] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 15 + carouselIndex * 2,
                                        ease: "linear"
                                    }}
                                >
                                    {(carouselIndex === 0 ? leftImages : carouselIndex === 1 ? centerImages : rightImages).map((src, index) => {
                                        const angle = index * 72;
                                        return (
                                            <div
                                                key={index}
                                                className="absolute inset-0"
                                                style={{
                                                    transform: `rotateY(${angle}deg) translateZ(clamp(120px, 15vw, 200px))`,
                                                    transformStyle: 'preserve-3d'
                                                }}
                                            >
                                                <div className="w-full h-full rounded-lg overflow-hidden border-2 border-white/80 shadow-[0_0_30px_rgba(255,255,255,0.15)] relative bg-black group pointer-events-none">
                                                    <img
                                                        src={src}
                                                        alt={`Gallery ${index}`}
                                                        className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-500 contrast-[1.1] saturate-[1.1] brightness-[1.05]"
                                                        style={{ imageRendering: '-webkit-optimize-contrast' as any }}
                                                    />
                                                </div>
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            </motion.div>
                        );
                    })}
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
                                                ? (item.isHighlight ? (theme === 'light' ? '#000000' : '#ffffff') : (theme === 'light' ? '#475569' : '#d1d5db'))
                                                : (item.isHighlight ? (theme === 'light' ? '#0f172a' : '#ffffff') : (theme === 'light' ? '#64748b' : '#9ca3af'))
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
