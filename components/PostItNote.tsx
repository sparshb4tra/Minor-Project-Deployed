'use client'

import { useEffect, useState } from 'react'

interface PostItNoteProps {
  title: string
  variant?: 'beige' | 'blue'
  rotation?: number
  position?: { x: number; y: number }
}

export default function PostItNote({ 
  title, 
  variant = 'beige',
  rotation = 0,
  position
}: PostItNoteProps) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [mobileRotation] = useState(() => Math.random() * 4 - 2) // Random rotation between -2 and 2 degrees
  const cream = 'rgb(237, 254, 193)'
  const navy = '#0A1E5E'
  
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])
  
  const isBeige = variant === 'beige'
  const bgColor = isBeige ? cream : navy
  const textColor = isBeige ? navy : cream
  const naturalRotation = rotation || 0
  
  const getTransform = () => {
    if (isDesktop && position) {
      return `rotate(${naturalRotation}deg)`
    } else if (!isDesktop) {
      return `rotate(${mobileRotation}deg)`
    }
    return undefined
  }
  
  const desktopStyle = isDesktop && position ? {
    left: `${position.x}px`,
    top: `${position.y}px`,
  } : {}
  
  const transform = getTransform()
  
  return (
    <div
      className="relative md:absolute mb-4 md:mb-0"
      style={{
        ...desktopStyle,
        ...(transform ? { transform, transformOrigin: 'center' } : {}),
        zIndex: 15
      }}
    >
      <div
        className="px-8 py-10 md:px-12 md:py-14"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          width: '100%',
          maxWidth: '280px',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-ios)',
          fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
          fontWeight: '700',
          letterSpacing: '-0.03em',
          lineHeight: '1.1',
          textAlign: 'center',
          boxShadow: `
            0 8px 16px rgba(0, 0, 0, 0.2),
            0 2px 4px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 ${isBeige ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
          `,
          backgroundImage: isBeige 
            ? `linear-gradient(135deg, ${cream} 0%, ${cream}dd 100%)`
            : `linear-gradient(135deg, ${navy} 0%, ${navy}dd 100%)`,
          border: 'none',
          borderRadius: '0px',
          position: 'relative',
          overflow: 'hidden',
          margin: '0 auto'
        }}
      >
        <span style={{ position: 'relative', zIndex: 1, fontSize: 'inherit' }} className="select-none">{title}</span>
      </div>
    </div>
  )
}

