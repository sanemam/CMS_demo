# Supabase Setup Index & Quick Guide

**Your CMS is now ready to use with Supabase!** Welcome! 👋

---

## 📚 Documentation Structure

### For First-Time Setup
Start here if you're new to Supabase:

1. **`SUPABASE_QUICK_REF.md`** (5 min read)
   - Quick reference
   - Fast 5-minute setup overview
   - Common issues & solutions

2. **`SUPABASE_SETUP.md`** (15 min setup)
   - Detailed step-by-step guide
   - Create Supabase account
   - Create database table
   - Local environment setup
   - Testing your setup

3. **`SUPABASE_VERCEL_GUIDE.md`** (20 min setup)
   - Deploy to Vercel
   - Environment variables
   - Live testing
   - Monitoring & maintenance

### For Decision Making
Help choosing the right database:

- **`MONGODB_vs_SUPABASE.md`**
  - Why Supabase chosen
  - Detailed comparison table
  - Cost analysis
  - Performance benchmarks
  - Migration guide (MongoDB → Supabase)

### Status & Summary
Overview of what changed:

- **`SUPABASE_MIGRATION_COMPLETE.md`**
  - What was changed in code
  - Current status
  - Verification checklist
  - Next steps

---

## 🚀 Quick Start (Copy-Paste)

### Step 1: Create Supabase Project
```
Go to: https://supabase.com
→ "Start your project"
→ Sign up → Create organization → Create project
→ Wait 2-5 minutes for database
```

### Step 2: Run SQL in Supabase
In **SQL Editor**, paste and click "Run":
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

### Step 3: Get Your Keys
**Supabase Dashboard** → **Settings** → **API**
- Copy: **Project URL**
- Copy: **Service Role Key**

### Step 4: Create `.env.local`
Create new file at `c:\Users\nikhi\cms-website\.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=<paste-your-project-url>
SUPABASE_SERVICE_ROLE_KEY=<paste-your-service-role-key>
```

### Step 5: Restart & Test
```powershell
# Stop dev server if running (Ctrl+C)
npm run dev
```

Open: http://localhost:3000
- Add Content → create post
- View Content → see your post ✅

---

## 📋 File Structure

```
📁 cms-website/
├── 📄 SUPABASE_SETUP.md              ← Start here for detailed setup
├── 📄 SUPABASE_QUICK_REF.md          ← Quick commands & reference
├── 📄 SUPABASE_VERCEL_GUIDE.md       ← Deploy to Vercel
├── 📄 MONGODB_vs_SUPABASE.md         ← Why Supabase?
├── 📄 SUPABASE_MIGRATION_COMPLETE.md ← What changed
├── 📄 .env.example                   ← Environment template
├── 📄 .env.local                     ← Your secrets (create this)
├── 📁 lib/
│   ├── 📄 supabase.js                ← Supabase client
│   └── 📄 storage.js                 ← File storage fallback
├── 📁 app/api/content/
│   ├── 📄 route.js                   ← GET/POST all
│   └── 📄 [id]/route.js              ← GET/PUT/DELETE one
└── 📁 data/
    └── 📄 content.json               ← Fallback storage
```

---

## ✅ Verification Steps

### Check 1: Dev Server Runs
```powershell
npm run dev
```
✅ Should see:
```
Ready in X.Xs
Compiled /page in Xs
Compiled /api/content/route in Xs
Supabase credentials not found. Using file storage fallback.
```

### Check 2: App Loads
Open: http://localhost:3000
✅ Should see "Voice of Sharavathi" dashboard

### Check 3: Add Content Works
1. Click "Add Content"
2. Fill form
3. Click "Add Content" button
✅ Should redirect to manage page

### Check 4: View Content Works
1. Click "View Content"
2. Should see your post
✅ Data displays correctly

---

## 🔧 Environment Variables

### What Goes Where?

**`.env.local`** (Local development)
- Create new file in project root
- Add both variables
- This file is in `.gitignore` (don't commit)

**Vercel Dashboard** (Production)
- Same variable names
- Same values
- Added in Settings → Environment Variables

### Variables

```
NEXT_PUBLIC_SUPABASE_URL=
├─ Get from: Supabase Dashboard → Settings → API
├─ Format: https://your-project.supabase.co
├─ Public: YES (safe in browser)
└─ When used: Both local and Vercel

SUPABASE_SERVICE_ROLE_KEY=
├─ Get from: Supabase Dashboard → Settings → API → Service Role Key
├─ Format: Long JWT token (eyJhbGc...)
├─ Public: NO (keep secret!)
└─ When used: Server-side API routes only
```

---

## 🎯 Content Types

Your CMS supports 3 types of content:

### Type 1: Image Posts
```javascript
{
  contentType: "image",
  title: "Post Title",
  description: "Description",
  image: "https://example.com/image.jpg"
}
```

### Type 2: Video Posts (YouTube)
```javascript
{
  contentType: "video",
  title: "Post Title",
  description: "Description",
  externalUrl: "https://youtube.com/watch?v=..."
}
```

### Type 3: Social Media Posts
```javascript
{
  contentType: "post",
  title: "Post Title",
  description: "Description",
  platform: "instagram", // youtube, facebook, instagram, twitter, tiktok
  externalUrl: "https://instagram.com/..."
}
```

---

## 🔄 How It Works

### Current State (No Supabase)
```
Your App
  ↓
Check: Supabase configured?
  ↓ NO
Use file storage (data/content.json)
```

### With Supabase (After Setup)
```
Your App
  ↓
Check: Supabase configured?
  ↓ YES
Use Supabase PostgreSQL database
```

**Result:** Seamless transition! Works both ways.

---

## 📊 API Routes

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/content` | Get all posts |
| POST | `/api/content` | Create new post |
| GET | `/api/content/[id]` | Get one post |
| PUT | `/api/content/[id]` | Update post |
| DELETE | `/api/content/[id]` | Delete post |

---

## 🐛 Troubleshooting

### Issue: "Supabase credentials not found"
**Status:** ✅ NORMAL
**Why:** `.env.local` not created yet
**Action:** Follow Step 4 above to create it

### Issue: Data not showing on page
**Cause:** Supabase table not created
**Fix:** Re-run the CREATE TABLE SQL

### Issue: Page shows error
**Action:** 
1. Open browser DevTools (F12)
2. Go to Console tab
3. Read error message
4. Check troubleshooting section in `SUPABASE_SETUP.md`

---

## 🚀 Deployment Path

```
Local Testing
    ↓ (Verified working)
Push to GitHub
    ↓
Connect to Vercel
    ↓
Add environment variables
    ↓
Deploy
    ↓
Test live URL
```

**Time needed:** 15-20 minutes
**Guide:** See `SUPABASE_VERCEL_GUIDE.md`

---

## 💡 Key Concepts

### Supabase
- **What:** PostgreSQL database in the cloud
- **Who runs it:** Supabase (hosted on AWS/GCP)
- **Cost:** Free tier, then pay-as-you-go
- **Best for:** CMS, small/medium projects

### File Storage (Fallback)
- **What:** JSON file on your server
- **Location:** `data/content.json`
- **Cost:** $0
- **Best for:** Local development without Supabase

### Vercel
- **What:** Serverless hosting for Next.js
- **Cost:** Free tier, then pay-as-you-go
- **Deploy from:** GitHub
- **Perfect for:** Your Next.js CMS

---

## 📞 Support

| Need | Reference |
|------|-----------|
| Step-by-step setup | `SUPABASE_SETUP.md` |
| Deploy to Vercel | `SUPABASE_VERCEL_GUIDE.md` |
| Quick commands | `SUPABASE_QUICK_REF.md` |
| Why not MongoDB? | `MONGODB_vs_SUPABASE.md` |
| Status & changes | `SUPABASE_MIGRATION_COMPLETE.md` |
| Supabase docs | https://supabase.com/docs |
| Vercel docs | https://vercel.com/docs |

---

## ✨ What's Next?

### Today
1. ✅ Read `SUPABASE_SETUP.md`
2. ✅ Create Supabase project
3. ✅ Create database table
4. ✅ Configure `.env.local`
5. ✅ Test locally

### This Week
1. Push to GitHub
2. Deploy to Vercel
3. Test live URL
4. Show it off! 🎉

### Future
- Add authentication
- Add file uploads
- Add analytics
- Scale to millions of users

---

## 🎯 Success Checklist

- [ ] Read this guide
- [ ] Created Supabase project
- [ ] Created database table
- [ ] Created `.env.local` file
- [ ] Dev server runs
- [ ] Can add content locally
- [ ] Can view content locally
- [ ] Ready to deploy

---

## 🎉 You're All Set!

Your CMS is ready to go!

**Start with:** `SUPABASE_SETUP.md`

Questions? Check the troubleshooting sections in the guides above.

**Happy coding!** 🚀
