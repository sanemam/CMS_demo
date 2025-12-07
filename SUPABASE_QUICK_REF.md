# Supabase Quick Reference

## 🚀 Quick Start (5 Minutes)

### Local Testing (Without Supabase)
```bash
cd c:\Users\nikhi\cms-website
npm run dev
# Opens: http://localhost:3000
```
**App works with file storage fallback!** ✅

### Step-by-Step Setup

#### 1️⃣ Create Supabase Project (2 min)
- Go to https://supabase.com → "Start your project"
- Sign up → Create organization → Create project
- Wait for database to initialize

#### 2️⃣ Create Database Table (1 min)
In Supabase **SQL Editor**, run:
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

#### 3️⃣ Get Your API Keys (1 min)
- Supabase Dashboard → **Settings** → **API**
- Copy:
  - `Project URL`
  - `Service Role Key`

#### 4️⃣ Create `.env.local` (1 min)
Create at `c:\Users\nikhi\cms-website\.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 5️⃣ Restart & Test (1 min)
```bash
# Stop: Ctrl+C
# Restart:
npm run dev
```
- Go to http://localhost:3000
- Click "Add Content" → create post
- Click "View Content" → see your post!

---

## 📋 Configuration Files

### `.env.local` (Local Development)
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Vercel Environment Variables
Same variables, added in **Vercel Dashboard** → **Settings** → **Environment Variables**

---

## 📂 Project Structure

```
cms-website/
├── app/
│   ├── layout.js          # Root layout
│   ├── page.js            # Dashboard
│   ├── add/page.js        # Add content form
│   ├── view/page.js       # View all content
│   ├── edit/[id]/page.js  # Edit content
│   └── api/
│       └── content/
│           ├── route.js   # GET, POST all
│           └── [id]/
│               └── route.js # GET, PUT, DELETE single
├── lib/
│   ├── supabase.js        # Supabase client
│   └── storage.js         # File storage fallback
├── models/
│   └── Content.js         # Mongoose model (legacy)
├── data/
│   └── content.json       # Fallback file storage
├── public/
│   └── uploads/           # Image uploads
├── SUPABASE_SETUP.md      # Detailed setup guide
├── SUPABASE_VERCEL_GUIDE.md # Vercel deployment
└── package.json
```

---

## 🔑 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/content` | Get all content |
| POST | `/api/content` | Create new content |
| GET | `/api/content/[id]` | Get single content |
| PUT | `/api/content/[id]` | Update content |
| DELETE | `/api/content/[id]` | Delete content |

---

## 🎯 Content Types

### Image Post
```javascript
{
  contentType: "image",
  title: "My Image",
  description: "Image description",
  image: "url-to-image.jpg"
}
```

### Video Post (YouTube)
```javascript
{
  contentType: "video",
  title: "My Video",
  description: "Video description",
  externalUrl: "https://youtube.com/watch?v=..."
}
```

### Social Media Post
```javascript
{
  contentType: "post",
  title: "Social Post",
  description: "Post description",
  platform: "instagram", // youtube, facebook, instagram, twitter, tiktok
  externalUrl: "https://..."
}
```

---

## 📊 Database Schema

### contents table

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| id | TEXT | ✅ | Auto-generated UUID |
| title | TEXT | ✅ | Post title |
| description | TEXT | ❌ | Long description |
| contentType | TEXT | ✅ | image, video, or post |
| image | TEXT | ❌ | Image URL |
| externalUrl | TEXT | ❌ | External URL |
| platform | TEXT | ❌ | Social platform name |
| createdAt | TIMESTAMP | ✅ | Auto-set |
| updatedAt | TIMESTAMP | ✅ | Auto-set |

---

## 🔄 Fallback System

**Works without Supabase!** Uses local file storage:

```
Supabase Configured? → YES → Use Supabase
                    → NO  → Use file storage (data/content.json)
```

Seamless transition from local → cloud!

---

## ⚙️ Environment Variables

### Client-side (NEXT_PUBLIC_*)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
```
✅ Safe to expose (in browser)

### Server-side (Private)
```bash
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```
⚠️ Secret! Never expose!

---

## 🚀 Deployment Checklist

- [ ] Create Supabase project
- [ ] Create database table
- [ ] Get API keys
- [ ] Test locally with `.env.local`
- [ ] Push code to GitHub
- [ ] Connect Vercel to GitHub repo
- [ ] Add environment variables in Vercel
- [ ] Verify live deployment works
- [ ] Test creating/viewing content

---

## 🆘 Common Issues

| Error | Solution |
|-------|----------|
| "Supabase credentials not found" | Add `.env.local` file and restart |
| "Column 'id' does not exist" | Re-run CREATE TABLE SQL |
| "Service Role Key is undefined" | Check Vercel environment variables |
| Data not saving | Check Supabase table schema matches |
| 404 on deployment | Verify repository is public on GitHub |

---

## 📞 Support Links

- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Next.js**: https://nextjs.org/docs
- **This Project**: See `SUPABASE_SETUP.md` and `SUPABASE_VERCEL_GUIDE.md`

---

**Everything you need to run your CMS!** 🎉
