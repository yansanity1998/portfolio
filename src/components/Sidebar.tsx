import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Cpu,
  Briefcase,
  FolderGit2,
  Images,
  Mail,
  FileText,
  Phone,
  Menu,
  X,
  ArrowUpRight,
} from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { profile } from '../data/profile'
import ThemeToggle from './ThemeToggle'
import resumePdf from '../assets/docs/resume.pdf'

interface NavItem {
  label: string
  to: string
  icon: typeof User
  section?: 'main' | 'work'
}

const navItems: NavItem[] = [
  { label: 'About', to: '/', icon: User, section: 'main' },
  { label: 'Skills', to: '/skills', icon: Cpu, section: 'main' },
  { label: 'Experience', to: '/experience', icon: Briefcase, section: 'main' },
  { label: 'Gallery', to: '/gallery', icon: Images, section: 'main' },
  { label: 'Contact', to: '/contact', icon: Mail, section: 'main' },
  { label: 'Projects', to: '/projects', icon: FolderGit2, section: 'work' },
]

export default function Sidebar() {
  const { isCustomAccent } = useTheme()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const mainItems = navItems.filter((i) => i.section === 'main')
  const workItems = navItems.filter((i) => i.section === 'work')

  const isRouteActive = (to: string) => {
    if (to === '/') return location.pathname === '/' || location.pathname === '/about'
    return location.pathname.startsWith(to)
  }

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between py-7 select-none">
      {/* Top brand + navigation */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="px-6 flex items-center justify-between gap-2">
          <NavLink
            to="/"
            onClick={() => setMobileOpen(false)}
            style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
            className="text-[17px] font-semibold tracking-tight text-[var(--text-primary)] hover:opacity-80 transition-colors"
          >
            {profile.shortName}
          </NavLink>

          {/* Theme & Light/Dark Mode Controls inside sidebar (Only visible on mobile / small screen drawer) */}
          <ThemeToggle align="left" compact className="relative select-none md:hidden" />
        </div>

        {/* Scrollable nav list */}
        <nav className="mt-8 flex-1 space-y-6 overflow-y-auto">
          <ul className="space-y-0.5">
            {mainItems.map((item) => {
              const Icon = item.icon
              const active = isRouteActive(item.to)
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    style={
                      active && isCustomAccent
                        ? {
                            backgroundColor: 'rgba(var(--accent-rgb), 0.14)',
                            color: 'var(--accent-color)',
                          }
                        : undefined
                    }
                    className={`group flex items-center gap-3.5 w-full px-6 py-2.5 text-[14.5px] transition-all duration-150 ${
                      active
                        ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] font-medium'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-opacity ${
                        active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                      }`}
                    />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              )
            })}
          </ul>

          {/* Featured Projects link block */}
          <div className="pt-4 border-t border-[var(--border-subtle)] space-y-0.5">
            <div className="px-6 pb-2 font-mono text-[10.5px] font-medium tracking-widest uppercase text-[var(--text-muted)]">
              WORK
            </div>

            {workItems.map((item) => {
              const Icon = item.icon
              const active = isRouteActive(item.to)
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  style={
                    active && isCustomAccent
                      ? {
                          backgroundColor: 'rgba(var(--accent-rgb), 0.14)',
                          color: 'var(--accent-color)',
                        }
                      : undefined
                  }
                  className={`group flex items-center gap-3.5 w-full px-6 py-2.5 text-[14.5px] transition-all duration-150 ${
                    active
                      ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] font-medium'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-opacity ${
                      active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
                    }`}
                  />
                  <span>{item.label}</span>
                </NavLink>
              )
            })}

            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full px-6 py-2.5 text-[14px] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)] transition-all duration-150"
            >
              <span className="flex items-center gap-3.5">
                <FileText className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100" />
                <span>Resume / CV</span>
              </span>
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50 group-hover:opacity-90 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom reach out block */}
      <div className="px-6 mt-6 border-t border-[var(--border-subtle)] pt-4">
        <div className="space-y-2.5">
          <p className="text-[12px] leading-relaxed text-[var(--text-muted)]">
            For work, collabs &amp; everything else, reach me at
          </p>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2.5 font-mono text-[12px] font-medium text-[var(--text-primary)] hover:underline hover:text-[var(--accent-color)] transition-colors truncate"
              title={profile.email}
            >
              <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
              <span className="truncate">{profile.email}</span>
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="inline-flex items-center gap-2.5 font-mono text-[12.5px] font-medium text-[var(--text-primary)] hover:underline hover:text-[var(--accent-color)] transition-colors"
            >
              <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--text-muted)]" />
              <span>{profile.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop fixed left sidebar */}
      <aside className="hidden md:fixed md:inset-y-0 md:left-0 md:z-30 md:flex md:w-[245px] md:flex-col border-r border-[var(--border-subtle)] bg-[var(--bg-sidebar)]">
        {sidebarContent}
      </aside>

      {/* Mobile sticky top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-sidebar)]/90 px-4 backdrop-blur-md md:hidden">
        <NavLink
          to="/"
          onClick={() => setMobileOpen(false)}
          className="text-[14px] font-medium text-[var(--text-primary)]"
        >
          {profile.shortName}
        </NavLink>
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer"
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </header>

      {/* Mobile animated drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Smooth fading backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setMobileOpen(false)}
            />
            {/* Smooth sliding drawer with spring physics */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-10 w-[275px] border-r border-[var(--border-subtle)] bg-[var(--bg-sidebar)] shadow-2xl flex flex-col justify-between"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
