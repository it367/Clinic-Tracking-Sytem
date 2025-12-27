import { NextResponse } from 'next/server';

export async function POST(request) {
  const { messages, dataSummary } = await request.json();
  
  // Check if API key exists
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ 
      content: [{ text: '⚠️ AI not configured. Please add ANTHROPIC_API_KEY to environment variables.' }] 
    });
  }
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: `You are a helpful AI assistant for a healthcare clinic management system. You help staff with:
- Daily reconciliation summaries and analysis
- Billing inquiry tracking
- Bills payment status
- Order request management  
- Refund request processing
- IT request ticket management

Be concise, friendly, and format currency with $ signs. Use bullet points for lists.
Today's date: ${new Date().toLocaleDateString()}

CURRENT SYSTEM DATA:
${dataSummary}

When asked about data, provide helpful insights based on the summary above. If you don't have specific data, let the user know what information would be helpful.`,
        messages: messages
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Anthropic API error:', error);
      return NextResponse.json({ 
        content: [{ text: '❌ AI service error. Please try again.' }] 
      });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ 
      content: [{ text: '❌ Connection error. Please check your internet and try again.' }] 
    });
  }
}
