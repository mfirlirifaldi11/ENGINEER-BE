const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const eticketController = require('../controllers/eticketController');

// Membuat ETicket (hanya Mitra yang diizinkan)
router.post('/eticket', authMiddleware, authMiddleware.checkUserRole(['Mitra']), eticketController.createETicket);

// Mendapatkan daftar ETicket
router.get('/eticket', authMiddleware, eticketController.getETickets);

// Menyetujui ETicket (hanya Admin yang diizinkan)
router.patch('/eticket/approve/:id', authMiddleware, authMiddleware.checkUserRole(['Admin']), eticketController.approveETicket);

module.exports = router;