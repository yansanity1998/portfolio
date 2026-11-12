import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Sun, Moon, X, Pipette, Hash, RotateCcw } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { ACCENT_PRESETS } from '../types'

interface ThemeToggleProps {
  className?: string
  align?: 'left' | 'right'
  compact?: boolean
}

export default function ThemeToggle({
  className = 'hidden md:block md:fixed md:top-6 md:right-8 md:z-50 select-none',
  align = 'right',
  compact = false,
}: ThemeToggleProps) {
  const { theme, setTheme, accentColor, setAccentColor, isCustomAccent } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 640
  })

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Find currently selected preset if any
  const matchedPreset = ACCENT_PRESETS.find(
    (p) =>
      (p.color && p.color.toLowerCase() === accentColor.toLowerCase()) ||
      (!p.color && !isCustomAccent),
  )

  const isCustomSelected =
    isCustomAccent &&
    !ACCENT_PRESETS.some(
      (p) => p.color && p.color.toLowerCase() === accentColor.toLowerCase(),
    )

  // Close palette on click outside or escape
  useEffect(() => {
    if (!paletteOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setPaletteOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPaletteOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKey)
    }
  }, [paletteOpen])

  const btnSizeClass = compact
    ? 'h-7 w-7 sm:h-8 sm:w-8'
    : 'h-8 w-8 sm:h-9 sm:w-9'
  const iconSizeClass = compact
    ? 'h-3.5 w-3.5 sm:h-4 sm:w-4'
    : 'h-4 w-4 sm:h-[18px] sm:w-[18px]'

  const popoverPosClass =
    align === 'left'
      ? 'sm:left-0 sm:right-auto sm:mt-3 sm:w-[305px]'
      : 'sm:right-0 sm:left-auto sm:mt-3 sm:w-[305px]'

  return (
    <div className={className}>
      {/* Theme Switcher Icons */}
      <div className="inline-flex items-center gap-0.5 sm:gap-1">
        {/* Custom Theme Color Palette Button */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setPaletteOpen((o) => !o)}
          title="Customize theme color"
          aria-label="Customize theme color"
          className={`relative flex ${btnSizeClass} items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            paletteOpen || isCustomAccent
              ? 'bg-[var(--bg-pill)] text-[var(--accent-color)] shadow-xs scale-105'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <Palette className={iconSizeClass} />
          {isCustomAccent && (
            <span
              className="absolute bottom-1 right-1 h-2 w-2 rounded-full ring-2 ring-[var(--bg-surface)]"
              style={{ backgroundColor: accentColor }}
            />
          )}
        </button>

        {/* Light Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('light')}
          title="Light mode"
          aria-label="Light mode"
          className={`flex ${btnSizeClass} items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            theme === 'light'
              ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] shadow-xs scale-105'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <Sun className={iconSizeClass} />
        </button>

        {/* Dark Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('dark')}
          title="Dark mode"
          aria-label="Dark mode"
          className={`flex ${btnSizeClass} items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            theme === 'dark'
              ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] shadow-xs scale-105'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <Moon className={iconSizeClass} />
        </button>
      </div>

      {/* Terminal-Inspired Unique Popover on Desktop / Bottom Sheet on Mobile */}
      <AnimatePresence>
        {paletteOpen && (
          <>
            {/* Mobile dark backdrop overlay */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setPaletteOpen(false)}
                className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xs"
              />
            )}

            {/* Bottom Sheet on Mobile / Dropdown on Desktop */}
            <motion.div
              ref={popoverRef}
              initial={
                isMobile
                  ? { y: '100%' }
                  : { opacity: 0, scale: 0.95, y: -6 }
              }
              animate={
                isMobile
                  ? { y: 0 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                isMobile
                  ? { y: '100%' }
                  : { opacity: 0, scale: 0.95, y: -6 }
              }
              transition={
                isMobile
                  ? { type: 'spring', damping: 28, stiffness: 300 }
                  : { duration: 0.18, ease: [0.16, 1, 0.3, 1] }
              }
              className={
                isMobile
                  ? 'fixed inset-x-0 bottom-0 z-[70] w-full max-w-lg mx-auto overflow-hidden rounded-t-[28px] border-t border-[var(--border-strong)] bg-[var(--bg-surface)] p-5 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl'
                  : `absolute top-full z-50 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] backdrop-blur-2xl ${popoverPosClass}`
              }
            >
              {/* Drag handle pill on mobile bottom sheet */}
              {isMobile && (
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[var(--border-strong)]" />
              )}
            {/* Glowing top ambient line matching active accent */}
            <div
              className="absolute -top-[1px] left-8 right-8 h-[2px] opacity-90 blur-[0.5px]"
              style={{
                background: `linear-gradient(90deg, transparent, var(--accent-color), transparent)`,
                boxShadow: '0 0 14px var(--accent-color)',
              }}
            />

            {/* Header: Theme – main color on left, Active Color Name on right */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-1.5 font-mono text-[13px] font-semibold text-[var(--text-primary)] tracking-tight">
                <span>Theme</span>
              </div>

              <div className="flex items-center gap-2">
                {isCustomAccent && (
                  <button
                    type="button"
                    onClick={() => setAccentColor('')}
                    title="Reset to original default"
                    className="flex items-center gap-1 rounded px-1.5 py-0.5 font-mono text-[10.5px] text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-pill)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <RotateCcw className="h-3 w-3" />
                    <span>Reset</span>
                  </button>
                )}
                <span
                  style={{ color: isCustomAccent ? 'var(--accent-color)' : undefined }}
                  className="font-mono text-[12px] font-semibold text-[var(--text-primary)] capitalize"
                >
                  {matchedPreset ? matchedPreset.label : 'Custom'}
                </span>
                <button
                  type="button"
                  onClick={() => setPaletteOpen(false)}
                  title="Close"
                  className="flex h-5 w-5 items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* 4x2 Swatches Grid */}
            <div className="mt-2 grid grid-cols-4 gap-2">
              {/* Presets 1-7 (including Default) */}
              {ACCENT_PRESETS.map((p) => {
                const isDefault = p.id === 'default'
                const isSelected = isDefault
                  ? !isCustomAccent
                  : accentColor.toLowerCase() === (p.color || '').toLowerCase()

                const circleColor = isDefault
                  ? theme === 'dark'
                    ? '#f4f4f5'
                    : '#18181b'
                  : p.color

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      if (isDefault) {
                        setAccentColor('')
                      } else {
                        setAccentColor(p.color || '')
                      }
                    }}
                    className={`group flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border border-[var(--accent-color)] bg-[var(--accent-color)]/10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.35)] scale-105'
                        : 'border border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)]'
                    }`}
                  >
                    {/* Color circle disc */}
                    <div
                      className={`relative h-8 w-8 rounded-full transition-all duration-200 shadow-xs flex items-center justify-center ${
                        isSelected ? 'scale-105 shadow-[0_0_10px_var(--accent-color)]' : 'group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: circleColor }}
                    >
                      {/* Glossy sheen */}
                      <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 via-transparent to-white/30 pointer-events-none" />
                      {/* Subtle center dot for default to indicate original */}
                      {isDefault && (
                        <span
                          className={`h-2 w-2 rounded-full ${
                            theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-200'
                          }`}
                        />
                      )}
                    </div>

                    {/* Label below */}
                    <span
                      style={isSelected ? { color: 'var(--accent-color)' } : undefined}
                      className={`mt-1.5 font-mono text-[11px] font-medium transition-colors ${
                        isSelected ? 'font-semibold' : 'text-[var(--text-secondary)]'
                      }`}
                    >
                      {p.label}
                    </span>
                  </button>
                )
              })}

              {/* 8th Slot: Unique Interactive Color Picker */}
              <div
                className={`group relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 cursor-pointer ${
                  isCustomSelected
                    ? 'border border-[var(--accent-color)] bg-[var(--accent-color)]/10 shadow-[0_0_15px_rgba(var(--accent-rgb),0.35)] scale-105'
                    : 'border border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--bg-surface-hover)]'
                }`}
              >
                {/* Chromatic Rainbow Disc / Pipette */}
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full shadow-xs transition-transform duration-200 group-hover:scale-105 overflow-hidden"
                  style={{
                    background: accentColor && isCustomSelected
                      ? accentColor
                      : 'conic-gradient(from 0deg, #ef4444, #f59e0b, #22c55e, #06b6d4, #a855f7, #ec4899, #ef4444)',
                    boxShadow: isCustomSelected ? `0 0 10px ${accentColor}` : undefined,
                  }}
                >
                  <Pipette className="h-3.5 w-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none" />
                  <input
                    type="color"
                    value={accentColor || '#10b981'}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                    title="Pick custom color"
                  />
                </div>

                {/* Label */}
                <span
                  style={isCustomSelected ? { color: 'var(--accent-color)' } : undefined}
                  className={`mt-1.5 font-mono text-[11px] font-medium transition-colors ${
                    isCustomSelected ? 'font-semibold' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  Custom
                </span>
              </div>
            </div>

            {/* Custom HEX code input bar (visible when custom color active or on hover) */}
            <div className="mt-3.5 pt-3 border-t border-[var(--border-subtle)]/70">
              <div className="flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)]/80 px-2.5 py-1.5 transition-colors focus-within:border-[var(--accent-color)]">
                <Hash className="h-3.5 w-3.5 text-[var(--text-muted)] shrink-0" />
                <input
                  type="text"
                  value={accentColor.replace(/^#/, '')}
                  placeholder="CUSTOM HEX"
                  onChange={(e) => {
                    const val = e.target.value.trim()
                    if (!val) {
                      setAccentColor('')
                    } else {
                      setAccentColor(`#${val.replace(/^#/, '')}`)
                    }
                  }}
                  className="w-full bg-transparent font-mono text-[11.5px] uppercase tracking-wider text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
                />
                {accentColor && (
                  <span
                    className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
                    style={{ backgroundColor: accentColor }}
                  />
                )}
              </div>
            </div>

            {/* Terminal Accent Subtext (matching reference) */}
            <p className="mt-3 font-mono text-[11px] leading-relaxed text-[var(--text-muted)]">
              Pick your terminal accent — updates glow, buttons, links.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </div>
  )
}



