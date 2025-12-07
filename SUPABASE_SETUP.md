# Supabase Setup Guide for Voice of Sharavathi

This guide covers setting up Supabase for both local development and Vercel deployment.

## Table of Contents
1. [Create Supabase Account](#create-supabase-account)
2. [Create Database Tables](#create-database-tables)
3. [Configure Local Environment](#configure-local-environment)
4. [Configure Vercel Deployment](#configure-vercel-deployment)
5. [Testing Your Setup](#testing-your-setup)
6. [Troubleshooting](#troubleshooting)

---

## Create Supabase Account

### Step 1: Sign Up
1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with email or GitHub

### Step 2: Create Organization
1. Choose an organization name (e.g., "Voice of Sharavathi")
2. Accept terms and create organization

### Step 3: Create Project
1. Click "New Project"
2. **Project Name**: `voice-of-sharavathi` (or your preference)
3. **Database Password**: Create a strong password (save it - you'll need it)
4. **Region**: Choose closest to your target audience or `us-east-1` for default
5. Click "Create new project"

**Wait**: This takes 2-5 minutes. Coffee time! ☕

---

## Create Database Tables

### Step 1: Access SQL Editor
1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New Query"**

### Step 2: Create Contents Table
Copy and paste this SQL query:

```sql
CREATE TABLE contents (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  contentType TEXT NOT NULL CHECK (contentType IN ('image', 'video', 'post')),
  image TEXT,
  externalUrl TEXT,
  platform TEXT CHECK (platform IN ('youtube', 'facebook', 'instagram', 'twitter', 'tiktok')),
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

3. Click **"Run"** button
4. You should see "Success" message

### Step 3: Enable Real-time (Optional)
1. Go to **Table Editor** (left sidebar)
2. Click on `contents` table
3. Click **"Enable Realtime"** button
4. Toggle **"Insert"**, **"Update"**, **"Delete"**
5. Click **"Save"**

---

## Configure Local Environment

### Step 1: Get Your API Keys
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (under "Project API keys")
   - **Service Role Key** (under "Project API keys")

### Step 2: Create `.env.local`
In your project root (`c:\Users\nikhi\cms-website`), create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

**Example:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Restart Development Server
```bash
# If running, stop with Ctrl+C
npm run dev
```

You should see server starts without the "Supabase credentials not found" warning.

---

## Configure Vercel Deployment

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Add Supabase integration"
git push origin master
```

### Step 2: Connect to Vercel
1. Go to [https://vercel.com](https://vercel.com)
2. Sign in (or create account)
3. Click **"New Project"**
4. Click **"Import Git Repository"**
5. Search for your repository
6. Click **"Import"**

### Step 3: Add Environment Variables
1. In Vercel project settings, go to **Settings** → **Environment Variables**
2. Add these variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key |

3. Click **"Save"**
4. You may need to redeploy

### Step 4: Redeploy
1. Go to **Deployments**
2. Click the three dots on latest deployment
3. Click **"Redeploy"**

---

## Testing Your Setup

### Local Testing
1. Open `http://localhost:3000`
2. Go to **"Add Content"**
3. Create a test post:
   - Type: Image
   - Title: "Test Image"
   - Description: "Testing Supabase"
   - Upload an image
   - Click "Add Content"

4. Go to **"View Content"**
   - Your post should appear

### Vercel Testing
1. Open your Vercel deployment URL
2. Repeat the local testing steps above
3. Data should sync to Supabase immediately

---

## Troubleshooting

### Error: "TypeError: supabase is null"
**Cause**: Environment variables not set
**Solution**: 
- Check `.env.local` exists and has both variables
- Restart dev server: `npm run dev`
- Variables must start with `NEXT_PUBLIC_` to be accessible in browser

### Error: "POST 400 - column 'id' does not exist"
**Cause**: Database table not created
**Solution**: 
- Go to Supabase SQL Editor
- Re-run the CREATE TABLE query above
- Verify table appears in Table Editor

### Data not showing in view
**Cause**: Wrong project URL
**Solution**:
- Double-check `NEXT_PUBLIC_SUPABASE_URL` matches your Supabase project
- Copy directly from Supabase Settings → API

### File storage fallback activating
**Cause**: Missing or invalid Supabase key
**Solution**:
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (long JWT string)
- Check no extra spaces in `.env.local`

---

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to git (it's in `.gitignore`)
- Service Role Key is sensitive - keep it secret
- In production, use Read-only keys where possible
- Consider Row Level Security (RLS) policies for multi-user apps

---

## Next Steps

1. ✅ Create Supabase account & project
2. ✅ Create database table
3. ✅ Set up local `.env.local`
4. ✅ Test locally
5. ✅ Deploy to Vercel
6. ✅ Add environment variables to Vercel
7. ✅ Test on live URL

**Your CMS is now powered by Supabase!** 🚀

For more help: [Supabase Docs](https://supabase.com/docs)
