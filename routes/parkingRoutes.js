const express = require('express');
const router = express.Router();
const { checkIn, checkOut, getAvailability } = require('../controllers/parkingController');

router.post('/checkin', checkIn);
router.post('/checkout', checkOut);
router.get('/availability', getAvailability);

module.exports = router;
