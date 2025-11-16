'use client'

import React, { useEffect, useRef, useState } from 'react'

interface PatternLibraryProps {
  randomize?: boolean
  seed?: number
}

function shuffleArray<T>(array: T[], seed?: number): T[] {
  const shuffled = [...array]
  let random = seed !== undefined ? seed : Math.random()
  
  const seededRandom = () => {
    random = (random * 9301 + 49297) % 233280
    return random / 233280
  }
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

type PatternFunction = (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[], frame?: number) => void

const drawPatterns: Record<string, PatternFunction> = {
    horizontalLines: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const lineHeight = 3
      const spacing = 2
      for (let y = 0; y < h; y += lineHeight + spacing) {
        ctx.fillStyle = colors[0]
        ctx.fillRect(0, y, w, lineHeight)
      }
    },
    diagonalLines: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 2
      for (let i = -h; i < w; i += 5) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + h, h)
        ctx.stroke()
      }
    },
    verticalLines: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const lineWidth = 2
      const spacing = 3
      for (let x = 0; x < w; x += lineWidth + spacing) {
        ctx.fillStyle = colors[0]
        ctx.fillRect(x, 0, lineWidth, h)
      }
    },
    diagonalStripes: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      for (let i = -h; i < w + h; i += 8) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i - h, h)
        ctx.lineTo(i - h + 4, h)
        ctx.lineTo(i + 4, 0)
        ctx.fill()
      }
    },
    moire: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 1
      for (let i = 0; i < 20; i++) {
        ctx.beginPath()
        ctx.arc(w/2, h/2, i * 3, 0, Math.PI * 2)
        ctx.stroke()
      }
    },
    smallDots: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const dotSize = 1
      const spacing = 4
      ctx.fillStyle = colors[0]
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
    },
    mediumDots: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const dotSize = 2
      const spacing = 6
      ctx.fillStyle = colors[0]
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
    },
    largeDots: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const dotSize = 4
      const spacing = 8
      ctx.fillStyle = colors[0]
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
    },
    topStripe: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.fillRect(0, 0, w, h * 0.3)
    },
    bottomStripe: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.fillRect(0, h * 0.7, w, h * 0.3)
    },
    leftStripe: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.fillRect(0, 0, w * 0.3, h)
    },
    rightStripe: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.fillRect(w * 0.7, 0, w * 0.3, h)
    },
    diagonal: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(w, h)
      ctx.lineTo(w, 0)
      ctx.fill()
    },
    reverseDiagonal: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(0, h)
      ctx.lineTo(w, h)
      ctx.fill()
    },
    circle: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.beginPath()
      ctx.arc(w/2, h/2, Math.min(w, h) * 0.3, 0, Math.PI * 2)
      ctx.fill()
    },
    largeCircle: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.beginPath()
      ctx.arc(w/2, h/2, Math.min(w, h) * 0.45, 0, Math.PI * 2)
      ctx.fill()
    },
    smallDot: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      ctx.beginPath()
      ctx.arc(w/2, h/2, 3, 0, Math.PI * 2)
      ctx.fill()
    },
    zigzag: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 2
      const amplitude = h / 3
      const frequency = 4
      for (let i = 0; i < frequency; i++) {
        ctx.beginPath()
        ctx.moveTo(i * w/frequency, h/2)
        ctx.lineTo(i * w/frequency + w/(frequency*2), h/2 - amplitude)
        ctx.lineTo((i+1) * w/frequency, h/2)
        ctx.stroke()
      }
    },
    waves: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 2
      for (let y = 0; y < h; y += 8) {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 2) {
          const yPos = y + Math.sin(x * 0.1) * 5
          if (x === 0) ctx.moveTo(x, yPos)
          else ctx.lineTo(x, yPos)
        }
        ctx.stroke()
      }
    },
    diamonds: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 8
      for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size) {
          ctx.beginPath()
          ctx.moveTo(x + size/2, y)
          ctx.lineTo(x + size, y + size/2)
          ctx.lineTo(x + size/2, y + size)
          ctx.lineTo(x, y + size/2)
          ctx.fill()
        }
      }
    },
    checkerboard: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const size = 8
      ctx.fillStyle = colors[0]
      for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size) {
          if ((Math.floor(x/size) + Math.floor(y/size)) % 2 === 0) {
            ctx.fillRect(x, y, size, size)
          }
        }
      }
    },
    largeCheckerboard: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const size = 16
      ctx.fillStyle = colors[0]
      for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size) {
          if ((Math.floor(x/size) + Math.floor(y/size)) % 2 === 0) {
            ctx.fillRect(x, y, size, size)
          }
        }
      }
    },
    grid: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 1
      const spacing = 8
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    },
    largeGrid: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 2
      const spacing = 16
      for (let x = 0; x < w; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    },
    crosshatch: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 1
      for (let i = 0; i < w; i += 4) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + h, h)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(i, h)
        ctx.lineTo(i + h, 0)
        ctx.stroke()
      }
    },
    triangles: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 12
      for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size) {
          ctx.beginPath()
          ctx.moveTo(x, y + size)
          ctx.lineTo(x + size/2, y)
          ctx.lineTo(x + size, y + size)
          ctx.fill()
        }
      }
    },
    circles: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const spacing = 10
      const radius = 3
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    },
    scales: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 1
      const radius = 8
      for (let y = 0; y < h + radius; y += radius) {
        for (let x = -radius; x < w + radius; x += radius * 2) {
          ctx.beginPath()
          ctx.arc(x + (y % (radius * 2) === 0 ? 0 : radius), y, radius, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    },
    hexagons: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 1
      const size = 6
      for (let y = 0; y < h; y += size * 1.5) {
        for (let x = 0; x < w; x += size * Math.sqrt(3)) {
          const offsetX = y % (size * 3) === 0 ? 0 : size * Math.sqrt(3) / 2
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const px = x + offsetX + size * Math.cos(angle)
            const py = y + size * Math.sin(angle)
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.stroke()
        }
      }
    },
    radial: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[], frame = 0) => {
      const centerX = w / 2
      const centerY = h / 2
      const dotSize = 2
      const spacing = 4
      const time = frame * 0.05
      
      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const wave = Math.sin(distance * 0.1 - time) * 0.5 + 0.5
          
          let color
          if (distance < 20 + wave * 20) {
            color = colors[0]
          } else if (distance < 45 + wave * 10) {
            color = colors[1] || colors[0]
          } else {
            color = '#0A1E5E'
          }
          
          ctx.fillStyle = color
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
    },
    wave: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[], frame = 0) => {
      const dotSize = 2
      const spacing = 4
      const time = frame * 0.05
      const centerY = h / 2
      
      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const waveY = Math.sin(x * 0.1 + time) * 20 + centerY
          let color
          if (Math.abs(y - waveY) < 15) {
            color = colors[0]
          } else if (Math.abs(y - waveY) < 30) {
            color = colors[1] || colors[0]
          } else {
            color = '#0A1E5E'
          }
          ctx.fillStyle = color
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
    },
    animatedGrid: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[], frame = 0) => {
      const dotSize = 2
      const spacing = 4
      const time = frame * 0.05
      
      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const gridPhase = Math.sin(x * 0.05 + y * 0.05 + time)
          const color = gridPhase > 0 ? colors[0] : '#0A1E5E'
          ctx.fillStyle = color
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
    },
    plus: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const centerX = w / 2
      const centerY = h / 2
      const size = 8
      ctx.fillRect(centerX - size/2, centerY - 2, size, 4)
      ctx.fillRect(centerX - 2, centerY - size/2, 4, size)
    },
    heart: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 6
      const spacing = 10
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.beginPath()
          ctx.moveTo(x, y + size/2)
          ctx.bezierCurveTo(x, y, x - size/2, y, x - size/2, y + size/2)
          ctx.bezierCurveTo(x - size/2, y + size, x, y + size, x, y + size * 1.5)
          ctx.bezierCurveTo(x, y + size, x + size/2, y + size, x + size/2, y + size/2)
          ctx.bezierCurveTo(x + size/2, y, x, y, x, y + size/2)
          ctx.fill()
        }
      }
    },
    rotatedDiamonds: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 10
      for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size) {
          ctx.save()
          ctx.translate(x + size/2, y + size/2)
          ctx.rotate(Math.PI / 4)
          ctx.fillRect(-size/2, -size/2, size, size)
          ctx.restore()
        }
      }
    },
    dotsWithCorner: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const dotSize = 1
      const spacing = 4
      ctx.fillStyle = colors[0]
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
      ctx.fillRect(w - 12, h - 12, 8, 8)
    },
    dotsCircle: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const dotSize = 1
      const spacing = 3
      const centerX = w / 2
      const centerY = h / 2
      const radius = Math.min(w, h) * 0.35
      ctx.fillStyle = colors[0]
      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < radius) {
            ctx.fillRect(x, y, dotSize, dotSize)
          }
        }
      }
      ctx.fillRect(centerX - 2, centerY - 6, 4, 12)
      ctx.fillRect(centerX - 6, centerY - 2, 12, 4)
    },
    dotsZigzag: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const dotSize = 1
      const spacing = 3
      ctx.fillStyle = colors[0]
      for (let y = 0; y < h; y += spacing) {
        const offset = (y / spacing) % 2 === 0 ? 0 : spacing * 2
        for (let x = offset; x < w; x += spacing * 4) {
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }
    },
    dotsDiagonal: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const dotSize = 1
      const spacing = 3
      ctx.fillStyle = colors[0]
      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          if ((x + y) % (spacing * 2) === 0) {
            ctx.fillRect(x, y, dotSize, dotSize)
          }
        }
      }
    },
    fourTriangles: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const midX = w / 2
      const midY = h / 2
      ctx.fillStyle = colors[0]
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(midX, 0)
      ctx.lineTo(0, midY)
      ctx.fill()
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(midX + i * 2, 0)
        ctx.lineTo(w, i * 2)
        ctx.stroke()
      }
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.moveTo(0, midY + i * 2)
        ctx.lineTo(i * 2, h)
        ctx.stroke()
      }
      ctx.fillStyle = colors[0]
      ctx.beginPath()
      ctx.moveTo(midX, midY)
      ctx.lineTo(w, midY)
      ctx.lineTo(w, h)
      ctx.lineTo(midX, h)
      ctx.fill()
    },
    verticalCheckerboard: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      const size = 8
      ctx.fillStyle = colors[0]
      for (let y = 0; y < h; y += size) {
        for (let x = 0; x < w; x += size * 2) {
          if (Math.floor(y/size) % 2 === 0) {
            ctx.fillRect(x, y, size, size)
          } else {
            ctx.fillRect(x + size, y, size, size)
          }
        }
      }
    },
    smallSquares: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 4
      const spacing = 6
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.fillRect(x, y, size, size)
        }
      }
    },
    largeSquares: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 8
      const spacing = 10
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.fillRect(x, y, size, size)
        }
      }
    },
    diagonalWaves: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 2
      for (let i = -h; i < w + h; i += 8) {
        ctx.beginPath()
        for (let j = 0; j < h; j++) {
          const x = i + j + Math.sin(j * 0.2) * 3
          const y = j
          if (j === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    },
    concentricSquares: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 1
      const centerX = w / 2
      const centerY = h / 2
      for (let i = 1; i <= 8; i++) {
        const size = i * 6
        ctx.strokeRect(centerX - size/2, centerY - size/2, size, size)
      }
    },
    spiral: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.strokeStyle = colors[0]
      ctx.lineWidth = 2
      const centerX = w / 2
      const centerY = h / 2
      ctx.beginPath()
      for (let angle = 0; angle < Math.PI * 6; angle += 0.1) {
        const radius = angle * 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        if (angle === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()
    },
    stars: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 8
      const spacing = 12
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
            const px = x + Math.cos(angle) * size
            const py = y + Math.sin(angle) * size
            if (i === 0) ctx.moveTo(px, py)
            else ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
        }
      }
    },
    arrows: (ctx: CanvasRenderingContext2D, w: number, h: number, colors: string[]) => {
      ctx.fillStyle = colors[0]
      const size = 8
      const spacing = 12
      for (let y = spacing; y < h; y += spacing) {
        for (let x = spacing; x < w; x += spacing) {
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + size, y + size/2)
          ctx.lineTo(x, y + size)
          ctx.lineTo(x + size/3, y + size/2)
          ctx.closePath()
          ctx.fill()
        }
      }
    },
}

interface Pattern {
  id: number
  name: string
  draw: PatternFunction
  ref: React.RefObject<HTMLCanvasElement>
  animated: boolean
}

export default function PatternLibrary({ randomize = false, seed }: PatternLibraryProps) {
  const [patterns, setPatterns] = useState<Pattern[]>([])

  useEffect(() => {
    let patternList = Object.keys(drawPatterns).map((name, i) => ({
      id: i,
      name,
      draw: drawPatterns[name],
      ref: React.createRef<HTMLCanvasElement>(),
      animated: ['radial', 'wave', 'animatedGrid'].includes(name),
    }))
    
    if (randomize) {
      const randomSeed = seed !== undefined ? seed : Math.random() * 1000000
      patternList = shuffleArray(patternList, randomSeed)
      patternList = patternList.map((p, i) => ({ ...p, id: i }))
    }
    
    setPatterns(patternList)
  }, [randomize, seed])

  useEffect(() => {
    if (patterns.length === 0) return

    const animations: number[] = []

    patterns.forEach((pattern) => {
      if (!pattern.ref.current) return

      const canvas = pattern.ref.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      const w = 128
      const h = 128
      let frame = 0
      let animationId: number | null = null

      const draw = () => {
        ctx.fillStyle = '#0A1E5E'
        ctx.fillRect(0, 0, w, h)

        if (pattern.animated) {
          pattern.draw(ctx, w, h, ['rgb(237,254,193)'], frame)
          frame++
          animationId = requestAnimationFrame(draw)
          if (animationId) animations.push(animationId)
        } else {
          pattern.draw(ctx, w, h, ['rgb(237,254,193)'])
        }
      }

      draw()
    })

    return () => {
      animations.forEach(id => cancelAnimationFrame(id))
    }
  }, [patterns])

  const totalPatterns = patterns.length
  const colsPerRow = totalPatterns > 0 ? Math.ceil(totalPatterns / 2) : 17

  return (
    <div className="w-full py-8 relative z-10" style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      <div className="w-full px-6">
        <div className="grid gap-2" style={{ 
          gridTemplateColumns: `repeat(${colsPerRow}, 1fr)`,
          gridTemplateRows: 'repeat(2, 1fr)',
          maxWidth: '100%'
        }}>
          {patterns.slice(0, colsPerRow * 2).map((pattern) => (
            <div 
              key={pattern.id}
              className="relative overflow-hidden border transition-colors cursor-pointer pointer-events-auto"
              style={{
                backgroundColor: '#0A1E5E',
                borderColor: 'rgb(237, 254, 193)',
                borderWidth: '1px',
                borderRadius: '0px',
                aspectRatio: '1',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgb(237, 254, 193)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgb(237, 254, 193)'
              }}
              title={pattern.name}
            >
              <canvas
                ref={pattern.ref}
                width={128}
                height={128}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  imageRendering: 'pixelated'
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
