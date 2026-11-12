import { useState, type ChangeEvent, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, Send, Check } from 'lucide-react'
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa'
import { profile } from '../data/profile'
import { useTheme } from '../context/ThemeContext'

export default function ContactPage() {
  const { isCustomAccent } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form Data:', formData)
    setSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' })
    window.setTimeout(() => setSubmitted(false), 3500)
  }

  const channels = [
    {
      label: 'Contact Number',
      value: profile.phone,
      href: `tel:${profile.phone}`,
      Icon: Phone,
      external: false,
    },
    {
      label: 'Facebook',
      value: profile.social.facebook.label,
      href: profile.social.facebook.url,
      Icon: FaFacebook,
      external: true,
    },
    {
      label: 'LinkedIn',
      value: profile.social.linkedin.label,
      href: profile.social.linkedin.url,
      Icon: FaLinkedin,
      external: true,
    },
    {
      label: 'GitHub',
      value: profile.social.github.label,
      href: profile.social.github.url,
      Icon: FaGithub,
      external: true,
    },
  ]

  const inputClass =
    'w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-page)] px-3.5 py-2.5 text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--border-strong)] focus:outline-none transition-colors'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto max-w-[860px] px-6 py-12 sm:px-10 md:py-16"
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
          contact
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">
          {profile.contactIntro}
        </p>
      </header>

      {/* Direct Channels Grid */}
      <section className="mt-10">
        <div className="font-mono text-[11px] font-medium tracking-widest uppercase text-[var(--text-muted)]">
          DIRECT CHANNELS
        </div>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {channels.map(({ label, value, href, Icon, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="group flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-hover)]"
            >
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-pill)] text-[var(--text-primary)]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    {label}
                  </div>
                  <div className="truncate font-mono text-[13px] font-medium text-[var(--text-primary)]">
                    {value}
                  </div>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[var(--text-muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--text-primary)]" />
            </a>
          ))}
        </div>
      </section>

      {/* Message Form Card */}
      <section className="mt-10">
        <div className="font-mono text-[11px] font-medium tracking-widest uppercase text-[var(--text-muted)]">
          SEND A MESSAGE
        </div>
        <form
          onSubmit={handleSubmit}
          className="mt-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-7 space-y-4"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block font-mono text-[11.5px] text-[var(--text-secondary)]"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Full Name"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block font-mono text-[11.5px] text-[var(--text-secondary)]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-1.5 block font-mono text-[11.5px] text-[var(--text-secondary)]"
            >
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              placeholder="Project Inquiry"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block font-mono text-[11.5px] text-[var(--text-secondary)]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project or say hi..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex items-center justify-between gap-4 pt-1">
            <button
              type="submit"
              style={
                isCustomAccent
                  ? {
                      backgroundColor: 'var(--accent-color)',
                      color: '#ffffff',
                      boxShadow: '0 4px 14px rgba(var(--accent-rgb), 0.35)',
                    }
                  : undefined
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-5 py-2.5 font-mono text-[12.5px] font-medium text-[var(--bg-page)] transition-all hover:opacity-90 cursor-pointer"
            >
              {submitted ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Message Sent</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </motion.div>
  )
}

