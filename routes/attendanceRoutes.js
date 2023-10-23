// routes/attendanceRoutes.js

const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlewares/authMiddleware'); // Mengimpor middleware otentikasi

// Rute untuk mencatat absensi
router.post('/absen', attendanceController.recordAttendance);

module.exports = router;
