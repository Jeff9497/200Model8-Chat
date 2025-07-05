'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Settings, Zap, Globe, MessageSquarePlus } from 'lucide-react'
import ModelSelector, { getModelCapabilities } from '@/components/ModelSelector'
import ChatMessage from '@/components/ChatMessage'
import SettingsModal from '@/components/Settings'
import Notification from '@/components/Notification'
import FileUpload from '@/components/FileUpload'
import SearchToggle from '@/components/SearchToggle'
import { sendMessage } from '@/lib/openrouter'
import { searchWithExa, formatSearchResults, shouldPerformSearch } from '@/lib/search'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to 200Model8 ✨ Dedicated to providing premium AI capabilities at no cost. After all, the best innovations happen when brilliant minds can access the tools they need ✊. How may I help you?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('mistralai/mistral-7b-instruct:free')
  const [showSettings, setShowSettings] = useState(false)
  const [notification, setNotification] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [searchEnabled, setSearchEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleModelChange = (newModel: string) => {
    const modelNames: { [key: string]: string } = {
      'mistralai/mistral-7b-instruct:free': 'Mistral 7B (Free)',
      'deepseek/deepseek-chat': 'DeepSeek Chat (Free)',
      'deepseek/deepseek-chat-v3-0324:free': 'DeepSeek Chat V3 (Free)',
      'anthropic/claude-3-haiku:beta': 'Claude 3 Haiku Beta (Free)',
      'meta-llama/llama-3.2-11b-vision-instruct:free': 'Llama 3.2 11B Vision (Free)',
      'featherless/qwerky-72b:free': 'Qwerky 72B (Free)',
      'anthropic/claude-3-haiku': 'Claude 3 Haiku (Low Cost)',
      'openai/gpt-3.5-turbo': 'GPT-3.5 Turbo (Low Cost)'
    }

    setSelectedModel(newModel)
    const modelName = modelNames[newModel] || newModel.split('/')[1]?.replace('-', ' ') || newModel
    setNotification(`Switched to ${modelName}`)
  }

  const handleNewChat = () => {
    setMessages([])
    setInput('')
    setSelectedFile(null)
    setNotification('Started new chat')
  }

  const handleEditMessage = async (messageId: string, newContent: string) => {
    // Find the message and update it
    const messageIndex = messages.findIndex(msg => msg.id === messageId)
    if (messageIndex === -1) return

    // Update the message content
    const updatedMessages = [...messages]
    updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], content: newContent }

    // Remove all messages after the edited one (including AI responses)
    const messagesToKeep = updatedMessages.slice(0, messageIndex + 1)
    setMessages(messagesToKeep)

    // Resend the query with the new content
    setIsLoading(true)
    try {
      const response = await sendMessage(newContent, selectedModel, messagesToKeep.slice(0, -1))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending edited message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if ((!input.trim() && !selectedFile) || isLoading) return

    // Create user message content
    let messageContent = input.trim()
    if (selectedFile) {
      const fileInfo = selectedFile.type.startsWith('image/')
        ? `📷 ${selectedFile.name}`
        : `📄 ${selectedFile.name}`
      messageContent = messageContent ? `${fileInfo}\n${messageContent}` : fileInfo
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    const currentFile = selectedFile
    setSelectedFile(null)
    setIsLoading(true)

    try {
      let searchResults = ''

      // Perform search if enabled and query seems to need current information
      if (searchEnabled && shouldPerformSearch(input.trim())) {
        try {
          const results = await searchWithExa(input.trim(), 5)
          if (results.length > 0) {
            searchResults = formatSearchResults(results)

            // Add search results as a system message
            const searchMessage: Message = {
              id: (Date.now() + 0.5).toString(),
              role: 'assistant',
              content: `🔍 **Found relevant information:**\n\n${searchResults}\n\nLet me analyze this information for you...`,
              timestamp: new Date()
            }
            setMessages(prev => [...prev, searchMessage])
          }
        } catch (searchError) {
          console.error('Search failed:', searchError)
        }
      }

      const response = await sendMessage(
        searchResults ? `${searchResults}\n\nUser question: ${input.trim()}` : input.trim(),
        selectedModel,
        messages,
        currentFile || undefined
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or check your API key configuration.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-full xl:max-w-full mx-auto bg-white/10 backdrop-blur-lg sm:rounded-lg lg:rounded-none shadow-2xl m-0 sm:m-4 lg:m-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 sm:p-4 border-b border-white/20 min-h-[60px]">
        <div className="flex items-center space-x-1 sm:space-x-3 flex-1 min-w-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Zap className="w-5 h-5 sm:w-8 sm:h-8 text-yellow-400 flex-shrink-0" />
            <h1 className="text-lg sm:text-2xl font-bold text-white truncate">200Model8</h1>
          </div>
          <div className="hidden md:flex items-center space-x-1 text-sm text-gray-300">
            <Globe className="w-4 h-4" />
            <span>Free AI for Everyone</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={handleNewChat}
            className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 transition-colors"
            title="Start New Chat"
          >
            <MessageSquarePlus className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
          </button>
          <SearchToggle
            enabled={searchEnabled}
            onToggle={setSearchEnabled}
          />
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-2 sm:space-y-4 scrollbar-thin" style={{WebkitOverflowScrolling: 'touch'}}>
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onEdit={message.role === 'user' ? handleEditMessage : undefined}
          />
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-400">
            <Zap className="w-5 h-5 animate-pulse text-yellow-400" />
            <span>200Model8 thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-2 sm:p-4 border-t border-white/20">
        <div className="flex items-end space-x-2">
          <FileUpload
            onFileSelect={setSelectedFile}
            selectedFile={selectedFile}
            modelSupportsImages={getModelCapabilities(selectedModel).supportsImages}
          />
          <div className="flex-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || (!input.trim() && !selectedFile)}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors flex items-center justify-center min-w-[44px]"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline ml-2">Send</span>
          </button>
        </div>
      </form>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />

      {/* Notification */}
      {notification && (
        <Notification
          message={notification}
          type="success"
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}
