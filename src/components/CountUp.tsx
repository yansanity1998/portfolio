import { useState, useEffect } from 'react'

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  prefix?: string
  suffix?: string
}

export default function CountUp({
  end,
  start = 0,
  duration = 1200,
  prefix = '',
  suffix = '',
}: CountUpProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number | null = null
    let rafId: number

    const step = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease out exponential for a punchy count and smooth landing
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      const current = Math.round(start + (end - start) * ease)
      setCount(current)

      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [end, start, duration])

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

