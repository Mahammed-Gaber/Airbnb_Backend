const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authGuestController = require('../controllers/authGuestController');


router.get('/checkout-session', authGuestController.protect, bookingController.getCheckoutSession)
router.get('/', authGuestController.protect, bookingController.createBookingCheckout)
router.get('/my-places', authGuestController.protect, bookingController.myPlaces)


module.exports = router;