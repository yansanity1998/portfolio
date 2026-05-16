import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import jobmarket1 from '../assets/jobmarket/jobmarket1.png';
import jobmarket2 from '../assets/jobmarket/jobmarket2.png';
import linamon1 from '../assets/linamon/linamon1.png';
import linamon2 from '../assets/linamon/linamon2.png';
import cebu1 from '../assets/cebu-top/cebu1.png';
import cebu2 from '../assets/cebu-top/cebu2.png';

interface Project {
  title: string;
  role: string;
  techStack: string[];
  images: string[];
  layout: "type1" | "type2" | "type3";
  description: string;
  github: string;
  demo: string;
}

const projects: Project[] = [
  {
    title: "Jobmarket Iligan",
    role: "Full Stack Developer",
    techStack: ["JSX", "Laravel", "MySQL"],
    images: [jobmarket2, jobmarket1],
    layout: "type1",
    description: "A comprehensive digital platform where users can easily apply for jobs and seamlessly modify their profiles with relevant information. The system utilizes advanced matching algorithms to align candidates with opportunities perfectly suited to their roles and expertise.\n\nDeveloped to streamline the recruitment process, it features a highly interactive user dashboard, real-time job tracking, and an extensive administration panel. The backend is powered by Laravel, ensuring robust security and fast database queries, while the frontend leverages modern JSX for a smooth, app-like experience.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "MDRRMO Linamon",
    role: "Web Developer",
    techStack: ["TSX", "Laravel", "MySQL"],
    images: [linamon1, linamon2],
    layout: "type2",
    description: "A centralized CMS website built specifically for disaster risk reduction and management in the municipality of Linamon. Citizens can directly request training aids and dispatch ambulances through the platform during emergencies, drastically improving response times.\n\nThe system includes role-based access control, allowing administrators to manage incoming emergency requests, track resources, and publish critical news updates directly to the public portal. Built with a scalable Laravel backend and a responsive TSX frontend, it ensures critical services remain online when they are needed most.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "CebuTop Aviation",
    role: "Full Stack Developer",
    techStack: ["TSX", "Laravel", "MySQL"],
    images: [cebu2, cebu1],
    layout: "type3",
    description: "A high-end cinematic aviation platform where users can explore and seamlessly inquire about different premium services including air taxi, air charter, air ambulance, and air cargo.\n\nThe website was designed with a focus on immersive brand storytelling, utilizing large-scale imagery and smooth animations to convey a sense of luxury and professionalism. It features a robust inquiry management system built in Laravel, allowing the sales team to quickly respond to high-ticket flight requests, while the frontend is meticulously crafted to ensure flawless performance across all devices.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  }
];

const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  return (
    <div 
      onClick={onClick}
      className="relative aspect-square border-r border-b border-white flex flex-col group overflow-hidden bg-[#050505] hover:bg-[#0a0a0a] transition-colors cursor-pointer"
    >
      {/* Image fills top portion, no padding */}
      <div className="relative flex-1 w-full overflow-hidden border-b border-white">
        <img src={project.images[0]} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-top group-hover:opacity-0 transition-opacity duration-500" />
        <img src={project.images[1]} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Text below the image, with padding */}
      <div className="w-full z-10 p-6 md:p-8">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
        <p className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest">{project.role}</p>
        <div className="flex gap-2 flex-wrap">
          {project.techStack.map(tech => (
             <span key={tech} className="text-[10px] px-3 py-1 border border-emerald-900/50 rounded-full text-emerald-400 font-bold bg-emerald-900/10 uppercase tracking-wider">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <section id="projects" className="min-h-screen bg-[#050505] py-32 px-6 md:px-16 relative overflow-hidden flex items-center">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-900/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="max-w-6xl w-full mx-auto flex flex-col relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Selected Works
          </h2>
          <p className="text-gray-400 max-w-xl">
            A collection of digital experiences combining robust backends with immersive frontends.
          </p>
        </motion.div>

        {/* The 3-Column Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border-t border-l border-white bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }} />
          ))}
        </motion.div>

      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#050505] border border-gray-800 rounded-xl w-full max-w-6xl max-h-[95vh] h-full md:h-[80vh] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row relative overflow-hidden"
            >
              {/* Image Carousel Area */}
              <div className="relative w-full md:w-[55%] h-64 md:h-full bg-[#0a0a0a] group flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-800 overflow-hidden">
                
                {/* Background Overlay (Same picture, no blur, low opacity) */}
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={`bg-${currentImageIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.06 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    src={selectedProject.images[currentImageIndex]} 
                    alt="" 
                    className="absolute inset-0 w-full h-full object-cover scale-105 pointer-events-none"
                  />
                </AnimatePresence>

                {/* Main Image */}
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    src={selectedProject.images[currentImageIndex]} 
                    alt={selectedProject.title} 
                    className="absolute inset-0 w-full h-full object-contain p-4 md:p-8 z-10"
                  />
                </AnimatePresence>
                
                {/* Navigation Controls */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedProject.images.length - 1 : prev - 1) }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-emerald-500 rounded-full flex items-center justify-center text-white transition-colors border border-gray-700 z-10 md:opacity-0 md:group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === selectedProject.images.length - 1 ? 0 : prev + 1) }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-emerald-500 rounded-full flex items-center justify-center text-white transition-colors border border-gray-700 z-10 md:opacity-0 md:group-hover:opacity-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {selectedProject.images.map((_, idx) => (
                    <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-emerald-400' : 'bg-gray-600'}`} />
                  ))}
                </div>
              </div>

              {/* Modal Content Details */}
              <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col h-full overflow-y-auto relative hide-scrollbar bg-[#050505]">
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-black/60 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors border border-gray-700 z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight pr-12">{selectedProject.title}</h2>
                <h3 className="text-emerald-400 font-semibold tracking-widest uppercase mb-8 text-xs md:text-sm">{selectedProject.role}</h3>
                
                {/* Scrollable Description */}
                <div className="text-gray-300 text-sm md:text-base leading-relaxed mb-10 space-y-4">
                  {selectedProject.description.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>

                <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Technologies Used</h4>
                <div className="flex flex-wrap gap-2 mb-12">
                  {selectedProject.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 border border-gray-700 rounded-full text-emerald-300 font-bold bg-[#0a0a0a] uppercase tracking-wider text-[10px] shadow-md">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mt-auto pt-8 border-t border-gray-800">
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-lg text-sm"
                  >
                    Live Demo
                  </a>
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-transparent border-2 border-gray-700 text-white font-bold uppercase tracking-widest hover:border-emerald-400 hover:text-emerald-400 transition-colors text-sm"
                  >
                    GitHub Repo
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
