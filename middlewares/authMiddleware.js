// middlewares/authMiddleware.js

require('dotenv').config();
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Periksa apakah token ada
  if (!token) {
    return res.status(401).json({ message: 'Tidak ada token otentikasi, akses ditolak.' });
  }

// Di dalam middleware otentikasi (authMiddleware.js)
console.log('Token received:', token);

try {
  // Verifikasi token
  const decoded = jwt.verify(token, secretKey);
  req.user = decoded;

  console.log(decoded)

  // Lanjutkan ke fungsi berikutnya
  next();
} catch (error) {
  console.error(error);
  res.status(401).json({ message: 'Token otentikasi tidak valid, akses ditolak.' });
}

};
