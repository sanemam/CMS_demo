# Deployment Guide - Voice of Sharavathi CMS

## 1. MongoDB Setup

### Option A: MongoDB Atlas (Recommended for Vercel)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas
   - Sign up for a free account
   - Verify your email

2. **Create a Cluster**
   - Click "Create a Database"
   - Choose the FREE tier
   - Select your preferred region (closer to your users)
   - Click "Create Cluster"

3. **Create Database User**
   - In the left sidebar, go to "Database Access"
   - Click "Add New Database User"
   - Create a username and password
   - Copy the password somewhere safe
   - Select "Built-in Role" as "Atlas admin"
   - Click "Add User"

4. **Set Up Network Access**
   - In the left sidebar, go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Click "Databases" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/cms-website?retryWrites=true&w=majority`

6. **Create `.env.local` file in your project root**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cms-website?retryWrites=true&w=majority
   ```

## 2. Update `lib/mongodb.js`

Your connection file should look like:

```javascript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
```

## 3. Update API Routes to Use MongoDB

### Update `app/api/content/route.js`

```javascript
import { dbConnect } from '../../../lib/mongodb';
import Content from '../../../models/Content';

export async function GET() {
  try {
    await dbConnect();
    const contents = await Content.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(contents), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch contents' }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const newContent = new Content(body);
    await newContent.save();
    
    return new Response(JSON.stringify(newContent), { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to create content' }), { status: 500 });
  }
}
```

### Update `app/api/content/[id]/route.js`

```javascript
import { dbConnect } from '../../../../lib/mongodb';
import Content from '../../../../models/Content';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const content = await Content.findById(params.id);
    
    if (!content) {
      return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify(content), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch content' }), { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    
    const content = await Content.findByIdAndUpdate(params.id, body, { new: true });
    
    if (!content) {
      return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify(content), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update content' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const content = await Content.findByIdAndDelete(params.id);
    
    if (!content) {
      return new Response(JSON.stringify({ error: 'Content not found' }), { status: 404 });
    }
    
    return new Response(JSON.stringify({ message: 'Content deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete content' }), { status: 500 });
  }
}
```

## 4. Deploy to Vercel

### Prerequisites
- Vercel account (https://vercel.com)
- GitHub account with your project

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add MongoDB support and content type features"
   git push origin master
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select your project
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live!

## 5. Features

### Content Types Supported
- **Image**: Upload images from local storage
- **Video**: Embed YouTube videos via URL
- **Post**: Embed social media posts from YouTube, Facebook, Instagram, Twitter, TikTok

### Data Structure
Each content item stores:
- `title`: Content title
- `text`: Description/caption
- `contentType`: 'image' | 'video' | 'post'
- `image`: URL (for image type)
- `externalUrl`: URL (for video/post types)
- `platform`: Social media platform name
- `createdAt`: Timestamp

## 6. File Upload (Optional)

For image uploads, you can use:
- **Cloudinary** (easy setup)
- **AWS S3**
- **Local storage** (simple but limited)

Currently, the app is configured for Cloudinary. Update `app/api/upload/route.js` with your credentials.

## 7. Troubleshooting

### Connection Issues
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas
- Ensure credentials are escaped properly in connection string

### Deployment Errors
- Check Vercel logs: `vercel logs`
- Verify all environment variables are set
- Ensure package.json has all dependencies

### API Errors
- Check browser console for errors
- Review Vercel function logs
- Test endpoints with curl or Postman

## Support

For more help:
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
