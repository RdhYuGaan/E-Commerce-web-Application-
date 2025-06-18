const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Incoming data:', email, password); // ✅ Add this line

    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash]);
    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Register Error:', error); // ✅ This will give full error in your terminal
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




exports.login = async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  if (!rows.length) return res.status(400).json({ message: 'No user found' });

  const isMatch = await bcrypt.compare(password, rows[0].password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: rows[0].id }, 'secret');
  res.json({ token });
};
