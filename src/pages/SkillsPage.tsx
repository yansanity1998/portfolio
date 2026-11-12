import { motion } from 'framer-motion'
import { skillCategories } from '../data/skills'
import { useTheme } from '../context/ThemeContext'

export default function SkillsPage() {
  const { isCustomAccent } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto max-w-[880px] px-6 py-12 sm:px-10 md:py-16"
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
          Skills
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
          The languages, frameworks, and creative tools I use to build modern web &amp; mobile applications and bring ideas to life.
        </p>
      </header>

      {/* Categorized Minimal Badges */}
      <div className="mt-12 space-y-9">
        {skillCategories.map((category) => (
          <section key={category.title}>
            {/* Category Title + Count */}
            <div className="flex items-center gap-2 mb-3.5">
              <h2 className="font-mono text-[11px] font-semibold tracking-widest uppercase text-[var(--text-muted)]">
                {category.title}
              </h2>
              <span className="font-mono text-[10px] rounded-full border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-2 py-[1px] text-[var(--text-muted)]">
                {category.skills.length}
              </span>
            </div>

            {/* Badges in a clean flex-wrap row */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {category.skills.map(({ name, Icon, brand }) => (
                <div
                  key={name}
                  className="group inline-flex items-center gap-2.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-2 text-[13.5px] font-mono text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent-color)] hover:bg-[var(--bg-surface-hover)] shadow-2xs cursor-default select-none"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-115"
                    style={brand ? { color: brand } : undefined}
                  />
                  <span className="transition-colors group-hover:text-[var(--text-primary)]">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  )
}
