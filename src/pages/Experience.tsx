import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import pixzelLogo from '../assets/logos/pixzel.jpg';
import spcLogo from '../assets/logos/spc.png';

const experiences = [
    {
        year: "2026",
        title: "OJT",
        company: "Pixzel Digital Service",
        description: "Undertaking my OJT at Pixzel Digital Service, gaining valuable hands-on experience in the tech industry.",
    },
    {
        year: "2023 - 2025",
        title: "Project Development",
        company: "School Projects",
        description: "Started building up some school projects, applying new technologies and continuously expanding my developer toolkit.",
    },
    {
        year: "2022",
        title: "Hello World!",
        company: "The Beginning",
        description: "Hello World! Because I just started school and took my very first steps into the world of programming.",
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);

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
        <section className="min-h-screen bg-[#050505] text-white py-32 px-6 md:px-16 relative overflow-hidden">

            <div className="max-w-7xl mx-auto flex flex-col items-center">

                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-bold mb-24 tracking-tight text-center"
                >
                    My Experience
                </motion.h2>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative w-full max-w-4xl mx-auto">

                    {/* Static Background Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 -translate-x-1/2"></div>

                    {/* Animated Glowing Fill Line */}
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-400 via-emerald-500 to-transparent -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(52,211,153,0.5)]"
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
                                        whileInView={{ borderColor: "#34d399", boxShadow: "0 0 20px rgba(52,211,153,1)" }}
                                        viewport={{ margin: "0px 0px -50% 0px" }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute left-1/2 top-0 -translate-x-1/2 mt-1.5 w-5 h-5 rounded-full bg-[#050505] border-2 z-20 flex items-center justify-center"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ margin: "0px 0px -50% 0px" }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            className="w-2.5 h-2.5 rounded-full bg-emerald-400"
                                        ></motion.div>
                                    </motion.div>

                                    {/* Left Side Panel */}
                                    <div className={`w-1/2 pr-10 md:pr-16 flex flex-col ${isLeft ? 'items-end text-right' : 'items-end text-right'}`}>
                                        {isLeft ? (
                                            <>
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">{exp.title}</h3>
                                                <h4 className="text-emerald-400 text-sm md:text-base font-semibold mb-2">{exp.company}</h4>
                                                <p className="text-gray-500 text-sm tracking-widest font-mono mb-6">{exp.year}</p>

                                                {/* Decorative Icon Circle */}
                                                <motion.div
                                                    initial={{ borderColor: "#374151", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}
                                                    whileInView={{ borderColor: "#34d399", boxShadow: "0 0 25px rgba(52,211,153,0.6)" }}
                                                    viewport={{ margin: "0px 0px -50% 0px" }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center overflow-hidden"
                                                >
                                                    {index === 0 ? (
                                                        <img src={pixzelLogo} alt="Pixzel" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={spcLogo} alt="SPC" className="w-full h-full object-cover" />
                                                    )}
                                                </motion.div>
                                            </>
                                        ) : (
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mt-1">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>

                                    {/* Right Side Panel */}
                                    <div className={`w-1/2 pl-10 md:pl-16 flex flex-col ${!isLeft ? 'items-start text-left' : 'items-start text-left'}`}>
                                        {!isLeft ? (
                                            <>
                                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-1">{exp.title}</h3>
                                                <h4 className="text-emerald-400 text-sm md:text-base font-semibold mb-2">{exp.company}</h4>
                                                <p className="text-gray-500 text-sm tracking-widest font-mono mb-6">{exp.year}</p>

                                                {/* Decorative Icon Circle */}
                                                <motion.div
                                                    initial={{ borderColor: "#374151", boxShadow: "0 0 15px rgba(0,0,0,0.5)" }}
                                                    whileInView={{ borderColor: "#34d399", boxShadow: "0 0 25px rgba(52,211,153,0.6)" }}
                                                    viewport={{ margin: "-50% 0px -50% 0px" }}
                                                    transition={{ duration: 0.4 }}
                                                    className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 flex items-center justify-center overflow-hidden"
                                                >
                                                    {index === 0 ? (
                                                        <img src={pixzelLogo} alt="Pixzel" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={spcLogo} alt="SPC" className="w-full h-full object-cover" />
                                                    )}
                                                </motion.div>
                                            </>
                                        ) : (
                                            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm mt-1">
                                                {exp.description}
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
