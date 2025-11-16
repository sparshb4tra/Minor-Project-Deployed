'use client'

import React, { useState } from 'react'
import { Download, Terminal } from 'lucide-react'
import OSIcon from './OSIcon'

type OS = 'windows' | 'mac' | 'linux' | null

export default function DownloadSection() {
  const [selectedOS, setSelectedOS] = useState<OS>(null)
  const [hoveredOS, setHoveredOS] = useState<OS>(null)

  const downloadLinks = {
    windows: {
      file: '/downloads/local-ai-chat-windows.zip',
      name: 'Windows',
      extension: '.zip',
      os: 'windows' as const,
    },
    mac: {
      file: '/downloads/local-ai-chat-mac.dmg',
      name: 'macOS',
      extension: '.dmg',
      os: 'mac' as const,
    },
    linux: {
      file: '/downloads/local-ai-chat-linux.zip',
      name: 'Linux',
      extension: '.zip',
      os: 'linux' as const,
    },
  }

  const installationSteps = {
    windows: {
      download: 'Download the .zip file',
      extract: 'Extract the .zip file to a folder of your choice',
      prerequisites: 'Prerequisites: Ollama & Node.js (download links provided or included in zip)',
      run: 'Double-click "START CHAT (Windows).bat" to launch',
      command: 'START CHAT (Windows).bat'
    },
    mac: {
      download: 'Download the .dmg file',
      extract: 'Mount the .dmg and drag to Applications',
      prerequisites: 'Prerequisites: Ollama & Node.js (download links provided or included in zip)',
      run: 'Double-click "START CHAT (Mac).command" to launch',
      command: 'START CHAT (Mac).command'
    },
    linux: {
      download: 'Download the .zip file',
      extract: 'Extract the .zip file to your desired location',
      prerequisites: 'Prerequisites: Ollama & Node.js (download links provided or included in zip)',
      run: 'Run the launcher script in terminal',
      command: 'chmod +x "START CHAT (Linux).sh" && ./"START CHAT (Linux).sh"'
    },
  }

  const handleOSClick = (os: 'windows' | 'mac' | 'linux') => {
    setSelectedOS(os)
    const link = downloadLinks[os]
    const a = document.createElement('a')
    a.href = link.file
    a.download = link.file.split('/').pop() || 'download'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const steps = selectedOS ? installationSteps[selectedOS] : null

  const cream = 'rgb(237, 254, 193)'
  const navy = '#0A1E5E'

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pb-20 select-none">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-[rgb(237,254,193)] mb-4">
          Get Started
        </h2>
        <p className="text-lg font-ios text-[rgb(237,254,193)]/80">
          Choose your platform
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mt-10">
          {Object.entries(downloadLinks).map(([key, link]) => {
            const os = key as 'windows' | 'mac' | 'linux'
            const isHovered = hoveredOS === os
            const isSelected = selectedOS === os
            
            return (
              <button
                key={key}
                onClick={() => handleOSClick(os)}
                onMouseEnter={() => setHoveredOS(os)}
                onMouseLeave={() => setHoveredOS(null)}
                className="min-w-[240px] h-auto py-6 flex flex-col gap-3 text-xl transition-all duration-300 border-2"
                style={{
                  backgroundColor: isSelected || isHovered ? cream : 'transparent',
                  color: isSelected || isHovered ? navy : cream,
                  borderColor: cream,
                  borderRadius: '0px',
                  transform: isSelected ? 'scale(1.05)' : isHovered ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: isSelected ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : isHovered ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' : 'none'
                }}
              >
                <div style={{ color: isSelected || isHovered ? navy : cream }}>
                  <OSIcon os={link.os} className="w-12 h-12" />
                </div>
                <span className="text-5xl md:text-7xl font-bold select-none">
                  {link.name}
                </span>
                <span className="text-sm font-normal opacity-80 select-none">{link.extension}</span>
                <Download className="w-6 h-6 mt-1" />
              </button>
            )
          })}
        </div>
      </div>

      {selectedOS && steps && (
        <div 
          className="border-2 p-6 space-y-6"
          style={{
            borderColor: cream,
            backgroundColor: `${navy}dd`,
            borderRadius: '0px'
          }}
        >
          <h3 className="text-2xl font-serif font-bold text-[rgb(237,254,193)] flex items-center gap-3">
            <Terminal className="w-6 h-6" />
            Quick Setup Steps
          </h3>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div 
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-lg font-bold select-none"
                style={{
                  backgroundColor: cream,
                  color: navy,
                  borderRadius: '0px'
                }}
              >
                1
              </div>
              <p className="text-base leading-relaxed text-[rgb(237,254,193)]/90 pt-1">
                {steps.download}
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div 
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-lg font-bold select-none"
                style={{
                  backgroundColor: cream,
                  color: navy,
                  borderRadius: '0px'
                }}
              >
                2
              </div>
              <p className="text-base leading-relaxed text-[rgb(237,254,193)]/90 pt-1">
                {steps.extract}
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div 
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-lg font-bold select-none"
                style={{
                  backgroundColor: cream,
                  color: navy,
                  borderRadius: '0px'
                }}
              >
                3
              </div>
              <p className="text-base leading-relaxed text-[rgb(237,254,193)]/90 pt-1">
                {steps.prerequisites}
              </p>
            </div>
            
            <div className="flex gap-4 items-start">
              <div 
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-lg font-bold select-none"
                style={{
                  backgroundColor: cream,
                  color: navy,
                  borderRadius: '0px'
                }}
              >
                4
              </div>
              <div className="flex-1">
                <p className="text-base leading-relaxed text-[rgb(237,254,193)]/90 pt-1 mb-3">
                  {steps.run}
                </p>
                <div 
                  className="p-4 font-mono text-sm code-snippet"
                  style={{
                    backgroundColor: navy,
                    color: cream,
                    border: `1px solid ${cream}`,
                    borderRadius: '0px'
                  }}
                >
                  {steps.command}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="border-2 p-6"
        style={{
          borderColor: cream,
          backgroundColor: `${navy}dd`,
          borderRadius: '0px'
        }}
      >
        <h3 className="text-2xl font-serif font-bold text-[rgb(237,254,193)] mb-4 flex items-center gap-3">
          <Terminal className="w-6 h-6" />
          Quick Reference
        </h3>
        <div 
          className="p-4 font-mono text-sm overflow-x-auto code-snippet"
          style={{
            backgroundColor: navy,
            color: cream,
            border: `1px solid ${cream}`,
            borderRadius: '0px',
            minHeight: '120px'
          }}
        >
          <div className="space-y-2">
            <div className="text-[rgb(237,254,193)]/60"># Pull AI model (works on all platforms)</div>
            <div className="text-[rgb(237,254,193)]">ollama pull dolphin-llama3</div>
            <div className="mt-4 text-[rgb(237,254,193)]/60"># Verify Ollama installation</div>
            <div className="text-[rgb(237,254,193)]">ollama --version</div>
            <div className="mt-4 text-[rgb(237,254,193)]/60"># List installed models</div>
            <div className="text-[rgb(237,254,193)]">ollama list</div>
          </div>
        </div>
      </div>
    </div>
  )
}
