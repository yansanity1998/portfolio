import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { ThemeProvider } from './context/ThemeContext'
import Sidebar from './components/Sidebar'
import ThemeToggle from './components/ThemeToggle'
import HomePage from './pages/HomePage'
import SkillsPage from './pages/SkillsPage'
import ExperiencePage from './pages/ExperiencePage'
import ProjectsPage from './pages/ProjectsPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import { profile } from './data/profile'

const ROUTE_TITLES: Record<string, string> = {
  '/': `${profile.shortName} — Full Stack Developer & UI/UX Designer`,
  '/about': `About — ${profile.shortName}`,
  '/skills': `Skills — ${profile.shortName}`,
  '/experience': `Experience — ${profile.shortName}`,
  '/projects': `Projects — ${profile.shortName}`,
  '/gallery': `Gallery — ${profile.shortName}`,
  '/contact': `Contact — ${profile.shortName}`,
}

function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    document.title =
      ROUTE_TITLES[location.pathname] ?? `${profile.shortName} | Portfolio`
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] relative">
      {/* Subtle top-right dot matrix texture like bryllim.com */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-0 top-0 h-[360px] w-[360px] dot-matrix-bg [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_75%)]"
      />

      <Sidebar />
      <ThemeToggle />

      <main className="relative z-10 md:pl-[245px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<HomePage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout />
        <Analytics />
      </BrowserRouter>
    </ThemeProvider>
  )
}
