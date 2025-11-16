'use client'

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
  const cream = 'rgb(237, 254, 193)'
  const navy = '#0A1E5E'
  
  const isBeige = variant === 'beige'
  const bgColor = isBeige ? cream : navy
  const textColor = isBeige ? navy : cream
  const naturalRotation = rotation || 0
  
  return (
    <div
      className="absolute"
      style={{
        left: position?.x ? `${position.x}px` : 'auto',
        top: position?.y ? `${position.y}px` : 'auto',
        transform: `rotate(${naturalRotation}deg)`,
        transformOrigin: 'center',
        zIndex: 15
      }}
    >
      <div
        className="px-12 py-14"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          width: '320px',
          minHeight: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-ios)',
          fontSize: '2.25rem',
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
          overflow: 'hidden'
        }}
      >
        <span style={{ position: 'relative', zIndex: 1 }} className="select-none">{title}</span>
      </div>
    </div>
  )
}

