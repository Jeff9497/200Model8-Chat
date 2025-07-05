import { useState } from 'react'
import { ChevronDown, Zap, Brain, Sparkles } from 'lucide-react'

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (model: string) => void
}

export function getModelCapabilities(modelId: string) {
  const model = models.find(m => m.id === modelId)
  return {
    supportsImages: model?.supportsImages || false
  }
}

const models = [
  {
    id: 'meta-llama/llama-3.1-8b-instruct:free',
    name: 'Llama 3.1 8B (Free)',
    provider: 'Meta',
    icon: <Zap className="w-4 h-4" />,
    description: 'Free open source model, great for most tasks',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'meta-llama/llama-3-8b-instruct:free',
    name: 'Llama 3 8B (Free)',
    provider: 'Meta',
    icon: <Zap className="w-4 h-4" />,
    description: 'Free open source model, fast and capable',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'microsoft/phi-3-mini-128k-instruct:free',
    name: 'Phi-3 Mini (Free)',
    provider: 'Microsoft',
    icon: <Brain className="w-4 h-4" />,
    description: 'Free small but capable model',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'google/gemma-7b-it:free',
    name: 'Gemma 7B (Free)',
    provider: 'Google',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Free Google model, good performance',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'mistralai/mistral-7b-instruct:free',
    name: 'Mistral 7B (Free)',
    provider: 'Mistral AI',
    icon: <Zap className="w-4 h-4" />,
    description: 'Free European AI model',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'huggingface/zephyr-7b-beta:free',
    name: 'Zephyr 7B (Free)',
    provider: 'Hugging Face',
    icon: <Brain className="w-4 h-4" />,
    description: 'Free fine-tuned model, good for chat',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'openchat/openchat-7b:free',
    name: 'OpenChat 7B (Free)',
    provider: 'OpenChat',
    icon: <Zap className="w-4 h-4" />,
    description: 'Free conversational AI model',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'gryphe/mythomist-7b:free',
    name: 'Mythomist 7B (Free)',
    provider: 'Gryphe',
    icon: <Sparkles className="w-4 h-4" />,
    description: 'Free creative writing model',
    supportsImages: false,
    isFree: true
  },
  {
    id: 'anthropic/claude-3-haiku',
    name: 'Claude 3 Haiku (Low Cost)',
    provider: 'Anthropic',
    icon: <Brain className="w-4 h-4" />,
    description: 'Very affordable with image support',
    supportsImages: true,
    isFree: false
  },
  {
    id: 'openai/gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo (Low Cost)',
    provider: 'OpenAI',
    icon: <Zap className="w-4 h-4" />,
    description: 'Affordable and efficient',
    supportsImages: false,
    isFree: false
  }
]

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedModelData = models.find(m => m.id === selectedModel) || models[1]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
      >
        {selectedModelData.icon}
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">{selectedModelData.name}</span>
        <span className="text-xs font-medium sm:hidden">{selectedModelData.name.split(' ')[0]}</span>
        <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 sm:w-80 bg-gray-900/95 backdrop-blur-lg rounded-lg shadow-xl border border-white/20 z-50">
          <div className="p-2 max-h-96 overflow-y-auto scrollbar-thin">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id)
                  setIsOpen(false)
                }}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedModel === model.id
                    ? 'bg-blue-600/50 text-white'
                    : 'hover:bg-white/10 text-gray-200'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {model.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{model.name}</span>
                      <span className="text-xs text-gray-400">{model.provider}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{model.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
