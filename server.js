const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// ============================
// DATA INVENTARIS (DUMMY DB)
// ============================
let items = [
  {
    id: 1,
    kode: 'BRG-0001',
    name: 'Pulpen',
    stock: 50,
    kategori: 'ATK',
    lokasi: 'Gudang A',
    kondisi: 'Baik',
    status: 'AKTIF',
    penanggung_jawab: 'Kaur TU'
  },
  {
    id: 2,
    kode: 'BRG-0002',
    name: 'Buku Tulis',
    stock: 30,
    kategori: 'ATK',
    lokasi: 'Gudang B',
    kondisi: 'Baik',
    status: 'AKTIF',
    penanggung_jawab: 'Kaur TU'
  },
  {
    id: 3,
    kode: 'BRG-0003',
    name: 'Laptop ASUS',
    stock: 5,
    kategori: 'Elektronik',
    lokasi: 'Ruang IT',
    kondisi: 'Baik',
    status: 'AKTIF',
    penanggung_jawab: 'Admin IT'
  }
];

// ============================
// GET ALL ITEMS
// ============================
app.get('/items', (req, res) => {
  res.json(items);
});

// ============================
// GET BY ID (lama)
// ============================
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id == req.params.id);

  if (!item) {
    return res.status(404).json({ message: 'Barang tidak ditemukan' });
  }

  res.json(item);
});

// ============================
// GET BY KODE (QR INSTANSI)
// ============================
app.get('/items-kode/:kode', (req, res) => {
  const kode = req.params.kode;

  const item = items.find(i => i.kode === kode);

  if (!item) {
    return res.status(404).json({ message: 'Barang tidak ditemukan' });
  }

  res.json(item);
});

// ============================
// TAMBAH BARANG + AUTO KODE BRG-000X
// ============================
app.post('/items', (req, res) => {

  const newId = items.length + 1;

  const newItem = {
    id: newId,
    kode: `BRG-${String(newId).padStart(4, '0')}`,
    name: req.body.name,
    stock: req.body.stock,
    kategori: req.body.kategori || 'ATK',
    lokasi: req.body.lokasi || 'Gudang',
    kondisi: req.body.kondisi || 'Baik',
    status: req.body.status || 'AKTIF',
    penanggung_jawab: req.body.penanggung_jawab || 'Admin'
  };

  items.push(newItem);

  res.json({
    message: 'Barang berhasil ditambahkan',
    data: newItem
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});