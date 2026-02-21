# Simple Forum App

A lightweight forum application where users can create posts, comment, like, and interact with each other.

## Features

✓ User registration and login
✓ Create and view posts
✓ Comment on posts
✓ Like/unlike posts
✓ User profiles
✓ Completely free to deploy

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: PostgreSQL (free on Render)
- **Frontend**: React Native (Expo)
- **Hosting**: Render (free tier)

## Quick Start

### For Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step instructions.

### For Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update DATABASE_URL in .env with your PostgreSQL connection

# Start server
npm start

# Or with auto-reload
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires token)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post with comments
- `POST /api/posts` - Create post (requires token)

### Comments
- `POST /api/comments` - Add comment (requires token)

### Likes
- `POST /api/likes` - Like a post (requires token)
- `DELETE /api/likes/:post_id` - Unlike a post (requires token)
- `GET /api/likes/:post_id` - Check if user liked post (requires token)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (requires token)

## Database Schema

### users
- id (primary key)
- username (unique)
- email (unique)
- password (hashed)
- bio
- avatar_url
- created_at

### posts
- id (primary key)
- user_id (foreign key)
- title
- content
- created_at
- updated_at

### comments
- id (primary key)
- post_id (foreign key)
- user_id (foreign key)
- content
- created_at

### likes
- id (primary key)
- post_id (foreign key)
- user_id (foreign key)
- created_at

## Environment Variables

```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-secret-key
PORT=3000
```

## Deployment

### On Render (Free)

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Add PostgreSQL database
4. Set environment variables
5. Deploy!

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed steps.

## Mobile App

The mobile app (React Native with Expo) is available separately.

To use:
1. Download Expo Go app
2. Scan QR code provided
3. Enter your API URL
4. Start using!

## Free Tier Limitations

- Render Web Service: Sleeps after 15 minutes (auto-wakes)
- Render Database: 90 days free, then $7/month
- First request takes ~30 seconds (normal)
- Limited to ~100 concurrent connections

## Support

For issues:
1. Check the DEPLOYMENT_GUIDE.md
2. Review error messages
3. Check Render dashboard logs

## License

MIT

## Author

Built with ❤️ for simple forum communities
