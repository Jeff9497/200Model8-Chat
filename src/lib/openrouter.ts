interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export async function sendMessage(
  message: string,
  model: string,
  previousMessages: any[] = [],
  file?: File
): Promise<string> {
  try {
    // Get API key from environment or localStorage
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || 
                   (typeof window !== 'undefined' ? localStorage.getItem('openrouter_api_key') : null)

    if (!apiKey) {
      throw new Error('OpenRouter API key not found. Please add your API key in the settings.')
    }

    // Process file if provided
    let fileContent = ''
    if (file) {
      if (file.type.startsWith('image/')) {
        // For images, we'll convert to base64
        const base64 = await fileToBase64(file)
        fileContent = `[Image uploaded: ${file.name}]\n`
        // Note: OpenRouter API format for images varies by model
        // This is a simplified implementation
      } else if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        // For text files, read the content
        fileContent = await file.text()
        fileContent = `[File content from ${file.name}]:\n${fileContent}\n\n`
      }
    }

    // Format messages for OpenRouter API
    const messages: Message[] = [
      {
        role: 'system',
        content: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses. When files are uploaded, analyze them carefully and provide relevant insights.'
      },
      // Include last 10 messages for context
      ...previousMessages.slice(-10).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: fileContent + message
      }
    ]

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'https://200model8.vercel.app',
        'X-Title': '200Model8 - Free AI Chat'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from OpenRouter API')
    }

    return data.choices[0].message.content
  } catch (error) {
    console.error('OpenRouter API error:', error)
    throw error
  }
}

export function setApiKey(apiKey: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('openrouter_api_key', apiKey)
  }
}

export function getApiKey(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('openrouter_api_key')
  }
  return null
}

export function removeApiKey() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('openrouter_api_key')
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // Remove the data:image/jpeg;base64, prefix
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}
