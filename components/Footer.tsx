'use client'

import { Github } from 'lucide-react'
import WarpedSpacePattern from './WarpedSpacePattern'

export default function Footer() {
  return (
    <footer className="pr-[480px] bg-[#0A1E5E] text-[rgb(237,254,193)]" style={{ 
      background: 'color(display-p3 0.012 0.003 0.408)',
      color: 'color(display-p3 0.931 0.996 0.755)'
    }}>
      <WarpedSpacePattern />
      
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://github.com/sparshb4tra"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[rgb(237,254,193)]/80 hover:text-[rgb(237,254,193)] transition-colors duration-200 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-serif italic text-base font-semibold">sparshb4tra</span>
            </a>
            
            <span className="text-white/30">•</span>
            
            <a
              href="https://github.com/Srihar1-raman"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[rgb(237,254,193)]/80 hover:text-[rgb(237,254,193)] transition-colors duration-200 group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-serif italic text-base font-semibold">Srihar1-raman</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
