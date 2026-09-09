import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config(); // fallback to .env

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

const dbUrl = process.env.DATABASE_URL;
const sql = dbUrl ? neon(dbUrl) : null;

// Health Check Endpoint (For UptimeRobot & Render)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Menu Items API
app.get('/api/menu', async (req, res) => {
  try {
    if (!sql) {
      return res.status(500).json({ error: 'DATABASE_URL not configured' });
    }
    const items = await sql`SELECT * FROM menu_items ORDER BY id ASC;`;
    res.json(items);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`⚡ Bistro 57 Backend API running on port ${PORT}`);
});
