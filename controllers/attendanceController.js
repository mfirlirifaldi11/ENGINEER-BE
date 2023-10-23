// controllers/attendanceController.js

require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
const db = require('../config/database');

exports.recordAttendance = (req, res) => {
 // Mengambil ID pengguna dari middleware otentikasi
  const token = req.header('x-auth-token');
  const { check_in, check_out,  date} = req.body;

  if (!token) {
    return res.status(401).json({ message: 'Tidak ada token otentikasi, akses ditolak.' });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, secretKey);
    user = decoded;

    const userId = user.userId

    console.log(userId)
  
    // Lanjutkan ke fungsi berikutnya
  
      // Simpan data absensi ke basis data
  const sql = 'INSERT INTO Attendance (user_id, check_in, check_out, date) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, check_in, check_out, date], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat mencatat absensi.' });
    }

    // Absensi berhasil dicatat
    res.status(201).json({ message: 'Absensi berhasil dicatat.' });
  });
    
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token otentikasi tidak valid, akses ditolak.' });
  }


};
