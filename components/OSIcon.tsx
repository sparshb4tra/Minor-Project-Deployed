'use client'

import React from 'react'
import Image from 'next/image'

interface OSIconProps {
  os: 'windows' | 'mac' | 'linux'
  className?: string
}

export default function OSIcon({ os, className = '' }: OSIconProps) {
  if (os === 'windows') {
    return (
      <svg className={className} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="11" y="11" width="32" height="32" fill="#0078D4"/>
        <rect x="45" y="11" width="32" height="32" fill="#0078D4"/>
        <rect x="11" y="45" width="32" height="32" fill="#0078D4"/>
        <rect x="45" y="45" width="32" height="32" fill="#0078D4"/>
      </svg>
    )
  }
  
  if (os === 'mac') {
    return (
      <Image
        src="/images/apple-logo.png"
        alt="macOS"
        width={48}
        height={48}
        className={className}
        style={{ objectFit: 'contain' }}
      />
    )
  }
  
  return (
    <Image
      src="/images/linux-logo.png"
      alt="Linux"
      width={48}
      height={48}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  )
}

