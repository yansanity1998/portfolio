import Hero from './pages/Hero'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Gallery from './pages/Gallery'
import Skills from './pages/Skills'
import CustomCursor from './components/CustomCursor'
import NavBar from './pages/NavBar'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <NavBar />
      <Hero />
      <Home />
      <Skills />
      <Experience />
      <Projects />
      <Gallery />
    </ThemeProvider>
  )
}

export default App