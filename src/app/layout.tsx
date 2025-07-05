import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

export const metadata: Metadata = {
  title: '200Model8 - Free AI Chat',
  description: 'Access 200+ AI models for free through OpenRouter. Chat with GPT-4, Claude, Llama, and more!',
  keywords: 'AI, chat, free, OpenRouter, GPT-4, Claude, Llama, artificial intelligence',
  authors: [{ name: 'Jeff' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }
    ],
    apple: { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
