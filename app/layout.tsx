import type { Metadata } from "next"
import { Inter, Bodoni_Moda, Great_Vibes } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

const bodoni = Bodoni_Moda({ 
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
})

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400"],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://m1nor-proj.vercel.app'),
  title: "Local AI Chat - Download",
  description: "Download Local AI Chat - A fully local, privacy-focused AI chat interface powered by Ollama",
  openGraph: {
    title: "Local AI Chat - Download",
    description: "Download Local AI Chat - A fully local, privacy-focused AI chat interface powered by Ollama",
    url: 'https://m1nor-proj.vercel.app',
    siteName: 'Local AI Chat',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Local AI Chat Landing Page',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Local AI Chat - Download",
    description: "Download Local AI Chat - A fully local, privacy-focused AI chat interface powered by Ollama",
    images: ['/preview.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0 }}>
      <body className={`${inter.className} ${bodoni.variable} ${greatVibes.variable}`} style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
