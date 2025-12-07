# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Prerequisites
- Node.js 16+ 
- MongoDB Atlas account (free)
- Text editor

### 2. Local Development Setup

```bash
# Install dependencies
npm install

# Create .env.local file with your MongoDB URL
echo "MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/cms?retryWrites=true&w=majority" > .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 3. Add Your First Content

**Image Content:**
1. Click "Add Content"
2. Keep "Image" selected
3. Upload a picture
4. Add title & description
5. Click "Add Content"

**Video Content:**
1. Click "Add Content"
2. Select "Video (YouTube, etc.)"
3. Paste YouTube URL (e.g., `https://www.youtube.com/watch?v=xyz`)
4. Add title
5. Click "Add Content"

**Social Media Post:**
1. Click "Add Content"
2. Select "Social Media Post"
3. Paste Instagram/Facebook/TikTok URL
4. Select platform
5. Add title
6. Click "Add Content"

### 4. View Your Content
- Click "Public View" to see published content
- Click "Manage" to edit or delete

### 5. Deploy to Vercel (Free)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push

# Go to vercel.com → Import GitHub project
# Add MONGODB_URI to environment variables
# Click Deploy!
```

## 📝 MongoDB Setup (2 Minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up → Create free cluster
3. Create database user with password
4. Network → "Allow Access from Anywhere"
5. Clusters → Connect → Get connection string
6. Replace `<password>` in connection string
7. Copy to `.env.local` as `MONGODB_URI`

## 🎯 Key Features

✅ Upload images from computer  
✅ Embed YouTube videos via URL  
✅ Embed Instagram/Facebook/TikTok posts  
✅ Professional UI with Tailwind CSS  
✅ MongoDB for persistent storage  
✅ One-click Vercel deployment  

## 📚 Content Types

| Type | Input | Display |
|------|-------|---------|
| Image | File upload | Shows image |
| Video | YouTube URL | Embedded player |
| Post | Social URL | Link to post |

## 🔗 Supported Platforms

- YouTube: `https://www.youtube.com/watch?v=...`
- Instagram: Direct post URL
- Facebook: Post URL
- Twitter/X: Tweet URL
- TikTok: Video URL

## ✨ Tagline
"One river. One responsibility."

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check `.env.local` has correct URI |
| Video not embedding | Use full YouTube URL with `watch?v=` |
| Port 3000 in use | Change port: `npm run dev -- -p 3001` |
| Build fails on Vercel | Check environment variables are set |

## 📖 Full Documentation

- [README.md](./README.md) - Full documentation
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Detailed deployment steps

---

**Need help?** Check the documentation files or review your `.env.local` setup.
