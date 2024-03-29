const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authGuestController = require('../controllers/authGuestController');

router.use(authGuestController.protect);

// router.get('/checkout-session', bookingController.getCheckoutSession)
router.post('/', bookingController.createBookingCheckout)
router.get('/my-places',authGuestController.restrictTo('guest', 'admin'), bookingController.myPlaces)


module.exports = router;