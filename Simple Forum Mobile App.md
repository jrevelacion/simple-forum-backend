# Simple Forum Mobile App

A React Native mobile app for the Simple Forum platform. Built with Expo for easy deployment.

## Features

- User registration and login
- View forum feed
- Create posts
- Comment on posts
- Like posts
- View user profiles
- Fully responsive design

## Tech Stack

- React Native
- Expo
- Axios (API calls)
- Expo Secure Store (token storage)

## Setup

### Prerequisites

- Node.js 16+
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the app:
   ```bash
   npm start
   ```

4. Scan the QR code with Expo Go app on your phone

## Configuration

The app connects to the backend API. Update the API URL in `api.js` if needed:

```javascript
let API_URL = 'http://localhost:3000'; // Change this to your backend URL
```

For production, use your Render backend URL:
```javascript
let API_URL = 'https://simple-forum-api.onrender.com';
```

## File Structure

```
.
├── _layout.js                 # Root layout
├── AuthContext.js             # Authentication state
├── api.js                     # API client
├── app.json                   # Expo configuration
├── package.json               # Dependencies
├── auth/
│   ├── _layout.js            # Auth navigation
│   ├── login.js              # Login screen
│   └── register.js           # Registration screen
└── (app)/
    ├── _layout.js            # App navigation
    ├── home.js               # Home feed
    ├── create-post.js        # Create post
    ├── post/[id].js          # Post detail & comments
    └── profile/[id].js       # User profile
```

## Screens

### Authentication
- **Login**: Sign in with email and password
- **Register**: Create new account

### Main App
- **Home Feed**: View all posts, like posts
- **Create Post**: Write new post
- **Post Detail**: View full post and comments
- **User Profile**: View user info and their posts

## Development

### Hot Reload
Changes are automatically reloaded when you save files.

### Debugging
Open the Expo Go app and shake your phone to access the developer menu.

## Deployment

See the backend repository's DEPLOYMENT_GUIDE.md for full deployment instructions.

## Troubleshooting

### "Cannot connect to API"
- Check the API URL in `api.js`
- Make sure backend is running
- On Android emulator, use `10.0.2.2` instead of `localhost`

### "Module not found"
- Run `npm install` again
- Clear cache: `npm start -- --reset-cache`

### "Blank screen"
- Check console for errors
- Restart Expo: Press `r` in terminal

## Support

For issues, check the backend repository or review error messages in the console.
