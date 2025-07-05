'use client'

import { Search, SearchX } from 'lucide-react'

interface SearchToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export default function SearchToggle({ enabled, onToggle }: SearchToggleProps) {
  return (
    <button
      onClick={() => onToggle(!enabled)}
      className={`p-2 rounded-lg transition-all duration-200 ${
        enabled
          ? 'bg-green-600/20 text-green-400 border border-green-500/30'
          : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20'
      }`}
      title={enabled ? 'Web search enabled' : 'Web search disabled'}
    >
      {enabled ? (
        <Search className="w-5 h-5" />
      ) : (
        <SearchX className="w-5 h-5" />
      )}
    </button>
  )
}
