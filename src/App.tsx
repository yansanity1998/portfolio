import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
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
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>
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
    </ThemeProvider>
  )
}

export default App