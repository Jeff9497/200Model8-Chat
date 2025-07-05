import { Bot, User, Copy, Check, Edit2 } from 'lucide-react'
import { useState } from 'react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatMessageProps {
  message: Message
  onEdit?: (messageId: string, newContent: string) => void
}

export default function ChatMessage({ message, onEdit }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(message.content)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleEdit = () => {
    if (onEdit && editContent.trim() !== message.content) {
      onEdit(message.id, editContent.trim())
    }
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditContent(message.content)
    setIsEditing(false)
  }

  return (
    <div className={`flex space-x-2 sm:space-x-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      {message.role === 'assistant' && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[280px] sm:max-w-xs md:max-w-md lg:max-w-2xl xl:max-w-4xl ${message.role === 'user' ? 'order-1' : ''}`}>
        <div
          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
            message.role === 'user'
              ? 'bg-blue-600 text-white ml-auto'
              : 'bg-white/20 text-white'
          }`}
        >
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
                autoFocus
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs font-medium transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-xs font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          )}
        </div>
        
        <div className={`flex items-center mt-1 space-x-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>

          {message.role === 'user' && onEdit && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-gray-400 hover:text-white transition-colors"
              title="Edit message"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          )}

          {message.role === 'assistant' && (
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white transition-colors"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3" />
              )}
            </button>
          )}
        </div>
      </div>

      {message.role === 'user' && (
        <div className="flex-shrink-0 order-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  )
}
