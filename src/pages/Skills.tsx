import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiLaravel, SiMysql, SiPhp, SiHtml5,
  SiNodedotjs, SiExpress, SiCss, SiVite, SiGit, SiGithub, SiFigma, SiFramer, SiThreedotjs
} from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';
import AnimatedTitle from '../components/AnimatedTitle';

const row1 = [
  { Icon: SiReact, name: "SiReact", brand: "#61DAFB" },
  { Icon: SiTypescript, name: "SiTypescript", brand: "#3178C6" },
  { Icon: SiJavascript, name: "SiJavascript", brand: "#F7DF1E" },
  { Icon: SiTailwindcss, name: "SiTailwindcss", brand: "#06B6D4" },
  { Icon: SiLaravel, name: "SiLaravel", brand: "#FF2D20" },
  { Icon: SiMysql, name: "SiMysql", brand: "#4479A1" },
  { Icon: SiPhp, name: "SiPhp", brand: "#777BB4" },
  { Icon: SiHtml5, name: "SiHtml5", brand: "#E34F26" }
];

const row2 = [
  { Icon: SiNodedotjs, name: "SiNodedotjs", brand: "#888888" },
  { Icon: SiExpress, name: "SiExpress", brand: "#000000" },
  { Icon: SiCss, name: "SiCss", brand: "#1572B6" },
  { Icon: SiVite, name: "SiVite", brand: "#646CFF" },
  { Icon: SiGit, name: "SiGit", brand: "#F05032" },
  { Icon: SiGithub, name: "SiGithub", brand: "#181717" },
  { Icon: SiFigma, name: "SiFigma", brand: "#F24E1E" },
  { Icon: SiFramer, name: "SiFramer", brand: "#0055FF" },
  { Icon: SiThreedotjs, name: "SiThreedotjs", brand: "#000000" }
];

// Multiply arrays to ensure seamless infinite scrolling loop
const duplicatedRow1 = [...row1, ...row1, ...row1, ...row1];
const duplicatedRow2 = [...row2, ...row2, ...row2, ...row2];

export default function Skills() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const { theme } = useTheme();

  return (
    <section id="skills" className="bg-[#050505] py-24 overflow-hidden relative border-t border-b border-gray-900/50">
      
      {/* Background Ambient Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] blur-[150px] pointer-events-none rounded-full transition-colors duration-300 ${
        theme === 'light' ? 'bg-slate-200/40' : 'bg-white/5'
      }`}></div>

      {/* Header */}
      <div className="mb-16 md:mb-24 px-8 md:px-16 max-w-7xl mx-auto relative z-10">
         <AnimatedTitle 
           text="Tech Stack"
           className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4"
         />
         <p className="text-gray-400 tracking-widest uppercase text-xs md:text-sm">Languages & Tools</p>
      </div>

      {/* Marquee Containers */}
      <div className="flex flex-col gap-6 md:gap-10 relative z-10 w-full overflow-hidden">
        
        {/* Row 1 - Scrolling Left */}
        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <motion.div 
            className="flex gap-8 md:gap-16 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          >
            {duplicatedRow1.map(({ Icon, name, brand }, index) => (
              <div key={index} className="flex items-center gap-8 md:gap-16">
                <Icon 
                  className={`text-5xl md:text-7xl lg:text-[8rem] transition-all duration-300 cursor-default ${index % 2 === 0 ? (theme === 'light' ? 'text-slate-900' : 'text-white') : (theme === 'light' ? 'text-slate-900/20' : 'text-white/20')}`}
                  style={hoveredIcon === name ? { color: brand } : {}}
                  onMouseEnter={() => setHoveredIcon(name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Scrolling Right */}
        <div className="flex w-full overflow-hidden whitespace-nowrap">
          <motion.div 
            className="flex gap-8 md:gap-16 items-center"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
          >
            {duplicatedRow2.map(({ Icon, name, brand }, index) => (
              <div key={index} className="flex items-center gap-8 md:gap-16">
                <Icon 
                  className={`text-5xl md:text-7xl lg:text-[8rem] transition-all duration-300 cursor-default ${index % 2 !== 0 ? (theme === 'light' ? 'text-slate-900' : 'text-white') : (theme === 'light' ? 'text-slate-900/20' : 'text-white/20')}`}
                  style={hoveredIcon === name ? { color: brand } : {}}
                  onMouseEnter={() => setHoveredIcon(name)}
                  onMouseLeave={() => setHoveredIcon(null)}
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
