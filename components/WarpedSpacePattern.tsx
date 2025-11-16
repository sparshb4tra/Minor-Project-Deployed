'use client'

import { useEffect, useRef } from 'react'

export default function WarpedSpacePattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let offset = 0

    // Set canvas to full width - ensure it covers entire viewport including right side
    const resizeCanvas = () => {
      // Get the actual full viewport width, accounting for any sidebars
      const fullWidth = Math.max(
        window.innerWidth,
        document.documentElement.clientWidth,
        document.documentElement.scrollWidth,
        document.body.scrollWidth,
        window.outerWidth || window.innerWidth
      )
      // Add extra padding to ensure coverage
      canvas.width = fullWidth + 100
      canvas.height = 128
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Color theme - only two colors
    const cream = 'rgb(237, 254, 193)'
    const navy = '#0A1E5E'

    const draw = () => {
      const w = canvas.width
      const h = canvas.height

      // Clear canvas with navy background
      ctx.fillStyle = navy
      ctx.fillRect(0, 0, w, h)

      const pixelSize = 4
      const time = offset * 0.1

      // Draw randomly changing pixelated pattern
      for (let y = 0; y < h; y += pixelSize) {
        for (let x = 0; x < w; x += pixelSize) {
          // Create random seed based on position and time for consistent randomness
          const seed = (x * 73 + y * 37 + Math.floor(time * 10)) % 1000
          const random1 = ((seed * 9301 + 49297) % 233280) / 233280
          const random2 = ((seed * 7919 + 104729) % 233280) / 233280
          
          // Randomly decide color - changes over time
          const colorThreshold = 0.3 + Math.sin(time + x * 0.01 + y * 0.01) * 0.2
          const color = random1 < colorThreshold ? cream : navy
          
          // Sometimes add random sparkles
          if (random2 > 0.95) {
            ctx.fillStyle = cream
          } else {
            ctx.fillStyle = color
          }
          
          ctx.fillRect(x, y, pixelSize, pixelSize)
        }
      }

      offset += 1
      animationId = requestAnimationFrame(draw)
    }
    

    draw()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <article 
      className="relative overflow-hidden"
      style={{
        position: 'relative',
        boxShadow: 'inset 0 0 0 1px currentColor',
        borderRadius: '0px',
        overflow: 'hidden',
        width: '100vw',
        maxWidth: 'none',
        marginLeft: 'calc(-38vw + 50%)',
        marginRight: 0,
        left: 0,
        right: 0,
        background: 'color(display-p3 0.012 0.003 0.408)',
        color: 'color(display-p3 0.931 0.996 0.755)'
      }}
      title="Warped Space"
    >
      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        style={{
          width: '100vw',
          maxWidth: 'none',
          height: '128px',
          display: 'block',
          imageRendering: 'pixelated'
        }}
      />
    </article>
  )
}

