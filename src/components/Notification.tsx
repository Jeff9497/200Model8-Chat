'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, X, Zap } from 'lucide-react'

interface NotificationProps {
  message: string
  type?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
  onClose: () => void
}

export default function Notification({ 
  message, 
  type = 'info', 
  duration = 3000, 
  onClose 
}: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Wait for animation to complete
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'info':
        return <Zap className="w-5 h-5 text-blue-400" />
      default:
        return <Zap className="w-5 h-5 text-blue-400" />
    }
  }

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500/20 border-green-500/30 text-green-100'
      case 'info':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-100'
      default:
        return 'bg-blue-500/20 border-blue-500/30 text-blue-100'
    }
  }

  return (
    <div
      className={`fixed top-20 right-4 z-50 flex items-center space-x-3 px-4 py-3 rounded-lg border backdrop-blur-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${getColors()}`}
    >
      {getIcon()}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
