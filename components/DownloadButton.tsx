'use client'

import React, { useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import OSIcon from './OSIcon'

type OS = 'windows' | 'mac' | 'linux'

export default function DownloadButton() {
  const [isOpen, setIsOpen] = useState(false)

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

  const handleDownload = (selectedOs: OS) => {
    const link = downloadLinks[selectedOs]
    const a = document.createElement('a')
    a.href = link.file
    a.download = link.file.split('/').pop() || 'download'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setIsOpen(false)
  }

  return (
    <div className="fixed top-6 left-6 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[rgb(237,254,193)] text-[#0A1E5E] px-6 py-3 font-bold flex items-center gap-2 hover:bg-[rgb(237,254,193)]/90 transition-all duration-200 border border-[rgb(237,254,193)]"
          style={{ borderRadius: '0px' }}
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full left-0 mt-2 bg-[#0A1E5E] border border-[rgb(237,254,193)] z-50 min-w-[200px]" style={{ borderRadius: '0px' }}>
              <div className="p-2 space-y-1">
                {Object.entries(downloadLinks).map(([key, link]) => (
                  <button
                    key={key}
                    onClick={() => {
                      handleDownload(key as OS)
                    }}
                    style={{ borderRadius: '0px' }}
                    className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-[rgb(237,254,193)]/10 border border-transparent"
                  >
                    <OSIcon os={link.os} className="w-6 h-6 text-[rgb(237,254,193)]" />
                    <div className="flex-1 text-left">
                      <div className="font-ios font-semibold text-[rgb(237,254,193)] text-sm">
                        {link.name}
                      </div>
                      <div className="font-ios text-xs text-[rgb(237,254,193)]/60">
                        {link.extension}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

