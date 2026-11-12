import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useSpring, type MotionValue } from 'framer-motion'
import { List, LayoutGrid } from 'lucide-react'
import { experiences } from '../data/experience'
import { useTheme } from '../context/ThemeContext'

function TimelineNode({
  index,
  total,
  scrollYProgress,
  isCustomAccent,
}: {
  index: number
  total: number
  scrollYProgress: MotionValue<number>
  isCustomAccent: boolean
}) {
  // Threshold along scroll for activating this circle
  const threshold = index === 0 ? 0.02 : (index / (total - 1)) * 0.88
  const [active, setActive] = useState(index === 0)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setActive(latest >= threshold)
    })
  }, [scrollYProgress, threshold])

  return (
    <div
      className={`absolute -left-[29px] sm:-left-[45px] top-3.5 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border bg-[var(--bg-page)] shrink-0 z-10 shadow-xs transition-all duration-300 ${
        active
          ? 'border-[var(--accent-color)] shadow-[0_0_12px_rgba(var(--accent-rgb),0.55)] scale-110'
          : 'border-[var(--border-strong)] scale-100'
      }`}
    >
      <span
        style={
          active || isCustomAccent
            ? { backgroundColor: active ? 'var(--accent-color)' : undefined }
            : undefined
        }
        className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-all duration-300 ${
          active
            ? 'bg-[var(--accent-color)] shadow-[0_0_8px_var(--accent-color)] animate-pulse'
            : 'bg-[var(--text-muted)] opacity-40'
        }`}
      />
    </div>
  )
}

export default function ExperiencePage() {
  const [view, setView] = useState<'timeline' | 'grid'>('timeline')
  const { isCustomAccent } = useTheme()
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-driven timeline progress line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 70%'],
  })

  // Smooth spring physics for fluid line drawing
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto max-w-[880px] px-6 py-12 sm:px-10 md:py-16"
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
            Experience
          </h1>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
            Milestones, roles, and hands-on experience from my journey in software development.
          </p>
        </div>

        {/* View Switcher: Timeline / Grid */}
        <div className="inline-flex shrink-0 items-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1">
          <button
            type="button"
            onClick={() => setView('timeline')}
            aria-label="Timeline view"
            title="Timeline view"
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors cursor-pointer ${
              view === 'timeline'
                ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <List className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setView('grid')}
            aria-label="Grid view"
            title="Grid view"
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors cursor-pointer ${
              view === 'grid'
                ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] shadow-xs'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Entries */}
      {view === 'timeline' ? (
        <div ref={containerRef} className="relative mt-14 pl-8 sm:pl-12">
          {/* Static background track line */}
          <div
            aria-hidden="true"
            className="absolute left-[11px] sm:left-[15px] top-4 bottom-8 w-[2px] bg-[var(--border-subtle)]"
          />

          {/* Dynamic scroll-driven animated timeline line */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-[11px] sm:left-[15px] top-4 bottom-8 w-[2px] bg-gradient-to-b from-[var(--accent-color)] via-[var(--accent-color)] to-[var(--accent-color)] shadow-[0_0_12px_rgba(var(--accent-rgb),0.8)] z-0"
          />

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-10">
            {experiences.map((exp, index) => {
              const isCurrent = index === 0

              return (
                <motion.article
                  key={`${exp.period}-${exp.title}`}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="group relative flex items-start gap-4 sm:gap-6"
                >
                  {/* Timeline Circle that activates when scrolled to */}
                  <TimelineNode
                    index={index}
                    total={experiences.length}
                    scrollYProgress={scrollYProgress}
                    isCustomAccent={isCustomAccent}
                  />

                  {/* Card Container with small border radius and company logo background */}
                  <div className="group relative flex-1 overflow-hidden rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 transition-all duration-200 hover:border-[var(--border-strong)] shadow-2xs">
                    {/* Background logo from the company/role with tuned opacity for clean readability */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-15 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                      style={{ backgroundImage: `url(${exp.logo})` }}
                    />
                    {/* Soft gradient wash overlay to protect text contrast */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/90 to-[var(--bg-surface)]/70 pointer-events-none"
                    />

                    {/* Content Layer on top */}
                    <div className="relative z-10">
                      {/* Top Row: Period + Badge (Step number removed) */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[12px] text-[var(--text-muted)]">
                            {exp.period}
                          </span>
                          {isCurrent && (
                            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Middle: Logo + Role Title & Company */}
                      <div className="mt-4 flex items-center gap-3.5 sm:gap-4">
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="h-11 w-11 sm:h-12 sm:w-12 rounded-full object-cover border border-[var(--border-strong)] shrink-0 bg-white shadow-xs"
                        />
                        <div>
                          <h2 className="text-[17px] sm:text-[18px] font-semibold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-color)]">
                            {exp.title}
                          </h2>
                          <div className="mt-0.5 font-mono text-[12.5px] text-[var(--text-secondary)]">
                            {exp.company}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3.5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      ) : (
        /* Alternative Grid View */
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {experiences.map((exp, index) => {
            return (
              <article
                key={`${exp.period}-${exp.title}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-strong)]"
              >
                {/* Background logo from the company/role */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-15 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundImage: `url(${exp.logo})` }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/90 to-[var(--bg-surface)]/70 pointer-events-none"
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">
                      {exp.period}
                    </span>
                    {index === 0 && (
                      <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                        Current
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      className="h-10 w-10 rounded-full object-cover border border-[var(--border-strong)] shrink-0 bg-white shadow-xs"
                    />
                    <div>
                      <h2 className="text-[16.5px] font-semibold text-[var(--text-primary)]">
                        {exp.title}
                      </h2>
                      <div className="mt-0.5 font-mono text-[12px] text-[var(--text-muted)]">
                        {exp.company}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                    {exp.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
