import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scheme, userDetails, language } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `You are an eligibility checker for Maharashtra Government schemes. Based on the user's details, determine if they are eligible for the scheme.

Scheme Details:
- Name: ${scheme.name}
- Category: ${scheme.category}
- Eligibility Criteria: ${scheme.eligibility}
- Benefits: ${scheme.benefits}

User Details:
- Age: ${userDetails.age || 'Not provided'}
- Gender: ${userDetails.gender || 'Not provided'}
- Annual Income: ₹${userDetails.annualIncome || 'Not provided'}
- Occupation: ${userDetails.occupation || 'Not provided'}
- Category: ${userDetails.category || 'Not provided'}
- District: ${userDetails.district || 'Not provided'}

Analyze the eligibility based on the scheme criteria and user details. Be helpful and provide specific reasons.

Respond in JSON format:
{
  "eligible": true/false,
  "reason": "Detailed explanation in ${language === 'mr' ? 'Marathi' : 'English'} about why they are or are not eligible, and what documents they might need if eligible, or what criteria they don't meet if not eligible."
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful government scheme eligibility assistant. Always respond in valid JSON format.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid response format');
    }
    
    const result = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        eligible: false, 
        reason: 'Unable to check eligibility at this time. Please try again later.' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
