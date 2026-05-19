import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import AnimatedTitle from '../components/AnimatedTitle';
import TypewriterText from '../components/TypewriterText';
import pixzelLogo from '../assets/logos/pixzel.jpg';
import spcLogo from '../assets/logos/spc.png';
import { useTheme } from '../context/ThemeContext';

const experiences = [
    {
        year: "2026",
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
        <section id="experience" className="min-h-screen bg-[#050505] text-white py-32 px-6 md:px-16 relative overflow-hidden">

            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <AnimatedTitle 
                  text="My Experience"
                  className="text-5xl md:text-6xl font-bold mb-24 tracking-tight justify-center"
                />

                {/* Timeline Container */}
                <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">

                    {/* Static Background Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2"></div>

                    {/* Animated Glowing Fill Line */}
                    <motion.div
                        className={`absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b -translate-x-1/2 origin-top ${
                            theme === 'light' 
                                ? 'from-black via-gray-400 to-transparent shadow-[0_0_15px_rgba(0,0,0,0.15)]' 
                                : 'from-white via-gray-600 to-transparent shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                        }`}
                        style={{ scaleY: smoothProgress }}
                    ></motion.div>

                    {/* Timeline Items */}
                    <div className="relative z-10 py-10">
                        {experiences.map((exp, index) => {
                            const isLeft = index % 2 === 0;

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.7, delay: 0.1 }}
                                    key={index}
                                    className="relative flex items-start justify-center w-full mb-32 last:mb-0"
                                >
                                    {/* Node Dot - Lights up exactly when line hits it */}
                                    <motion.div
                                        initial={{ borderColor: "#1f2937", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
                                        whileInView={{ 
                                            borderColor: theme === 'light' ? "#0f172a" : "#ffffff", 
                                            boxShadow: theme === 'light' ? "0 0 20px rgba(0,0,0,0.2)" : "0 0 20px rgba(255,255,255,0.8)" 
                                        }}
                                        viewport={{ margin: "0px 0px -50% 0px" }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute left-1/2 top-0 -translate-x-1/2 -mt-2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#050505] border-2 z-20 flex items-center justify-center overflow-hidden"
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

                                    {/* Left Side Panel */}
                                    <div className={`w-1/2 pr-10 md:pr-16 flex flex-col ${isLeft ? 'items-end text-right' : 'items-end text-right'}`}>
                                        {isLeft ? (
                                            <>
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">{exp.title}</h3>
                                                <h4 className={`${theme === 'light' ? 'text-black font-semibold' : 'text-white'} text-sm md:text-base font-semibold mb-2`}>{exp.company}</h4>
                                                <p className="text-gray-500 text-sm tracking-widest font-mono mb-6">{exp.year}</p>

                                                {/* Decorative Icon Circle */}
                                                <motion.div
                                                    initial={{ borderColor: "#374151", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}
                                                    whileInView={{ 
                                                        borderColor: theme === 'light' ? "#0f172a" : "#ffffff", 
                                                        boxShadow: theme === 'light' ? "0 0 25px rgba(0,0,0,0.15)" : "0 0 25px rgba(255,255,255,0.5)" 
                                                    }}
                                                    viewport={{ margin: "0px 0px -50% 0px" }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-20 h-20 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center overflow-hidden"
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

                                    {/* Right Side Panel */}
                                    <div className={`w-1/2 pl-10 md:pl-16 flex flex-col ${!isLeft ? 'items-start text-left' : 'items-start text-left'}`}>
                                        {!isLeft ? (
                                            <>
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">{exp.title}</h3>
                                                <h4 className={`${theme === 'light' ? 'text-black font-semibold' : 'text-white'} text-sm md:text-base font-semibold mb-2`}>{exp.company}</h4>
                                                <p className="text-gray-500 text-sm tracking-widest font-mono mb-6">{exp.year}</p>

                                                {/* Decorative Icon Circle */}
                                                <motion.div
                                                    initial={{ borderColor: "#374151", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}
                                                    whileInView={{ 
                                                        borderColor: theme === 'light' ? "#0f172a" : "#ffffff", 
                                                        boxShadow: theme === 'light' ? "0 0 25px rgba(0,0,0,0.15)" : "0 0 25px rgba(255,255,255,0.5)" 
                                                    }}
                                                    viewport={{ margin: "0px 0px -50% 0px" }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-20 h-20 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center overflow-hidden"
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
