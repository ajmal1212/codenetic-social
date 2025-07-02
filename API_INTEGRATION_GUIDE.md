# Social Media API Integration Guide

## Overview
This guide provides step-by-step instructions for integrating real social media APIs with your application.

## Platform-Specific Integration

### 1. Facebook & Instagram Integration

#### Step 1: Create Facebook Developer Account
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "Get Started"
3. Complete account setup and phone verification

#### Step 2: Create New App
1. Click "Create App"
2. Select "Consumer" use case
3. Fill in app details:
   - App Name: "Your Social Media Manager"
   - App Contact Email: your-email@example.com

#### Step 3: Add Products
1. Add "Facebook Login"
2. Add "Instagram Basic Display" (for Instagram)
3. Configure settings:
   - Valid OAuth Redirect URIs: `https://yourdomain.com/auth/callback/facebook`
   - Deauthorize Callback URL: `https://yourdomain.com/auth/deauthorize`

#### Step 4: Get Credentials
- App ID: Found in App Dashboard
- App Secret: Found in App Settings > Basic

#### Step 5: Configure Permissions
Request these permissions:
- `email`
- `public_profile`
- `pages_show_list`
- `pages_read_engagement`
- `pages_manage_posts`
- `instagram_basic` (for Instagram)
- `instagram_content_publish` (for Instagram)

### 2. Twitter/X Integration

#### Step 1: Apply for Developer Account
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Apply for developer account
3. Wait for approval (can take 1-7 days)

#### Step 2: Create Project and App
1. Create new project
2. Create app within project
3. Save API keys securely

#### Step 3: Configure OAuth 2.0
1. Go to app settings
2. Enable OAuth 2.0
3. Add callback URL: `https://yourdomain.com/auth/callback/twitter`
4. Set app permissions to "Read and Write"

#### Step 4: Required Scopes
- `tweet.read`
- `tweet.write`
- `users.read`
- `offline.access`

### 3. LinkedIn Integration

#### Step 1: Create LinkedIn Developer Account
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Sign in with LinkedIn account
3. Accept terms of service

#### Step 2: Create New App
1. Click "Create App"
2. Fill in app information:
   - App Name
   - LinkedIn Page (create company page if needed)
   - Description
   - Logo

#### Step 3: Add Products
1. Request "Sign In with LinkedIn"
2. Request "Share on LinkedIn" (for posting)
3. Wait for approval

#### Step 4: Configure OAuth
- Authorized Redirect URLs: `https://yourdomain.com/auth/callback/linkedin`

### 4. YouTube Integration

#### Step 1: Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing
3. Enable YouTube Data API v3

#### Step 2: Create OAuth Credentials
1. Go to "Credentials" section
2. Create "OAuth 2.0 Client IDs"
3. Configure:
   - Authorized JavaScript origins: `https://yourdomain.com`
   - Authorized redirect URIs: `https://yourdomain.com/auth/callback/youtube`

#### Step 3: Configure Consent Screen
1. Set up OAuth consent screen
2. Add your domain to authorized domains
3. Add required scopes:
   - `youtube.readonly`
   - `youtube.upload`
   - `youtube.force-ssl`

### 5. TikTok Integration

#### Step 1: TikTok Developer Account
1. Go to [TikTok Developers](https://developers.tiktok.com/)
2. Register as developer
3. Complete verification process

#### Step 2: Create App
1. Create new application
2. Fill in app details
3. Select required permissions:
   - `user.info.basic`
   - `video.publish`
   - `video.list`

#### Step 3: Configure OAuth
- Redirect URI: `https://yourdomain.com/auth/callback/tiktok`

### 6. Pinterest Integration

#### Step 1: Pinterest Developer Account
1. Go to [Pinterest Developers](https://developers.pinterest.com/)
2. Create developer account
3. Accept terms of service

#### Step 2: Create App
1. Create new app
2. Fill in app information
3. Select required scopes:
   - `read_public`
   - `write_public`
   - `read_relationships`

#### Step 3: Configure Settings
- Redirect URI: `https://yourdomain.com/auth/callback/pinterest`

## Implementation in Code

### Update Environment Variables
Add these to your Supabase project secrets:

```env
# Facebook/Instagram
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Twitter
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret

# LinkedIn
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret

# YouTube (Google)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# TikTok
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret

# Pinterest
PINTEREST_APP_ID=your_pinterest_app_id
PINTEREST_APP_SECRET=your_pinterest_app_secret
```

### OAuth Flow Implementation

The current mock implementation in `socialMediaAPI.ts` needs to be replaced with real OAuth flows. Here's the structure for each platform:

```typescript
// Example OAuth flow structure
static async connectAccount(platform: string) {
  switch (platform) {
    case 'facebook':
      return this.connectFacebook();
    case 'twitter':
      return this.connectTwitter();
    case 'linkedin':
      return this.connectLinkedIn();
    // ... other platforms
  }
}

static async connectFacebook() {
  // 1. Redirect to Facebook OAuth
  // 2. Handle callback
  // 3. Exchange code for access token
  // 4. Store token in database
  // 5. Fetch user info
}
```

## Testing Your Integration

### 1. Development Testing
- Use platform sandbox/test environments when available
- Test OAuth flow end-to-end
- Verify token refresh mechanisms
- Test posting functionality

### 2. Production Checklist
- [ ] All API keys configured
- [ ] OAuth redirect URLs updated
- [ ] App review completed (where required)
- [ ] Rate limiting implemented
- [ ] Error handling in place
- [ ] Token refresh automated
- [ ] Webhook endpoints secured

## Common Issues and Solutions

### OAuth Redirect Mismatch
**Error**: "redirect_uri_mismatch"
**Solution**: Ensure redirect URLs in platform settings exactly match your implementation

### Invalid Client Credentials
**Error**: "invalid_client"
**Solution**: Double-check API keys and secrets in environment variables

### Insufficient Permissions
**Error**: "insufficient_scope"
**Solution**: Request additional permissions in platform developer console

### Rate Limiting
**Error**: "rate_limit_exceeded"
**Solution**: Implement exponential backoff and respect rate limits

## Rate Limits by Platform

| Platform | Requests/Hour | Requests/Day | Notes |
|----------|---------------|--------------|-------|
| Facebook | 200 | 10,000 | Per app |
| Instagram | 200 | 10,000 | Per app |
| Twitter | 300 | 72,000 | Per user token |
| LinkedIn | 500 | 12,000 | Per member |
| YouTube | 10,000 | 1,000,000 | Quota units |
| TikTok | 1,000 | 10,000 | Per app |
| Pinterest | 1,000 | 10,000 | Per app |

## Security Best Practices

1. **Store tokens securely**: Use Supabase vault for sensitive data
2. **Implement token refresh**: Automate token renewal before expiration
3. **Use HTTPS**: All OAuth flows must use HTTPS in production
4. **Validate webhooks**: Verify webhook signatures when available
5. **Monitor API usage**: Track usage to avoid rate limits
6. **Regular security audits**: Review permissions and access regularly

## Production Deployment

### 1. Domain Configuration
Update all platform OAuth settings with production domain

### 2. SSL Certificate
Ensure valid SSL certificate is installed

### 3. Environment Variables
Update all production environment variables

### 4. Monitoring
Set up monitoring for:
- API response times
- Error rates
- Token expiration alerts
- Rate limit warnings

This completes the API integration setup. Each platform has specific requirements, so refer to their official documentation for the most up-to-date information.
