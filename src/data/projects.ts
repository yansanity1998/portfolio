import type { Project } from '../types'

import jobmarket1 from '../assets/projects/jobmarket-iligan/jobmarket1.png';
import jobmarket2 from '../assets/projects/jobmarket-iligan/jobmarket2.png';
import linamon1 from '../assets/projects/mdrrmo-linamon/linamon1.png';
import linamon2 from '../assets/projects/mdrrmo-linamon/linamon2.png';
import linamon3 from '../assets/projects/mdrrmo-linamon/linamon3.png';
import cebu1 from '../assets/projects/cebutop-aviation/cebu1.png';
import cebu2 from '../assets/projects/cebutop-aviation/cebu2.png';
import cebu3 from '../assets/projects/cebutop-aviation/cebu3.png';
import halleharper1 from '../assets/projects/halleharper/halleharper1.png';
import halleharper2 from '../assets/projects/halleharper/halleharper2.png';
import halleharper3 from '../assets/projects/halleharper/halleharper3.png';
import halleharper4 from '../assets/projects/halleharper/halleharper4.png';
import capstone1 from '../assets/projects/anxiety-management/capstone1.png';
import capstone2 from '../assets/projects/anxiety-management/capstone2.png';
import spcRfid from '../assets/projects/spc-rfid/spc-rfid.png';
import pixzelDigital from '../assets/projects/pixzel-attendance/pixzeldigital.png';
import medscan from '../assets/projects/medscan/medscan.png';
import attendease from '../assets/projects/attendease/attendease.png';
import ojt1 from '../assets/projects/ojthub/ojt.png';
import ojt2 from '../assets/projects/ojthub/ojt1.png';
import ojt3 from '../assets/projects/ojthub/ojt2.png';

/** OSAS ships 19 screenshots (osas-01.png … osas-19.png); load them in filename order. */
const osasImages = Object.entries(
  import.meta.glob<string>('../assets/projects/osas-inventory/*.png', { eager: true, import: 'default' }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url)

export const projects: Project[] = [
  {
    title: "Jobmarket Iligan",
    role: "Full Stack Developer",
    techStack: ["React", "JSX", "Laravel", "MySQL"],
    images: [jobmarket2, jobmarket1],
    description: "A comprehensive digital platform where users can easily apply for jobs and seamlessly modify their profiles with relevant information. The system utilizes advanced matching algorithms to align candidates with opportunities perfectly suited to their roles and expertise.\n\nDeveloped to streamline the recruitment process, it features a highly interactive user dashboard, real-time job tracking, and an extensive administration panel. The backend is powered by Laravel, ensuring robust security and fast database queries, while the frontend leverages modern JSX for a smooth, app-like experience.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "MDRRMO Linamon",
    role: "Web Developer",
    techStack: ["React", "TSX", "Laravel", "MySQL"],
    images: [linamon1, linamon2, linamon3],
    description: "A centralized CMS website built specifically for disaster risk reduction and management in the municipality of Linamon. Citizens can directly request training aids and dispatch ambulances through the platform during emergencies, drastically improving response times.\n\nThe system includes role-based access control, allowing administrators to manage incoming emergency requests, track resources, and publish critical news updates directly to the public portal. Built with a scalable Laravel backend and a responsive TSX frontend, it ensures critical services remain online when they are needed most.",
    github: "https://github.com/yansanity1998",
    demo: "https://mdrrmolinamon.com/"
  },
  {
    title: "CebuTop Aviation",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "Laravel", "MySQL"],
    images: [cebu1, cebu2, cebu3],
    description: "A high-end cinematic aviation platform where users can explore and seamlessly inquire about different premium services including air taxi, air charter, air ambulance, and air cargo.\n\nThe website was designed with a focus on immersive brand storytelling, utilizing large-scale imagery and smooth animations to convey a sense of luxury and professionalism. It features a robust inquiry management system built in Laravel, allowing the sales team to quickly respond to high-ticket flight requests, while the frontend is meticulously crafted to ensure flawless performance across all devices.",
    github: "https://github.com/yansanity1998",
    demo: "https://newcebutopaviation.com"
  },
  {
    title: "HalleHarper",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "Laravel Blade", "MySQL"],
    images: [halleharper1, halleharper2, halleharper3, halleharper4],
    description: "A premier strategic communications and public information platform engineered for organizations in the Philippines. The client-facing website delivers impactful digital storytelling, multimedia showcases, and crisis communications consulting with high-performance responsive interfaces.\n\nThe public frontend is built with React and TSX for seamless speed, dynamic animations, and interactive client engagement. On the administrative side, a secure and comprehensive Laravel Blade CMS empowers editorial teams to manage strategic content, handle public information services, track client inquiries, and oversee media publications with ease.",
    github: "https://github.com/yansanity1998",
    demo: "https://halleharper.com/"
  },
  {
    title: "Anxiety Management System",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "NodeJS", "Supabase"],
    images: [capstone1, capstone2],
    description: "This is my capstone project focused entirely on anxiety management. For students, it provides a personalized dashboard featuring a pet streak, daily mood tracking, breathing exercises, games, and other interactive tools designed to help conquer anxiety.\n\nOn the administrative side, the guidance dashboard is built for counselors to monitor student progress, manage scheduling, and print detailed reports for effective support and intervention.",
    github: "https://github.com/yansanity1998",
    demo: "https://anxiety-application.netlify.app/"
  },
  {
    title: "SPC RFID Attendance & Payroll Management",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "NodeJS", "Supabase"],
    images: [spcRfid],
    description: "St. Peter's College's comprehensive workforce management solution featuring contactless RFID attendance, automated payroll processing with penalty calculations, and real-time schedule monitoring for Faculty, Staff, and Student Assistants.\n\nThe system handles complex academic scheduling with built-in features such as dual session tracking (Morning & Afternoon), 15-minute grace periods for penalty-free buffer times, and automated penalty generation (₱1/min Late, ₱240 Absent). It provides intuitive interfaces for tapping RFID cards and seamlessly managing class attendance.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "Pixzel Digital Attendance System",
    role: "Full Stack Developer",
    techStack: ["React", "NextJS", "TSX", "Supabase"],
    images: [pixzelDigital],
    description: "A comprehensive attendance management system tailored specifically for Pixzel Digital's employees. It streamlines the tracking of daily check-ins and check-outs, ensuring accurate time logs.\n\nDeveloped with NextJS and Supabase, the platform provides real-time attendance monitoring, secure employee authentication, and robust administrative tools to seamlessly manage workforce schedules and reporting.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "OSAS Integrated Inventory System",
    role: "Full Stack Developer",
    techStack: ["PHP", "JavaScript", "MySQL", "Tailwind"],
    images: osasImages,
    description: "A comprehensive dual-inventory management system built exclusively for the Office of Student Affairs and Services (OSAS) at St. Peter's College. This platform seamlessly integrates two distinct inventory subsystems into one unified dashboard — one tailored for sports equipment and the other for document or cabinet assets — allowing administrators to manage, track, and audit all institutional resources from a single point of control.\n\nThe Sports Inventory subsystem is purpose-built to handle the unique demands of athletic asset management. It tracks equipment across multiple sports categories including basketball, volleyball, badminton, table tennis, chess, and various athletic gear. Each item entry captures critical details such as item name, brand, quantity, condition status (e.g., good, damaged, under repair, condemned), and storage location within the OSAS sports facility. The system supports check-in and check-out workflows, allowing students and staff to borrow equipment with proper documentation and automated return tracking. Overdue items are flagged in real time, and a built-in history log monitors every transaction for complete auditability. Depreciation alerts notify administrators when equipment has been in service beyond its expected lifespan, prompting timely replacement requests to prevent shortages during tournaments and training sessions.\n\nThe Document/Cabinet Inventory subsystem manages the office's administrative assets — filing cabinets, document boxes, office supplies, archival folders, and confidential records stored within the OSAS premises. Each cabinet or document entry is catalogued with metadata including cabinet ID, floor location, room number, document classification (e.g., student records, administrative forms, financial documents, incident reports), retention period, and access level. Barcode integration enables quick scanning for check-in, check-out, and inventory audits. The system enforces retention policies by automatically flagging documents eligible for disposal or archival transfer, ensuring compliance with institutional data governance standards. A hierarchical folder structure mirrors the physical layout of cabinets, shelves, and drawers, making physical-to-digital cross-referencing effortless during regulatory inspections or internal audits.\n\nBoth subsystems feed into a centralized OSAS Dashboard that provides a holistic view of all institutional inventory. Key features include a real-time status overview displaying the total number of items, currently borrowed assets, pending returns, flagged items needing maintenance, and recently added entries — all rendered with dynamic charts and summary cards. The dashboard also features a powerful unified search bar that can query across both subsystems simultaneously, filtering by category, location, status, or custom tags. Role-based access control differentiates between OSAS staff, student assistants, and system administrators, each with tailored permissions for viewing, editing, approving, or deleting inventory records.\n\nAdditional capabilities include automated report generation in PDF and Excel formats for end-of-month reconciliations, customized notification alerts for low stock items or approaching retention deadlines, and a complete activity audit trail that logs every user action from item creation to disposal. The system was architected using PHP for server-side logic with XAMPP providing the local development and deployment environment, MySQL for relational database management ensuring data integrity across complex join operations between the two inventory subsystems, and vanilla JavaScript with HTML/CSS delivering a responsive and intuitive frontend interface accessible from any device within the campus network.\n\nBuilt from the ground up based on the actual workflow requirements gathered through direct consultation with OSAS personnel, this system eliminated the previous manual ledger-based tracking that was prone to errors, misplacements, and time-consuming physical audits. It has significantly reduced inventory processing time by approximately 60%, improved asset accountability, and provided St. Peter's College OSAS with a modern, scalable foundation for managing both their athletic and administrative resources well into the future.",
    github: "https://github.com/yansanity1998",
    demo: "#"
  },
  {
    title: "OJTHub",
    role: "Full Stack Developer",
    techStack: ["React", "TSX", "Tailwind", "Supabase"],
    images: [ojt2, ojt1, ojt3],
    description: "A comprehensive On-the-Job Training (OJT) tracker engineered to streamline daily time records, performance tracking, and shift management. Fully responsive and optimized for both desktop and mobile devices, it enables trainees and supervisors to manage training hours and attendance seamlessly.\n\nKey features include real-time time-in and time-out logging with dual-session (morning and afternoon) tracking, target hours progress calculation, achievement and milestone unlocking, and activity logs with PDF export. Built with React and TSX, backed by Supabase for authentication and real-time database management, and styled with Tailwind CSS.",
    github: "https://github.com/yansanity1998",
    demo: "https://ojthub.netlify.app/"
  },
  {
    title: "MedScan",
    role: "UI/UX Designer",
    techStack: ["Figma"],
    images: [medscan],
    description: "A health monitoring prototype designed to track vital health metrics including height, BMI, weight, pulse, and other indicators. The application also features illness detection capabilities, providing users with a comprehensive overview of their physical well-being through an intuitive interface.\n\nBuilt entirely in Figma, this concept focuses on delivering a clean, accessible design for health data visualization and symptom analysis.",
    github: "#",
    demo: "#"
  },
  {
    title: "AttendEase",
    role: "UI/UX Designer",
    techStack: ["Figma"],
    images: [attendease],
    description: "A mobile attendance scanning prototype designed for St. Peter's College (SPC). The app streamlines the attendance tracking process by enabling quick QR or barcode scanning directly from a mobile device, replacing traditional manual methods.\n\nDesigned as a Figma prototype, it emphasizes speed, simplicity, and a seamless user experience for both students and faculty.",
    github: "#",
    demo: "#"
  }
];
