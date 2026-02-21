const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Initialize database
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        bio TEXT,
        avatar_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS likes (
        id SERIAL PRIMARY KEY,
        post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(post_id, user_id)
      );
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Database init error:', error);
  }
}

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ===== AUTH ROUTES =====

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET);
    res.json({ user: result.rows[0], token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({ 
      user: { id: user.id, username: user.username, email: user.email, bio: user.bio, avatar_url: user.avatar_url },
      token 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get current user
app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, bio, avatar_url FROM users WHERE id = $1', [req.userId]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== USER ROUTES =====

// Get user profile
app.get('/api/users/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, username, bio, avatar_url, created_at FROM users WHERE id = $1',
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update user profile
app.put('/api/users/:id', verifyToken, async (req, res) => {
  try {
    if (req.userId !== parseInt(req.params.id)) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { bio, avatar_url } = req.body;
    const result = await pool.query(
      'UPDATE users SET bio = $1, avatar_url = $2 WHERE id = $3 RETURNING id, username, bio, avatar_url',
      [bio, avatar_url, req.userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== POST ROUTES =====

// Get all posts
app.get('/api/posts', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.id, p.title, p.content, p.created_at, p.user_id,
             u.username, u.avatar_url,
             COUNT(DISTINCT l.id) as like_count,
             COUNT(DISTINCT c.id) as comment_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      LEFT JOIN comments c ON p.id = c.post_id
      GROUP BY p.id, u.id
      ORDER BY p.created_at DESC
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get single post with comments
app.get('/api/posts/:id', async (req, res) => {
  try {
    const postResult = await pool.query(`
      SELECT p.id, p.title, p.content, p.created_at, p.user_id,
             u.username, u.avatar_url,
             COUNT(DISTINCT l.id) as like_count
      FROM posts p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN likes l ON p.id = l.post_id
      WHERE p.id = $1
      GROUP BY p.id, u.id
    `, [req.params.id]);

    if (postResult.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const commentsResult = await pool.query(`
      SELECT c.id, c.content, c.created_at, c.user_id, u.username, u.avatar_url
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = $1
      ORDER BY c.created_at ASC
    `, [req.params.id]);

    res.json({
      ...postResult.rows[0],
      comments: commentsResult.rows
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create post
app.post('/api/posts', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const result = await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [req.userId, title, content]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== COMMENT ROUTES =====

// Add comment
app.post('/api/comments', verifyToken, async (req, res) => {
  try {
    const { post_id, content } = req.body;
    
    if (!post_id || !content) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const result = await pool.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *',
      [post_id, req.userId, content]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ===== LIKE ROUTES =====

// Like post
app.post('/api/likes', verifyToken, async (req, res) => {
  try {
    const { post_id } = req.body;
    
    if (!post_id) {
      return res.status(400).json({ error: 'Missing post_id' });
    }

    await pool.query(
      'INSERT INTO likes (post_id, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
      [post_id, req.userId]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Unlike post
app.delete('/api/likes/:post_id', verifyToken, async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
      [req.params.post_id, req.userId]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check if user liked post
app.get('/api/likes/:post_id', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id FROM likes WHERE post_id = $1 AND user_id = $2',
      [req.params.post_id, req.userId]
    );
    res.json({ liked: result.rows.length > 0 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3000;
initDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
