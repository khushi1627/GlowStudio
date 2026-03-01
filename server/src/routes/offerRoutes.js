const express = require('express');
const { getOffers, createOffer } = require('../controllers/offerController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getOffers);
router.post('/', protect, adminOnly, createOffer);

module.exports = router;
