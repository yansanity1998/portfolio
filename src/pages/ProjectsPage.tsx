import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUpRight,
  Images,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/projects'
import type { Project } from '../types'
import { useTheme } from '../context/ThemeContext'

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const { isCustomAccent } = useTheme()

  const openModal = (project: Project, startIdx = 0) => {
    setActiveProject(project)
    setImageIndex(startIdx)
  }

  useEffect(() => {
    if (!activeProject) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveProject(null)
      else if (e.key === 'ArrowRight') {
        setImageIndex((i) => (i + 1) % activeProject.images.length)
      } else if (e.key === 'ArrowLeft') {
        setImageIndex((i) => (i - 1 + activeProject.images.length) % activeProject.images.length)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeProject])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto max-w-[860px] px-6 py-12 sm:px-10 md:py-16"
    >
      {/* Header */}
      <header className="max-w-2xl">
        <h1
          style={
            isCustomAccent
              ? {
                  color: 'var(--accent-color)',
                  textShadow: '0 0 35px rgba(var(--accent-rgb), 0.35)',
                }
              : undefined
          }
          className="font-mono text-3xl font-semibold tracking-tight text-[var(--text-primary)] transition-colors"
        >
          projects
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
          A collection of digital experiences combining robust backends with immersive frontends — spanning web platforms, institutional systems, and UI/UX prototypes.
        </p>
      </header>

      {/* Stacked Project Cards (bryllim.com/projects style) */}
      <div className="mt-10 space-y-6">
        {projects.map((project) => {
          const firstParagraph = project.description.split('\n\n')[0]
          const hasDemo = project.demo && project.demo !== '#'
          const hasGithub = project.github && project.github !== '#'
          const demoHref =
            hasDemo && !/^https?:\/\//.test(project.demo)
              ? `https://${project.demo}`
              : project.demo

          return (
            <article
              key={project.title}
              onClick={() => openModal(project, 0)}
              className="group relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-7 transition-all duration-300 hover:border-[var(--border-strong)] hover:shadow-lg cursor-pointer"
            >
              {/* Project preview background image */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-right-top sm:bg-right opacity-40 dark:opacity-45 group-hover:opacity-60 transition-all duration-500 scale-100 group-hover:scale-[1.02] pointer-events-none"
                style={{ backgroundImage: `url(${project.images[0]})` }}
              />
              {/* Protective directional gradient: solid on the left half to prevent screenshot text collision, fading to transparent on the right */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] from-35% via-[var(--bg-surface)]/85 via-60% to-transparent pointer-events-none"
              />

              <div className="relative z-10 max-w-2xl">
                {/* Top: Badges + Title + Description */}
                <div>
                  {/* Badges Row */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {/* Highlighted Role Pill like ⟨ #1 FINANCE APP ⟩ */}
                    <span
                      style={isCustomAccent ? { backgroundColor: 'var(--accent-color)' } : undefined}
                      className="inline-flex items-center gap-1 rounded-full bg-[var(--text-primary)] px-2 py-[2px] font-mono text-[9.5px] font-semibold tracking-wider uppercase text-[var(--bg-page)] transition-colors"
                    >
                      <span>‹</span>
                      <span>{project.role}</span>
                      <span>›</span>
                    </span>

                    {/* Tech Stack Pills */}
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-2 py-[2px] font-mono text-[9.5px] tracking-wider uppercase text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h2
                    className="mt-3 font-mono text-xl font-medium tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-color)]"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                    {firstParagraph}
                  </p>
                </div>

                {/* Action Buttons Row */}
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  {hasDemo && (
                    <a
                      href={demoHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={isCustomAccent ? { borderColor: 'var(--accent-color)', color: 'var(--accent-color)' } : undefined}
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-page)]/90 px-4 py-2 font-mono text-[12px] font-medium text-[var(--text-primary)] backdrop-blur-xs transition-colors hover:bg-[var(--bg-pill)]"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {hasGithub && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)]/90 px-4 py-2 font-mono text-[12px] text-[var(--text-secondary)] backdrop-blur-xs transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                    >
                      <FaGithub className="h-3.5 w-3.5" />
                      <span>GitHub</span>
                      <ArrowUpRight className="h-3 w-3 opacity-70" />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      openModal(project, 0)
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)]/90 px-4 py-2 font-mono text-[12px] text-[var(--text-secondary)] backdrop-blur-xs transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <Images className="h-3.5 w-3.5" />
                    <span>
                      Case Study &amp; Screenshots ({project.images.length})
                    </span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Full Case Study & Screenshots Lightbox Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] md:flex-row shadow-2xl"
            >
              {/* Left Image Viewer */}
              <div className="relative flex h-64 sm:h-80 md:h-auto md:w-[56%] shrink-0 items-center justify-center bg-black overflow-hidden border-b md:border-b-0 md:border-r border-[var(--border-subtle)]">
                <img
                  src={activeProject.images[imageIndex]}
                  alt={`${activeProject.title} preview ${imageIndex + 1}`}
                  className="h-full w-full object-cover object-top"
                />

                {activeProject.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex(
                          (i) =>
                            (i - 1 + activeProject.images.length) %
                            activeProject.images.length,
                        )
                      }
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setImageIndex((i) => (i + 1) % activeProject.images.length)
                      }
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-xs">
                      {imageIndex + 1} / {activeProject.images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Right Details Column */}
              <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      {activeProject.role}
                    </span>
                    <h2 className="mt-1 font-mono text-2xl font-medium text-[var(--text-primary)]">
                      {activeProject.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveProject(null)}
                    aria-label="Close modal"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-3 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                  {activeProject.description.split('\n\n').map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2.5 border-t border-[var(--border-subtle)] pt-5">
                  {activeProject.demo !== '#' && (
                    <a
                      href={
                        /^https?:\/\//.test(activeProject.demo)
                          ? activeProject.demo
                          : `https://${activeProject.demo}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-4 py-2 font-mono text-[12px] font-medium text-[var(--bg-page)] hover:opacity-90"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {activeProject.github !== '#' && (
                    <a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] px-4 py-2 font-mono text-[12px] text-[var(--text-primary)] hover:bg-[var(--bg-pill)]"
                    >
                      <FaGithub className="h-3.5 w-3.5" />
                      <span>GitHub Repo</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
