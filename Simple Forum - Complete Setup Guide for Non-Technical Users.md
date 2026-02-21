# Simple Forum - Complete Setup Guide for Non-Technical Users

**Don't worry! This guide is written for people with NO coding experience.**

---

## What You're Building

A mobile forum app where:
- People can register and create accounts
- Users post messages/topics
- Others can comment on posts
- People can like posts
- Everyone has a profile

**Everything is FREE to deploy!**

---

## What You Need

1. **A computer** (Windows, Mac, or Linux)
2. **Internet connection**
3. **GitHub account** (free) - like a folder in the cloud for your code
4. **Render account** (free) - where your app will run
5. **A phone** - to test the app

---

## Step-by-Step Setup

### PART 1: Create GitHub Account (5 minutes)

1. Go to https://github.com
2. Click the big "Sign up" button
3. Enter your email address
4. Create a password
5. Choose a username (this will be your GitHub name)
6. Verify your email (GitHub will send you an email)
7. **Done!** ✓

### PART 2: Upload Backend Code to GitHub (10 minutes)

**The backend is the engine that runs your forum.**

1. Go to https://github.com/new
2. You'll see a form. Fill it like this:
   - **Repository name**: `simple-forum-backend`
   - **Description**: `Backend for simple forum app`
   - **Public**: Yes (keep it public)
3. Click "Create repository"
4. You'll see a page with instructions. Scroll down to "uploading an existing file"
5. Click "uploading an existing file"
6. Drag and drop these files from your computer:
   - `package.json`
   - `server.js`
   - `.env.example`
   - `.gitignore`
   - `README.md`
7. Click "Commit changes"
8. **Done!** ✓

### PART 3: Create Render Account (5 minutes)

1. Go to https://render.com
2. Click "Get Started"
3. Click "Sign up with GitHub"
4. It will ask permission - click "Authorize"
5. **Done!** ✓

### PART 4: Deploy Backend on Render (10 minutes)

**This is where your backend app will live.**

1. Go to https://render.com/dashboard
2. Click the blue "+ New" button
3. Select "Web Service"
4. Look for `simple-forum-backend` repository and click "Connect"
5. Fill in the form:
   - **Name**: `simple-forum-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
6. Click "Advanced" to expand more options
7. Click "Add Environment Variable"
8. Add these:
   - **Key**: `JWT_SECRET` | **Value**: `my-secret-key-12345`
   - **Key**: `DATABASE_URL` | **Value**: (You'll add this in next step)
9. For now, just click "Create Web Service"
10. Wait 5-10 minutes for deployment
11. You'll see a URL like: `https://simple-forum-api.onrender.com`
12. **Copy this URL - you'll need it!** ✓

### PART 5: Create Database on Render (10 minutes)

**The database is where all your forum data (posts, comments, users) is stored.**

1. Go to https://render.com/dashboard
2. Click "+ New"
3. Select "PostgreSQL"
4. Fill in:
   - **Name**: `simple-forum-db`
   - **Database**: `simple_forum`
   - **User**: `forum_user`
   - Leave everything else as default
5. Click "Create Database"
6. Wait 5-10 minutes
7. You'll see a long connection string that starts with `postgresql://`
8. **Copy the entire connection string** ✓

### PART 6: Connect Database to Backend (5 minutes)

1. Go back to https://render.com/dashboard
2. Click on your Web Service: `simple-forum-api`
3. Click "Environment" tab
4. Find the `DATABASE_URL` variable (or add it if missing)
5. Paste the connection string you copied
6. Click "Save Changes"
7. Wait 2-3 minutes for redeploy
8. **Done!** ✓

### PART 7: Upload Mobile App Code to GitHub (10 minutes)

**The mobile app is what users see on their phones.**

1. Go to https://github.com/new
2. Fill in:
   - **Repository name**: `simple-forum-mobile`
   - **Description**: `Mobile app for simple forum`
   - **Public**: Yes
3. Click "Create repository"
4. Click "uploading an existing file"
5. Drag and drop all files from the mobile app folder
6. Click "Commit changes"
7. **Done!** ✓

---

## Testing the App

### On Your Phone

1. Download **Expo Go** app:
   - iPhone: App Store
   - Android: Google Play Store

2. Open Expo Go

3. I'll provide you with a QR code or link

4. Scan it with Expo Go

5. App opens on your phone!

### First Test

1. Click "Sign Up"
2. Create an account with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Sign Up"
4. You should see the home feed
5. Click the "+" button to create a post
6. Write a test post
7. Click "Post"
8. Go back to home - you should see your post!
9. Click on your post to see comments
10. Add a comment
11. Click the heart to like the post
12. Click the profile icon to see your profile

**If everything works, you're done!** ✓

---

## Sharing with Others

Once deployed, you can share the app with friends:

1. They download Expo Go
2. You give them the QR code or link
3. They scan it
4. App opens on their phone
5. They can register and start using!

---

## Troubleshooting

### "Cannot connect to API"
**Solution**: 
- Make sure your backend is deployed on Render
- Check the API URL in the mobile app settings
- Make sure database is connected

### "Database error"
**Solution**:
- Go to Render dashboard
- Check if database is running
- Check if DATABASE_URL is set correctly

### "Cannot register"
**Solution**:
- Make sure username is unique (not used before)
- Make sure email is unique
- Password must be at least 6 characters

### "App is very slow"
**Solution**:
- This is normal on free tier (first request takes 30 seconds)
- Subsequent requests are faster
- Free tier has limited resources

---

## Important Notes

### Free Tier Limitations

- **Web Service**: Sleeps after 15 minutes of no use (wakes up automatically)
- **Database**: Free for 90 days, then $7/month
- **First request**: Takes ~30 seconds (normal)
- **Users**: Can handle 100-1000 users

### To Keep It Free

- Use Render's free tier (limited but works)
- Or upgrade to paid when you need more power

### If You Want to Upgrade

- Render database: $7/month for more storage
- Render web service: $7/month for always-on
- Still very affordable!

---

## What Happens Next?

1. **Users register** - They create accounts
2. **Users post** - They write posts
3. **Users comment** - They reply to posts
4. **Users like** - They like posts they enjoy
5. **Community grows** - More posts, more engagement

---

## Getting Help

If something doesn't work:

1. **Check error messages** - They usually tell you what's wrong
2. **Restart the app** - Close and reopen Expo Go
3. **Check Render dashboard** - See if services are running
4. **Check GitHub** - Make sure code is uploaded

---

## Summary

You now have:
- ✓ Backend API running on Render
- ✓ Database running on Render
- ✓ Mobile app ready to use
- ✓ Everything is FREE

**Congratulations! You've built a forum app!** 🎉

---

## Next Steps (Optional)

Want to add more features?

1. **Custom domain** - Use your own domain name
2. **Custom branding** - Change colors and logo
3. **More features** - Add notifications, search, etc.

For now, enjoy your forum app!

---

## Questions?

If you have questions:
1. Check the README files
2. Review error messages
3. Check Render dashboard logs

**You've got this!** 💪
