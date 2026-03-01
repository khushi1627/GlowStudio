const express = require('express');
const {
  createAppointment,
  myAppointments,
  allAppointments,
  updateStatus
} = require('../controllers/appointmentController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createAppointment);
router.get('/mine', protect, myAppointments);
router.get('/', protect, adminOnly, allAppointments);
router.patch('/:id/status', protect, adminOnly, updateStatus);

module.exports = router;
