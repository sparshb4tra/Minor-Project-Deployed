'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Minimize2, Maximize2, Copy, Check } from 'lucide-react'

interface DraggableBoxProps {
  id: string
  title: string
  content: string | React.ReactNode
  initialX?: number
  initialY?: number
  initialWidth?: number
  initialHeight?: number
  hasCopyButton?: boolean
  codeToCopy?: string
  onClose?: () => void
  patternType?: 'radial' | 'dots' | 'wave' | 'diagonal'
  isDialogBox?: boolean // If true, only show close button
}

export default function DraggableBox({
  id,
  title,
  content,
  initialX = 0,
  initialY = 0,
  initialWidth = 300,
  initialHeight = 200,
  hasCopyButton = false,
  codeToCopy = '',
  onClose,
  patternType = 'radial',
  isDialogBox = false
}: DraggableBoxProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight })
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [copied, setCopied] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (boxRef.current) {
      let parent = boxRef.current.parentElement
      while (parent) {
        if (parent.classList.contains('min-h-screen') || parent.id === 'page-2') {
          containerRef.current = parent
          const containerRect = parent.getBoundingClientRect()
          setPosition({
            x: Math.max(0, initialX - containerRect.left),
            y: Math.max(0, initialY - containerRect.top)
          })
          break
        }
        parent = parent.parentElement
      }
    }
  }, [initialX, initialY])

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = 128
    const h = 128
    let frame = 0

    const drawPattern = () => {
      ctx.clearRect(0, 0, w, h)

      const dotSize = 2
      const spacing = 4
      const centerX = w / 2
      const centerY = h / 2
      const time = frame * 0.05

      const bgColor = '#0A1E5E'
      const fgColor = 'rgb(237, 254, 193)'

      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          const dx = x - centerX
          const dy = y - centerY
          const distance = Math.sqrt(dx * dx + dy * dy)

          let color: string

          switch (patternType) {
            case 'radial':
              const wave = Math.sin(distance * 0.1 - time) * 0.5 + 0.5
              if (distance < 20 + wave * 20) {
                color = fgColor
              } else if (distance < 45 + wave * 10) {
                color = bgColor
              } else {
                color = bgColor
              }
              break
            case 'dots':
              const pattern = (Math.floor(x / spacing) + Math.floor(y / spacing)) % 2
              color = pattern === 0 ? fgColor : bgColor
              break
            case 'wave':
              const waveY = Math.sin(x * 0.1 + time) * 20 + centerY
              if (Math.abs(y - waveY) < 15) {
                color = fgColor
              } else {
                color = bgColor
              }
              break
            case 'diagonal':
              const diagonal = (x + y) % (spacing * 4)
              color = diagonal < spacing * 2 ? fgColor : bgColor
              break
            default:
              color = bgColor
          }

          ctx.fillStyle = color
          ctx.fillRect(x, y, dotSize, dotSize)
        }
      }

      if (patternType === 'radial' || patternType === 'wave') {
        frame++
        requestAnimationFrame(drawPattern)
      }
    }

    drawPattern()
  }, [patternType])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && containerRef.current && boxRef.current) {
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y
        
        const containerRect = containerRef.current.getBoundingClientRect()
        const boxRect = boxRef.current.getBoundingClientRect()
        
        const leftBoundary = containerRect.left
        const rightBoundary = containerRect.right - size.width
        const topBoundary = containerRect.top
        const bottomBoundary = containerRect.bottom - (isMinimized ? 40 : size.height)
        
        setPosition({
          x: Math.max(leftBoundary, Math.min(newX, rightBoundary)) - containerRect.left,
          y: Math.max(topBoundary, Math.min(newY, bottomBoundary)) - containerRect.top
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset, size, isMinimized])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (boxRef.current && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const boxRect = boxRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - boxRect.left,
        y: e.clientY - boxRect.top
      })
      setIsDragging(true)
    }
  }

  const handleCopy = () => {
    if (codeToCopy) {
      navigator.clipboard.writeText(codeToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleMaximize = () => {
    if (isMaximized) {
      setSize({ width: initialWidth, height: initialHeight })
      setIsMaximized(false)
    } else {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const maxWidth = containerRect.width - 32
        const maxHeight = containerRect.height - 100
        setSize({ 
          width: Math.min(maxWidth, 800),
          height: Math.min(maxHeight, 600)
        })
        setIsMaximized(true)
      }
    }
  }

  const cream = 'rgb(237, 254, 193)'
  const navy = '#0A1E5E'

  return (
    <div
      ref={boxRef}
      className="absolute z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isMinimized ? '200px' : `${size.width}px`,
        height: isMinimized ? '40px' : `${size.height}px`,
        backgroundColor: navy,
        border: `2px solid ${cream}`,
        borderRadius: '0px',
        color: cream,
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: 'none',
        position: 'relative'
      }}
    >
      <canvas
        ref={canvasRef}
        width={128}
        height={128}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          imageRendering: 'pixelated',
          opacity: 0.1,
          pointerEvents: 'none',
          willChange: patternType === 'radial' || patternType === 'wave' ? 'contents' : 'auto'
        }}
      />
      <div
        className="flex items-center justify-between px-3 py-2 border-b-2 relative z-10"
        style={{ 
          borderColor: cream,
          cursor: 'grab'
        }}
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-semibold font-ios">{title}</span>
        <div className="flex items-center gap-2">
          {isDialogBox ? (
            onClose && (
              <button
                onClick={onClose}
                className="p-1 hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: cream,
                  color: navy,
                  borderRadius: '0px'
                }}
              >
                <X className="w-4 h-4" />
              </button>
            )
          ) : (
            <>
              {hasCopyButton && !isMinimized && (
                <button
                  onClick={handleCopy}
                  className="p-1 hover:opacity-80 transition-opacity"
                  style={{ 
                    backgroundColor: cream,
                    color: navy,
                    borderRadius: '0px'
                  }}
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              )}
              <button
                onClick={handleMaximize}
                className="p-1 hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: cream,
                  color: navy,
                  borderRadius: '0px'
                }}
                title={isMaximized ? 'Restore' : 'Maximize'}
              >
                {isMaximized ? (
                  <Minimize2 className="w-4 h-4" />
                ) : (
                  <Maximize2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: cream,
                  color: navy,
                  borderRadius: '0px'
                }}
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-1 hover:opacity-80 transition-opacity"
                  style={{ 
                    backgroundColor: cream,
                    color: navy,
                    borderRadius: '0px'
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {!isMinimized && (
        <div className="p-4 h-full overflow-auto relative z-10" style={{ height: `calc(100% - 40px)` }}>
          {typeof content === 'string' ? (
            <p className="text-sm font-ios leading-relaxed">{content}</p>
          ) : (
            content
          )}
        </div>
      )}
    </div>
  )
}

