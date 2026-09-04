import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedTitle from '../components/AnimatedTitle';
import { useTheme } from '../context/ThemeContext';

import jobmarket1 from '../assets/jobmarket/jobmarket1.png';
import jobmarket2 from '../assets/jobmarket/jobmarket2.png';
import linamon1 from '../assets/linamon/linamon1.png';
import linamon2 from '../assets/linamon/linamon2.png';
import linamon3 from '../assets/linamon/linamon3.png';

import cebu1 from '../assets/cebu-top/cebu1.png';
import cebu2 from '../assets/cebu-top/cebu2.png';
import cebu3 from '../assets/cebu-top/cebu3.png';
import halleharper1 from '../assets/halleharper/halleharper1.png';
import halleharper2 from '../assets/halleharper/halleharper2.png';
import halleharper3 from '../assets/halleharper/halleharper3.png';
import halleharper4 from '../assets/halleharper/halleharper4.png';
import capstone1 from '../assets/capstone/capstone1.png';
import capstone2 from '../assets/capstone/capstone2.png';
import spcRfid from '../assets/spc-rfid/spc-rfid.png';
import pixzelDigital from '../assets/pixzeldigital/pixzeldigital.png';
import medscan from '../assets/medscan/medscan.png';
import attendease from '../assets/attendease/attendease.png';

import osas1 from '../assets/osas/OSAS.png';
import osas2 from '../assets/osas/Screenshot 2026-01-25 085313.png';
import osas3 from '../assets/osas/Screenshot 2026-01-25 085324.png';
import osas4 from '../assets/osas/Screenshot 2026-01-25 085341.png';
import osas5 from '../assets/osas/Screenshot 2026-01-25 085350.png';
import osas6 from '../assets/osas/Screenshot 2026-01-25 085412.png';
import osas7 from '../assets/osas/Screenshot 2026-01-25 085423.png';
import osas8 from '../assets/osas/Screenshot 2026-01-25 085435.png';
import osas9 from '../assets/osas/Screenshot 2026-01-25 085442.png';
import osas10 from '../assets/osas/Screenshot 2026-01-25 085450.png';
import osas11 from '../assets/osas/Screenshot 2026-01-25 085459.png';
import osas12 from '../assets/osas/Screenshot 2026-01-25 085505.png';
import osas13 from '../assets/osas/Screenshot 2026-01-25 085515.png';
import osas14 from '../assets/osas/Screenshot 2026-01-25 085522.png';
import osas15 from '../assets/osas/Screenshot 2026-01-25 085529.png';
import osas16 from '../assets/osas/Screenshot 2026-01-25 085550.png';
import osas17 from '../assets/osas/Screenshot 2026-01-25 085557.png';
import osas18 from '../assets/osas/Screenshot 2026-01-25 085605.png';
import osas19 from '../assets/osas/Screenshot 2026-01-25 085616.png';

import ojt1 from '../assets/ojt-hub/ojt.png';
import ojt2 from '../assets/ojt-hub/ojt1.png';
import ojt3 from '../assets/ojt-hub/ojt2.png';

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
    techStack: ["React", "JSX", "Laravel", "MySQL"],
    images: [jobmarket2, jobmarket1],
    layout: "type1",
    description: "A comprehensive digital platform where users can easily apply for jobs and seamlessly modify their profiles with relevant information. The system utilizes advanced matching algorithms to align candidates with opportunities perfectly suited to their roles and expertise.\n\nDeveloped to streamline the recruitment process, it features a highly interactive user dashboard, real-time job tracking, and an extensive administration panel. The backend is powered by Laravel, ensuring robust security and fast database queries, while the frontend leverages modern JSX for a smooth, app-like experience.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "MDRRMO Linamon",
    role: "Web Developer",
    techStack: ["React", "TSX", "Laravel", "MySQL"],
    images: [linamon1, linamon2, linamon3],
    layout: "type2",
    description: "A centralized CMS website built specifically for disaster risk reduction and management in the municipality of Linamon. Citizens can directly request training aids and dispatch ambulances through the platform during emergencies, drastically improving response times.\n\nThe system includes role-based access control, allowing administrators to manage incoming emergency requests, track resources, and publish critical news updates directly to the public portal. Built with a scalable Laravel backend and a responsive TSX frontend, it ensures critical services remain online when they are needed most.",
    github: "https://github.com/yansanity1998",
    demo: "https://mdrrmo-linamon.pixzeldigital.app/"
  },
  {
    title: "CebuTop Aviation",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "Laravel", "MySQL"],
    images: [cebu1, cebu2, cebu3],
    layout: "type3",
    description: "A high-end cinematic aviation platform where users can explore and seamlessly inquire about different premium services including air taxi, air charter, air ambulance, and air cargo.\n\nThe website was designed with a focus on immersive brand storytelling, utilizing large-scale imagery and smooth animations to convey a sense of luxury and professionalism. It features a robust inquiry management system built in Laravel, allowing the sales team to quickly respond to high-ticket flight requests, while the frontend is meticulously crafted to ensure flawless performance across all devices.",
    github: "https://github.com/yansanity1998",
    demo: "https://newcebutopaviation.com"
  },
  {
    title: "HalleHarper",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "Laravel Blade", "MySQL"],
    images: [halleharper1, halleharper2, halleharper3, halleharper4],
    layout: "type2",
    description: "A premier strategic communications and public information platform engineered for organizations in the Philippines. The client-facing website delivers impactful digital storytelling, multimedia showcases, and crisis communications consulting with high-performance responsive interfaces.\n\nThe public frontend is built with React and TSX for seamless speed, dynamic animations, and interactive client engagement. On the administrative side, a secure and comprehensive Laravel Blade CMS empowers editorial teams to manage strategic content, handle public information services, track client inquiries, and oversee media publications with ease.",
    github: "https://github.com/yansanity1998",
    demo: "https://halleharper.com/"
  },
  {
    title: "Anxiety Management System",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "NodeJS", "Supabase"],
    images: [capstone1, capstone2],
    layout: "type1",
    description: "This is my capstone project focused entirely on anxiety management. For students, it provides a personalized dashboard featuring a pet streak, daily mood tracking, breathing exercises, games, and other interactive tools designed to help conquer anxiety.\n\nOn the administrative side, the guidance dashboard is built for counselors to monitor student progress, manage scheduling, and print detailed reports for effective support and intervention.",
    github: "https://github.com/yansanity1998",
    demo: "https://anxiety-application.netlify.app/"
  },
  {
    title: "SPC RFID Attendance & Payroll Management",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "NodeJS", "Supabase"],
    images: [spcRfid],
    layout: "type2",
    description: "St. Peter's College's comprehensive workforce management solution featuring contactless RFID attendance, automated payroll processing with penalty calculations, and real-time schedule monitoring for Faculty, Staff, and Student Assistants.\n\nThe system handles complex academic scheduling with built-in features such as dual session tracking (Morning & Afternoon), 15-minute grace periods for penalty-free buffer times, and automated penalty generation (₱1/min Late, ₱240 Absent). It provides intuitive interfaces for tapping RFID cards and seamlessly managing class attendance.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "Pixzel Digital Attendance System",
    role: "Full Stack Developer",
    techStack: ["React", "NextJS", "TSX", "Supabase"],
    images: [pixzelDigital],
    layout: "type3",
    description: "A comprehensive attendance management system tailored specifically for Pixzel Digital's employees. It streamlines the tracking of daily check-ins and check-outs, ensuring accurate time logs.\n\nDeveloped with NextJS and Supabase, the platform provides real-time attendance monitoring, secure employee authentication, and robust administrative tools to seamlessly manage workforce schedules and reporting.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "OSAS Integrated Inventory System",
    role: "Full Stack Developer",
    techStack: ["PHP", "JavaScript", "MySQL", "Tailwind"],
    images: [osas1, osas2, osas3, osas4, osas5, osas6, osas7, osas8, osas9, osas10, osas11, osas12, osas13, osas14, osas15, osas16, osas17, osas18, osas19],
    layout: "type1",
    description: "A comprehensive dual-inventory management system built exclusively for the Office of Student Affairs and Services (OSAS) at St. Peter's College. This platform seamlessly integrates two distinct inventory subsystems into one unified dashboard — one tailored for sports equipment and the other for document or cabinet assets — allowing administrators to manage, track, and audit all institutional resources from a single point of control.\n\nThe Sports Inventory subsystem is purpose-built to handle the unique demands of athletic asset management. It tracks equipment across multiple sports categories including basketball, volleyball, badminton, table tennis, chess, and various athletic gear. Each item entry captures critical details such as item name, brand, quantity, condition status (e.g., good, damaged, under repair, condemned), and storage location within the OSAS sports facility. The system supports check-in and check-out workflows, allowing students and staff to borrow equipment with proper documentation and automated return tracking. Overdue items are flagged in real time, and a built-in history log monitors every transaction for complete auditability. Depreciation alerts notify administrators when equipment has been in service beyond its expected lifespan, prompting timely replacement requests to prevent shortages during tournaments and training sessions.\n\nThe Document/Cabinet Inventory subsystem manages the office\'s administrative assets — filing cabinets, document boxes, office supplies, archival folders, and confidential records stored within the OSAS premises. Each cabinet or document entry is catalogued with metadata including cabinet ID, floor location, room number, document classification (e.g., student records, administrative forms, financial documents, incident reports), retention period, and access level. Barcode integration enables quick scanning for check-in, check-out, and inventory audits. The system enforces retention policies by automatically flagging documents eligible for disposal or archival transfer, ensuring compliance with institutional data governance standards. A hierarchical folder structure mirrors the physical layout of cabinets, shelves, and drawers, making physical-to-digital cross-referencing effortless during regulatory inspections or internal audits.\n\nBoth subsystems feed into a centralized OSAS Dashboard that provides a holistic view of all institutional inventory. Key features include a real-time status overview displaying the total number of items, currently borrowed assets, pending returns, flagged items needing maintenance, and recently added entries — all rendered with dynamic charts and summary cards. The dashboard also features a powerful unified search bar that can query across both subsystems simultaneously, filtering by category, location, status, or custom tags. Role-based access control differentiates between OSAS staff, student assistants, and system administrators, each with tailored permissions for viewing, editing, approving, or deleting inventory records.\n\nAdditional capabilities include automated report generation in PDF and Excel formats for end-of-month reconciliations, customized notification alerts for low stock items or approaching retention deadlines, and a complete activity audit trail that logs every user action from item creation to disposal. The system was architected using PHP for server-side logic with XAMPP providing the local development and deployment environment, MySQL for relational database management ensuring data integrity across complex join operations between the two inventory subsystems, and vanilla JavaScript with HTML/CSS delivering a responsive and intuitive frontend interface accessible from any device within the campus network.\n\nBuilt from the ground up based on the actual workflow requirements gathered through direct consultation with OSAS personnel, this system eliminated the previous manual ledger-based tracking that was prone to errors, misplacements, and time-consuming physical audits. It has significantly reduced inventory processing time by approximately 60%, improved asset accountability, and provided St. Peter's College OSAS with a modern, scalable foundation for managing both their athletic and administrative resources well into the future.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "OJTHub",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "Tailwind", "Supabase"],
    images: [ojt2, ojt1, ojt3],
    layout: "type1",
    description: "A comprehensive On-the-Job Training (OJT) tracker engineered to streamline daily time records, performance tracking, and shift management. Fully responsive and optimized for both desktop and mobile devices, it enables trainees and supervisors to manage training hours and attendance seamlessly.\n\nKey features include real-time time-in and time-out logging with dual-session (morning and afternoon) tracking, target hours progress calculation, achievement and milestone unlocking, and activity logs with PDF export. Built with React and TSX, backed by Supabase for authentication and real-time database management, and styled with Tailwind CSS.",
    github: "https://github.com/yansanity1998",
    demo: "https://ojthub.netlify.app/"
  },
  {
    title: "MedScan",
    role: "UI/UX Designer",
    techStack: ["Figma"],
    images: [medscan],
    layout: "type1",
    description: "A health monitoring prototype designed to track vital health metrics including height, BMI, weight, pulse, and other indicators. The application also features illness detection capabilities, providing users with a comprehensive overview of their physical well-being through an intuitive interface.\n\nBuilt entirely in Figma, this concept focuses on delivering a clean, accessible design for health data visualization and symptom analysis.",
    github: "#",
    demo: "#"
  },
  {
    title: "AttendEase",
    role: "UI/UX Designer",
    techStack: ["Figma"],
    images: [attendease],
    layout: "type1",
    description: "A mobile attendance scanning prototype designed for St. Peter's College (SPC). The app streamlines the attendance tracking process by enabling quick QR or barcode scanning directly from a mobile device, replacing traditional manual methods.\n\nDesigned as a Figma prototype, it emphasizes speed, simplicity, and a seamless user experience for both students and faculty.",
    github: "#",
    demo: "#"
  }
];

const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }) => {
  const { theme } = useTheme();
  return (
    <div
      onClick={onClick}
      className="relative aspect-[4/3] sm:aspect-square border border-white/20 flex flex-col group overflow-hidden bg-[#050505] hover:bg-[#0a0a0a] transition-all cursor-pointer hover:scale-[1.02] md:hover:scale-105 duration-500 rounded-sm"
    >
      {/* Image fills top portion */}
      <div className="relative flex-1 w-full overflow-hidden border-b border-white/20 min-h-[140px] sm:min-h-[180px]">
        <img src={project.images[0]} alt={project.title} className={`absolute inset-0 w-full h-full object-cover object-top ${project.images.length > 1 ? 'group-hover:opacity-0 transition-opacity duration-500' : ''}`} />
        {project.images.length > 1 && (
          <img src={project.images[1]} alt={project.title} className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        )}
      </div>

      {/* Text below the image */}
      <div className="w-full z-10 p-3.5 sm:p-6 md:p-8 flex-none h-[130px] sm:h-[150px] md:h-[180px] flex flex-col justify-between">
        <div>
          <h3 className={`font-bold text-white mb-0.5 sm:mb-1 transition-colors ${theme === 'light' ? 'group-hover:text-black' : 'group-hover:text-white'} text-sm sm:text-lg md:text-xl truncate`}>{project.title}</h3>
          <p className="text-[9px] sm:text-[10px] text-gray-500 mb-2 sm:mb-4 uppercase tracking-widest">{project.role}</p>
        </div>
        <div className="flex gap-1 sm:gap-2 flex-wrap mt-auto">
          {project.techStack.map(tech => (
            <span key={tech} className={`text-[8px] sm:text-[10px] px-2 py-0.5 sm:px-3 sm:py-1 border rounded-full font-bold uppercase tracking-wider ${theme === 'light'
              ? 'border-black/15 text-black bg-black/5'
              : 'border-white/20 text-white bg-white/10'
              }`}>{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
  const [mobileViewMode, setMobileViewMode] = useState<'swipe' | 'grid'>('swipe');
  const { theme } = useTheme();

  // Mobile card swipe handling
  const cardTouchStartX = useRef(0);
  const cardTouchStartY = useRef(0);

  const handleCardTouchStart = (e: React.TouchEvent) => {
    cardTouchStartX.current = e.touches[0].clientX;
    cardTouchStartY.current = e.touches[0].clientY;
  };

  const handleCardTouchEnd = (e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - cardTouchStartX.current;
    const diffY = e.changedTouches[0].clientY - cardTouchStartY.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        // Next
        setMobileProjectIndex((prev) => (prev + 1) % projects.length);
      } else {
        // Prev
        setMobileProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    }
  };

  // Modal image swipe handling
  const modalTouchStartX = useRef(0);
  const modalTouchStartY = useRef(0);

  const handleModalTouchStart = (e: React.TouchEvent) => {
    modalTouchStartX.current = e.touches[0].clientX;
    modalTouchStartY.current = e.touches[0].clientY;
  };

  const handleModalTouchEnd = (e: React.TouchEvent) => {
    if (!selectedProject || selectedProject.images.length <= 1) return;
    const diffX = e.changedTouches[0].clientX - modalTouchStartX.current;
    const diffY = e.changedTouches[0].clientY - modalTouchStartY.current;
    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        setCurrentImageIndex(prev => prev === selectedProject.images.length - 1 ? 0 : prev + 1);
      } else {
        setCurrentImageIndex(prev => prev === 0 ? selectedProject.images.length - 1 : prev - 1);
      }
    }
  };

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [selectedProject]);

  const activeProject = projects[mobileProjectIndex];

  return (
    <section id="projects" className="min-h-screen bg-[#050505] py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 relative overflow-hidden flex items-center">

      {/* Background Subtle Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none z-0 transition-colors duration-300 ${theme === 'light' ? 'bg-slate-200/20' : 'bg-white/5'
        }`}></div>

      <div className="max-w-6xl w-full mx-auto flex flex-col relative z-10">

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <AnimatedTitle
              text="Selected Works"
              className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 sm:mb-4 justify-center md:justify-start"
            />
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-xl">
              A collection of digital experiences combining robust backends with immersive frontends.
            </p>
          </motion.div>

          {/* Mobile View Switcher (Swipe vs Grid) */}
          <div className="flex md:hidden items-center justify-center gap-2 bg-[#0a0a0a] p-1 rounded-full border border-white/10 self-center">
            <button
              onClick={() => setMobileViewMode('swipe')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                mobileViewMode === 'swipe'
                  ? (theme === 'light' ? 'bg-black text-white' : 'bg-white text-black shadow-sm')
                  : 'text-gray-400'
              }`}
            >
              ↔ Swipe View
            </button>
            <button
              onClick={() => setMobileViewMode('grid')}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                mobileViewMode === 'grid'
                  ? (theme === 'light' ? 'bg-black text-white' : 'bg-white text-black shadow-sm')
                  : 'text-gray-400'
              }`}
            >
              ⊞ Grid View
            </button>
          </div>
        </div>

        {/* MOBILE SWIPEABLE CAROUSEL VIEW */}
        <div className="block md:hidden w-full">
          {mobileViewMode === 'swipe' ? (
            <div className="flex flex-col items-center w-full">
              {/* Project Counter & Swipe Hint */}
              <div className="w-full flex items-center justify-between text-xs text-gray-400 mb-3 px-2">
                <span className="font-mono font-semibold tracking-wider">
                  {String(mobileProjectIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  Swipe ↔ or use arrows
                </span>
              </div>

              {/* Swipeable Card Area */}
              <div 
                className="w-full relative touch-pan-y"
                onTouchStart={handleCardTouchStart}
                onTouchEnd={handleCardTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.title}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    className="w-full"
                  >
                    <ProjectCard 
                      project={activeProject} 
                      onClick={() => { setSelectedProject(activeProject); setCurrentImageIndex(0); }} 
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Carousel Navigation Bar & Dots */}
              <div className="flex items-center justify-between w-full mt-4 px-2">
                <button
                  onClick={() => setMobileProjectIndex(prev => (prev - 1 + projects.length) % projects.length)}
                  className="w-9 h-9 rounded-full border border-white/20 bg-black/60 text-white flex items-center justify-center active:scale-95 text-xs shadow-md"
                  aria-label="Previous project"
                >
                  ◀
                </button>

                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 overflow-x-auto max-w-[200px] px-2 py-1">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMobileProjectIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === mobileProjectIndex 
                          ? (theme === 'light' ? 'bg-black w-5' : 'bg-white w-5')
                          : 'bg-gray-600 w-1.5'
                      }`}
                      aria-label={`Go to project ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setMobileProjectIndex(prev => (prev + 1) % projects.length)}
                  className="w-9 h-9 rounded-full border border-white/20 bg-black/60 text-white flex items-center justify-center active:scale-95 text-xs shadow-md"
                  aria-label="Next project"
                >
                  ▶
                </button>
              </div>

              <p className="text-[11px] text-gray-500 mt-2 text-center">
                Tap card to view full project details & live demo
              </p>
            </div>
          ) : (
            /* Mobile Grid fallback */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} onClick={() => { setSelectedProject(project); setCurrentImageIndex(0); }} />
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP GRID (Hidden on Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 w-full gap-4 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
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
            className={`fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8 ${
              theme === 'light' ? 'bg-black/40 backdrop-blur-md' : 'bg-black/75 backdrop-blur-md'
            }`}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`rounded-xl sm:rounded-2xl w-full max-w-6xl max-h-[92vh] h-full md:h-[82vh] flex flex-col md:flex-row relative overflow-hidden transition-all duration-300 ${
                theme === 'light'
                  ? 'bg-white border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.18)] text-slate-900'
                  : 'bg-[#080808] border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] text-white'
              }`}
            >
              {/* Image Carousel Area - Full edge-to-edge preview with swipe support */}
              <div 
                className={`relative w-full md:w-[55%] h-56 sm:h-72 md:h-full group flex-shrink-0 border-b md:border-b-0 md:border-r overflow-hidden touch-pan-y ${
                  theme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-[#09090b] border-white/10'
                }`}
                onTouchStart={handleModalTouchStart}
                onTouchEnd={handleModalTouchEnd}
              >

                {/* Main Full Display Image - Completely covers container with 0 gap */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProject.images[currentImageIndex]}
                    alt={selectedProject.title}
                    className="absolute inset-0 w-full h-full object-cover object-top z-10 select-none"
                  />
                </AnimatePresence>

                {/* Mobile Swipe Hint Badge */}
                {selectedProject.images.length > 1 && (
                  <div className="md:hidden absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full text-[9px] font-semibold bg-black/60 backdrop-blur-md text-white/90 border border-white/15 shadow-sm">
                    ↔ Swipe image
                  </div>
                )}

                {/* Navigation Controls */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === 0 ? selectedProject.images.length - 1 : prev - 1) }}
                      className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all border z-20 shadow-md ${
                        theme === 'light' 
                          ? 'bg-white/90 text-slate-900 border-slate-200 hover:bg-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.08)]' 
                          : 'bg-black/80 text-white border-white/20 hover:bg-white hover:text-black'
                      }`}
                      aria-label="Previous image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(prev => prev === selectedProject.images.length - 1 ? 0 : prev + 1) }}
                      className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all border z-20 shadow-md ${
                        theme === 'light' 
                          ? 'bg-white/90 text-slate-900 border-slate-200 hover:bg-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.08)]' 
                          : 'bg-black/80 text-white border-white/20 hover:bg-white hover:text-black'
                      }`}
                      aria-label="Next image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    {/* Pagination Dots with Glass Backdrop */}
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
                      {selectedProject.images.map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                            idx === currentImageIndex 
                              ? 'bg-white w-4 sm:w-6' 
                              : 'bg-white/40 w-1.5 sm:w-2'
                          }`} 
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Modal Content Details */}
              <div 
                className={`w-full md:w-[45%] p-4 sm:p-6 md:p-10 flex flex-col h-full overflow-y-auto relative hide-scrollbar transition-colors ${
                  theme === 'light' ? 'bg-white text-slate-900' : 'bg-[#080808] text-white'
                }`}
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >

                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className={`absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all border z-20 ${
                    theme === 'light'
                      ? 'bg-slate-100 hover:bg-red-500 hover:text-white text-slate-700 border-slate-200'
                      : 'bg-white/10 hover:bg-red-500 hover:text-white text-white border-white/20'
                  }`}
                  aria-label="Close modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                <h2 className={`text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 tracking-tight pr-10 md:pr-12 ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>{selectedProject.title}</h2>
                
                <h3 className={`font-semibold tracking-widest uppercase mb-4 sm:mb-6 text-[11px] sm:text-xs md:text-sm ${
                  theme === 'light' ? 'text-slate-600 font-bold' : 'text-gray-400'
                }`}>{selectedProject.role}</h3>

                {/* Scrollable Description */}
                <div className={`text-xs sm:text-sm md:text-base leading-relaxed mb-6 sm:mb-8 space-y-3 sm:space-y-4 ${
                  theme === 'light' ? 'text-slate-700' : 'text-gray-300'
                }`}>
                  {selectedProject.description.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
                </div>

                <h4 className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2.5 sm:mb-3 ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>Technologies Used</h4>
                
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-10">
                  {selectedProject.techStack.map(tech => (
                    <span key={tech} className={`px-2.5 py-1 sm:px-3 sm:py-1.5 border rounded-full font-bold uppercase tracking-wider text-[9px] sm:text-[10px] shadow-sm ${
                      theme === 'light'
                        ? 'border-slate-300 text-slate-800 bg-slate-100'
                        : 'border-white/15 text-gray-200 bg-white/5'
                    }`}>
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={`flex flex-col gap-2 sm:gap-3 mt-auto pt-4 sm:pt-6 border-t ${
                  theme === 'light' ? 'border-slate-200' : 'border-white/10'
                }`}>
                  {selectedProject.demo !== "#" && (
                    <a
                      href={selectedProject.demo.startsWith('http://') || selectedProject.demo.startsWith('https://') ? selectedProject.demo : `https://${selectedProject.demo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-bold uppercase tracking-widest transition-all shadow-md text-xs sm:text-sm cursor-pointer ${
                        theme === 'light'
                          ? 'bg-slate-900 !text-white hover:bg-slate-800 shadow-[0_4px_14px_rgba(15,23,42,0.2)]'
                          : 'bg-white !text-black hover:bg-gray-200 shadow-[0_4px_14px_rgba(255,255,255,0.15)]'
                      }`}
                      style={{ color: theme === 'light' ? '#ffffff' : '#000000' }}
                    >
                      Live Demo
                    </a>
                  )}
                  {selectedProject.github !== "#" && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border-2 font-bold uppercase tracking-widest transition-all text-xs sm:text-sm ${
                        theme === 'light'
                          ? 'border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400'
                          : 'border-white/20 text-white hover:border-white hover:bg-white/10'
                      }`}
                    >
                      GitHub Repo
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
