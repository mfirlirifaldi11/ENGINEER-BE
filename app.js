// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authMiddleware = require('./middlewares/authMiddleware');

// Middleware untuk parsing JSON
app.use(express.json());

// Inisialisasi koneksi ke database
const db = require('./config/database');

// ... Definisikan rute dan kontroler di sini ...

// Rute untuk registrasi
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const attendanceRoutes = require('./routes/attendanceRoutes');
// app.use(authMiddleware);
app.use('/attendance', attendanceRoutes);

// Mulai server
app.listen(port, () => {
  console.log(`Application Running in http://localhost:${port}`);
});