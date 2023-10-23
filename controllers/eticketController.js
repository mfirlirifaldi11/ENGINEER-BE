// controllers/eticketController.js
const db = require('../config/database');

// Membuat ETicket (hanya Mitra yang diizinkan)
exports.createETicket = (req, res) => {
  // Pastikan hanya Mitra yang dapat membuat ETicket
  if (req.user.role !== 'Mitra') {
    return res.status(403).json({ message: 'Akses ditolak. Hanya Mitra yang diizinkan membuat ETicket.' });
  }

  const { event_name, event_date, event_location } = req.body;

  // Validasi data (pastikan semua field diisi)

  // Simpan data ETicket ke basis data
  const sql = 'INSERT INTO ETicket (user_id, event_name, event_date, event_location, status) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [req.user.id, event_name, event_date, event_location, 'Pending'], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat membuat ETicket.' });
    }

    // ETicket berhasil dibuat
    res.status(201).json({ message: 'ETicket berhasil dibuat.' });
  });
};

// Mendapatkan daftar ETicket
exports.getETickets = (req, res) => {
  // Mendapatkan daftar ETicket dari basis data
  const sql = 'SELECT * FROM ETicket';
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mengambil daftar ETicket.' });
    }

    res.status(200).json({ etickets: results });
  });
};

// Menyetujui ETicket (hanya Admin yang diizinkan)
exports.approveETicket = (req, res) => {
  // Pastikan hanya Admin yang dapat menyetujui ETicket
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Akses ditolak. Hanya Admin yang diizinkan menyetujui ETicket.' });
  }

  const eticketId = req.params.id;

  // Lakukan persetujuan ETicket (misalnya, mengubah status menjadi 'Approved')
  const sql = 'UPDATE ETicket SET status = ? WHERE id = ?';
  db.query(sql, ['Approved', eticketId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat menyetujui ETicket.' });
    }

    res.status(200).json({ message: 'ETicket berhasil disetujui.' });
  });
};
