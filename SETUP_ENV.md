# Environment Variables Setup

## What is `.env.local`?

This file stores sensitive information like database credentials that should NOT be committed to GitHub.

## Step 1: Create `.env.local` File

In your project root directory (`cms-website/`), create a file named `.env.local`

### On Windows (PowerShell):
```powershell
cd c:\Users\nikhi\cms-website
New-Item -Name ".env.local" -ItemType File
# Then open it with Notepad and paste the content below
```

### On Windows (File Explorer):
1. Open File Explorer
2. Navigate to `c:\Users\nikhi\cms-website`
3. Right-click → New → Text Document
4. Name it `.env.local`
5. Open with Notepad and paste content below

### On Mac/Linux:
```bash
cd ~/cms-website
touch .env.local
nano .env.local
```

## Step 2: Get MongoDB URI

### Get Your MongoDB Connection String:

1. Go to https://www.mongodb.com/cloud/atlas
2. Log in to your account
3. Click on your cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string
7. It should look like: `mongodb+srv://username:password@cluster.mongodb.net/`

### Format the Connection String:

Original:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
```

Replace:
- `<username>` with your database username
- `<password>` with your database password
- Add `/cms` before the `?` to specify database name

Final example:
```
mongodb+srv://myuser:mypassword123@cluster0.mongodb.net/cms?retryWrites=true&w=majority
```

## Step 3: Add to `.env.local`

Copy this to your `.env.local` file:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/cms?retryWrites=true&w=majority
```

Replace `username` and `password` with your actual MongoDB credentials.

## Step 4: Save the File

- Save the file
- Your app will automatically read from `.env.local` when you start it

## Test Your Connection

```bash
npm run dev
```

If successful, you should see:
```
> Ready in 2.1s
> Local:        http://localhost:3000
```

If you see MongoDB connection errors:
1. Check username/password are correct
2. Verify IP whitelist in MongoDB Atlas (should be 0.0.0.0/0)
3. Check `.env.local` doesn't have extra spaces

## For Vercel Deployment

1. In Vercel dashboard, go to Settings → Environment Variables
2. Add new variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string
3. Click Save
4. Redeploy

## Security Notes

⚠️ **IMPORTANT**: Never commit `.env.local` to GitHub!

Check your `.gitignore` has:
```
.env.local
.env.*.local
```

If you accidentally committed it:
1. Go to MongoDB Atlas
2. Change the database user password
3. Delete and recreate the user
4. Update `.env.local` with new password
5. Also update Vercel environment variables

## Troubleshooting

### Error: "MONGODB_URI not defined"
- Make sure `.env.local` file exists in root directory
- Restart your dev server: Stop and run `npm run dev` again

### Error: "Authentication failed"
- Username or password is wrong
- Check for extra spaces in `.env.local`
- Check MongoDB user exists with correct password

### Error: "Not authorized to access database"
- User doesn't have access to the database
- In MongoDB Atlas, go to Database Access
- Check the user has "Atlas admin" or proper roles

### Error: "IP address not whitelisted"
- In MongoDB Atlas, go to Network Access
- Add IP address or use "Allow Access from Anywhere" (0.0.0.0/0)
- Wait a few minutes for changes to take effect

## Example `.env.local`

```
# MongoDB Connection String
MONGODB_URI=mongodb+srv://cms_user:my_secure_password_123@myproject.5a9bm.mongodb.net/cms?retryWrites=true&w=majority
```

---

**Note:** The actual values above are examples. Use your real MongoDB credentials.
