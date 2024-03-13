const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authGuestController = require('../controllers/authGuestController');

router.use(authGuestController.protect);

// router.get('/checkout-session', bookingController.getCheckoutSession)
router.get('/', bookingController.createBookingCheckout)
router.get('/my-places', bookingController.myPlaces)


module.exports = router;