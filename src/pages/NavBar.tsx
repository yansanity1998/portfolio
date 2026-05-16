import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LightDarkMode from '../components/LightDarkMode';
import { scrollToSection } from '../components/ScrollAnimation';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'experience', 'projects', 'gallery', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        // We find the entry that is currently intersecting
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full px-8 md:px-16 py-4 flex justify-between items-center z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/10 py-2 shadow-lg' : 'bg-transparent'
      }`}
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-4xl tracking-wide cursor-pointer"
        style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Ian
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 md:gap-4 items-center flex-wrap justify-end"
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(link.id);
            }}
            className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${
              activeSection === link.id
                ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {link.name}
          </a>
        ))}
        <div className="ml-2">
          <LightDarkMode />
        </div>
      </motion.div>
    </nav>
  );
}
