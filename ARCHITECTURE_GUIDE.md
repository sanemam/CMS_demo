# Content Flow Diagram

## User Journey

```
┌─────────────────────────────────────────────────────────────────┐
│                  VOICE OF SHARAVATHI - CMS                      │
└─────────────────────────────────────────────────────────────────┘

                            START HERE
                                ↓
                    ┌───────────────────────┐
                    │   Choose Content Type │
                    └───────────────────────┘
                                ↓
                ┌───────────────────────────────────┐
                │                                   │
            IMAGE                             VIDEO/POST
                ↓                                   ↓
        ┌──────────────┐              ┌──────────────────┐
        │Upload File   │              │Paste URL         │
        └──────────────┘              └──────────────────┘
                ↓                                   ↓
        ┌──────────────┐              ┌──────────────────┐
        │Add Title     │              │Select Platform   │
        │Add Caption   │              │YouTube/FB/Insta  │
        └──────────────┘              │TikTok/Twitter    │
                ↓                      └──────────────────┘
                │                                   ↓
                └───────────────┬───────────────────┘
                                ↓
                        ┌───────────────┐
                        │Submit to DB   │
                        └───────────────┘
                                ↓
                        ┌───────────────┐
                        │Saved to       │
                        │MongoDB Atlas  │
                        └───────────────┘
                                ↓
                ┌───────────────────────────┐
                │  Visible in Public View    │
                └───────────────────────────┘
```

## Content Display Flow

```
MONGODB ATLAS (Cloud)
        ↓
    GET /api/content
        ↓
    [Content Array]
        ↓
    ┌─────────────────────┐
    │  Map through items  │
    └─────────────────────┘
        ↓
    ┌────────────────────────────────┐
    │ Check Content Type             │
    │ ├─ image                       │
    │ ├─ video                       │
    │ └─ post                        │
    └────────────────────────────────┘
        ↓
    ┌─────────────────────────────┐
    │ Render Appropriate Component│
    │ ├─ <img> tag              │
    │ ├─ <iframe> YouTube       │
    │ └─ Link to external post  │
    └─────────────────────────────┘
        ↓
    User sees beautiful content!
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEXT.JS APP                              │
│  (Frontend)                                                      │
├──────────────────────────────┬──────────────────────────────────┤
│                              │                                  │
│   Pages (React)              │   Styling                        │
│   ├─ /add                    │   ├─ Tailwind CSS              │
│   ├─ /view                   │   └─ Custom styles             │
│   ├─ /edit                   │                                 │
│   └─ /manage                 │                                 │
│                              │                                 │
└──────────────────────────────┴──────────────────────────────────┘
                                ↓
        ┌───────────────────────────────────────────────┐
        │         NEXT.JS API ROUTES                    │
        │         (Backend Logic)                       │
        ├───────────────────────────────────────────────┤
        │                                               │
        │  /api/content/                                │
        │  ├─ GET    - Fetch all items                 │
        │  ├─ POST   - Create new item                 │
        │  │                                           │
        │  /api/content/[id]/                          │
        │  ├─ GET    - Fetch one item                  │
        │  ├─ PUT    - Update item                     │
        │  └─ DELETE - Delete item                     │
        │                                               │
        │  /api/upload/                                │
        │  └─ POST   - Upload image                    │
        │                                               │
        └───────────────────────────────────────────────┘
                                ↓
        ┌───────────────────────────────────────────────┐
        │    MONGOOSE (ODM - Object Data Mapper)       │
        │    └─ Validates & structures data            │
        └───────────────────────────────────────────────┘
                                ↓
        ┌───────────────────────────────────────────────┐
        │     MONGODB ATLAS (Cloud Database)           │
        │     ├─ Collections                           │
        │     │  └─ contents                           │
        │     │     └─ Documents (JSON)                │
        │     │        {                               │
        │     │          title: "...",                  │
        │     │          contentType: "image",          │
        │     │          image: "url",                  │
        │     │          createdAt: Date               │
        │     │        }                               │
        │     └─ Automatic backups                     │
        └───────────────────────────────────────────────┘
```

## Deployment Flow

```
Local Development
        ↓
    npm run dev
        ↓
    Test Features
        ↓
    ┌─────────────────────────┐
    │  git add .              │
    │  git commit -m "..."    │
    │  git push origin main   │
    └─────────────────────────┘
        ↓
    GitHub Repository
        ↓
    Connect to Vercel
        ↓
    ┌─────────────────────────┐
    │  Add Environment        │
    │  Variables              │
    │  MONGODB_URI = ...      │
    └─────────────────────────┘
        ↓
    Vercel Build
    ├─ Install dependencies
    ├─ Build Next.js app
    └─ Deploy functions
        ↓
    Live at vercel.app domain!
        ↓
    Auto-deploy on push
    ├─ Push to GitHub
    └─ Vercel redeploys
```

## Content Type Matrix

```
╔════════════╦═══════════╦════════════════╦═══════════════════╗
║ Type       ║ Input     ║ Storage        ║ Display           ║
╠════════════╬═══════════╬════════════════╬═══════════════════╣
║ Image      ║ File      ║ Cloud URL      ║ <img> tag         ║
║            ║ Upload    ║ (from upload)  ║ with scaling      ║
╠════════════╬═══════════╬════════════════╬═══════════════════╣
║ Video      ║ URL       ║ External URL   ║ <iframe> player   ║
║ (YouTube)  ║ Paste     ║ (YouTube link) ║ fully embedded    ║
╠════════════╬═══════════╬════════════════╬═══════════════════╣
║ Post       ║ URL       ║ External URL   ║ Button link to    ║
║ (Social)   ║ Paste     ║ (post link)    ║ original post     ║
╚════════════╩═══════════╩════════════════╩═══════════════════╝
```

## MongoDB Document Structure

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "title": "Beautiful River",
  "text": "An amazing moment captured at Sharavathi",
  "contentType": "image",
  "image": "https://example.com/image.jpg",
  "externalUrl": null,
  "platform": "none",
  "createdAt": ISODate("2024-12-04T10:30:00Z")
}
```

OR

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "Conservation Talk",
  "text": "An important discussion about river conservation",
  "contentType": "video",
  "image": null,
  "externalUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "platform": "youtube",
  "createdAt": ISODate("2024-12-04T11:00:00Z")
}
```

OR

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439013"),
  "title": "Awareness Campaign",
  "text": "Check out this important message on social media",
  "contentType": "post",
  "image": null,
  "externalUrl": "https://www.instagram.com/p/ABC123def456/",
  "platform": "instagram",
  "createdAt": ISODate("2024-12-04T12:00:00Z")
}
```

## Setup Timeline

```
15 Minutes Total

├─ 5 minutes   → MongoDB Atlas setup
├─ 3 minutes   → Create .env.local
├─ 2 minutes   → npm install
├─ 3 minutes   → npm run dev (test locally)
└─ 2 minutes   → Push to GitHub

30 Minutes Total (including deployment)

├─ 15 minutes  → Above steps
├─ 5 minutes   → Vercel setup & import
├─ 5 minutes   → Add environment variables
└─ 5 minutes   → Deploy & test live
```

---

**Complexity: Simple** ✓  
**Setup Time: ~5-30 minutes**  
**Maintenance: Minimal** ✓
