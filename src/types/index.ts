export type ResolvedTheme = 'light' | 'dark'
export type ThemeMode = 'light' | 'dark'

export interface AccentPreset {
  id: string
  label: string
  color?: string
}

export const ACCENT_PRESETS: AccentPreset[] = [
  { id: 'green', label: 'Green', color: '#22c55e' },
  { id: 'yellow', label: 'Yellow', color: '#eab308' },
  { id: 'purple', label: 'Purple', color: '#a855f7' },
  { id: 'cyan', label: 'Cyan', color: '#06b6d4' },
  { id: 'default', label: 'Default', color: '' },
  { id: 'rose', label: 'Rose', color: '#f43f5e' },
  { id: 'orange', label: 'Orange', color: '#f97316' },
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
