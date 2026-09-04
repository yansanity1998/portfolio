import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AnimatedTitle from '../components/AnimatedTitle';
import TypewriterText from '../components/TypewriterText';
import pixzelLogo from '../assets/logos/pixzel.jpg';
import spcLogo from '../assets/logos/spc.png';
import { useTheme } from '../context/ThemeContext';

const experiences = [
    {
        year: "August 10, 2026 - Present",
        title: "Junior Developer",
        company: "Pixzel Digital Service",
        description: "Promoted to Junior Developer after successfully completing OJT and part-time tenure at Pixzel Digital Service. Taking full ownership of client projects, developing core features, and building scalable web applications with modern tech stacks.",
        logo: pixzelLogo,
    },
    {
        year: "May 18, 2026",
        title: "Part-Time Developer",
        company: "Pixzel Digital Service",
        description: "Continuing as a part-time developer at Pixzel Digital Service after completing OJT, taking on more client projects and maintenance work while balancing academic responsibilities.",
        logo: pixzelLogo,
    },
    {
        year: " January 29, 2026",
        title: "OJT",
        company: "Pixzel Digital Service",
        description: "Working hands-on with real-world clients at Pixzel Digital Service, building and maintaining websites while learning industry workflows, team collaboration, and modern development practices under professional mentorship.",
        logo: pixzelLogo,
    },
    {
        year: "2023 - 2025",
        title: "Project Development",
        company: "School Projects",
        description: "Developed multiple academic projects ranging from web applications to database-driven systems, exploring React, Laravel, and Firebase while sharpening problem-solving skills through iterative design and team-based development.",
        logo: spcLogo,
    },
    {
        year: "2022",
        title: "Hello World!",
        company: "The Beginning",
        description: "Took my first steps into programming by learning the fundamentals of Java, HTML, CSS, and JavaScript. Built simple console apps and static websites that sparked a lasting passion for software development.",
        logo: spcLogo,
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    // Track scroll progress within the container for the animated line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Apply spring physics to make the line animation buttery smooth
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="min-h-screen bg-[#050505] text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 relative overflow-hidden">

            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <AnimatedTitle 
                  text="My Experience"
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-12 sm:mb-16 md:mb-24 tracking-tight justify-center"
                />

                {/* Timeline Container */}
                <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">

                    {/* Static Background Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2"></div>

                    {/* Animated Glowing Fill Line */}
                    <motion.div
                        className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] md:w-[4px] bg-gradient-to-b -translate-x-1/2 origin-top ${
                            theme === 'light' 
                                ? 'from-black via-gray-400 to-transparent shadow-[0_0_15px_rgba(0,0,0,0.15)]' 
                                : 'from-white via-gray-600 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                        }`}
                        style={{ scaleY: smoothProgress }}
                    ></motion.div>

                    {/* Timeline Items */}
                    <div className="relative z-10 py-6 md:py-10">
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    key={index}
                                    className="relative flex flex-col md:flex-row items-start md:justify-center w-full mb-14 sm:mb-20 md:mb-32 last:mb-0"
                                >
                                    {/* Central / Left Node */}
                                    <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 -mt-1 md:-mt-2 z-20 flex items-center justify-center pointer-events-none">
                                        {/* Node Logo Container */}
                                        <motion.div
                                            initial={{ borderColor: "#1f2937", boxShadow: "0 0 0px rgba(0,0,0,0)", scale: 0.8 }}
                                            whileInView={{ 
                                                borderColor: theme === 'light' ? "#0f172a" : "#ffffff", 
                                                boxShadow: theme === 'light' ? "0 0 20px rgba(0,0,0,0.15)" : "0 0 20px rgba(255,255,255,0.7)",
                                                scale: 1
                                            }}
                                            viewport={{ margin: "0px 0px -50% 0px" }}
                                            transition={{ duration: 0.3 }}
                                            className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-[#050505] border-2 flex items-center justify-center overflow-hidden relative z-20 pointer-events-auto shadow-md"
                                        >
                                            <motion.img
                                                src={exp.logo}
                                                alt={`${exp.company} logo`}
                                                initial={{ scale: 0, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ margin: "0px 0px -50% 0px" }}
                                                transition={{ duration: 0.4, delay: 0.1 }}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        {/* 45-degree Angled Branch / Arm pointing upward-outward away from the title (Desktop only) */}
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                            viewport={{ margin: "0px 0px -40% 0px" }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className={`hidden md:flex items-center absolute pointer-events-auto z-10 ${
                                                isLeft 
                                                    ? 'right-[calc(50%+16px)] -top-12 flex-row-reverse' 
                                                    : 'left-[calc(50%+16px)] -top-12 flex-row'
                                            }`}
                                        >
                                            {/* 45-degree Circuit/Branch SVG Connector */}
                                            <svg
                                                width="40"
                                                height="36"
                                                viewBox="0 0 40 36"
                                                fill="none"
                                                className={`flex-shrink-0 ${isLeft ? '-scale-x-100' : ''}`}
                                            >
                                                <path
                                                    d="M 2 34 L 20 16 L 38 16"
                                                    stroke={theme === 'light' ? 'rgba(15,23,42,0.4)' : 'rgba(255,255,255,0.4)'}
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M 34 12 L 38 16 L 34 20"
                                                    stroke={theme === 'light' ? '#0f172a' : '#ffffff'}
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>

                                            {/* Floating Futuristic Date Badge */}
                                            <div className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider whitespace-nowrap border backdrop-blur-md shadow-sm transition-all duration-300 ${
                                                theme === 'light'
                                                    ? 'bg-white/90 border-slate-300 text-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
                                                    : 'bg-[#0f0f11]/90 border-white/20 text-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.12)]'
                                            } ${isLeft ? 'mr-1.5' : 'ml-1.5'}`}>
                                                {exp.year}
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Mobile Card View (shown only on mobile <md) */}
                                    <div className="flex md:hidden flex-col w-full pl-14 pr-2 text-left">
                                        <div className={`inline-flex items-center self-start px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider border backdrop-blur-md mb-2 ${
                                            theme === 'light'
                                                ? 'bg-white/90 border-slate-300 text-slate-800 shadow-sm'
                                                : 'bg-[#0f0f11]/90 border-white/20 text-gray-300 shadow-sm'
                                        }`}>
                                            {exp.year}
                                        </div>
                                        <h3 className="text-lg font-bold tracking-tight text-white mb-0.5">{exp.title}</h3>
                                        <h4 className={`${theme === 'light' ? 'text-black font-semibold' : 'text-gray-300'} text-xs font-semibold mb-2`}>{exp.company}</h4>
                                        <p className="text-gray-400 text-xs leading-relaxed text-justify">
                                            <TypewriterText text={exp.description} />
                                        </p>
                                    </div>

                                    {/* Desktop Left Side Panel */}
                                    <div className="hidden md:flex w-1/2 pr-10 md:pr-16 flex-col items-end text-right">
                                        {isLeft ? (
                                            <>
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">{exp.title}</h3>
                                                <h4 className={`${theme === 'light' ? 'text-black font-semibold' : 'text-white'} text-sm md:text-base font-semibold mb-2`}>{exp.company}</h4>
                                                
                                                {/* Decorative Icon Circle */}
                                                <motion.div
                                                    initial={{ borderColor: "#374151", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}
                                                    whileInView={{ 
                                                        borderColor: theme === 'light' ? "#0f172a" : "#ffffff", 
                                                        boxShadow: theme === 'light' ? "0 0 25px rgba(0,0,0,0.15)" : "0 0 25px rgba(255,255,255,0.5)" 
                                                    }}
                                                    viewport={{ margin: "0px 0px -50% 0px" }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center overflow-hidden mt-3"
                                                >
                                                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                                                </motion.div>
                                            </>
                                        ) : (
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mt-1 text-justify">
                                                <TypewriterText text={exp.description} />
                                            </p>
                                        )}
                                    </div>

                                    {/* Desktop Right Side Panel */}
                                    <div className="hidden md:flex w-1/2 pl-10 md:pl-16 flex-col items-start text-left">
                                        {!isLeft ? (
                                            <>
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">{exp.title}</h3>
                                                <h4 className={`${theme === 'light' ? 'text-black font-semibold' : 'text-white'} text-sm md:text-base font-semibold mb-2`}>{exp.company}</h4>
                                                
                                                {/* Decorative Icon Circle */}
                                                <motion.div
                                                    initial={{ borderColor: "#374151", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}
                                                    whileInView={{ 
                                                        borderColor: theme === 'light' ? "#0f172a" : "#ffffff", 
                                                        boxShadow: theme === 'light' ? "0 0 25px rgba(0,0,0,0.15)" : "0 0 25px rgba(255,255,255,0.5)" 
                                                    }}
                                                    viewport={{ margin: "0px 0px -50% 0px" }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center overflow-hidden mt-3"
                                                >
                                                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
                                                </motion.div>
                                            </>
                                        ) : (
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mt-1 text-justify">
                                                <TypewriterText text={exp.description} />
                                            </p>
                                        )}
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}
