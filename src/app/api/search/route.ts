import { NextRequest, NextResponse } from 'next/server'

const EXA_API_KEY = '630549ea-6969-49d3-b8ce-24abdba021f0'
const EXA_API_URL = 'https://api.exa.ai/search'

export async function POST(request: NextRequest) {
  try {
    const { query, numResults = 5, type = 'neural' } = await request.json()

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      )
    }

    // Call Exa API
    const response = await fetch(EXA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': EXA_API_KEY
      },
      body: JSON.stringify({
        query,
        numResults,
        type,
        useAutoprompt: true,
        contents: {
          text: true,
          highlights: true,
          summary: true
        }
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { error: errorData.message || `Exa API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    
    // Format results for our interface
    const formattedResults = data.results?.map((result: any) => ({
      title: result.title || 'Untitled',
      url: result.url || '',
      snippet: result.text || result.summary || 'No description available',
      publishedDate: result.publishedDate || null
    })) || []

    return NextResponse.json({
      results: formattedResults,
      autopromptString: data.autopromptString
    })

  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
