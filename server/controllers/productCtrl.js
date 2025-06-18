const db = require('../db');

exports.list = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products');
  res.json(rows);
};
