const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authGuestController = require('../controllers/authGuestController');

router.use(authGuestController.protect);

router.get('/checkout-session/:id', bookingController.getCheckoutSession)
router.post('/', bookingController.createBookingCheckout)
router.get('/my-places',authGuestController.restrictTo('guest', 'admin'), bookingController.myPlaces)
router.get('/mybooking',authGuestController.restrictTo('guest', 'admin'), bookingController.myBooking)


module.exports = router;