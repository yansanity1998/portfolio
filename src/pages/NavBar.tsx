import { motion } from 'framer-motion';
import LightDarkMode from '../components/LightDarkMode';

export default function NavBar() {
  return (
    <nav className="absolute top-0 left-0 w-full px-8 md:px-16 py-8 flex justify-between items-center z-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white font-bold text-3xl tracking-tighter cursor-pointer"
      >
        Jesper
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-8 items-center"
      >
        <a href="#" className="px-6 py-2.5 bg-white text-black rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.3)]">Home</a>
        <a href="#gallery" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Gallery</a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact</a>
        <LightDarkMode />
      </motion.div>
    </nav>
  );
}
