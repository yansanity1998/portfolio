import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import SplashScreen from './components/SplashScreen'
import Hero from './pages/Hero'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Skills from './pages/Skills'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import CustomCursor from './components/CustomCursor'
import NavBar from './pages/NavBar'
import ScrollAnimation from './components/ScrollAnimation'
import { ThemeProvider } from './context/ThemeContext'

function MainLayout() {
  return (
    <ScrollAnimation>
      <CustomCursor />
      <NavBar />
      <Hero />
      <Home />
      <Skills />
      <Experience />
      <Projects />
      <Gallery />
      <Contact />
      <Footer />
    </ScrollAnimation>
  )
}

function AppContent() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('hasShownSplash');
  });
  const location = useLocation();

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasShownSplash', 'true');
  };

  const pathToSection: Record<string, string> = {
    '/': 'home',
    '/about': 'about',
    '/skills': 'skills',
    '/experience': 'experience',
    '/projects': 'projects',
    '/gallery': 'gallery',
    '/contact': 'contact',
  };

  const navigationType = useNavigationType();

  useEffect(() => {
    if (showSplash) return;
    if (navigationType !== 'POP') return;
    const sectionId = pathToSection[location.pathname];
    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location.pathname, showSplash, navigationType]);

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={handleSplashComplete} />
      ) : (
        <motion.div key="main-app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <MainLayout />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/about" element={<AppContent />} />
          <Route path="/skills" element={<AppContent />} />
          <Route path="/experience" element={<AppContent />} />
          <Route path="/projects" element={<AppContent />} />
          <Route path="/gallery" element={<AppContent />} />
          <Route path="/contact" element={<AppContent />} />
        </Routes>
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App