import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import type { ResolvedTheme } from '../types'

export interface ThemeTransitionOrigin {
  x: number
  y: number
}

interface ThemeContextType {
  theme: ResolvedTheme
  setTheme: (theme: ResolvedTheme, origin?: ThemeTransitionOrigin) => void
  toggleTheme: (origin?: ThemeTransitionOrigin) => void
  accentColor: string
  setAccentColor: (color: string) => void
  isCustomAccent: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
  accentColor: '',
  setAccentColor: () => {},
  isCustomAccent: false,
})

function hexToRgb(hex: string): string {
  const clean = hex.replace('#', '')
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16)
    const g = parseInt(clean[1] + clean[1], 16)
    const b = parseInt(clean[2] + clean[2], 16)
    return `${r}, ${g}, ${b}`
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16)
    const g = parseInt(clean.substring(2, 4), 16)
    const b = parseInt(clean.substring(4, 6), 16)
    return `${r}, ${g}, ${b}`
  }
  return '255, 255, 255'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ResolvedTheme>(() => {
    const stored = localStorage.getItem('theme-mode') || localStorage.getItem('theme')
    return stored === 'light' ? 'light' : 'dark'
  })

  const [accentColor, setAccentColorState] = useState<string>(() => {
    return localStorage.getItem('theme-accent-color') || ''
  })

  useLayoutEffect(() => {
    localStorage.setItem('theme', theme)
    localStorage.setItem('theme-mode', theme)
    document.documentElement.classList.toggle('light', theme === 'light')
    document.documentElement.classList.toggle('dark', theme === 'dark')

    if (accentColor) {
      localStorage.setItem('theme-accent-color', accentColor)
      document.documentElement.style.setProperty('--accent-color', accentColor)
      document.documentElement.style.setProperty('--accent-rgb', hexToRgb(accentColor))
      document.documentElement.setAttribute('data-custom-accent', 'true')
    } else {
      localStorage.removeItem('theme-accent-color')
      document.documentElement.style.removeProperty('--accent-color')
      document.documentElement.style.removeProperty('--accent-rgb')
      document.documentElement.removeAttribute('data-custom-accent')
    }
  }, [theme, accentColor])

  const applyThemeWithTransition = (
    next: ResolvedTheme,
    origin?: ThemeTransitionOrigin,
  ) => {
    if (next === theme) return

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>
      }
    }

    if (typeof doc.startViewTransition === 'function' && !prefersReducedMotion) {
      const x = origin?.x ?? window.innerWidth / 2
      const y = origin?.y ?? window.innerHeight / 2
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          setThemeState(next)
        })
      })

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      return
    }

    // Smooth CSS fallback when View Transitions API is unavailable
    if (!prefersReducedMotion) {
      document.documentElement.classList.add('theme-transition')
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transition')
      }, 450)
    }
    setThemeState(next)
  }

  const setTheme = (next: ResolvedTheme, origin?: ThemeTransitionOrigin) =>
    applyThemeWithTransition(next, origin)

  const toggleTheme = (origin?: ThemeTransitionOrigin) =>
    applyThemeWithTransition(theme === 'light' ? 'dark' : 'light', origin)

  const setAccentColor = (color: string) => setAccentColorState(color)

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        accentColor,
        setAccentColor,
        isCustomAccent: Boolean(accentColor),
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => useContext(ThemeContext)
