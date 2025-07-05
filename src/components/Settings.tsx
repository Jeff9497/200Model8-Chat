import { useState, useEffect } from 'react'
import { X, Key, Save, ExternalLink, Info } from 'lucide-react'
import { setApiKey, getApiKey, removeApiKey } from '@/lib/openrouter'

interface SettingsProps {
  isOpen: boolean
  onClose: () => void
}

export default function Settings({ isOpen, onClose }: SettingsProps) {
  const [apiKey, setApiKeyState] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const existingKey = getApiKey()
      if (existingKey) {
        setApiKeyState(existingKey)
      }
    }
  }, [isOpen])

  const handleSave = () => {
    if (apiKey.trim()) {
      setApiKey(apiKey.trim())
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  const handleRemove = () => {
    removeApiKey()
    setApiKeyState('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* API Key Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Key className="w-5 h-5 text-blue-400" />
              <label className="text-sm font-medium text-white">
                OpenRouter API Key
              </label>
            </div>
            
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKeyState(e.target.value)}
              placeholder="sk-or-v1-..."
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                disabled={!apiKey.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{saved ? 'Saved!' : 'Save'}</span>
              </button>
              
              {getApiKey() && (
                <button
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-blue-400">
                  How to get your API key:
                </h3>
                <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
                  <li>Visit OpenRouter.ai and create a free account</li>
                  <li>Go to the API Keys section</li>
                  <li>Create a new API key</li>
                  <li>Copy and paste it above</li>
                </ol>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                >
                  <span>Get API Key</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="text-xs text-gray-400 bg-gray-800/50 rounded-lg p-3">
            <p>
              🔒 Your API key is stored locally in your browser and never sent to our servers. 
              It's only used to communicate directly with OpenRouter's API.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
