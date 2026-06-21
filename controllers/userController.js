const db = require('../db');

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email=? AND password=?',
    [email, password],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.status(401).json({ message: 'Login gagal' });
      }

      res.json({
        message: 'Login berhasil',
        user: result[0]
      });
    }
  );
};