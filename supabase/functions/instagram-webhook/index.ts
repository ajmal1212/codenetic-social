
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  try {
    // Handle GET request for webhook verification
    if (req.method === 'GET') {
      const url = new URL(req.url)
      const mode = url.searchParams.get('hub.mode')
      const token = url.searchParams.get('hub.verify_token')
      const challenge = url.searchParams.get('hub.challenge')

      console.log('Webhook verification:', { mode, token, challenge })

      const verifyToken = Deno.env.get('META_WEBHOOK_VERIFY_TOKEN') || 'codenetic_verify_token'

      if (mode === 'subscribe' && token === verifyToken) {
        console.log('Webhook verified successfully')
        return new Response(challenge, {
          headers: { 'Content-Type': 'text/plain' },
          status: 200,
        })
      } else {
        console.log('Webhook verification failed')
        return new Response('Forbidden', { status: 403 })
      }
    }

    // Handle POST request for webhook events
    if (req.method === 'POST') {
      const body = await req.json()
      console.log('Webhook event received:', JSON.stringify(body, null, 2))

      const supabaseClient = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '', // Use service role for webhook processing
      )

      // Process webhook events
      if (body.object === 'instagram') {
        for (const entry of body.entry || []) {
          for (const change of entry.changes || []) {
            console.log('Processing change:', change)

            if (change.field === 'comments') {
              // Handle comment events
              const value = change.value
              console.log(`Comment event on media ${value.media_id}:`, value)
              
              // You can store comment data or trigger notifications here
              // Example: Update post analytics with new comment count
            }

            if (change.field === 'media') {
              // Handle media events (like post status updates)
              const value = change.value
              console.log(`Media event:`, value)
              
              // Update post status in database if needed
            }
          }
        }
      }

      if (body.object === 'page') {
        for (const entry of body.entry || []) {
          for (const change of entry.changes || []) {
            console.log('Page change:', change)
            
            if (change.field === 'feed') {
              // Handle page feed changes
              const value = change.value
              console.log(`Page feed event:`, value)
            }
          }
        }
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      )
    }

    return new Response('Method not allowed', { status: 405 })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
