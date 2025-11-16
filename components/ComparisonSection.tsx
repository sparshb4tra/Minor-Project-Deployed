'use client'

import { useState, useEffect } from 'react'
import MetricsChart from './MetricsChart'
import PostItNote from './PostItNote'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function ComparisonSection() {
  const [shuffledTitles, setShuffledTitles] = useState<string[]>([])

  useEffect(() => {
    const titles = [
      'Privacy First',
      'Zero Cost',
      'Lightning Fast',
      'Complete Control',
      'Offline Ready',
      'Open Source'
    ]
    setShuffledTitles(shuffleArray(titles))
  }, [])

  const postItPositions = [
    { x: 150, y: 100, rotation: -3 },
    { x: 420, y: 80, rotation: 2 },
    { x: 180, y: 320, rotation: -2 },
    { x: 480, y: 280, rotation: 4 },
    { x: 220, y: 520, rotation: -1 },
    { x: 540, y: 480, rotation: 3 }
  ]

  return (
    <div id="page-2" className="relative min-h-[600px] md:min-h-[800px] pb-12 md:pb-20 md:pr-[480px] select-none">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold tracking-tight mb-8 md:mb-12 text-center px-4">
        Why <span className="font-script italic">Local AI  </span>   Chat?
      </h2>
      
      {/* Post It Cards - shown first on mobile, stacked vertically with slight overlap */}
      <div className="flex flex-col md:contents px-4 md:px-0 mb-6 md:mb-0 md:gap-0">
        {shuffledTitles.length > 0 && shuffledTitles.map((title, index) => {
        const position = postItPositions[index] || { x: 100, y: 100, rotation: 0 }
        const variant: 'beige' | 'blue' = [0, 3, 4].includes(index) ? 'blue' : 'beige'
        
        return (
          <div 
            key={`${title}-${index}`}
            className="md:contents"
            style={{
              marginTop: index > 0 ? '-60px' : '0',
              zIndex: 15 + index
            }}
          >
            <PostItNote
              title={title}
              variant={variant}
              rotation={position.rotation}
              position={{ x: position.x, y: position.y }}
            />
          </div>
        )
      })}
      </div>
      
      {/* Metrics Chart - shown after post it cards on mobile */}
      <div className="relative md:absolute md:right-[470px] md:top-[50px] w-full md:w-[480px] p-4 md:p-6 z-20 mt-6 md:mt-0">
        <MetricsChart />
      </div>
    </div>
  )
}
