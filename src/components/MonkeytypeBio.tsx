import { useState, useEffect, useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  Code2,
  Monitor,
  Smartphone,
  Palette,
  Rocket,
  Sparkles,
} from 'lucide-react'
import { SiReact, SiTypescript, SiLaravel, SiSupabase } from 'react-icons/si'
import { useTheme } from '../context/ThemeContext'

function InlinePill({ children, to }: { children: ReactNode; to?: string }) {
  const { isCustomAccent } = useTheme()
  const base =
    'inline-flex items-center gap-1.5 rounded-[5px] border border-[var(--border-strong)] bg-[var(--bg-pill)] px-2 py-[2px] font-mono text-[12.5px] leading-[1.35] font-medium text-[var(--text-primary)] align-baseline whitespace-nowrap transition-colors hover:border-[var(--accent-color)] shadow-2xs'
  if (to) {
    return (
      <Link
        to={to}
        style={isCustomAccent ? { borderColor: 'rgba(var(--accent-rgb), 0.4)' } : undefined}
        className={base}
      >
        {children}
      </Link>
    )
  }
  return (
    <span
      style={isCustomAccent ? { borderColor: 'rgba(var(--accent-rgb), 0.4)' } : undefined}
      className={base}
    >
      {children}
    </span>
  )
}

function MonkeytypeCaret() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-[2px] sm:w-[2.5px] h-[1.15em] bg-[var(--accent-color)] align-middle mx-[1px] rounded-full shadow-[0_0_8px_rgba(var(--accent-rgb),0.75)] animate-pulse"
    />
  )
}

interface BioToken {
  id: string
  type: 'text' | 'node'
  text?: string
  node?: ReactNode
  cost: number
}

interface PositionedToken extends BioToken {
  start: number
  end: number
}

export default function MonkeytypeBio() {
  const { isCustomAccent } = useTheme()
  const [typedIndex, setTypedIndex] = useState(0)

  // Paragraph 1 raw tokens
  const p1RawTokens = useMemo<BioToken[]>(
    () => [
      { id: 'p1-t0', type: 'text', text: "I'm a ", cost: 6 },
      {
        id: 'p1-n0',
        type: 'node',
        cost: 4,
        node: (
          <InlinePill to="/skills">
            <Code2 className="h-3.5 w-3.5 shrink-0" />
            <span>full-stack</span>
          </InlinePill>
        ),
      },
      { id: 'p1-t1', type: 'text', text: ' developer. I build modern ', cost: 26 },
      {
        id: 'p1-n1',
        type: 'node',
        cost: 4,
        node: (
          <InlinePill to="/projects">
            <Monitor className="h-3.5 w-3.5 shrink-0" />
            <span>web</span>
          </InlinePill>
        ),
      },
      { id: 'p1-t2', type: 'text', text: ' & ', cost: 3 },
      {
        id: 'p1-n2',
        type: 'node',
        cost: 4,
        node: (
          <InlinePill to="/projects">
            <Smartphone className="h-3.5 w-3.5 shrink-0" />
            <span>mobile apps</span>
          </InlinePill>
        ),
      },
      { id: 'p1-t3', type: 'text', text: ", and these days I'm focused on ", cost: 32 },
      {
        id: 'p1-n3',
        type: 'node',
        cost: 4,
        node: (
          <span
            style={isCustomAccent ? { backgroundColor: 'var(--accent-color)' } : undefined}
            className="inline-flex items-center gap-1.5 rounded-[5px] bg-[var(--text-primary)] px-2 py-[3px] align-middle text-[var(--bg-page)] transition-colors shadow-2xs"
          >
            <SiReact className="h-3 w-3" />
            <SiTypescript className="h-3 w-3" />
            <SiLaravel className="h-3 w-3" />
            <SiSupabase className="h-3 w-3" />
          </span>
        ),
      },
      { id: 'p1-t4', type: 'text', text: ' ', cost: 1 },
      {
        id: 'p1-n4',
        type: 'node',
        cost: 6,
        node: (
          <span
            style={
              isCustomAccent
                ? {
                    color: 'var(--accent-color)',
                    textDecorationColor: 'var(--accent-color)',
                  }
                : undefined
            }
            className="font-medium text-[var(--text-primary)] underline decoration-[var(--border-strong)] underline-offset-4 transition-colors"
          >
            scalable systems &amp; UI/UX
          </span>
        ),
      },
      { id: 'p1-t5', type: 'text', text: '.', cost: 1 },
    ],
    [isCustomAccent],
  )

  // Paragraph 2 raw tokens
  const p2RawTokens = useMemo<BioToken[]>(
    () => [
      { id: 'p2-t0', type: 'text', text: "Right now I'm building ", cost: 23 },
      {
        id: 'p2-n0',
        type: 'node',
        cost: 4,
        node: (
          <InlinePill to="/projects">
            <Rocket className="h-3.5 w-3.5 shrink-0" />
            <span>cool new stuff</span>
          </InlinePill>
        ),
      },
      { id: 'p2-t1', type: 'text', text: ' every day. I love turning ', cost: 26 },
      {
        id: 'p2-n1',
        type: 'node',
        cost: 4,
        node: (
          <InlinePill to="/skills">
            <Palette className="h-3.5 w-3.5 shrink-0" />
            <span>rough ideas</span>
          </InlinePill>
        ),
      },
      { id: 'p2-t2', type: 'text', text: ' into ', cost: 6 },
      {
        id: 'p2-n2',
        type: 'node',
        cost: 4,
        node: (
          <InlinePill to="/experience">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>real products</span>
          </InlinePill>
        ),
      },
      { id: 'p2-t3', type: 'text', text: ' people actually use.', cost: 21 },
    ],
    [],
  )

  // Pre-calculate exact start and end ranges for each token
  const { p1Tokens, p2Tokens, totalChars } = useMemo(() => {
    let offset = 0
    const p1: PositionedToken[] = p1RawTokens.map((t) => {
      const len = t.type === 'text' && t.text ? t.text.length : t.cost
      const start = offset
      const end = offset + len
      offset = end
      return { ...t, start, end }
    })

    const p2: PositionedToken[] = p2RawTokens.map((t) => {
      const len = t.type === 'text' && t.text ? t.text.length : t.cost
      const start = offset
      const end = offset + len
      offset = end
      return { ...t, start, end }
    })

    return { p1Tokens: p1, p2Tokens: p2, totalChars: offset }
  }, [p1RawTokens, p2RawTokens])

  // Monkeytype typing speed ticker
  useEffect(() => {
    let timeoutId: number
    let current = 0

    const step = () => {
      if (current >= totalChars) return

      current += 1
      setTypedIndex(current)

      // Natural typing speed variation: spaces are fast (10ms), punctuation has a tiny pause
      const delay = Math.floor(Math.random() * 10) + 14
      timeoutId = window.setTimeout(step, delay)
    }

    // Brief pause on refresh before typing starts
    timeoutId = window.setTimeout(step, 250)
    return () => window.clearTimeout(timeoutId)
  }, [totalChars])

  // Click anywhere to skip typing animation
  const handleSkip = () => {
    setTypedIndex(totalChars)
  }

  // Render a list of tokens with Monkeytype gray vs bright states
  const renderTokens = (tokens: PositionedToken[]) => {
    return tokens.map((token) => {
      if (token.type === 'text' && token.text) {
        // Case A: Entirely untyped (gray text)
        if (typedIndex <= token.start) {
          return (
            <span key={token.id}>
              {typedIndex === token.start && <MonkeytypeCaret />}
              <span className="text-zinc-500/40 dark:text-zinc-600/70 transition-colors duration-150">
                {token.text}
              </span>
            </span>
          )
        }

        // Case B: Entirely typed (bright text)
        if (typedIndex >= token.end) {
          return (
            <span
              key={token.id}
              className="text-[var(--text-primary)] transition-colors duration-150"
            >
              {token.text}
            </span>
          )
        }

        // Case C: Currently being typed (split between typed and untyped with caret)
        const split = typedIndex - token.start
        const typedPart = token.text.slice(0, split)
        const untypedPart = token.text.slice(split)

        return (
          <span key={token.id}>
            <span className="text-[var(--text-primary)] transition-colors duration-150">
              {typedPart}
            </span>
            <MonkeytypeCaret />
            <span className="text-zinc-500/40 dark:text-zinc-600/70 transition-colors duration-150">
              {untypedPart}
            </span>
          </span>
        )
      }

      // Case for node (pills & badges)
      if (token.type === 'node') {
        const isTyped = typedIndex >= token.end
        const isCaretHere = typedIndex >= token.start && typedIndex < token.end

        return (
          <span key={token.id} className="inline-block align-baseline">
            {isCaretHere && <MonkeytypeCaret />}
            <span
              className={`inline-block transition-all duration-200 ${
                isTyped
                  ? 'opacity-100 filter-none'
                  : 'opacity-35 grayscale contrast-75 brightness-90 pointer-events-none select-none'
              }`}
            >
              {token.node}
            </span>
          </span>
        )
      }

      return null
    })
  }

  const isAtVeryEnd = typedIndex >= totalChars

  return (
    <div
      onClick={handleSkip}
      title="Click to skip typing animation"
      className="mt-5 max-w-[580px] space-y-4 text-justify text-[15.5px] sm:text-[16px] leading-[2.05] select-text cursor-default"
    >
      <p>{renderTokens(p1Tokens)}</p>
      <p>
        {renderTokens(p2Tokens)}
        {isAtVeryEnd && <MonkeytypeCaret />}
      </p>
    </div>
  )
}
