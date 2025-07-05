// Exa Search Integration for 200Model8
interface ExaSearchResult {
  title: string
  url: string
  snippet: string
  publishedDate?: string
}

interface ExaSearchResponse {
  results: ExaSearchResult[]
  autopromptString?: string
}

export async function searchWithExa(query: string, numResults: number = 5): Promise<ExaSearchResult[]> {
  try {
    // For now, we'll use a direct API approach since MCP is typically server-side
    // In a full implementation, this would connect to the MCP server
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        numResults,
        type: 'neural' // Exa's semantic search
      })
    })

    if (!response.ok) {
      throw new Error(`Search failed: ${response.status}`)
    }

    const data: ExaSearchResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error('Search error:', error)
    return []
  }
}

export function formatSearchResults(results: ExaSearchResult[]): string {
  if (results.length === 0) {
    return "No search results found."
  }

  let formatted = "🔍 **Search Results:**\n\n"
  
  results.forEach((result, index) => {
    formatted += `**${index + 1}. ${result.title}**\n`
    formatted += `${result.snippet}\n`
    formatted += `🔗 Source: ${result.url}\n`
    if (result.publishedDate) {
      formatted += `📅 Published: ${result.publishedDate}\n`
    }
    formatted += "\n"
  })

  return formatted
}

export function shouldPerformSearch(message: string): boolean {
  const searchTriggers = [
    'search for',
    'search',
    'look up',
    'find information about',
    'what is',
    'what are',
    'tell me about',
    'latest',
    'current',
    'recent',
    'today',
    'now',
    'update on',
    'free models',
    'openrouter',
    'models available',
    'working models'
  ]

  const lowerMessage = message.toLowerCase()
  const shouldSearch = searchTriggers.some(trigger => lowerMessage.includes(trigger))

  // Debug logging
  console.log('Search check:', { message: lowerMessage, shouldSearch, triggers: searchTriggers })

  return shouldSearch
}
