const db = require('../db');

// GET
exports.getAll = (req, res) => {
  db.query('SELECT * FROM pengajuan ORDER BY tanggal DESC', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// POST
exports.create = (req, res) => {
  const {
    id,
    nama_barang,
    jumlah,
    bidang,
    keterangan,
    status,
    tanggal
  } = req.body;

  if (!nama_barang || !jumlah || !bidang || !keterangan) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  db.query(
    `INSERT INTO pengajuan
    (id, nama_barang, jumlah, bidang, keterangan, status, alasan, tanggal)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      nama_barang,
      jumlah,
      bidang,
      keterangan,
      status || 'DIAJUKAN',
      '',
      tanggal
    ],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Berhasil tambah' });
    }
  );
};

// UPDATE
exports.update = (req, res) => {
  const { id } = req.params;
  const { nama_barang, jumlah, bidang, keterangan } = req.body;

  db.query(
    `UPDATE pengajuan 
     SET nama_barang=?, jumlah=?, bidang=?, keterangan=? 
     WHERE id=?`,
    [nama_barang, jumlah, bidang, keterangan, id],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
      }

      res.json({ message: 'Berhasil update' });
    }
  );
};

// DELETE
exports.remove = (req, res) => {
  db.query(
    'DELETE FROM pengajuan WHERE id=?',
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
      }

      res.json({ message: 'Berhasil dihapus' });
    }
  );
};

// ACC
exports.acc = (req, res) => {
  db.query(
    `UPDATE pengajuan SET status='DITERIMA', alasan='' WHERE id=?`,
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'ACC berhasil' });
    }
  );
};

// TOLAK
exports.tolak = (req, res) => {
  const { alasan } = req.body;

  db.query(
    `UPDATE pengajuan SET status='DITOLAK', alasan=? WHERE id=?`,
    [alasan || '', req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Ditolak' });
    }
  );
};