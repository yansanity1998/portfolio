import type { ElementType } from 'react'
import type { IconType } from 'react-icons'
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiHtml5,
  SiNodedotjs,
  SiExpress,
  SiCss,
  SiVite,
  SiGit,
  SiGithub,
  SiFigma,
  SiCanva,
  SiFramer,
  SiThreedotjs,
  SiSupabase,
  SiFirebase,
  SiExpo,
  SiVercel,
  SiNetlify,
  SiCloudflare,
  SiN8N,
  SiBootstrap,
  SiClaude,
  SiGooglegemini,
  SiOpenai,
  SiElevenlabs,
  SiDialogflow,
} from 'react-icons/si'
import { PenTool, Film, Scissors } from 'lucide-react'

export interface SkillItem {
  name: string
  Icon: ElementType
  brand?: string
}

export interface SkillCategory {
  title: string
  skills: SkillItem[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Generative Tools',
    skills: [
      { name: 'Claude', Icon: SiClaude, brand: '#CC785C' },
      { name: 'Gemini', Icon: SiGooglegemini, brand: '#8E75FF' },
      { name: 'ChatGPT', Icon: SiOpenai, brand: '#10A37F' },
      { name: 'ElevenLabs', Icon: SiElevenlabs, brand: '#3B82F6' },
      { name: 'Google Flow', Icon: SiDialogflow, brand: '#FF9800' },
    ],
  },
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', Icon: SiReact, brand: '#61DAFB' },
      { name: 'TypeScript', Icon: SiTypescript, brand: '#3178C6' },
      { name: 'JavaScript', Icon: SiJavascript, brand: '#F7DF1E' },
      { name: 'Tailwind CSS', Icon: SiTailwindcss, brand: '#06B6D4' },
      { name: 'Bootstrap', Icon: SiBootstrap, brand: '#7952B3' },
      { name: 'HTML5', Icon: SiHtml5, brand: '#E34F26' },
      { name: 'CSS3', Icon: SiCss, brand: '#1572B6' },
      { name: 'Vite', Icon: SiVite, brand: '#646CFF' },
      { name: 'Framer Motion', Icon: SiFramer, brand: '#0055FF' },
      { name: 'Three.js', Icon: SiThreedotjs, brand: '#888888' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { name: 'PHP', Icon: SiPhp, brand: '#777BB4' },
      { name: 'Laravel', Icon: SiLaravel, brand: '#FF2D20' },
      { name: 'Node.js', Icon: SiNodedotjs, brand: '#5FA04E' },
      { name: 'Express', Icon: SiExpress, brand: '#888888' },
      { name: 'MySQL', Icon: SiMysql, brand: '#4479A1' },
      { name: 'Supabase', Icon: SiSupabase, brand: '#3ECF8E' },
      { name: 'Firebase', Icon: SiFirebase, brand: '#FFCA28' },
    ],
  },
  {
    title: 'Mobile Development',
    skills: [
      { name: 'React Native', Icon: SiReact, brand: '#61DAFB' },
      { name: 'Expo Go', Icon: SiExpo, brand: '#888888' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', Icon: SiGit, brand: '#F05032' },
      { name: 'GitHub', Icon: SiGithub, brand: '#888888' },
      { name: 'Cloudflare', Icon: SiCloudflare, brand: '#F38020' },
      { name: 'n8n', Icon: SiN8N, brand: '#EA4B71' },
      { name: 'Vercel', Icon: SiVercel, brand: '#888888' },
      { name: 'Netlify', Icon: SiNetlify, brand: '#00C7B7' },
    ],
  },
  {
    title: 'Creative & UI/UX',
    skills: [
      { name: 'Figma', Icon: SiFigma, brand: '#F24E1E' },
      { name: 'Canva', Icon: SiCanva, brand: '#00C4CC' },
      { name: 'Adobe Illustrator', Icon: PenTool, brand: '#FF9A00' },
      { name: 'Adobe Premiere Pro', Icon: Film, brand: '#9999FF' },
      { name: 'CapCut', Icon: Scissors, brand: '#00F0FF' },
    ],
  },
]

export const developSkills = [
  'Claude', 'Gemini', 'ChatGPT', 'ElevenLabs', 'Google Flow',
  'React', 'TypeScript', 'Tailwind', 'Bootstrap', 'JavaScript', 'HTML', 'CSS', 'PHP', 'Laravel',
  'React Native', 'Expo Go', 'Firebase', 'Supabase', 'Cloudflare', 'n8n', 'Vercel', 'Netlify', 'MySQL',
]

export const createSkills = ['Figma', 'Canva', 'Capcut', 'Adobe Premiere Pro', 'Adobe Illustrator']

export interface Tool {
  id: string
  name: string
  Icon: IconType
  brand: string
  publisher: string
  description: string
}

export const tools: Tool[] = [
  { id: 'react', name: 'React', Icon: SiReact, brand: '#61DAFB', publisher: 'Meta', description: 'Component-driven UIs' },
  { id: 'typescript', name: 'TypeScript', Icon: SiTypescript, brand: '#3178C6', publisher: 'Microsoft', description: 'Typed JavaScript at scale' },
  { id: 'javascript', name: 'JavaScript', Icon: SiJavascript, brand: '#F7DF1E', publisher: 'ECMA', description: 'The language of the web' },
  { id: 'tailwindcss', name: 'Tailwind CSS', Icon: SiTailwindcss, brand: '#06B6D4', publisher: 'Tailwind Labs', description: 'Utility-first styling' },
  { id: 'laravel', name: 'Laravel', Icon: SiLaravel, brand: '#FF2D20', publisher: 'Laravel LLC', description: 'Robust PHP back-ends' },
  { id: 'mysql', name: 'MySQL', Icon: SiMysql, brand: '#4479A1', publisher: 'Oracle', description: 'Relational data' },
  { id: 'php', name: 'PHP', Icon: SiPhp, brand: '#777BB4', publisher: 'PHP Group', description: 'Server-side scripting' },
  { id: 'html5', name: 'HTML5', Icon: SiHtml5, brand: '#E34F26', publisher: 'W3C', description: 'Semantic markup' },
  { id: 'nodejs', name: 'Node.js', Icon: SiNodedotjs, brand: '#5FA04E', publisher: 'OpenJS', description: 'JavaScript runtime' },
  { id: 'express', name: 'Express', Icon: SiExpress, brand: '#888888', publisher: 'OpenJS', description: 'Minimal web framework' },
  { id: 'css3', name: 'CSS3', Icon: SiCss, brand: '#1572B6', publisher: 'W3C', description: 'Modern layouts & motion' },
  { id: 'vite', name: 'Vite', Icon: SiVite, brand: '#646CFF', publisher: 'VoidZero', description: 'Instant dev server' },
  { id: 'git', name: 'Git', Icon: SiGit, brand: '#F05032', publisher: 'Software Freedom', description: 'Version control' },
  { id: 'github', name: 'GitHub', Icon: SiGithub, brand: '#888888', publisher: 'GitHub', description: 'Code hosting & CI' },
  { id: 'figma', name: 'Figma', Icon: SiFigma, brand: '#F24E1E', publisher: 'Figma', description: 'Interface design' },
  { id: 'framer-motion', name: 'Framer Motion', Icon: SiFramer, brand: '#0055FF', publisher: 'Framer', description: 'Declarative animation' },
  { id: 'threejs', name: 'Three.js', Icon: SiThreedotjs, brand: '#888888', publisher: 'mrdoob', description: '3D on the web' },
]
