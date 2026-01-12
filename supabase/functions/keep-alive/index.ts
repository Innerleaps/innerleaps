import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    // Minimale database activiteit
    const { data, error } = await supabase.from('stress_questionnaire_submissions').select('id').limit(1)
    
    const timestamp = new Date().toISOString()
    console.log(`Keep-alive ping: ${timestamp}`, { success: !error })

    return new Response(
      JSON.stringify({ status: 'alive', timestamp }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Keep-alive error:', error)
    return new Response(
      JSON.stringify({ error: 'Keep-alive failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
