# Voice of Sharavathi - CMS Application

A modern content management system for managing diverse content types including images, videos, and social media posts.

## Features

### ✨ Multiple Content Types
- **Images**: Upload images from your local machine
- **Videos**: Embed YouTube videos via URL
- **Social Media Posts**: Embed content from YouTube, Facebook, Instagram, Twitter, and TikTok by providing URLs

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive layout (works on desktop, tablet, mobile)
- Beautiful typography with serif fonts
- Smooth animations and transitions

### 💾 Database
- MongoDB integration for persistent data storage
- Structured data model supporting multiple content types
- Easy to scale and manage

### 🚀 Deployment
- Ready for Vercel deployment
- One-click deployment from GitHub
- Automatic environment variable management

## Tech Stack

- **Frontend**: Next.js 13+ with React
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Deployment**: Vercel
- **File Storage**: Local uploads or Cloudinary (optional)

## Getting Started

### Prerequisites
- Node.js 16+ installed
- MongoDB Atlas account (free tier available)
- Vercel account (for deployment)
- GitHub account

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd cms-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up MongoDB**
   - Go to MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string
   - Create `.env.local` file:
     ```
     MONGODB_URI=your_mongodb_connection_string
     ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Visit http://localhost:3000

## Usage

### Adding Content

#### 1. Image Content
- Click "Add Content" button
- Select "Image" from Content Type
- Upload an image from your computer
- Add title and optional description
- Click "Add Content"

#### 2. Video Content
- Click "Add Content" button
- Select "Video (YouTube, etc.)" from Content Type
- Paste YouTube video URL
- Add title and optional description
- Click "Add Content"

#### 3. Social Media Posts
- Click "Add Content" button
- Select "Social Media Post" from Content Type
- Paste URL from Instagram, Facebook, Twitter, or TikTok
- Select the platform
- Add title and optional description
- Click "Add Content"

### Viewing Content
- Visit the "Public View" to see all published content
- Click on content cards to see full details
- Embedded videos and posts display directly

### Managing Content
- Go to "Manage" page to see all content
- Click edit button to modify content
- Click delete button to remove content

## Project Structure

```
cms-website/
├── app/
│   ├── api/
│   │   ├── content/          # Content API routes
│   │   │   ├── route.js      # GET and POST
│   │   │   └── [id]/
│   │   │       └── route.js  # GET, PUT, DELETE
│   │   └── upload/           # File upload API
│   ├── add/                  # Add content page
│   ├── edit/                 # Edit content page
│   ├── view/                 # Public view page
│   ├── layout.js             # Root layout
│   └── page.js               # Home/dashboard page
├── models/
│   └── Content.js            # Mongoose schema
├── lib/
│   ├── mongodb.js            # MongoDB connection
│   └── storage.js            # File storage utilities
├── public/
│   └── uploads/              # Local file uploads
├── DEPLOYMENT_GUIDE.md       # Step-by-step deployment guide
└── package.json
```

## API Endpoints

### Content Endpoints

#### GET /api/content
Fetch all content items
```bash
curl http://localhost:3000/api/content
```

#### POST /api/content
Create new content
```bash
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Post",
    "text": "Description",
    "contentType": "image",
    "image": "https://..."
  }'
```

#### GET /api/content/:id
Fetch specific content
```bash
curl http://localhost:3000/api/content/[id]
```

#### PUT /api/content/:id
Update content
```bash
curl -X PUT http://localhost:3000/api/content/[id] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'
```

#### DELETE /api/content/:id
Delete content
```bash
curl -X DELETE http://localhost:3000/api/content/[id]
```

## Deployment to Vercel

### Step-by-Step Guide

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy via Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select your project

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add `MONGODB_URI` with your MongoDB connection string
   - Save and redeploy

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Content Data Model

```javascript
{
  _id: ObjectId,
  title: String,                          // Required
  text: String,                           // Optional description
  contentType: 'image' | 'video' | 'post', // Content type
  image: String,                          // Image URL (for images)
  externalUrl: String,                    // URL (for videos/posts)
  platform: 'youtube' | 'facebook' | 'instagram' | 'twitter' | 'tiktok' | 'none',
  createdAt: Date
}
```

## Supported Platforms

- **YouTube**: Embed videos from YouTube links
- **Facebook**: Share Facebook post URLs
- **Instagram**: Share Instagram post links
- **Twitter**: Share Tweet links
- **TikTok**: Share TikTok video links
- **Local Images**: Upload from your computer

## Environment Variables

Required:
- `MONGODB_URI`: MongoDB connection string

Optional:
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Troubleshooting

### Can't connect to MongoDB
- Verify connection string in `.env.local`
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Images not uploading
- Check file size limits
- Verify upload endpoint is working
- Check browser console for errors

### Videos not embedding
- Ensure URL format is correct
- Copy full YouTube URL (e.g., `https://www.youtube.com/watch?v=...`)
- Some platforms may have embedding restrictions

### Deployment issues
- Check Vercel build logs
- Verify all environment variables are set
- Ensure package.json has all dependencies

## License

MIT

## Support

For issues or questions:
1. Check the documentation
2. Review the deployment guide
3. Check Vercel logs for deployment errors
4. Consult MongoDB documentation

---

**Made with ❤️ for Voice of Sharavathi**
