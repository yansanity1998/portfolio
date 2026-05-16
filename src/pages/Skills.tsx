import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiLaravel, SiMysql, SiPhp, SiHtml5,
  SiNodedotjs, SiExpress, SiCss, SiVite, SiGit, SiGithub, SiFigma, SiFramer, SiThreedotjs
} from 'react-icons/si';

const row1 = [SiReact, SiTypescript, SiJavascript, SiTailwindcss, SiLaravel, SiMysql, SiPhp, SiHtml5];
const row2 = [SiNodedotjs, SiExpress, SiCss, SiVite, SiGit, SiGithub, SiFigma, SiFramer, SiThreedotjs];

const brandColors: Record<string, string> = {
  SiReact: "#61DAFB",
  SiTypescript: "#3178C6",
  SiJavascript: "#F7DF1E",
  SiTailwindcss: "#06B6D4",
  SiLaravel: "#FF2D20",
  SiMysql: "#4479A1",
  SiPhp: "#777BB4",
  SiHtml5: "#E34F26",
  SiNodedotjs: "#339933",
  SiExpress: "#000000",
  SiCss: "#1572B6",
  SiVite: "#646CFF",
  SiGit: "#F05032",
  SiGithub: "#181717",
  SiFigma: "#F24E1E",
  SiFramer: "#0055FF",
  SiThreedotjs: "#000000",
};

const row1WithColors = row1.map(Icon => ({ Icon, brand: brandColors[Icon.name] }));
const row2WithColors = row2.map(Icon => ({ Icon, brand: brandColors[Icon.name] }));

// Multiply arrays to ensure seamless infinite scrolling loop
const duplicatedRow1 = [...row1WithColors, ...row1WithColors, ...row1WithColors, ...row1WithColors];
const duplicatedRow2 = [...row2WithColors, ...row2WithColors, ...row2WithColors, ...row2WithColors];

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="bg-[#050505] py-24 overflow-hidden relative border-t border-b border-gray-900/50">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-900/10 blur-[150px] pointer-events-none rounded-full"></div>

      {/* Header */}
      <div className="mb-16 md:mb-24 px-8 md:px-16 max-w-7xl mx-auto relative z-10">
         <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">Tech Stack</h2>
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
            {duplicatedRow1.map(({ Icon, brand }, index) => (
              <div key={index} className="flex items-center gap-8 md:gap-16">
                <Icon 
                  className={`text-5xl md:text-7xl lg:text-[8rem] transition-all duration-300 cursor-default ${index % 2 === 0 ? 'text-white' : 'text-white/20'}`}
                  style={hoveredIndex === index ? { color: brand } : {}}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
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
            {duplicatedRow2.map(({ Icon, brand }, index) => (
              <div key={index} className="flex items-center gap-8 md:gap-16">
                <Icon 
                  className={`text-5xl md:text-7xl lg:text-[8rem] transition-all duration-300 cursor-default ${index % 2 !== 0 ? 'text-white' : 'text-white/20'}`}
                  style={hoveredIndex === index ? { color: brand } : {}}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
