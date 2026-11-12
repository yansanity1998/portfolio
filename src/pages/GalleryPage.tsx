import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { galleryImages } from '../data/gallery'
import { useTheme } from '../context/ThemeContext'

export default function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const { isCustomAccent } = useTheme()

  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null)
      else if (e.key === 'ArrowRight') {
        setSelectedIndex((i) => (i === null ? 0 : (i + 1) % galleryImages.length))
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((i) =>
          i === null ? 0 : (i - 1 + galleryImages.length) % galleryImages.length,
        )
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto max-w-[920px] px-6 py-12 sm:px-10 md:py-16"
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
          gallery
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
          A collection of moments from my journey as a developer and creator — building projects, exploring new technologies, and constantly pushing creative boundaries.
        </p>
      </header>

      {/* Section Label */}
      <div className="mt-12 font-mono text-[11px] font-medium tracking-widest uppercase text-[var(--text-muted)]">
        SNAPSHOTS ({galleryImages.length})
      </div>

      {/* Clean Grid matching bryllim.com cards */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map(({ name, url }, index) => (
          <button
            key={name}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group flex flex-col rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 text-left transition-all duration-200 hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)] cursor-pointer"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-zinc-900">
              <img
                src={url}
                alt={`Snapshot ${index + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-3 flex items-center justify-between px-0.5">
              <div>
                <div className="font-mono text-[13px] font-medium text-[var(--text-primary)]">
                  Snapshot {String(index + 1).padStart(2, '0')}
                </div>
                <div className="font-mono text-[11px] text-[var(--text-muted)]">
                  {name}
                </div>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--text-primary)]" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[88vh] max-w-4xl flex-col items-center"
            >
              <img
                src={galleryImages[selectedIndex].url}
                alt={galleryImages[selectedIndex].name}
                className="max-h-[80vh] w-auto rounded-xl border border-white/15 object-contain shadow-2xl"
              />
              <div className="mt-3 flex items-center gap-4 font-mono text-[12px] text-zinc-300">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + galleryImages.length) % galleryImages.length,
                    )
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span>
                  {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                  {String(galleryImages.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % galleryImages.length)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20 cursor-pointer"
                  aria-label="Close lightbox"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

