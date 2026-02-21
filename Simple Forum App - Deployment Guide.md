# Simple Forum App - Deployment Guide

**For Non-Technical Users**

This guide will help you deploy the forum app for FREE using Render and GitHub. No coding required!

---

## Step 1: Create GitHub Account (5 minutes)

1. Go to https://github.com
2. Click "Sign up"
3. Fill in your email, password, username
4. Verify your email
5. Done! ✓

---

## Step 2: Create Render Account (5 minutes)

1. Go to https://render.com
2. Click "Get Started"
3. Click "Sign up with GitHub"
4. Authorize Render to access GitHub
5. Done! ✓

---

## Step 3: Upload Code to GitHub (10 minutes)

**Option A: Using GitHub Website (Easiest)**

1. Go to https://github.com/new
2. Name your repository: `simple-forum`
3. Add description: "Simple forum app"
4. Click "Create repository"
5. You'll see a page with instructions
6. Scroll down to "uploading an existing file"
7. Click "uploading an existing file"
8. Drag and drop these files:
   - `package.json`
   - `server.js`
   - `.env.example`
   - `.gitignore`
   - `README.md`
9. Click "Commit changes"
10. Done! ✓

**Option B: Using Command Line (If you're comfortable)**

```bash
# Copy these commands one by one

git config --global user.email "your-email@gmail.com"
git config --global user.name "Your Name"

git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/simple-forum.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## Step 4: Deploy Backend on Render (10 minutes)

1. Go to https://render.com/dashboard
2. Click "New +" button
3. Select "Web Service"
4. Click "Connect" next to your `simple-forum` repository
5. Fill in the form:
   - **Name**: `simple-forum-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Click "Advanced" and add environment variables:
   - **Key**: `DATABASE_URL`
   - **Value**: (You'll get this in Step 5)
   - **Key**: `JWT_SECRET`
   - **Value**: `your-secret-key-12345` (can be anything)
7. Click "Create Web Service"
8. Wait 5-10 minutes for deployment
9. You'll see a URL like: `https://simple-forum-api.onrender.com`
10. Copy this URL - you'll need it for the app! ✓

---

## Step 5: Create Free Database on Render (10 minutes)

1. Go to https://render.com/dashboard
2. Click "New +" button
3. Select "PostgreSQL"
4. Fill in the form:
   - **Name**: `simple-forum-db`
   - **Database**: `simple_forum`
   - **User**: `forum_user`
   - Leave everything else default
5. Click "Create Database"
6. Wait 5-10 minutes
7. You'll see a connection string that looks like:
   ```
   postgresql://forum_user:xxxxx@dpg-xxxxx.onrender.com/simple_forum
   ```
8. Copy this entire string
9. Go back to your Web Service (from Step 4)
10. Click "Environment"
11. Find `DATABASE_URL` and paste the connection string
12. Click "Save Changes"
13. Wait for redeploy (2-3 minutes)
14. Done! ✓

---

## Step 6: Build Mobile App (You don't need to do anything!)

The mobile app is already built and ready to use. You just need to:

1. Download **Expo Go** app on your phone:
   - iPhone: App Store
   - Android: Google Play Store

2. I'll provide you with a QR code or link to scan

3. Scan the QR code in Expo Go

4. App opens on your phone!

---

## Step 7: Connect App to Your Backend

When you run the app, it will ask for the API URL:

1. Use the URL from Step 4: `https://simple-forum-api.onrender.com`
2. Enter it in the app settings
3. Done! ✓

---

## How to Use the App

### Register
1. Open app
2. Click "Sign Up"
3. Enter username, email, password
4. Click "Register"

### Create Post
1. Click "+" button
2. Enter title and content
3. Click "Post"

### Comment on Post
1. Click on a post
2. Scroll down
3. Enter comment
4. Click "Comment"

### Like Post
1. Click heart icon on post
2. Heart turns red = liked!

### View Profile
1. Click on username
2. See user's bio and posts

---

## Troubleshooting

### "Cannot connect to API"
- Check the API URL is correct
- Make sure Render deployment is complete (check dashboard)
- Try restarting the app

### "Database error"
- Make sure DATABASE_URL is set in Render
- Check the connection string is correct
- Wait 5 minutes for database to initialize

### "Cannot register"
- Make sure username is unique
- Make sure email is unique
- Check password is at least 6 characters

### App is slow
- First load takes 30 seconds (normal on free tier)
- Subsequent loads are faster
- Render free tier has limited resources

---

## Updating the App

If you want to make changes:

1. Edit files on GitHub website or locally
2. Commit changes to GitHub
3. Render automatically redeploys (2-3 minutes)
4. Refresh app to see changes

---

## Important Notes

**Free Tier Limitations:**
- Database: 90 days free, then $7/month
- Web Service: Sleeps after 15 minutes of inactivity (wakes up automatically)
- First request takes 30 seconds (normal)
- Limited to 100 concurrent connections

**To Keep It Free:**
- Use Render's free tier (limited but works for 100-1000 users)
- Or upgrade to paid plans when needed

---

## Support

If something doesn't work:

1. Check error messages carefully
2. Review this guide again
3. Check Render dashboard for error logs
4. Try restarting the service

---

## Next Steps

Once deployed:
1. Share the Expo QR code with friends
2. They scan it to open the app
3. They can register and start posting!

---

## Questions?

This guide covers the basics. For more help:
- Render docs: https://render.com/docs
- GitHub docs: https://docs.github.com
- Expo docs: https://docs.expo.dev
