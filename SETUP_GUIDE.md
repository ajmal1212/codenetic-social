
# Quick Setup Guide

## 1. Initial Setup (5 minutes)

### Prerequisites
- Node.js installed
- Git repository cloned
- Supabase account created

### Steps
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:5173`
   - You should see the login page

## 2. Database Setup (Automatic)

The database tables are already created via migrations:
- ✅ User profiles
- ✅ Social accounts
- ✅ Posts and scheduling
- ✅ Analytics tracking
- ✅ Row Level Security enabled

## 3. Authentication Setup

### User Registration
1. Click "Sign Up" on the login page
2. Enter email and password
3. Check email for verification (in development, this might be disabled)
4. Login with credentials

### First Login
- You'll be redirected to the Dashboard
- All features are now accessible

## 4. Connect Your First Social Media Account

### Mock Connection (Development)
1. Go to "Accounts" page
2. Click "Connect [Platform]" for any platform
3. The system will create a mock connection for testing
4. You'll see connection details and follower counts

### Real Connection (Production)
For production use, you'll need to:
1. Set up developer accounts for each platform
2. Configure OAuth applications
3. Add API credentials to Supabase secrets
4. Update redirect URLs

## 5. Create Your First Post

1. Navigate to "Create Post"
2. Write your content
3. Select platforms to post to
4. Choose "Post Now" or schedule for later
5. Click "Publish"

## 6. View Analytics

1. Go to "Analytics" page
2. View mock data showing:
   - Engagement metrics
   - Platform performance
   - Growth trends
   - Top performing content

## Next Steps

- Read the full documentation in `DOCUMENTATION.md`
- Set up real social media API connections
- Customize the UI to match your brand
- Deploy to production

## Quick Troubleshooting

**Can't see data?** 
- Make sure you're logged in
- Check browser console for errors

**Posts not working?**
- Currently using mock data
- Real posting requires API setup

**Styling issues?**
- Clear browser cache
- Check if Tailwind CSS is loading

**Need help?**
- Check the full documentation
- Review console errors
- Ensure all dependencies are installed
