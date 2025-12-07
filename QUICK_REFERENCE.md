# Quick Reference Card

## Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Lint code
npm run lint
```

## URLs

```
Local Development:  http://localhost:3000
Public View:        http://localhost:3000/view
Add Content:        http://localhost:3000/add
Manage Content:     http://localhost:3000/
Edit Content:       http://localhost:3000/edit/[id]

API Endpoints:
GET all:            http://localhost:3000/api/content
POST new:           http://localhost:3000/api/content
GET one:            http://localhost:3000/api/content/[id]
PUT update:         http://localhost:3000/api/content/[id]
DELETE:             http://localhost:3000/api/content/[id]
```

## Environment Variables

```
.env.local (Local Development):
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/cms?retryWrites=true&w=majority

Vercel (Production):
MONGODB_URI=<same as above>
```

## File Locations

```
Core Files:
├── models/Content.js              ← Database schema
├── lib/mongodb.js                 ← Database connection
├── app/api/content/route.js       ← Get/Create API
├── app/api/content/[id]/route.js  ← Update/Delete API
├── app/add/page.js                ← Add content page
├── app/view/page.js               ← Public view page
└── app/layout.js                  ← Navigation bar

Documentation:
├── README.md                      ← Full documentation
├── QUICK_START.md                 ← 5-minute setup
├── DEPLOYMENT_GUIDE.md            ← Vercel deployment
├── SETUP_ENV.md                   ← Environment setup
├── ARCHITECTURE_GUIDE.md          ← Technical details
├── FAQ.md                         ← Common questions
├── CHECKLIST.md                   ← Implementation checklist
└── IMPLEMENTATION_SUMMARY.md      ← Feature summary
```

## Database Schema

```javascript
Content {
  _id: ObjectId,
  title: String (required),
  text: String (optional),
  contentType: 'image' | 'video' | 'post' (required),
  image: String (for images),
  externalUrl: String (for videos/posts),
  platform: 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'none',
  createdAt: Date (auto)
}
```

## Content Types

```
IMAGE:
- Input: File upload
- Storage: URL
- Display: <img> tag

VIDEO:
- Input: YouTube URL
- Storage: URL
- Display: <iframe> embedded player

POST:
- Input: Social media URL
- Storage: URL + platform name
- Display: Link button to post
```

## Setup Steps (Quick)

```
1. Create .env.local
   MONGODB_URI=your_connection_string

2. Install dependencies
   npm install

3. Start server
   npm run dev

4. Test features
   - Add image
   - Add video
   - Add social post

5. Push to GitHub
   git add . && git commit -m "..." && git push

6. Deploy to Vercel
   - Import from GitHub
   - Add MONGODB_URI env var
   - Deploy
```

## API Request Examples

```bash
# Fetch all content
curl http://localhost:3000/api/content

# Create content
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "text": "Description",
    "contentType": "image",
    "image": "https://url.jpg"
  }'

# Update content
curl -X PUT http://localhost:3000/api/content/[id] \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete content
curl -X DELETE http://localhost:3000/api/content/[id]
```

## Common Issues & Fixes

```
MongoDB Connection Error
→ Check MONGODB_URI in .env.local
→ Verify IP whitelist (0.0.0.0/0)
→ Check username/password

Video Not Embedding
→ Use full URL: youtube.com/watch?v=...
→ Not short URL: youtu.be/...
→ Not embed URL: youtube.com/embed/...

Image Not Showing
→ Check URL is public/accessible
→ Verify file format is supported
→ Check CORS isn't blocking

Deployment Fails
→ Check Vercel build logs
→ Verify env vars are set
→ Run npm run build locally
→ Check for syntax errors
```

## Resource Links

```
MongoDB:
- Atlas: https://www.mongodb.com/cloud/atlas
- Docs: https://docs.mongodb.com/
- University: https://university.mongodb.com/

Vercel:
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

Next.js:
- Docs: https://nextjs.org/docs
- Learn: https://nextjs.org/learn
- API: https://nextjs.org/docs/api-reference

Tailwind:
- Docs: https://tailwindcss.com/docs
- UI Components: https://tailwindui.com/
```

## Keyboard Shortcuts (Coding)

```
VS Code:
Ctrl+K Ctrl+C    → Comment code
Ctrl+/           → Toggle comment
Ctrl+Shift+F     → Format code
F2               → Rename symbol
Ctrl+D           → Select next occurrence
```

## Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit with message
git commit -m "Your message"

# Push to GitHub
git push origin main

# View history
git log --oneline

# Revert last commit
git revert HEAD
```

## MongoDB Atlas Quick Links

```
1. Create Cluster:        https://www.mongodb.com/cloud/atlas
2. Get Connection String: Cluster → Connect → Application
3. Create User:          Security → Users → Add User
4. Network Access:        Security → Network Access → 0.0.0.0/0
5. Check Activity:        Activity → Activity Stream
```

## Vercel Quick Links

```
1. New Project:          https://vercel.com/new
2. Dashboard:            https://vercel.com/dashboard
3. Add Env Var:         Project → Settings → Environment Variables
4. Check Logs:          Deployments → [Latest] → Logs
5. Custom Domain:       Settings → Domains
```

## Performance Tips

```
- Enable Vercel Web Analytics
- Use MongoDB indexes
- Optimize images (convert to WebP)
- Enable gzip compression
- Use CDN for static assets
- Monitor Vercel dashboard
```

## Security Checklist

```
✅ .env.local NOT in GitHub
✅ .gitignore includes .env.local
✅ MongoDB IP whitelist set
✅ HTTPS enforced (Vercel does this)
✅ No hardcoded passwords
✅ Input validation on API routes
✅ Backups enabled (MongoDB)
✅ Change MongoDB password if leaked
```

## Content Posting Tips

```
IMAGES:
- Optimal size: 1200x800px
- Formats: JPG, PNG, WebP
- Max file: 10MB

VIDEOS:
- Platform: YouTube (best)
- Format: youtube.com/watch?v=ID
- Length: Any

POSTS:
- Platforms: Instagram, Facebook, Twitter, TikTok
- Privacy: Must be public
- Format: Full post URL
```

## Tagline
"One river. One responsibility." 🌊

---

## Cheat Sheet Summary

| Action | Command |
|--------|---------|
| Setup | `npm install` |
| Dev | `npm run dev` |
| Build | `npm run build` |
| Deploy | Push to GitHub → Click Deploy in Vercel |
| View Logs | Vercel Dashboard → Deployments → Logs |
| Check DB | MongoDB Atlas → Collections |
| Update Env | Vercel → Settings → Environment Variables |

---

**Print this page for quick reference!**
