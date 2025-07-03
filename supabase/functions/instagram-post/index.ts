
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { ig_user_id, media_url, caption, media_type = 'IMAGE' } = await req.json()
    
    if (!ig_user_id || !media_url) {
      throw new Error('Instagram user ID and media URL are required')
    }

    console.log(`Posting to Instagram account: ${ig_user_id}`)

    // Get Instagram account details
    const { data: instagramAccount, error: fetchError } = await supabaseClient
      .from('instagram_accounts')
      .select('*')
      .eq('user_id', user.id)
      .eq('ig_user_id', ig_user_id)
      .single()

    if (fetchError || !instagramAccount) {
      throw new Error('Instagram account not found or not authorized')
    }

    console.log('Creating media container...')

    // Create media container
    const mediaParams = new URLSearchParams({
      access_token: instagramAccount.access_token,
      caption: caption || '',
    })

    if (media_type === 'IMAGE') {
      mediaParams.append('image_url', media_url)
    } else if (media_type === 'VIDEO') {
      mediaParams.append('video_url', media_url)
      mediaParams.append('media_type', 'REELS')
    }

    const createMediaResponse = await fetch(
      `https://graph.facebook.com/v19.0/${ig_user_id}/media`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: mediaParams.toString()
      }
    )

    const createMediaData = await createMediaResponse.json()
    
    if (!createMediaResponse.ok) {
      console.error('Create media error:', createMediaData)
      throw new Error(createMediaData.error?.message || 'Failed to create media container')
    }

    const creationId = createMediaData.id
    console.log(`Media container created: ${creationId}`)

    // Wait a moment for media processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Publishing media...')

    // Publish media
    const publishResponse = await fetch(
      `https://graph.facebook.com/v19.0/${ig_user_id}/media_publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          creation_id: creationId,
          access_token: instagramAccount.access_token,
        }).toString()
      }
    )

    const publishData = await publishResponse.json()
    
    if (!publishResponse.ok) {
      console.error('Publish error:', publishData)
      throw new Error(publishData.error?.message || 'Failed to publish media')
    }

    const mediaId = publishData.id
    console.log(`Media published successfully: ${mediaId}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Post published successfully to Instagram',
        media_id: mediaId,
        creation_id: creationId
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Instagram post error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to post to Instagram',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
