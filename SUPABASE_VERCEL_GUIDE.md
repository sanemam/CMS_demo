# Supabase + Vercel Deployment Guide

Complete step-by-step guide to deploy "Voice of Sharavathi" CMS to Vercel with Supabase backend.

## Prerequisites
- [ ] Supabase account & project created
- [ ] GitHub repository with your code
- [ ] Vercel account (free tier works)
- [ ] `.env.local` file with Supabase credentials (for local testing)

---

## Part 1: Supabase Setup (If Not Done Yet)

### 1.1 Create Supabase Project
1. Visit [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up or log in
4. Create new organization
5. Create new project with:
   - Name: `voice-of-sharavathi`
   - Region: Choose closest to audience
   - Password: Save securely

### 1.2 Create Database Table
1. Go to **SQL Editor**
2. Click **"New Query"**
3. Paste and run:

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

4. Click **"Run"**

### 1.3 Get Your API Keys
1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (NEXT_PUBLIC_SUPABASE_URL)
   - **Service Role Key** (SUPABASE_SERVICE_ROLE_KEY)

---

## Part 2: Local Testing

### 2.1 Create `.env.local`
Create file at `c:\Users\nikhi\cms-website\.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.2 Test Locally
```bash
cd c:\Users\nikhi\cms-website
npm run dev
```

Then:
1. Open `http://localhost:3000`
2. Click **"Add Content"**
3. Create test post
4. Click **"View Content"**
5. Verify data appears

---

## Part 3: GitHub Setup

### 3.1 Initialize Git (If Not Done)
```bash
cd c:\Users\nikhi\cms-website
git init
git add .
git commit -m "Initial commit: Voice of Sharavathi CMS with Supabase"
```

### 3.2 Push to GitHub
1. Create repository on [https://github.com](https://github.com)
2. Name it `cms-website` or similar
3. Run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/cms-website.git
git branch -M main
git push -u origin main
```

---

## Part 4: Vercel Deployment

### 4.1 Connect Vercel to GitHub
1. Go to [https://vercel.com](https://vercel.com)
2. Sign in or create account
3. Click **"New Project"**
4. Click **"Import Git Repository"**
5. Search for your `cms-website` repository
6. Click **"Import"**

### 4.2 Configure Environment Variables
1. In Vercel, go to **Settings** → **Environment Variables**
2. Add variables:

| Name | Value | Scope |
|------|-------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase URL | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Service Role Key | Production, Preview, Development |

3. Click **"Save"**

### 4.3 Deploy
1. Vercel will automatically deploy when you:
   - Push to `main` branch
   - Or click **"Deployments"** → **"Redeploy"**

2. Wait for deployment to complete
3. Click on your deployment URL to view live site

---

## Part 5: Verify Live Deployment

### 5.1 Test Content Creation
1. Open your Vercel URL (e.g., `https://cms-website.vercel.app`)
2. Click **"Add Content"**
3. Create test post
4. Click **"View Content"**
5. Verify data appears and persists

### 5.2 Test Data Sync
1. Add content on live URL
2. Refresh or visit "View Content" page
3. Data should load correctly

### 5.3 Check Supabase
1. Go to Supabase Dashboard
2. **Table Editor** → **contents**
3. Your test post should appear here

---

## Architecture Overview

```
┌─────────────────┐
│  Your Browser   │
│  (Client Side)  │
└────────┬────────┘
         │
         │ HTTP Requests
         │
┌────────▼────────┐
│   Vercel        │
│  Next.js API    │
│  (Server Side)  │
└────────┬────────┘
         │
         │ REST API / JavaScript SDK
         │
┌────────▼────────────────┐
│    Supabase Database    │
│  (PostgreSQL + Auth)    │
│  (Hosted on AWS/GCP)    │
└─────────────────────────┘
```

---

## Database Schema

### contents table
```
Column         | Type      | Notes
---|---|---
id             | TEXT      | Primary Key (UUID)
title          | TEXT      | Required
description    | TEXT      | Optional
contentType    | TEXT      | 'image', 'video', or 'post'
image          | TEXT      | Image URL
externalUrl    | TEXT      | YouTube URL, social link, etc.
platform       | TEXT      | 'youtube', 'facebook', 'instagram', 'twitter', 'tiktok'
createdAt      | TIMESTAMP | Auto set
updatedAt      | TIMESTAMP | Auto set
```

---

## Environment Variables Reference

### NEXT_PUBLIC_SUPABASE_URL
- **Description**: Your Supabase project URL
- **Format**: `https://[project-id].supabase.co`
- **Location**: Supabase Dashboard → Settings → API
- **Scope**: Public (used in browser code)

### SUPABASE_SERVICE_ROLE_KEY
- **Description**: Secret key for server-side operations
- **Format**: JWT token (very long string)
- **Location**: Supabase Dashboard → Settings → API
- **Scope**: Server-only (never expose to client)
- **⚠️ Security**: Treat like password - never commit to git

---

## Troubleshooting

### Issue: Deployment shows "Build Failed"
**Solution**:
1. Check GitHub push completed
2. Verify `package.json` exists in root
3. Check for build errors in Vercel logs
4. Redeploy from Vercel dashboard

### Issue: "SUPABASE_SERVICE_ROLE_KEY is not defined"
**Solution**:
1. Go to Vercel Settings → Environment Variables
2. Verify variable name matches exactly
3. Verify value is complete JWT token
4. Redeploy after adding variables

### Issue: Data not saving
**Solution**:
1. Check Supabase credentials are correct
2. Verify `contents` table exists in Supabase
3. Check table schema matches expected columns
4. Open browser DevTools (F12) → Network tab
5. Check API responses for errors

### Issue: "Content not found" errors
**Solution**:
1. Verify Supabase `id` column exists and populated
2. Check frontend uses correct field names
3. Verify database constraints aren't blocking inserts
4. Check Vercel logs for SQL errors

---

## Monitoring & Maintenance

### Check Supabase Usage
1. Supabase Dashboard → **Project Settings** → **Usage**
2. Monitor:
   - Database size (free tier: 500 MB)
   - API calls
   - File storage (if using)

### View Deployment Logs
1. Vercel Dashboard → **Deployments** → Click deployment
2. Go to **"Logs"** tab
3. View real-time or build-time errors

### Monitor Performance
1. Vercel Dashboard → **Analytics**
2. Track page load times
3. Monitor API response times

---

## Next Steps

After Deployment:

1. ✅ Test all CRUD operations (Create, Read, Update, Delete)
2. ✅ Configure custom domain (optional)
3. ✅ Set up automatic deployments from GitHub
4. ✅ Enable Vercel Analytics (optional)
5. ✅ Configure Supabase backups
6. ⚠️ Change Supabase password if shared during setup
7. ☑️ Add authentication if multi-user needed

---

## Quick Reference

| Task | Command/Link |
|------|---|
| View Supabase Dashboard | https://supabase.com/dashboard |
| View Vercel Dashboard | https://vercel.com/dashboard |
| View Live Site | Your Vercel URL |
| View Supabase API Docs | https://supabase.com/docs |
| View Vercel Docs | https://vercel.com/docs |

---

## Support

- **Supabase Issues**: https://supabase.com/docs
- **Vercel Issues**: https://vercel.com/docs
- **Next.js Issues**: https://nextjs.org/docs
- **General Errors**: Check `SUPABASE_SETUP.md` in project root

**Your CMS is now live!** 🚀
