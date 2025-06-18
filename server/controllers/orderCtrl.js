const db = require('../db');

exports.place = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  await db.query('INSERT INTO orders (user_id, product_id) VALUES (?, ?)', [userId, productId]);
  res.json({ message: 'Order placed' });
};

exports.list = async (req, res) => {
  const userId = req.user.id;
  const [rows] = await db.query(`SELECT o.id, p.name AS product_name, o.status FROM orders o
    JOIN products p ON o.product_id = p.id WHERE o.user_id = ?`, [userId]);
  res.json(rows);
};

exports.cancel = async (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.user.id;
  await db.query('UPDATE orders SET status = "cancelled" WHERE id = ? AND user_id = ?', [orderId, userId]);
  res.json({ message: 'Order cancelled' });
};
