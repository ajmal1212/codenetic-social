
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

    const { code, state } = await req.json()
    
    if (!code) {
      throw new Error('Authorization code is required')
    }

    const appId = Deno.env.get('META_APP_ID')
    const appSecret = Deno.env.get('META_APP_SECRET')
    const redirectUri = Deno.env.get('META_REDIRECT_URI')

    if (!appId || !appSecret || !redirectUri) {
      throw new Error('Meta app credentials not configured')
    }

    console.log('Exchanging code for access token...')

    // Exchange code for access token
    const tokenResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `client_secret=${appSecret}&code=${code}`
    )

    const tokenData = await tokenResponse.json()
    
    if (!tokenResponse.ok) {
      console.error('Token exchange error:', tokenData)
      throw new Error(tokenData.error?.message || 'Failed to exchange token')
    }

    console.log('Getting long-lived token...')

    // Exchange for long-lived token
    const longLivedTokenResponse = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `grant_type=fb_exchange_token&client_id=${appId}&` +
      `client_secret=${appSecret}&fb_exchange_token=${tokenData.access_token}`
    )

    const longLivedTokenData = await longLivedTokenResponse.json()
    
    if (!longLivedTokenResponse.ok) {
      console.error('Long-lived token error:', longLivedTokenData)
      throw new Error(longLivedTokenData.error?.message || 'Failed to get long-lived token')
    }

    const accessToken = longLivedTokenData.access_token

    console.log('Fetching Facebook pages...')

    // Get user's Facebook pages
    const pagesResponse = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${accessToken}`
    )

    const pagesData = await pagesResponse.json()
    
    if (!pagesResponse.ok) {
      console.error('Pages fetch error:', pagesData)
      throw new Error(pagesData.error?.message || 'Failed to fetch pages')
    }

    console.log('Processing pages:', pagesData.data?.length || 0)

    const connectedAccounts = []

    // Process each page to find Instagram Business accounts
    for (const page of pagesData.data || []) {
      try {
        console.log(`Checking page ${page.id} for Instagram account...`)
        
        const instagramResponse = await fetch(
          `https://graph.facebook.com/v19.0/${page.id}?fields=instagram_business_account&access_token=${page.access_token}`
        )

        const instagramData = await instagramResponse.json()
        
        if (instagramData.instagram_business_account) {
          const igUserId = instagramData.instagram_business_account.id
          
          console.log(`Found Instagram account: ${igUserId}`)
          
          // Get Instagram account details
          const igDetailsResponse = await fetch(
            `https://graph.facebook.com/v19.0/${igUserId}?fields=username,profile_picture_url&access_token=${page.access_token}`
          )

          const igDetails = await igDetailsResponse.json()
          
          if (igDetailsResponse.ok) {
            // Store in database
            const { error } = await supabaseClient
              .from('instagram_accounts')
              .upsert({
                user_id: user.id,
                ig_user_id: igUserId,
                page_id: page.id,
                access_token: page.access_token,
                username: igDetails.username || `page_${page.id}`,
                profile_pic: igDetails.profile_picture_url,
              }, {
                onConflict: 'user_id,ig_user_id'
              })

            if (error) {
              console.error('Database error:', error)
              throw error
            }

            connectedAccounts.push({
              ig_user_id: igUserId,
              username: igDetails.username,
              profile_pic: igDetails.profile_picture_url,
              page_name: page.name
            })
          }
        }
      } catch (error) {
        console.error(`Error processing page ${page.id}:`, error)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Connected ${connectedAccounts.length} Instagram account(s)`,
        accounts: connectedAccounts
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Instagram OAuth error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to connect Instagram account',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
