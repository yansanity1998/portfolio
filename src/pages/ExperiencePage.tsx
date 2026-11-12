import { useState } from 'react'
import { motion } from 'framer-motion'
import { List, LayoutGrid } from 'lucide-react'
import { experiences } from '../data/experience'
import { useTheme } from '../context/ThemeContext'

export default function ExperiencePage() {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const { isCustomAccent } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto max-w-[900px] px-6 py-12 sm:px-10 md:py-16"
    >
      {/* Header + View Toggle */}
      <div className="flex items-start justify-between gap-4">
        <div>
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
            experience
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
            Milestones, roles, and hands-on experience from my journey in software development.
          </p>
        </div>

        {/* List / Grid switcher like bryllim.com/blog */}
        <div className="inline-flex shrink-0 items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1">
          <button
            type="button"
            onClick={() => setView('list')}
            aria-label="List view"
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors cursor-pointer ${
              view === 'list'
                ? 'bg-[var(--bg-pill)] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <List className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors cursor-pointer ${
              view === 'grid'
                ? 'bg-[var(--bg-pill)] text-[var(--text-primary)]'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Entries */}
      {view === 'list' ? (
        <div className="mt-10 divide-y divide-[var(--border-subtle)]">
          {experiences.map((exp, index) => (
            <article
              key={`${exp.period}-${exp.title}`}
              className="group grid grid-cols-1 gap-5 py-8 first:pt-2 sm:grid-cols-[170px_1fr] sm:gap-7 items-start"
            >
              {/* Left Thumbnail */}
              <div className="relative flex aspect-[16/10] w-full max-w-[200px] sm:max-w-none items-center justify-center overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                <img
                  src={exp.logo}
                  alt={exp.company}
                  className="h-14 w-14 rounded-full object-cover border border-[var(--border-strong)] shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                {index === 0 && (
                  <span className="absolute top-2 right-2 rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                    Current
                  </span>
                )}
              </div>

              {/* Right Editorial Copy */}
              <div>
                <div className="font-mono text-[11.5px] text-[var(--text-muted)]">
                  {exp.period}
                </div>
                <h2 className="mt-1 text-[17px] font-semibold tracking-tight text-[var(--text-primary)]">
                  {exp.title}
                </h2>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--text-secondary)]">
                  {exp.description}
                </p>
                <div className="mt-3 flex items-center gap-2 font-mono text-[11.5px] text-[var(--text-muted)]">
                  <span className="text-[var(--text-primary)]">{exp.company}</span>
                  <span>·</span>
                  <span>Step 0{experiences.length - index}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {experiences.map((exp, index) => (
            <article
              key={`${exp.period}-${exp.title}`}
              className="flex flex-col justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-strong)]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <img
                    src={exp.logo}
                    alt={exp.company}
                    className="h-10 w-10 rounded-full object-cover border border-[var(--border-strong)]"
                  />
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {exp.period}
                  </span>
                </div>
                <h2 className="mt-4 text-[16px] font-semibold text-[var(--text-primary)]">
                  {exp.title}
                </h2>
                <div className="mt-0.5 font-mono text-[12px] text-[var(--text-muted)]">
                  {exp.company}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                  {exp.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-muted)]">
                Milestone 0{experiences.length - index}
              </div>
            </article>
          ))}
        </div>
      )}
    </motion.div>
  )
}

