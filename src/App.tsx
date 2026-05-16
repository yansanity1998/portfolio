import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('hasShownSplash');
  });

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('hasShownSplash', 'true');
  };

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={handleSplashComplete} />
        ) : (
          <motion.div key="main-app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </ThemeProvider>
  )
}

export default App