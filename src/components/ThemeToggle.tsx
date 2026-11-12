import { useState, useRef, useEffect } from 'react'
import { Palette, Sun, Moon, X, RotateCcw, Check } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { ACCENT_PRESETS } from '../types'

export default function ThemeToggle() {
  const { theme, setTheme, accentColor, setAccentColor, isCustomAccent } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  // Close palette on click outside or escape
  useEffect(() => {
    if (!paletteOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
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

  return (
    <div className="fixed top-3.5 right-4 sm:top-6 sm:right-8 z-50 select-none">
      {/* Theme Switcher Pill */}
      <div className="inline-flex items-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)]/90 p-1 sm:p-1.5 shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-200 hover:border-[var(--accent-color)]">
        {/* Custom Theme Color Palette Button */}
        <button
          type="button"
          onClick={() => setPaletteOpen((o) => !o)}
          title="Customize theme color"
          aria-label="Customize theme color"
          className={`relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            paletteOpen || isCustomAccent
              ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] shadow-xs scale-105'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <Palette className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
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
          className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            theme === 'light'
              ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] shadow-xs scale-105'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <Sun className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        </button>

        {/* Dark Mode Button */}
        <button
          type="button"
          onClick={() => setTheme('dark')}
          title="Dark mode"
          aria-label="Dark mode"
          className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
            theme === 'dark'
              ? 'bg-[var(--bg-pill)] text-[var(--text-primary)] shadow-xs scale-105'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
          }`}
        >
          <Moon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        </button>
      </div>

      {/* Custom Theme Color Popover anchored right below the pill */}
      {paletteOpen && (
        <div
          ref={popoverRef}
          className="absolute top-full right-0 mt-2.5 z-50 w-[240px] rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 p-4 shadow-2xl backdrop-blur-md animate-fade-in"
        >
          <div className="flex items-center justify-between pb-2.5 border-b border-[var(--border-subtle)]">
            <span className="font-mono text-[12px] font-semibold text-[var(--text-primary)]">
              Theme Color
            </span>
            <div className="flex items-center gap-1.5">
              {isCustomAccent && (
                <button
                  type="button"
                  onClick={() => setAccentColor('')}
                  title="Reset to default"
                  className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition-colors"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setPaletteOpen(false)}
                title="Close"
                className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="mt-3">
            <div className="font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Presets
            </div>
            <div className="grid grid-cols-4 gap-2">
              {ACCENT_PRESETS.map((p) => {
                const isSelected = p.color
                  ? accentColor.toLowerCase() === p.color.toLowerCase()
                  : !isCustomAccent

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setAccentColor(p.color || '')}
                    title={p.label}
                    className="group relative flex h-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] hover:scale-105 transition-all cursor-pointer shadow-xs"
                    style={{
                      backgroundColor: p.color || (theme === 'dark' ? '#27272a' : '#e4e4e7'),
                    }}
                  >
                    {isSelected && (
                      <Check className="h-4 w-4 text-white drop-shadow-sm" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Custom Color Input */}
          <div className="mt-3.5 pt-3 border-t border-[var(--border-subtle)]">
            <div className="font-mono text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Custom Hex
            </div>
            <div className="flex items-center gap-2.5">
              <input
                type="color"
                value={accentColor || (theme === 'dark' ? '#f4f4f5' : '#09090b')}
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-8 w-8 shrink-0 rounded-lg border border-[var(--border-strong)] bg-transparent p-0 cursor-pointer"
                title="Pick custom color"
              />
              <input
                type="text"
                value={accentColor || ''}
                placeholder="#hex"
                onChange={(e) => setAccentColor(e.target.value)}
                className="h-8 min-w-0 flex-1 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] px-2.5 font-mono text-[12px] text-[var(--text-primary)] uppercase focus:outline-none focus:border-[var(--accent-color)]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

