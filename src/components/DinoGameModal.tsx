import { useEffect, useRef, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, X, ArrowUp, ArrowDown, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

interface DinoGameModalProps {
  open: boolean
  onClose: () => void
}

type GameStatus = 'idle' | 'playing' | 'paused' | 'countdown' | 'gameover'

interface Obstacle {
  x: number
  width: number
  height: number
  type: 'cactus-small' | 'cactus-tall' | 'cactus-double' | 'bird'
  yOffset: number
  wingFrame: number
}

interface GroundDot {
  x: number
  y: number
  w: number
}

interface Cloud {
  x: number
  y: number
  w: number
}

const LOGICAL_WIDTH = 860
const LOGICAL_HEIGHT = 320
const GROUND_Y = 266
const DINO_X = 56
const DINO_STAND_W = 36
const DINO_STAND_H = 40
const DINO_DUCK_W = 48
const DINO_DUCK_H = 24
const GRAVITY = 0.68
const JUMP_VELOCITY = -12.4
const HIGH_SCORE_KEY = 'portfolio-dino-high-score'
const MUTED_KEY = 'portfolio-dino-muted'

function readComputedVar(name: string, fallback: string): string {
  if (typeof window === 'undefined') return fallback
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return val || fallback
}

export default function DinoGameModal({ open, onClose }: DinoGameModalProps) {
  const { theme, accentColor, isCustomAccent } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [status, setStatus] = useState<GameStatus>('idle')
  const [countdown, setCountdown] = useState(3)
  const [score, setScore] = useState(0)
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(MUTED_KEY) === 'true'
  })
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window === 'undefined') return 0
    const saved = Number(localStorage.getItem(HIGH_SCORE_KEY) || '0')
    return Number.isFinite(saved) ? saved : 0
  })
  const countdownTimerRef = useRef<number | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const mutedRef = useRef(muted)

  useEffect(() => {
    mutedRef.current = muted
    localStorage.setItem(MUTED_KEY, String(muted))
  }, [muted])

  const playSound = useCallback(
    (type: 'jump' | 'score' | 'gameover' | 'tick' | 'go') => {
      if (mutedRef.current || typeof window === 'undefined') return
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext
        if (!AudioCtx) return
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx()
        }
        const ctx = audioCtxRef.current
        if (ctx.state === 'suspended') {
          void ctx.resume()
        }

        const now = ctx.currentTime

        if (type === 'jump') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'square'
          osc.frequency.setValueAtTime(240, now)
          osc.frequency.exponentialRampToValueAtTime(560, now + 0.085)
          gain.gain.setValueAtTime(0.06, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.095)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.1)
        } else if (type === 'score') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'square'
          osc.frequency.setValueAtTime(660, now)
          osc.frequency.setValueAtTime(880, now + 0.07)
          gain.gain.setValueAtTime(0.055, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.2)
        } else if (type === 'gameover') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'sawtooth'
          osc.frequency.setValueAtTime(210, now)
          osc.frequency.exponentialRampToValueAtTime(75, now + 0.24)
          gain.gain.setValueAtTime(0.08, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.26)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + 0.27)
        } else if (type === 'tick' || type === 'go') {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(type === 'go' ? 780 : 480, now)
          gain.gain.setValueAtTime(0.07, now)
          gain.gain.exponentialRampToValueAtTime(0.001, now + (type === 'go' ? 0.14 : 0.07))
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + (type === 'go' ? 0.15 : 0.08))
        }
      } catch {
        // Ignore audio errors if blocked by browser policy
      }
    },
    [],
  )

  // Mutable game state for 60fps loop
  const gameRef = useRef({
    status: 'idle' as GameStatus,
    dinoY: GROUND_Y - DINO_STAND_H,
    dinoVy: 0,
    isJumping: false,
    isDucking: false,
    legFrame: 0,
    frameCount: 0,
    speed: 5.8,
    distance: 0,
    score: 0,
    highScore: highScore,
    obstacles: [] as Obstacle[],
    spawnTimer: 45,
    groundDots: [] as GroundDot[],
    clouds: [] as Cloud[],
    gameOverAt: 0,
  })

  const colorsRef = useRef({
    bg: '#111111',
    primary: '#f4f4f5',
    muted: '#71717a',
    border: 'rgba(255,255,255,0.12)',
    accent: '#f4f4f5',
  })

  // Sync theme colors whenever theme or accent changes
  useEffect(() => {
    colorsRef.current = {
      bg: readComputedVar('--bg-page', theme === 'light' ? '#fafafa' : '#0a0a0a'),
      primary: readComputedVar('--text-primary', theme === 'light' ? '#09090b' : '#f4f4f5'),
      muted: readComputedVar('--text-muted', '#71717a'),
      border: readComputedVar(
        '--border-strong',
        theme === 'light' ? 'rgba(0,0,0,0.16)' : 'rgba(255,255,255,0.16)',
      ),
      accent: isCustomAccent
        ? accentColor
        : readComputedVar('--text-primary', theme === 'light' ? '#09090b' : '#f4f4f5'),
    }
  }, [theme, accentColor, isCustomAccent, open])

  const initScenery = useCallback(() => {
    const dots: GroundDot[] = []
    for (let i = 0; i < 28; i++) {
      dots.push({
        x: Math.random() * LOGICAL_WIDTH,
        y: GROUND_Y + 6 + Math.random() * 18,
        w: 2 + Math.floor(Math.random() * 5),
      })
    }
    const clouds: Cloud[] = []
    for (let i = 0; i < 4; i++) {
      clouds.push({
        x: 100 + i * 165 + Math.random() * 40,
        y: 34 + Math.random() * 55,
        w: 36 + Math.random() * 20,
      })
    }
    gameRef.current.groundDots = dots
    gameRef.current.clouds = clouds
  }, [])

  const clearCountdownTimer = useCallback(() => {
    if (countdownTimerRef.current !== null) {
      window.clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }
  }, [])

  const resetAndStart = useCallback(() => {
    clearCountdownTimer()
    const g = gameRef.current
    g.status = 'playing'
    g.dinoY = GROUND_Y - DINO_STAND_H
    g.dinoVy = 0
    g.isJumping = false
    g.isDucking = false
    g.legFrame = 0
    g.frameCount = 0
    g.speed = 5.8
    g.distance = 0
    g.score = 0
    g.obstacles = []
    g.spawnTimer = 38
    initScenery()
    setScore(0)
    setStatus('playing')
  }, [clearCountdownTimer, initScenery])

  const pauseGame = useCallback(() => {
    if (gameRef.current.status !== 'playing' && gameRef.current.status !== 'countdown') {
      return
    }
    clearCountdownTimer()
    gameRef.current.status = 'paused'
    gameRef.current.isDucking = false
    setStatus('paused')
  }, [clearCountdownTimer])

  const resumeWithCountdown = useCallback(() => {
    if (gameRef.current.status !== 'paused') return
    clearCountdownTimer()
    gameRef.current.status = 'countdown'
    setCountdown(3)
    setStatus('countdown')
    playSound('tick')

    let remaining = 3
    countdownTimerRef.current = window.setInterval(() => {
      remaining -= 1
      if (remaining > 0) {
        setCountdown(remaining)
        playSound('tick')
      } else {
        clearCountdownTimer()
        if (gameRef.current.status === 'countdown') {
          gameRef.current.status = 'playing'
          setStatus('playing')
          playSound('go')
        }
      }
    }, 1000)
  }, [clearCountdownTimer, playSound])

  const triggerJump = useCallback(() => {
    const g = gameRef.current
    if (g.status === 'idle') {
      resetAndStart()
      g.dinoVy = JUMP_VELOCITY
      g.isJumping = true
      playSound('jump')
      return
    }
    if (g.status === 'paused') {
      resumeWithCountdown()
      return
    }
    if (g.status === 'countdown') {
      return
    }
    if (g.status === 'gameover') {
      // Brief cooldown so holding space doesn't skip game over screen
      if (performance.now() - g.gameOverAt > 240) {
        resetAndStart()
      }
      return
    }
    if (!g.isJumping && !g.isDucking) {
      g.dinoVy = JUMP_VELOCITY
      g.isJumping = true
      playSound('jump')
    }
  }, [resetAndStart, resumeWithCountdown, playSound])

  const setDuck = useCallback((ducking: boolean) => {
    const g = gameRef.current
    if (g.status !== 'playing') return
    g.isDucking = ducking
    if (ducking && g.isJumping && g.dinoVy < 4) {
      // Fast-fall when pressing down in mid-air
      g.dinoVy = 7.5
    }
  }, [])

  // Lock body scroll & initialize scenery when modal opens
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const g = gameRef.current
    initScenery()

    return () => {
      clearCountdownTimer()
      document.body.style.overflow = prevOverflow
      g.status = 'idle'
      g.dinoY = GROUND_Y - DINO_STAND_H
      g.dinoVy = 0
      g.isJumping = false
      g.isDucking = false
      g.obstacles = []
      g.score = 0
    }
  }, [open, initScenery, clearCountdownTimer])

  // Keyboard controls while modal is open
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        if (gameRef.current.status === 'playing' || gameRef.current.status === 'countdown') {
          pauseGame()
        } else if (gameRef.current.status === 'paused') {
          resumeWithCountdown()
        }
        return
      }
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault()
        triggerJump()
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault()
        setDuck(true)
      } else if ((e.key === 'r' || e.key === 'R' || e.key === 'Enter') && gameRef.current.status === 'gameover') {
        e.preventDefault()
        resetAndStart()
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        setDuck(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [open, onClose, triggerJump, setDuck, resetAndStart, pauseGame, resumeWithCountdown])

  // Main 60fps canvas animation loop
  useEffect(() => {
    if (!open) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = LOGICAL_WIDTH * dpr
    canvas.height = LOGICAL_HEIGHT * dpr

    let rafId = 0
    let lastTime = performance.now()

    const drawDino = (
      x: number,
      y: number,
      ducking: boolean,
      legFrame: number,
      dead: boolean,
      primary: string,
      accent: string,
      bg: string,
    ) => {
      ctx.fillStyle = primary

      if (ducking && !dead) {
        // Crouching / ducking pixel T-Rex
        // Body + tail
        ctx.fillRect(x, y + 6, 8, 6)
        ctx.fillRect(x + 6, y + 4, 24, 12)
        // Head extended forward
        ctx.fillRect(x + 28, y + 2, 18, 12)
        ctx.fillRect(x + 30, y + 14, 12, 3)
        // Eye
        ctx.fillStyle = accent === primary ? bg : accent
        ctx.fillRect(x + 34, y + 5, 3, 3)
        // Legs alternating
        ctx.fillStyle = primary
        if (legFrame % 2 === 0) {
          ctx.fillRect(x + 12, y + 16, 4, 8)
          ctx.fillRect(x + 22, y + 16, 4, 5)
        } else {
          ctx.fillRect(x + 12, y + 16, 4, 5)
          ctx.fillRect(x + 22, y + 16, 4, 8)
        }
        return
      }

      // Standing / running pixel T-Rex
      // Head
      ctx.fillRect(x + 16, y, 18, 13)
      ctx.fillRect(x + 18, y + 13, 12, 3)
      // Eye
      ctx.fillStyle = dead ? accent : accent === primary ? bg : accent
      if (dead) {
        ctx.fillRect(x + 21, y + 3, 4, 4)
      } else {
        ctx.fillRect(x + 22, y + 3, 3, 3)
      }

      ctx.fillStyle = primary
      // Neck & Torso
      ctx.fillRect(x + 12, y + 12, 12, 16)
      ctx.fillRect(x + 8, y + 16, 14, 13)
      // Tail
      ctx.fillRect(x + 2, y + 15, 6, 8)
      ctx.fillRect(x, y + 12, 4, 6)
      // Tiny arm
      ctx.fillRect(x + 24, y + 19, 5, 3)
      ctx.fillRect(x + 27, y + 21, 2, 3)

      // Legs
      if (dead || gameRef.current.status === 'idle' || gameRef.current.isJumping) {
        ctx.fillRect(x + 10, y + 29, 4, 11)
        ctx.fillRect(x + 18, y + 29, 4, 11)
      } else if (legFrame % 2 === 0) {
        ctx.fillRect(x + 10, y + 29, 4, 11)
        ctx.fillRect(x + 18, y + 29, 4, 6)
      } else {
        ctx.fillRect(x + 10, y + 29, 4, 6)
        ctx.fillRect(x + 18, y + 29, 4, 11)
      }
    }

    const drawObstacle = (obs: Obstacle, primary: string, accent: string) => {
      const y = GROUND_Y - obs.height - obs.yOffset

      if (obs.type === 'bird') {
        ctx.fillStyle = accent
        // Body
        ctx.fillRect(obs.x + 8, y + 8, 16, 6)
        // Beak
        ctx.fillRect(obs.x, y + 9, 8, 4)
        // Tail
        ctx.fillRect(obs.x + 24, y + 10, 6, 3)
        // Flapping wings
        if (obs.wingFrame % 2 === 0) {
          ctx.fillRect(obs.x + 12, y, 6, 8)
        } else {
          ctx.fillRect(obs.x + 12, y + 14, 6, 8)
        }
        return
      }

      ctx.fillStyle = primary
      if (obs.type === 'cactus-small') {
        ctx.fillRect(obs.x + 6, y, 6, obs.height)
        ctx.fillRect(obs.x, y + 8, 4, 10)
        ctx.fillRect(obs.x + 4, y + 14, 2, 4)
        ctx.fillRect(obs.x + 14, y + 6, 4, 11)
        ctx.fillRect(obs.x + 12, y + 13, 2, 4)
      } else if (obs.type === 'cactus-tall') {
        ctx.fillRect(obs.x + 7, y, 8, obs.height)
        ctx.fillRect(obs.x, y + 10, 5, 14)
        ctx.fillRect(obs.x + 5, y + 20, 2, 4)
        ctx.fillRect(obs.x + 17, y + 7, 5, 13)
        ctx.fillRect(obs.x + 15, y + 16, 2, 4)
      } else {
        // Double cactus
        ctx.fillRect(obs.x + 5, y + 4, 6, obs.height - 4)
        ctx.fillRect(obs.x, y + 12, 3, 9)
        ctx.fillRect(obs.x + 3, y + 17, 2, 4)
        ctx.fillRect(obs.x + 20, y, 7, obs.height)
        ctx.fillRect(obs.x + 14, y + 9, 4, 11)
        ctx.fillRect(obs.x + 18, y + 16, 2, 4)
        ctx.fillRect(obs.x + 29, y + 8, 4, 12)
        ctx.fillRect(obs.x + 27, y + 16, 2, 4)
      }
    }

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 16.667, 2.2)
      lastTime = now

      const g = gameRef.current
      const { bg, primary, muted, border, accent } = colorsRef.current

      if (g.status === 'playing') {
        g.frameCount += dt
        g.distance += g.speed * dt
        // Gradually speed up up to 11.5
        g.speed = Math.min(11.5, 5.8 + g.score * 0.0045)

        const newScore = Math.floor(g.distance / 8)
        if (newScore !== g.score) {
          if (newScore > 0 && Math.floor(newScore / 100) > Math.floor(g.score / 100)) {
            playSound('score')
          }
          g.score = newScore
          setScore(newScore)
        }

        if (Math.floor(g.frameCount / 6) !== Math.floor((g.frameCount - dt) / 6)) {
          g.legFrame += 1
        }

        // Dino physics
        const targetStandH = g.isDucking && !g.isJumping ? DINO_DUCK_H : DINO_STAND_H
        const groundTop = GROUND_Y - targetStandH

        if (g.isJumping) {
          g.dinoVy += GRAVITY * dt
          g.dinoY += g.dinoVy * dt
          if (g.dinoY >= GROUND_Y - DINO_STAND_H) {
            g.dinoY = GROUND_Y - DINO_STAND_H
            g.dinoVy = 0
            g.isJumping = false
          }
        } else {
          g.dinoY = groundTop
        }

        // Move clouds & ground dots
        for (const c of g.clouds) {
          c.x -= g.speed * 0.18 * dt
          if (c.x + c.w < 0) {
            c.x = LOGICAL_WIDTH + 20 + Math.random() * 60
            c.y = 30 + Math.random() * 60
          }
        }
        for (const d of g.groundDots) {
          d.x -= g.speed * dt
          if (d.x + d.w < 0) {
            d.x = LOGICAL_WIDTH + Math.random() * 25
            d.y = GROUND_Y + 6 + Math.random() * 18
          }
        }

        // Spawn obstacles
        g.spawnTimer -= dt
        if (g.spawnTimer <= 0) {
          const canSpawnBird = g.score >= 220 && Math.random() < 0.26
          if (canSpawnBird) {
            const flyingHigh = Math.random() < 0.55
            g.obstacles.push({
              x: LOGICAL_WIDTH + 20,
              width: 30,
              height: 22,
              type: 'bird',
              yOffset: flyingHigh ? 30 : 12,
              wingFrame: 0,
            })
          } else {
            const roll = Math.random()
            if (roll < 0.4) {
              g.obstacles.push({
                x: LOGICAL_WIDTH + 20,
                width: 18,
                height: 30,
                type: 'cactus-small',
                yOffset: 0,
                wingFrame: 0,
              })
            } else if (roll < 0.75) {
              g.obstacles.push({
                x: LOGICAL_WIDTH + 20,
                width: 22,
                height: 42,
                type: 'cactus-tall',
                yOffset: 0,
                wingFrame: 0,
              })
            } else {
              g.obstacles.push({
                x: LOGICAL_WIDTH + 20,
                width: 34,
                height: 36,
                type: 'cactus-double',
                yOffset: 0,
                wingFrame: 0,
              })
            }
          }

          const minGap = Math.max(36, 68 - g.speed * 2.2)
          g.spawnTimer = minGap + Math.random() * 44
        }

        // Update obstacles & check collisions
        const dinoBox =
          g.isDucking && !g.isJumping
            ? {
                x: DINO_X + 6,
                y: g.dinoY + 4,
                w: DINO_DUCK_W - 12,
                h: DINO_DUCK_H - 6,
              }
            : {
                x: DINO_X + 8,
                y: g.dinoY + 4,
                w: DINO_STAND_W - 14,
                h: DINO_STAND_H - 8,
              }

        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const obs = g.obstacles[i]
          obs.x -= (obs.type === 'bird' ? g.speed * 1.08 : g.speed) * dt
          if (obs.type === 'bird' && Math.floor(g.frameCount) % 10 === 0) {
            obs.wingFrame += 1
          }

          const obsY = GROUND_Y - obs.height - obs.yOffset
          const obsBox = {
            x: obs.x + 3,
            y: obsY + 3,
            w: obs.width - 6,
            h: obs.height - 6,
          }

          const hit =
            dinoBox.x < obsBox.x + obsBox.w &&
            dinoBox.x + dinoBox.w > obsBox.x &&
            dinoBox.y < obsBox.y + obsBox.h &&
            dinoBox.y + dinoBox.h > obsBox.y

          if (hit) {
            g.status = 'gameover'
            g.gameOverAt = performance.now()
            setStatus('gameover')
            playSound('gameover')
            if (g.score > g.highScore) {
              g.highScore = g.score
              setHighScore(g.score)
              localStorage.setItem(HIGH_SCORE_KEY, String(g.score))
            }
            break
          }

          if (obs.x + obs.width < -20) {
            g.obstacles.splice(i, 1)
          }
        }
      }

      // Render frame
      ctx.save()
      ctx.scale(dpr, dpr)

      // Background
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, LOGICAL_WIDTH, LOGICAL_HEIGHT)

      // Subtle clouds
      ctx.fillStyle = border
      for (const c of g.clouds) {
        ctx.fillRect(c.x, c.y, c.w, 6)
        ctx.fillRect(c.x + 8, c.y - 5, c.w * 0.55, 5)
      }

      // Horizon line
      ctx.fillStyle = border
      ctx.fillRect(0, GROUND_Y, LOGICAL_WIDTH, 1.5)

      // Ground pebbles
      ctx.fillStyle = muted
      ctx.globalAlpha = 0.45
      for (const d of g.groundDots) {
        ctx.fillRect(d.x, d.y, d.w, 1.5)
      }
      ctx.globalAlpha = 1

      // Obstacles
      for (const obs of g.obstacles) {
        drawObstacle(obs, primary, accent)
      }

      // Dino
      drawDino(
        DINO_X,
        g.dinoY,
        g.isDucking && !g.isJumping,
        g.legFrame,
        g.status === 'gameover',
        primary,
        accent,
        bg,
      )

      ctx.restore()
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [open, playSound])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        setScore(0)
        setStatus('idle')
      }}
    >
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl overflow-hidden rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3.5">
              <div>
                <h2 className="font-mono text-[14px] font-semibold tracking-tight text-[var(--text-primary)]">
                  Dino Runner
                </h2>
                <p className="font-mono text-[11px] text-[var(--text-muted)]">
                  Jump over obstacles &amp; beat your best score.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-flex items-center rounded border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                  Ctrl+K
                </kbd>
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  title={muted ? 'Unmute sound' : 'Mute sound'}
                  aria-label={muted ? 'Unmute sound' : 'Mute sound'}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition-colors cursor-pointer"
                >
                  {muted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close mini game"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-pill)] transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Score & Canvas Stage */}
            <div className="relative bg-[var(--bg-page)]">
              {/* Score HUD */}
              <div className="pointer-events-none absolute right-4 top-3 z-10 flex items-center gap-4 font-mono text-[12px] tracking-wider">
                <span className="text-[var(--text-muted)]">
                  HI {String(Math.max(highScore, score)).padStart(5, '0')}
                </span>
                <span
                  className="font-semibold text-[var(--text-primary)]"
                  style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
                >
                  {String(score).padStart(5, '0')}
                </span>
              </div>

              <canvas
                ref={canvasRef}
                onClick={triggerJump}
                className="block h-[260px] sm:h-[340px] md:h-[380px] w-full cursor-pointer touch-manipulation select-none"
              />

              {/* Idle Overlay */}
              {status === 'idle' && (
                <div
                  onClick={triggerJump}
                  className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
                >
                  <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 px-4 py-2.5 text-center backdrop-blur-xs shadow-sm">
                    <p className="font-mono text-[12px] font-medium text-[var(--text-primary)]">
                      Press <span className="underline">Space</span> or Tap to Start
                    </p>
                  </div>
                </div>
              )}

              {/* Paused Overlay */}
              {status === 'paused' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[1px]">
                  <div className="flex flex-col items-center gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-7 py-5 text-center shadow-xl">
                    <h3 className="font-mono text-base font-semibold tracking-wider text-[var(--text-primary)]">
                      PAUSED
                    </h3>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={resumeWithCountdown}
                        style={
                          isCustomAccent
                            ? {
                                backgroundColor: 'var(--accent-color)',
                                color: '#09090b',
                              }
                            : undefined
                        }
                        className="inline-flex items-center gap-2 rounded-md bg-[var(--text-primary)] px-4 py-2 font-mono text-[12px] font-medium text-[var(--bg-page)] hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        <Play className="h-3.5 w-3.5" />
                        <span>Resume</span>
                      </button>

                      <button
                        type="button"
                        onClick={resetAndStart}
                        className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-3 py-2 font-mono text-[12px] text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Restart</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3-Second Countdown Overlay */}
              {status === 'countdown' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-[1px] select-none">
                  <div className="flex flex-col items-center gap-1 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 px-7 py-4 text-center shadow-xl">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      Resuming in
                    </span>
                    <motion.span
                      key={countdown}
                      initial={{ scale: 1.35, opacity: 0.4 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      style={isCustomAccent ? { color: 'var(--accent-color)' } : undefined}
                      className="font-mono text-4xl font-bold text-[var(--text-primary)]"
                    >
                      {countdown}
                    </motion.span>
                  </div>
                </div>
              )}

              {/* Game Over Overlay with Retry */}
              {status === 'gameover' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 backdrop-blur-[1px]">
                  <div className="flex flex-col items-center gap-3 rounded-md border border-[var(--border-strong)] bg-[var(--bg-surface)] px-7 py-5 text-center shadow-xl">
                    <h3 className="font-mono text-base font-semibold tracking-wider text-[var(--text-primary)]">
                      GAME OVER
                    </h3>

                    <button
                      type="button"
                      onClick={resetAndStart}
                      style={
                        isCustomAccent
                          ? {
                              backgroundColor: 'var(--accent-color)',
                              color: '#09090b',
                            }
                          : undefined
                      }
                      className="inline-flex items-center gap-2 rounded-md bg-[var(--text-primary)] px-4 py-2 font-mono text-[12px] font-medium text-[var(--bg-page)] hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Retry</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] px-5 py-3">
              <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-[var(--text-muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-1.5 py-0.5 text-[10px] text-[var(--text-primary)]">
                    Space
                  </kbd>
                  <span>/</span>
                  <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-1.5 py-0.5 text-[10px] text-[var(--text-primary)]">
                    ↑
                  </kbd>
                  <span>Jump</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-1.5 py-0.5 text-[10px] text-[var(--text-primary)]">
                    ↓
                  </kbd>
                  <span>Duck</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-1.5 py-0.5 text-[10px] text-[var(--text-primary)]">
                    P
                  </kbd>
                  <span>Pause</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <kbd className="rounded border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-1.5 py-0.5 text-[10px] text-[var(--text-primary)]">
                    R
                  </kbd>
                  <span>Retry</span>
                </span>
              </div>

              {/* Touch / Mobile Controls */}
              <div className="flex sm:hidden items-center gap-2 w-full justify-between">
                <button
                  type="button"
                  onPointerDown={() => setDuck(true)}
                  onPointerUp={() => setDuck(false)}
                  onPointerLeave={() => setDuck(false)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] py-2 font-mono text-[12px] text-[var(--text-primary)] active:scale-95 transition-transform"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                  <span>Duck</span>
                </button>
                {(status === 'playing' || status === 'paused' || status === 'countdown') && (
                  <button
                    type="button"
                    onClick={status === 'paused' ? resumeWithCountdown : pauseGame}
                    className="flex items-center justify-center gap-1.5 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-pill)] px-3.5 py-2 font-mono text-[12px] text-[var(--text-primary)] active:scale-95 transition-transform"
                  >
                    {status === 'paused' ? (
                      <>
                        <Play className="h-3.5 w-3.5" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-3.5 w-3.5" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={triggerJump}
                  style={
                    isCustomAccent
                      ? {
                          backgroundColor: 'var(--accent-color)',
                          color: '#09090b',
                        }
                      : undefined
                  }
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[var(--text-primary)] py-2 font-mono text-[12px] font-medium text-[var(--bg-page)] active:scale-95 transition-transform"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                  <span>{status === 'gameover' ? 'Retry' : 'Jump'}</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-2">
                {(status === 'playing' || status === 'paused' || status === 'countdown') && (
                  <button
                    type="button"
                    onClick={status === 'paused' ? resumeWithCountdown : pauseGame}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:bg-[var(--bg-pill)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    {status === 'paused' ? (
                      <>
                        <Play className="h-3 w-3" />
                        <span>Resume</span>
                      </>
                    ) : (
                      <>
                        <Pause className="h-3 w-3" />
                        <span>Pause</span>
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={resetAndStart}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-subtle)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:bg-[var(--bg-pill)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Restart</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}