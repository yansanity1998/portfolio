import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  isHub: boolean
  pulsePhase: number
}

function hexToRgbValues(hex: string, isLight: boolean): [number, number, number] {
  if (!hex) {
    return isLight ? [24, 24, 27] : [240, 240, 245]
  }
  const clean = hex.replace('#', '')
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ]
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.substring(0, 2), 16),
      parseInt(clean.substring(2, 4), 16),
      parseInt(clean.substring(4, 6), 16),
    ]
  }
  return isLight ? [24, 24, 27] : [240, 240, 245]
}

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme, accentColor, isCustomAccent } = useTheme()

  const colorRef = useRef({
    rgb: hexToRgbValues(accentColor, theme === 'light'),
    isCustom: isCustomAccent,
    isLight: theme === 'light',
  })

  useEffect(() => {
    colorRef.current = {
      rgb: hexToRgbValues(accentColor, theme === 'light'),
      isCustom: isCustomAccent,
      isLight: theme === 'light',
    }
  }, [theme, accentColor, isCustomAccent])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    const nodes: Node[] = []

    const mouse = { x: -1000, y: -1000, active: false }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    const initNodes = () => {
      nodes.length = 0
      const isMobile = width < 768
      const count = isMobile ? 30 : Math.floor((width * height) / 25000)
      const clampedCount = Math.max(26, Math.min(count, 55))

      for (let i = 0; i < clampedCount; i++) {
        const isHub = Math.random() < 0.16
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: isHub ? 2.5 : Math.random() * 1.3 + 1.2,
          isHub,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      initNodes()
    }

    resize()
    window.addEventListener('resize', resize)

    let lastTime = performance.now()
    const maxDist = width < 768 ? 110 : 145
    const maxDistSq = maxDist * maxDist
    const mouseRadius = 135
    const mouseRadiusSq = mouseRadius * mouseRadius

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      const { rgb, isCustom, isLight } = colorRef.current
      const [r, g, b] = rgb

      const lineBaseAlpha = isCustom
        ? isLight ? 0.22 : 0.28
        : isLight ? 0.12 : 0.18
      const nodeBaseAlpha = isCustom
        ? isLight ? 0.65 : 0.75
        : isLight ? 0.35 : 0.55

      // 1. Update positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        n.x += n.vx * (dt * 60)
        n.y += n.vy * (dt * 60)
        n.pulsePhase += dt * 1.5

        if (n.x < 5) {
          n.x = 5
          n.vx = Math.abs(n.vx)
        } else if (n.x > width - 5) {
          n.x = width - 5
          n.vx = -Math.abs(n.vx)
        }

        if (n.y < 5) {
          n.y = 5
          n.vy = Math.abs(n.vy)
        } else if (n.y > height - 5) {
          n.y = height - 5
          n.vy = -Math.abs(n.vy)
        }
      }

      // 2. Draw connecting lines between nodes
      ctx.lineWidth = 0.8
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const bNode = nodes[j]
          const dx = bNode.x - a.x
          const dy = bNode.y - a.y
          const dSq = dx * dx + dy * dy

          if (dSq < maxDistSq) {
            const dist = Math.sqrt(dSq)
            const alpha = (1 - dist / maxDist) * lineBaseAlpha
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(bNode.x, bNode.y)
            ctx.stroke()
          }
        }

        // Connect to mouse cursor when nearby
        if (mouse.active) {
          const mdx = mouse.x - a.x
          const mdy = mouse.y - a.y
          const mdSq = mdx * mdx + mdy * mdy
          if (mdSq < mouseRadiusSq) {
            const dist = Math.sqrt(mdSq)
            const alpha = (1 - dist / mouseRadius) * (lineBaseAlpha * 1.3)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.stroke()
          }
        }
      }

      // 3. Draw nodes (dots and hub target rings)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Center dot
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${nodeBaseAlpha})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fill()

        // Hub nodes with target ring (matching user reference)
        if (n.isHub) {
          const ringPulse = Math.sin(n.pulsePhase) * 1.1
          const ringRadius = 6.5 + ringPulse
          const ringAlpha = (0.35 + Math.sin(n.pulsePhase) * 0.15) * (isCustom ? 0.9 : 0.6)

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringAlpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.arc(n.x, n.y, ringRadius, 0, Math.PI * 2)
          ctx.stroke()

          // Subtle ambient glow
          if (isCustom) {
            const grad = ctx.createRadialGradient(n.x, n.y, 1, n.x, n.y, 16)
            grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.18)`)
            grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
            ctx.fillStyle = grad
            ctx.beginPath()
            ctx.arc(n.x, n.y, 16, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      if (!document.hidden) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(render)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full select-none"
    />
  )
}
