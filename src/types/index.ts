export type ResolvedTheme = 'light' | 'dark'
export type ThemeMode = 'light' | 'dark'

export interface AccentPreset {
  id: string
  label: string
  color?: string
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: 'default', label: 'Monochrome' },
  { id: 'emerald', label: 'Emerald', color: '#10b981' },
  { id: 'violet', label: 'Violet', color: '#8b5cf6' },
  { id: 'sky', label: 'Sky Blue', color: '#0ea5e9' },
  { id: 'amber', label: 'Amber', color: '#f59e0b' },
  { id: 'rose', label: 'Rose', color: '#f43f5e' },
  { id: 'teal', label: 'Teal', color: '#14b8a6' },
]

export interface Project {
  title: string
  role: string
  techStack: string[]
  images: string[]
  description: string
  github: string
  demo: string
}

export interface ExperienceEntry {
  period: string
  title: string
  company: string
  description: string
  logo: string
}
