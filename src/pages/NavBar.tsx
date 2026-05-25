import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import LightDarkMode from '../components/LightDarkMode';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../components/ScrollAnimation';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            const path = entry.target.id === 'home' ? '/' : `/${entry.target.id}`;
            if (location.pathname !== path) {
              navigate(path, { replace: true });
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const timeout = setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [navigate, location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Skills', href: '/skills', id: 'skills' },
    { name: 'Experience', href: '/experience', id: 'experience' },
    { name: 'Projects', href: '/projects', id: 'projects' },
    { name: 'Gallery', href: '/gallery', id: 'gallery' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full px-6 md:px-16 py-4 flex justify-between items-center z-[100] transition-all duration-300 ${
        isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/10 py-2 shadow-lg' : 'bg-transparent'
      }`}
    >
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white text-3xl md:text-4xl tracking-wide cursor-pointer z-50 relative"
        style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}
        onClick={() => {
          navigate('/');
          setIsMobileMenuOpen(false);
        }}
      >
        Ian
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="hidden md:flex gap-4 items-center justify-end"
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(link.id);
              navigate(link.href);
            }}
            className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${
              activeSection === link.id
                ? (theme === 'light'
                    ? 'bg-black/10 text-black shadow-[0_0_12px_rgba(0,0,0,0.06)] font-semibold'
                    : 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]')
                : (theme === 'light' ? 'text-gray-500 hover:text-black hover:bg-black/5' : 'text-gray-400 hover:text-white hover:bg-white/5')
            }`}
          >
            {link.name}
          </a>
        ))}
        <div className="ml-2">
          <LightDarkMode />
        </div>
      </motion.div>

      {/* Mobile Menu Toggle & Theme Toggle */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex md:hidden items-center gap-4 z-50 relative"
      >
        <LightDarkMode />
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-6 gap-4 md:hidden shadow-2xl overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                  navigate(link.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg font-medium transition-all duration-300 px-6 py-3 rounded-full w-[80%] text-center ${
                  activeSection === link.id
                    ? (theme === 'light'
                        ? 'bg-black/10 text-black shadow-[0_0_12px_rgba(0,0,0,0.06)] font-semibold'
                        : 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]')
                    : (theme === 'light' ? 'text-gray-500 hover:text-black hover:bg-black/5' : 'text-gray-400 hover:text-white hover:bg-white/5')
                }`}
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
