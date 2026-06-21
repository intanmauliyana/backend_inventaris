const db = require('../db');

// GET items
exports.getItems = (req, res) => {
  db.query('SELECT * FROM items ORDER BY name ASC', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// POST item
exports.createItem = (req, res) => {
  let { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Nama kosong' });
  }

  name = name.trim();

  db.query(
    'INSERT INTO items (name) VALUES (?)',
    [name],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ message: 'Item sudah ada' });
        }
        return res.status(500).send(err);
      }

      res.json({
        id: result.insertId,
        name
      });
    }
  );
};