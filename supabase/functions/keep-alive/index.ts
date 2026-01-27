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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const timestamp = new Date().toISOString()

    // INSERT activity to keep database active
    const { error: insertError } = await supabase
      .from('keep_alive_logs')
      .insert({ status: 'alive' })

    // DELETE old logs (older than 30 days) to prevent table bloat
    const { error: deleteError } = await supabase
      .from('keep_alive_logs')
      .delete()
      .lt('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    console.log(`Keep-alive ping: ${timestamp}`, { 
      insertSuccess: !insertError, 
      cleanupSuccess: !deleteError 
    })

    return new Response(
      JSON.stringify({ status: 'alive', timestamp, inserted: !insertError }),
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
