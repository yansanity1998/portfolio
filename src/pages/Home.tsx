import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import ianImg from '../assets/ian.jpg';
import { useTheme } from '../context/ThemeContext';

const devSkills = ["React", "TypeScript", "Tailwind", "JavaScript", "HTML", "CSS", "PHP", "Laravel", "Firebase", "Supabase", "Vercel", "Netlify", "MySQL"];
const createSkills = ["Figma", "Canva", "Capcut", "Adobe Premiere Pro", "Adobe Illustrator"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 80, damping: 20 } }
};

export default function Home() {
  const sectionRef = useRef(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transform for the right side
  const yTransform = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="about" ref={sectionRef} className="min-h-screen bg-[#050505] text-white py-32 px-8 md:px-16 flex items-center justify-center relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left Side: Skills */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-16"
        >
          {/* Develop Section */}
          <motion.div variants={itemVariants} className="relative py-8 group">
            <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-4">
              DEVELOP
              <span className="h-[1px] flex-1 bg-gradient-to-r from-gray-700 to-transparent"></span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              Building modern web applications with React, TypeScript, and Tailwind, backed by PHP and Laravel for robust server-side solutions.
            </p>
            <h4 className="text-emerald-400 text-sm font-bold mb-4 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">Skillset & tools</h4>
            <div className="flex flex-wrap gap-3">
              {devSkills.map(skill => (
                <span key={skill} className="px-4 py-2 border border-gray-800 bg-gray-900/30 rounded-xl text-xs font-medium text-gray-300 hover:bg-emerald-400/10 hover:border-emerald-400/50 hover:text-emerald-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] hover:-translate-y-0.5">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Create Section */}
          <motion.div variants={itemVariants} className="relative py-8 group">
            <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-4">
              CREATE
              <span className="h-[1px] flex-1 bg-gradient-to-r from-gray-700 to-transparent"></span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              Creating content across various platforms, helping bring ideas to life through visual storytelling and engaging media.
            </p>
            <h4 className="text-emerald-400 text-sm font-bold mb-4 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">Skillset & tools</h4>
            <div className="flex flex-wrap gap-3">
              {createSkills.map(skill => (
                <span key={skill} className="px-4 py-2 border border-gray-800 bg-gray-900/30 rounded-xl text-xs font-medium text-gray-300 hover:bg-emerald-400/10 hover:border-emerald-400/50 hover:text-emerald-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] hover:-translate-y-0.5">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side: Title and Image */}
        <motion.div 
          style={{ y: yTransform }}
          className="flex flex-col items-center lg:items-end justify-start w-full -mt-8"
        >
          <motion.h2 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-bold mb-12 tracking-tighter text-right leading-none text-white -translate-x-8"
          >
            What I do
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] group"
          >
            {/* Image Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-black">
              <img 
                src={ianImg} 
                alt="Jesper Ian" 
                className="w-full h-full object-cover filter grayscale-[40%] brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100" 
              />
              {/* Subtle Scanning Tech Line Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-[100%] group-hover:animate-[scan_2.5s_ease-in-out_infinite]"></div>
            </div>
            
            {/* Floating Stamp UI */}
            <div className={`absolute -bottom-4 -left-6 px-8 py-3.5 rounded-lg font-bold text-[15px] tracking-[0.15em] rotate-[-6deg] hover:rotate-[-3deg] hover:scale-105 transition-all duration-300 z-20 border-2 border-dashed uppercase backdrop-blur-[4px]
              ${theme === 'light' 
                ? 'text-slate-800 border-slate-400 bg-white/60 group-hover:text-black group-hover:border-slate-800 group-hover:bg-white/90 shadow-md' 
                : 'text-white/80 border-white/30 bg-white/5 group-hover:text-white group-hover:border-white/80 group-hover:bg-white/20'}`}
            >
              Passionate Builder
            </div>
          </motion.div>
        </motion.div>

      </div>
      
      {/* Keyframes for scanning line */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
