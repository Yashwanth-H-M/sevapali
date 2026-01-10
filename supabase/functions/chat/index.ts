import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = language === 'mr' 
      ? `तुम्ही महाराष्ट्र शासनाचे AI सहाय्यक आहात. तुम्ही नागरिकांना सरकारी सेवा, योजना, कार्यालये, आवश्यक कागदपत्रे आणि प्रक्रियांबद्दल माहिती देता. तुमची उत्तरे मराठीत द्या आणि मदतनीस, स्पष्ट आणि संक्षिप्त असा. 

मुख्य सेवा:
- RTO सेवा: वाहन नोंदणी, परवाना नूतनीकरण, वाहन हस्तांतरण
- महसूल विभाग: 7/12 उतारा, सातबारा, मालमत्ता नोंदणी
- आरोग्य सेवा: महात्मा फुले जन आरोग्य योजना, OPD सेवा
- सामाजिक कल्याण: लेक लाडकी योजना, शेतकरी सन्मान निधी

उत्तरे देताना:
1. प्रथम प्रश्न समजून घ्या
2. योग्य माहिती द्या
3. आवश्यक कागदपत्रांची यादी द्या
4. जवळचे कार्यालय सुचवा`
      : `You are an AI assistant for Maharashtra Government services. You help citizens with information about government services, schemes, offices, required documents, and procedures. Provide helpful, clear, and concise answers.

Key services:
- RTO Services: Vehicle registration, license renewal, vehicle transfer
- Revenue Department: 7/12 extract, land records, property registration
- Health Services: Mahatma Phule Jan Arogya Yojana, OPD services
- Social Welfare: Lek Ladki Yojana, Farmer Samman Nidhi

When answering:
1. First understand the query
2. Provide relevant information
3. List required documents if applicable
4. Suggest nearest office if relevant`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds to your workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
