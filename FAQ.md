# FAQ - Frequently Asked Questions

## 🔧 Setup & Installation

### Q: Do I need to pay for anything?
**A:** No! Everything can be done for free:
- MongoDB Atlas: Free tier (512MB storage)
- Vercel: Free tier with unlimited deployments
- Next.js: Open source (free)
- Tailwind CSS: Open source (free)

### Q: What if I don't have Node.js installed?
**A:** Download from https://nodejs.org (LTS version recommended)

### Q: Where do I get MongoDB connection string?
**A:** 
1. Go to https://www.mongodb.com/cloud/atlas
2. Create account → Create cluster (free)
3. Create user with password
4. Click "Connect" → "Connect your application"
5. Copy the URI and paste in `.env.local`

See `SETUP_ENV.md` for detailed steps.

### Q: Can I use something other than MongoDB?
**A:** Yes, but you'd need to:
- Change the schema in `models/Content.js`
- Update API routes to use your database
- Install appropriate ODM/driver

MongoDB is recommended because it's free and easy to set up.

---

## 📱 Content Management

### Q: What image formats are supported?
**A:** JPEG, PNG, WebP, GIF, SVG, and most common formats. File size typically limited by upload provider (default: ~10MB).

### Q: Can I embed videos from other platforms besides YouTube?
**A:** Currently optimized for YouTube. For other platforms:
- Facebook: Works but may need embedding permission
- Instagram: Works but may require additional setup
- TikTok: Link only (no embedding)
- Twitter: Works with platform embed code

### Q: What happens if a social media URL becomes unavailable?
**A:** The link will still be saved in database, but it may show as broken on the UI. You can update or delete the post from manage page.

### Q: Can I edit content after posting?
**A:** Yes! Click "Manage" page, then click edit button on any post.

### Q: Is there a limit on how much content I can store?
**A:** MongoDB Atlas free tier: 512MB
- Typically allows thousands of posts
- Upgrade later if needed

### Q: Can multiple users add content?
**A:** Currently, the app doesn't have user authentication. Everyone can add/edit/delete. To add authentication:
1. Use NextAuth.js or similar
2. Add role-based access control
3. Restrict operations by user

---

## 🌐 Deployment

### Q: How do I deploy to production?
**A:** 
1. Push code to GitHub
2. Go to vercel.com → Import repository
3. Add MONGODB_URI to environment variables
4. Click Deploy

Takes about 5 minutes. See `DEPLOYMENT_GUIDE.md`.

### Q: Can I use my own domain?
**A:** Yes! Vercel allows free custom domains. After deployment:
1. Go to Vercel project settings
2. Domains section
3. Add your domain
4. Point DNS to Vercel

### Q: What if deployment fails?
**A:** Check:
1. Vercel build logs (shows error)
2. All environment variables are set
3. MongoDB URI is correct
4. No syntax errors in code

### Q: Can I preview changes before going live?
**A:** Yes! Vercel automatically creates preview URLs for pull requests.

### Q: What's the uptime/reliability?
**A:** 
- Vercel: 99.95% uptime SLA
- MongoDB: Automatic backups, 99.95% uptime SLA
- Very reliable for production use

---

## 🔒 Security

### Q: Is my data safe on MongoDB Atlas?
**A:** Yes!
- Data encrypted in transit (HTTPS)
- Data encrypted at rest
- Automatic daily backups
- Redundant storage
- Access control by IP/user

### Q: Should I commit `.env.local` to GitHub?
**A:** NO! Never! 
- It contains passwords
- Anyone with access can read it
- Check `.gitignore` includes `.env.local`

### Q: What if someone gets my MongoDB password?
**A:** 
1. Go to MongoDB Atlas
2. Database Access → Users
3. Change the user password
4. Update `.env.local`
5. Update Vercel environment variable
6. Redeploy

### Q: Can I restrict who can add content?
**A:** Currently no built-in authentication. To add:
1. Implement NextAuth.js
2. Add login page
3. Check permissions in API routes

### Q: Is HTTPS enforced?
**A:** Yes! Both Vercel and MongoDB enforce HTTPS.

---

## 🎨 Customization

### Q: Can I change the color scheme?
**A:** Yes! Edit `tailwind.config.js` or the color classes in components.

### Q: Can I change the header text?
**A:** Yes! Edit text in:
- `app/layout.js` - Navigation bar
- `app/page.js` - Dashboard title
- `app/view/page.js` - Public view title

### Q: Can I change the tagline "One river. One responsibility"?
**A:** Yes! Edit in `app/view/page.js` around line 112.

### Q: Can I add more content types?
**A:** Yes! 
1. Add new type to `models/Content.js` enum
2. Add UI in `app/add/page.js`
3. Add rendering logic in `app/view/page.js`

### Q: Can I add comments/reactions?
**A:** Yes! Create new schema for comments and add API endpoints.

---

## 📊 Performance

### Q: How fast will the app load?
**A:** Very fast!
- Vercel CDN: Global edge network
- Next.js: Optimized performance
- MongoDB: Fast queries
- Typical load time: <1 second

### Q: Can I optimize images?
**A:** Yes! Next.js has built-in image optimization. Use `<Image>` component instead of `<img>`.

### Q: What if I get lots of traffic?
**A:** 
- Vercel auto-scales (handles spikes)
- MongoDB free tier can handle thousands of concurrent users
- Upgrade plans if needed

---

## 🆘 Troubleshooting

### Q: "MONGODB_URI is not defined"
**A:** 
- Create `.env.local` file in root directory
- Add: `MONGODB_URI=your_connection_string`
- Restart dev server

### Q: "Cannot connect to MongoDB"
**A:** Check:
- Connection string is correct
- Password is URL-encoded (special chars)
- IP whitelist includes your IP (0.0.0.0/0 for anywhere)
- Network is connected

### Q: "Videos not embedding"
**A:** 
- Use full YouTube URL: `https://www.youtube.com/watch?v=VIDEO_ID`
- Not short URL: `youtu.be/VIDEO_ID`
- Not embed URL: `youtube.com/embed/VIDEO_ID`

### Q: "Images upload but don't display"
**A:** 
- Check image URL is publicly accessible
- Verify file exists and isn't deleted
- Check file format is supported
- Check CORS isn't blocking it

### Q: "Deployment shows build error"
**A:** 
1. Check Vercel build logs for specific error
2. Run `npm run build` locally to test
3. Fix error and redeploy

### Q: "Content disappears after refresh"
**A:** 
- MongoDB connection failed
- Data wasn't actually saved
- Check browser console for errors
- Check MongoDB connection string

### Q: "Can't delete content"
**A:** 
- Insufficient permissions (if auth added)
- MongoDB connection issue
- Server error (check logs)
- Try refreshing page and retry

---

## 📚 Learning Resources

### Q: Where can I learn more about Next.js?
**A:** https://nextjs.org/learn (official tutorial, free)

### Q: Where can I learn MongoDB?
**A:** https://university.mongodb.com/ (official courses, free)

### Q: Where can I learn Tailwind CSS?
**A:** https://tailwindcss.com/docs (official docs, very good)

### Q: How do I contact support?
**A:** 
- Vercel support: https://vercel.com/support
- MongoDB support: https://www.mongodb.com/support
- Next.js community: https://nextjs.org/community

---

## 🚀 Advanced Questions

### Q: How do I add authentication/login?
**A:** Use NextAuth.js:
1. Install: `npm install next-auth`
2. Create auth configuration
3. Add login page
4. Protect API routes with middleware

### Q: Can I add a database admin dashboard?
**A:** Yes! Options:
- MongoDB Atlas UI (built-in)
- Mongoose admin tool
- Build custom admin page

### Q: How do I backup my data?
**A:** MongoDB Atlas handles this automatically:
- Automatic daily backups
- 35-day backup retention (free tier)
- Manual backups available
- Easy restore process

### Q: Can I use this with React Native (mobile app)?
**A:** Yes! The API endpoints work with any client:
```javascript
// Works from mobile app too
fetch('https://yourapp.vercel.app/api/content')
```

### Q: How do I add analytics/tracking?
**A:** Add Vercel Web Analytics:
1. Vercel dashboard → Analytics
2. Enable Web Analytics
3. See visitor data automatically

---

## 📞 Getting Help

### Step 1: Check Documentation
1. `README.md` - Overview
2. `QUICK_START.md` - Setup
3. `DEPLOYMENT_GUIDE.md` - Deployment

### Step 2: Check FAQs
You're reading it!

### Step 3: Search Error Message
Most errors have solutions online:
- Google error message
- Check GitHub issues
- Check Stack Overflow

### Step 4: Check Logs
- Vercel: Project settings → Deployments → Logs
- MongoDB: Connection tab → Activity stream
- Browser: Right-click → Inspect → Console

### Step 5: Contact Support
- Vercel: https://vercel.com/support
- MongoDB: https://www.mongodb.com/support

---

**Still have questions?** Create an issue or check the documentation files!

Remember: "One river. One responsibility." - Make the best of what you have! 🌊
