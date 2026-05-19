import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl tracking-wide mb-2" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}>Ian</span>
          <p className="text-sm text-gray-500">Building digital experiences.</p>
        </div>

        <div className="flex items-center gap-6">
          <a href="https://github.com/yansanity1998" target="_blank" rel="noopener noreferrer" className={`text-gray-500 transition-colors ${theme === 'light' ? 'hover:text-black' : 'hover:text-white'}`}>
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/jesper-ian-barila-269086334/?locale=en" target="_blank" rel="noopener noreferrer" className={`text-gray-500 transition-colors ${theme === 'light' ? 'hover:text-black' : 'hover:text-white'}`}>
            <FaLinkedin size={20} />
          </a>
          <a href="https://www.facebook.com/jesper.ian.villacorte.barila" target="_blank" rel="noopener noreferrer" className={`text-gray-500 transition-colors ${theme === 'light' ? 'hover:text-black' : 'hover:text-white'}`}>
            <FaFacebook size={20} />
          </a>
        </div>

        <div className="text-sm text-gray-500 flex flex-col items-center md:items-end">
          <p>&copy; {currentYear} All rights reserved.</p>
          <p className="mt-1 flex items-center gap-1">
            Designed & Built by <span className={theme === 'light' ? 'text-black font-semibold' : 'text-white'} style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 600 }}>Ian</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
