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
let users = [
  {
    id: 1,
    email: "kaurtu@kejaksaan.go.id",
    password: "123",
    role: "kaur_tu"
  },
  {
    id: 2,
    email: "operator",
    password: "123",
    role: "operator"
  },
  {
    id: 3,
    email: "kajari",
    password: "123",
    role: "kajari"
  },
  {
    id: 4,
    email: "kasubbagbin",
    password: "123",
    role: "kasubbagbin"
  }
];

// ============================
// GET ALL ITEMS
// ============================
app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/users', (req, res) => {
  res.json(users);
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


app.get('/items-kode/:kode', (req, res) => {
  const kode = req.params.kode;

  const item = items.find(i => i.kode === kode);

  if (!item) {
    return res.status(404).json({ message: 'Barang tidak ditemukan' });
  }

  res.json(item);
});


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

app.get('/', (req, res) => {
  res.send('Backend Inventaris Aktif ✔');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server jalan di port " + PORT);
});