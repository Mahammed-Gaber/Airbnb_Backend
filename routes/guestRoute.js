const express = require('express');
const multer = require('multer');
const path =require('path');
const router = express.Router();
const guestController = require('../controllers/guestController');
const authGuestController = require('../controllers/authGuestController');

// Upload ur imgs 
const storeImage = multer.diskStorage({
    destination : (req, file, callback)=> {
        callback(null, path.join(__dirname, '..', 'images'))
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const Upload = multer( {storage: storeImage} );


router.post('/signup',Upload.single('guest_picture'), authGuestController.signup);
router.post('/login', authGuestController.login)

router.post('/forgotPasword', authGuestController.forgotPassword)
router.post('/resetPassword', authGuestController.resetPassword)

router.use(authGuestController.protect);

router.get('/showGuests',  authGuestController.restrictTo('admin'), guestController.getAllGuests)
router.put('/:id', authGuestController.restrictTo('guest'),guestController.updateGuest);
router.delete('/:id', authGuestController.restrictTo('admin', 'guest'), guestController.deleteGuest);


module.exports= router;