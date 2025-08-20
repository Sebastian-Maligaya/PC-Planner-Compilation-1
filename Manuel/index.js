require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB Connection Error:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// API Route
app.get('/api/builds/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  const sql = 'SELECT * FROM pc_builds WHERE LOWER(category) = ?';

  db.query(sql, [category], (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      return res.status(500).json({ error: 'Server Error' });
    }
    res.json(results);
  });
});

app.get('/api/builds/all', (req, res) => {
  const sql = 'SELECT * FROM pc_builds';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Query Error:', err);
      return res.status(500).json({ error: 'Server Error' });
    }
    res.json(results);
  });
});


// Root route
app.get('/', (req, res) => {
  res.send('✅ API is working');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});


