import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import ianImg from '../assets/ian.jpg';

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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax transform for the right side
  const yTransform = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={sectionRef} className="min-h-screen bg-[#050505] text-white py-32 px-8 md:px-16 flex items-center justify-center relative overflow-hidden">
      
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
          <motion.div variants={itemVariants} className="relative p-8 group">
            {/* Decorative Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-tl-xl opacity-50 group-hover:opacity-100"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-tr-xl opacity-50 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-bl-xl opacity-50 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-br-xl opacity-50 group-hover:opacity-100"></div>
            
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
          <motion.div variants={itemVariants} className="relative p-8 group">
            {/* Decorative Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-tl-xl opacity-50 group-hover:opacity-100"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-tr-xl opacity-50 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-bl-xl opacity-50 group-hover:opacity-100"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gray-700 group-hover:border-emerald-400 transition-all duration-500 rounded-br-xl opacity-50 group-hover:opacity-100"></div>

            <h3 className="text-2xl font-bold tracking-tight mb-4 flex items-center gap-4">
              CREATE
              <span className="h-[1px] flex-1 bg-gradient-to-r from-gray-700 to-transparent"></span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              My content creation journey started from a side hustle to serving other creators, achieving an average reach of 12 million within 90 days.
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
          className="flex flex-col items-center lg:items-end justify-center w-full"
        >
          <motion.h2 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[6rem] font-bold mb-12 tracking-tighter text-right leading-none text-white"
          >
            What I do
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
            className="relative w-full max-w-[420px] aspect-[4/5] rounded-[2rem] p-3 bg-gradient-to-br from-gray-700 via-gray-900 to-[#050505] shadow-[0_30px_60px_rgba(0,0,0,0.8)] group"
          >
            {/* Image Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-black">
              <img 
                src={ianImg} 
                alt="Jesper Ian" 
                className="w-full h-full object-cover filter grayscale-[40%] brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-700 ease-in-out scale-105 group-hover:scale-100" 
              />
              {/* Subtle Scanning Tech Line Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-[100%] group-hover:animate-[scan_2.5s_ease-in-out_infinite]"></div>
              
              {/* Corner tech accents inside image */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-emerald-400/50"></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-emerald-400/50"></div>
            </div>
            
            {/* Floating Tag */}
            <div className="absolute -bottom-6 -left-6 bg-white text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(255,255,255,0.1)] rotate-[-6deg] group-hover:rotate-0 transition-all duration-500 group-hover:bg-emerald-400 group-hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] z-20">
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
