// controllers/authController.js

require('dotenv').config();
const db = require('../config/database');
const bcrypt = require('bcrypt'); // Untuk meng-hash password
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Validasi data (misalnya, pastikan semua field diisi)

  // Hash password sebelum menyimpannya di database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat registrasi.' });
    }

    // Simpan data pengguna ke database
    const sql = 'INSERT INTO Users (username, email, password) VALUES (?, ?, ?)';
    db.query(sql, [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat registrasi.' });
      }

      // Registrasi berhasil
      res.status(201).json({ message: 'Registrasi berhasil.' });
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Temukan pengguna berdasarkan alamat email
  const sql = 'SELECT * FROM Users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Email atau kata sandi salah.' });
    }

    const user = results[0];

    // Verifikasi kata sandi
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
      }

      if (!passwordMatch) {
        return res.status(401).json({ message: 'Email atau kata sandi salah.' });
      }

      // Buat token otentikasi
      const token = jwt.sign({ userId: user.id, email: user.email }, secretKey, { expiresIn: '1h' });

      const decoded = jwt.verify(token, secretKey);
      req.user = decoded;

      // Kirim token dalam respons
      res.status(200).json({ message: 'Login berhasil.', user, token }); // Mengirim token dalam respons
    });
  });
};