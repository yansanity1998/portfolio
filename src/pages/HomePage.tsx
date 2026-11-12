import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Layers,
  FileText,
} from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import MonkeytypeBio from '../components/MonkeytypeBio'
import CountUp from '../components/CountUp'
import jesperLight from '../assets/profile/jesper-nobg.png'
import jesperDark from '../assets/profile/jesper-dark.png'
import pixzelLogo from '../assets/logos/pixzel.jpg'
import spcLogo from '../assets/logos/spc.png'
import resumePdf from '../assets/docs/resume.pdf'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { developSkills, createSkills } from '../data/skills'

export default function HomePage() {
  const { theme, isCustomAccent } = useTheme()
  const totalSkills = developSkills.length + createSkills.length
  const currentPortrait = theme === 'dark' ? jesperDark : jesperLight

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] md:min-h-screen max-w-[960px] flex-col justify-start md:justify-center px-5 py-8 sm:px-10 md:py-16"
    >
      {/* Top Hero Section: Portrait Left, Bio Right */}
      <div className="grid grid-cols-1 items-center gap-8 sm:gap-10 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] lg:gap-14">
        {/* Portrait (Switches between light and dark modes) */}
        <div className="mx-auto flex w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px] items-center justify-center">
          <div className="relative aspect-[4/4.7] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]">
            <img
              key={theme}
              src={currentPortrait}
              alt={profile.name}
              className="h-full w-full object-cover object-top scale-100 sm:scale-105 md:scale-[1.12] origin-top transition-transform duration-500 hover:scale-[1.16]"
            />
          </div>
        </div>

        {/* Bio Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          {/* Name in the middle on mobile, left-aligned on desktop */}
          <h1
            style={
              isCustomAccent
                ? {
                    color: 'var(--accent-color)',
                    textShadow: '0 0 35px rgba(var(--accent-rgb), 0.4)',
                  }
                : undefined
            }
            className="w-full text-center md:text-left font-mono text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-[42px] leading-tight transition-all duration-300"
          >
            {profile.name}
          </h1>

          {/* Monkeytype Style Typing Bio */}
          <MonkeytypeBio />

          {/* Inline Social Links (Centered on mobile, left on desktop) */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center md:justify-start gap-x-5 sm:gap-x-6 gap-y-3 font-mono text-[13px] sm:text-[13.5px] text-[var(--text-muted)]">
            <a
              href={profile.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
            >
              <FaGithub className="h-4 w-4 shrink-0" />
              <span>github</span>
            </a>
            <a
              href={profile.social.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
            >
              <FaLinkedin className="h-4 w-4 shrink-0" />
              <span>linkedin</span>
            </a>
            <a
              href={profile.social.facebook.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
            >
              <FaFacebook className="h-4 w-4 shrink-0" />
              <span>facebook</span>
            </a>
            <a
              href={resumePdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-[var(--accent-color)] transition-colors"
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span>resume.pdf</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom 2-Row Affiliation & Stats Grid */}
      <div className="mt-12 sm:mt-16 border-t border-[var(--border-subtle)]">
        {/* Row 1: Current Role & Background */}
        <div className="grid grid-cols-1 divide-y divide-[var(--border-subtle)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Link
            to="/experience"
            className="group flex items-center gap-4 py-5 sm:py-6 sm:pr-8 transition-colors"
          >
            <img
              src={pixzelLogo}
              alt="Pixzel Digital Service"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-[var(--border-strong)] shadow-xs"
            />
            <div className="text-left">
              <div
                style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
                className="font-mono text-[14px] sm:text-[15px] font-semibold text-[var(--text-primary)] group-hover:underline transition-colors"
              >
                Pixzel Digital Service
              </div>
              <div className="mt-0.5 font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase text-[var(--text-muted)]">
                JUNIOR DEVELOPER
              </div>
            </div>
          </Link>

          <Link
            to="/experience"
            className="group flex items-center gap-4 py-5 sm:py-6 sm:px-8 transition-colors"
          >
            <img
              src={spcLogo}
              alt="St. Peter's College"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover border border-[var(--border-strong)] shadow-xs"
            />
            <div className="text-left">
              <div
                style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
                className="font-mono text-[14px] sm:text-[15px] font-semibold text-[var(--text-primary)] group-hover:underline transition-colors"
              >
                St. Peter&apos;s College
              </div>
              <div className="mt-0.5 font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase text-[var(--text-muted)]">
                BS INFORMATION TECHNOLOGY
              </div>
            </div>
          </Link>

          <Link
            to="/skills"
            className="group flex items-center gap-4 py-5 sm:py-6 sm:pl-8 transition-colors"
          >
            <div
              style={isCustomAccent ? { borderColor: 'var(--accent-color)', color: 'var(--accent-color)' } : undefined}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-xs transition-colors shrink-0"
            >
              <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="text-left">
              <div
                style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
                className="font-mono text-[14px] sm:text-[15px] font-semibold text-[var(--text-primary)] group-hover:underline transition-colors"
              >
                Develop &amp; Create
              </div>
              <div className="mt-0.5 font-mono text-[10.5px] sm:text-[11px] tracking-wider uppercase text-[var(--text-muted)]">
                FULL STACK · UI/UX
              </div>
            </div>
          </Link>
        </div>

        {/* Row 2: Key Portfolio Counts (Strictly baseline-aligned numbers) */}
        <div className="grid grid-cols-3 divide-x divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
          {/* Projects Column */}
          <Link
            to="/projects"
            className="group flex flex-col items-center sm:items-start text-center sm:text-left py-4 sm:py-6 px-2 sm:px-0 sm:pr-8 overflow-hidden"
          >
            <div
              style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
              className="flex items-baseline justify-center sm:justify-start gap-1 sm:gap-1.5 font-mono text-[15px] min-[390px]:text-[17px] sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] transition-colors whitespace-nowrap"
            >
              <CountUp end={projects.length} duration={1100} />
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-color)]" />
            </div>
            <div className="mt-1 font-mono text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-medium tracking-wider sm:tracking-widest uppercase text-[var(--text-muted)] whitespace-nowrap sm:whitespace-normal">
              SELECTED WORKS
            </div>
          </Link>

          {/* Skills Column */}
          <Link
            to="/skills"
            className="group flex flex-col items-center sm:items-start text-center sm:text-left py-4 sm:py-6 px-2 sm:px-8 overflow-hidden"
          >
            <div
              style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
              className="flex items-baseline justify-center sm:justify-start gap-1 sm:gap-1.5 font-mono text-[15px] min-[390px]:text-[17px] sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] transition-colors whitespace-nowrap"
            >
              <CountUp end={totalSkills} suffix="+" duration={1200} />
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-color)]" />
            </div>
            <div className="mt-1 font-mono text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-medium tracking-wider sm:tracking-widest uppercase text-[var(--text-muted)] whitespace-nowrap sm:whitespace-normal">
              SKILLS &amp; TOOLS
            </div>
          </Link>

          {/* Experience Column */}
          <Link
            to="/experience"
            className="group flex flex-col items-center sm:items-start text-center sm:text-left py-4 sm:py-6 px-2 sm:px-0 sm:pl-8 overflow-hidden"
          >
            <div
              style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
              className="flex items-baseline justify-center sm:justify-start gap-0.5 sm:gap-1.5 font-mono text-[15px] min-[390px]:text-[17px] sm:text-3xl md:text-4xl font-semibold text-[var(--text-primary)] transition-colors whitespace-nowrap"
            >
              <CountUp start={2000} end={2022} suffix="—Now" duration={1350} />
              <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--accent-color)]" />
            </div>
            <div className="mt-1 font-mono text-[8px] min-[360px]:text-[9px] sm:text-[11px] font-medium tracking-wider sm:tracking-widest uppercase text-[var(--text-muted)] whitespace-nowrap sm:whitespace-normal">
              BUILDING &amp; SHIPPING
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

