'use client'

import { Sun, Moon, Palette } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { id: 'gradient', name: 'Gradient', icon: Palette, description: 'Colorful gradient theme' },
    { id: 'dark', name: 'Dark', icon: Moon, description: 'Dark theme' },
    { id: 'light', name: 'Light', icon: Sun, description: 'Light theme' }
  ] as const

  return (
    <div className="flex items-center space-x-1 bg-white/10 rounded-lg p-1">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon
        const isActive = theme === themeOption.id
        
        return (
          <button
            key={themeOption.id}
            onClick={() => setTheme(themeOption.id)}
            className={`p-2 rounded-md transition-all duration-200 ${
              isActive
                ? 'bg-white/20 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            title={themeOption.description}
          >
            <Icon className="w-4 h-4" />
          </button>
        )
      })}
    </div>
  )
}
