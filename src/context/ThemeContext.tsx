import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react'
import type { ResolvedTheme } from '../types'

interface ThemeContextType {
  theme: ResolvedTheme
  setTheme: (theme: ResolvedTheme) => void
  toggleTheme: () => void
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

  const setTheme = (next: ResolvedTheme) => setThemeState(next)
  const toggleTheme = () => setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
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
