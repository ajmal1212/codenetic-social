# Social Media Management App - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Database Setup](#database-setup)
4. [Connecting Social Media Accounts](#connecting-social-media-accounts)
5. [Features Guide](#features-guide)
6. [API Integration](#api-integration)
7. [Troubleshooting](#troubleshooting)
8. [Development](#development)

## Overview

This is a comprehensive social media management application that allows users to:
- Connect multiple social media accounts (Facebook, Instagram, Twitter, LinkedIn, YouTube, TikTok, Pinterest)
- Create and schedule posts across multiple platforms
- Track analytics and engagement metrics
- Manage content calendar
- Monitor account performance

### Key Features
- **Multi-platform posting**: Create once, post everywhere
- **Analytics dashboard**: Track performance metrics
- **Content scheduling**: Plan your content in advance
- **Account management**: Centralized social media account control
- **Real-time notifications**: Stay updated on engagement

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Supabase account
- Social media developer accounts (for API access)

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## Database Setup

The app uses Supabase as the backend database. The following tables are automatically created:

### Database Schema

#### 1. Profiles Table
Stores user profile information:
```sql
profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### 2. Social Accounts Table
Manages connected social media accounts:
```sql
social_accounts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  platform TEXT, -- 'facebook', 'instagram', 'twitter', etc.
  account_id TEXT,
  username TEXT,
  display_name TEXT,
  access_token TEXT,
  refresh_token TEXT,
  is_connected BOOLEAN,
  followers_count INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### 3. Posts Table
Stores created and scheduled posts:
```sql
posts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  content TEXT,
  media_urls TEXT[],
  platforms TEXT[],
  scheduled_time TIMESTAMP,
  status TEXT, -- 'draft', 'scheduled', 'posted', 'failed'
  post_results JSONB,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### 4. Post Analytics Table
Tracks post performance metrics:
```sql
post_analytics (
  id UUID PRIMARY KEY,
  post_id UUID REFERENCES posts,
  platform TEXT,
  likes_count INTEGER,
  comments_count INTEGER,
  shares_count INTEGER,
  views_count INTEGER,
  engagement_rate DECIMAL,
  fetched_at TIMESTAMP
)
```

### Row Level Security (RLS)
All tables have RLS enabled to ensure users can only access their own data:
- Users can only view/modify their own profiles
- Users can only manage their own social accounts
- Users can only see their own posts and analytics

## Connecting Social Media Accounts

### Currently Supported Platforms
- **Facebook** - Pages and personal profiles
- **Instagram** - Business and creator accounts
- **Twitter/X** - Personal and business accounts
- **LinkedIn** - Personal profiles and company pages
- **YouTube** - Channels
- **TikTok** - Personal and business accounts
- **Pinterest** - Personal and business accounts

### Connection Process

1. **Navigate to Accounts Page**
   - Click on "Accounts" in the sidebar
   - You'll see all available platforms

2. **Connect a Platform**
   - Click "Connect [Platform]" button
   - You'll be redirected to the platform's OAuth flow
   - Grant necessary permissions
   - You'll be redirected back to the app

3. **Verify Connection**
   - Connected accounts will show a green "Connected" badge
   - Account details (username, followers) will be displayed
   - You can disconnect accounts anytime

### Required Permissions by Platform

#### Facebook
- `pages_show_list` - Access to your pages
- `pages_read_engagement` - Read page insights
- `pages_manage_posts` - Create and manage posts
- `publish_to_groups` - Post to groups (if applicable)

#### Instagram
- `instagram_basic` - Basic profile access
- `instagram_content_publish` - Publish content
- `instagram_manage_insights` - Access analytics

#### Twitter/X
- `tweet.read` - Read tweets
- `tweet.write` - Create tweets
- `users.read` - Read user information
- `offline.access` - Maintain connection

#### LinkedIn
- `r_liteprofile` - Basic profile info
- `w_member_social` - Share content
- `r_organization_social` - Company page access (if applicable)

#### YouTube
- `youtube.readonly` - Read channel info
- `youtube.upload` - Upload videos
- `youtube.force-ssl` - Manage channel

#### TikTok
- `user.info.basic` - Basic user info
- `video.publish` - Publish videos
- `video.list` - Access video list

#### Pinterest
- `read_public` - Read public data
- `write_public` - Create pins and boards
- `read_relationships` - Access follower data

## Features Guide

### 1. Dashboard
**Location**: Home page after login

**Features**:
- Overview of all connected accounts
- Recent post performance
- Quick stats (total followers, engagement rate)
- Recent activity feed
- Top performing posts

**Usage**:
- View your social media performance at a glance
- Quick access to create new posts
- Monitor recent account activity

### 2. Post Composer
**Location**: "Create Post" in sidebar

**Features**:
- Rich text editor for post content
- Media upload (images, videos)
- Platform selection (choose which accounts to post to)
- Post scheduling
- Preview for each platform
- Character count per platform

**Usage**:
1. Write your post content
2. Upload media files (optional)
3. Select target platforms
4. Choose to post now or schedule for later
5. Review preview for each platform
6. Click "Publish" or "Schedule"

### 3. Content Calendar
**Location**: "Calendar" in sidebar

**Features**:
- Visual calendar view of scheduled posts
- Drag-and-drop rescheduling
- Filter by platform
- Post status indicators
- Quick edit functionality

**Usage**:
- Plan your content strategy
- Visualize posting schedule
- Reschedule posts by dragging
- Edit scheduled posts

### 4. Analytics
**Location**: "Analytics" in sidebar

**Features**:
- Performance metrics by platform
- Engagement trends over time
- Best posting times analysis
- Follower growth tracking
- Post performance comparison
- Export analytics data

**Key Metrics**:
- **Engagement Rate**: (Likes + Comments + Shares) / Followers * 100
- **Reach**: Number of unique users who saw your content
- **Impressions**: Total number of times content was displayed
- **Click-through Rate**: Clicks / Impressions * 100

### 5. Account Management
**Location**: "Accounts" in sidebar

**Features**:
- View all connected accounts
- Connection status monitoring
- Account statistics
- Disconnect/reconnect accounts
- Account health indicators

## API Integration

### Setting Up Social Media APIs

#### Facebook/Instagram API Setup
1. Create a Facebook Developer Account
2. Create a new app in Facebook Developer Console
3. Add Facebook Login and Instagram Basic Display products
4. Configure OAuth redirect URLs
5. Get App ID and App Secret
6. Submit for app review (for production)

**Required URLs to configure**:
- Valid OAuth Redirect URIs: `https://your-app.com/auth/callback/facebook`
- Deauthorize Callback URL: `https://your-app.com/auth/deauthorize`

#### Twitter API Setup
1. Apply for Twitter Developer Account
2. Create a new project and app
3. Generate API keys and tokens
4. Configure OAuth 2.0 settings
5. Set up webhook URLs (optional)

**Required Configuration**:
- OAuth 2.0 Redirect URL: `https://your-app.com/auth/callback/twitter`
- Callback URLs: Include your domain

#### LinkedIn API Setup
1. Create LinkedIn Developer Account
2. Create a new LinkedIn app
3. Add Sign In with LinkedIn product
4. Configure authorized redirect URLs
5. Request additional permissions if needed

**Required URLs**:
- Authorized Redirect URLs: `https://your-app.com/auth/callback/linkedin`

#### YouTube API Setup
1. Create Google Cloud Project
2. Enable YouTube Data API v3
3. Create OAuth 2.0 credentials
4. Configure authorized origins and redirect URIs
5. Set up consent screen

**Required Configuration**:
- Authorized JavaScript origins: `https://your-app.com`
- Authorized redirect URIs: `https://your-app.com/auth/callback/youtube`

### Environment Variables
Set up the following environment variables in your Supabase project:

```
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
YOUTUBE_CLIENT_ID=your_google_client_id
YOUTUBE_CLIENT_SECRET=your_google_client_secret
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
PINTEREST_APP_ID=your_pinterest_app_id
PINTEREST_APP_SECRET=your_pinterest_app_secret
```

## Troubleshooting

### Common Issues

#### 1. Authentication Errors
**Problem**: "Invalid credentials" or "Authentication failed"
**Solutions**:
- Check if API keys are correctly set
- Verify redirect URLs match exactly
- Ensure app is approved for production use
- Check if tokens have expired

#### 2. Permission Denied
**Problem**: Cannot post to social media accounts
**Solutions**:
- Re-authenticate with required permissions
- Check if account has posting permissions
- Verify platform-specific requirements
- Review app permissions in platform settings

#### 3. Post Publishing Failures
**Problem**: Posts fail to publish to certain platforms
**Solutions**:
- Check character limits for each platform
- Verify media format compatibility
- Ensure account is properly connected
- Check platform-specific posting rules

#### 4. Analytics Not Loading
**Problem**: No analytics data displayed
**Solutions**:
- Wait 24-48 hours for initial data
- Check if analytics permissions are granted
- Verify account has sufficient followers (some platforms require minimum)
- Re-connect account if needed

### Platform-Specific Limits

#### Character Limits
- **Twitter**: 280 characters
- **Facebook**: 63,206 characters (recommended: 40-80)
- **Instagram**: 2,200 characters (recommended: 125)
- **LinkedIn**: 3,000 characters (recommended: 150-300)
- **Pinterest**: 500 characters for pin descriptions
- **TikTok**: 300 characters for video descriptions

#### Media Requirements
- **Images**: JPG, PNG, GIF
- **Videos**: MP4, MOV, AVI (size limits vary by platform)
- **Maximum file sizes**: Vary by platform (typically 5-100MB)

## Development

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Routing**: React Router
- **State Management**: React Query
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── AuthForm.tsx    # Authentication forms
│   ├── PostComposer.tsx # Post creation component
│   └── ...
├── pages/              # Page components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Accounts.tsx    # Account management
│   ├── Analytics.tsx   # Analytics page
│   └── ...
├── services/           # API services
│   └── socialMediaAPI.ts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── integrations/       # Third-party integrations
    └── supabase/       # Supabase client and types
```

### Adding New Social Media Platforms

1. **Update Platform Constants**
   ```typescript
   // Add to PLATFORMS array in src/pages/Accounts.tsx
   const PLATFORMS = [
     // ... existing platforms
     "new-platform"
   ];
   ```

2. **Add Platform Icon**
   ```typescript
   // Update PlatformIcon component
   case "new-platform":
     return <NewPlatformIcon size={size} />;
   ```

3. **Implement OAuth Flow**
   ```typescript
   // Add to SocialMediaAPI class
   static async connectNewPlatform() {
     // Implementation
   }
   ```

4. **Update Database**
   ```sql
   -- Add platform to CHECK constraint
   ALTER TABLE social_accounts 
   DROP CONSTRAINT social_accounts_platform_check;
   
   ALTER TABLE social_accounts 
   ADD CONSTRAINT social_accounts_platform_check 
   CHECK (platform IN ('facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'pinterest', 'new-platform'));
   ```

### Custom Styling
The app uses Tailwind CSS with custom color scheme:
- Primary: Blue gradient
- Secondary: Purple gradient
- Success: Green
- Warning: Yellow
- Error: Red

### Testing
Run tests with:
```bash
npm run test
```

### Building for Production
```bash
npm run build
```

### Deployment
The app can be deployed to:
- Vercel (recommended)
- Netlify
- Custom hosting with Node.js

## Support

### Getting Help
- Check this documentation first
- Search existing issues on GitHub
- Create a new issue with detailed description
- Join our Discord community (if available)

### Reporting Bugs
When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Screenshots (if applicable)
5. Browser and OS information
6. Console error messages

### Feature Requests
Feature requests are welcome! Please include:
1. Detailed description of the feature
2. Use case/business justification
3. Mockups or examples (if applicable)
4. Priority level

---

**Last Updated**: December 2024
**Version**: 1.0.0
