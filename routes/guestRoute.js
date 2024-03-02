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
router.get('/showGuests', authGuestController.protect, authGuestController.strect('admin'), guestController.getAllGuests)
router.put('/:id',authGuestController.protect, guestController.updateGuest);
router.delete('/:id',authGuestController.protect, authGuestController.strect('admin', 'guest'), guestController.deleteGuest);






module.exports= router;