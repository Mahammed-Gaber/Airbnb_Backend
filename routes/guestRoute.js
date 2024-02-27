const express = require('express');
const multer = require('multer');
const path =require('path');
const guestController = require('../controllers/guestController');
const router = express.Router();
const bcrypt = require('bcrypt');
const sendEmail = require('../nodeMailer');
const catchAsync = require('../utils/catchAsync');
const authController = require('../controllers/authController');


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

// signup user
router.post('/signup',Upload.single('guest_picture'), authController.signup)
router.post('/login', authController.login)


// get All Guests
router.get('/showGuests', authController.protect, catchAsync(
async (req , res , next) => {
        let data = await guestController.getAllGuests()
        if (data) {
            // sendEmail(email, 'welcome')
            res.status(200).json({
                status : 'success',
                data: {
                    guest : data,
                },
            });
        }
}))
// Register & Add guest
router.post('/register', Upload.single('guest_picture'), authController.signup)



// update data
router.put('/update', (req, res) => {
    try {

    } catch (error) {
        
    }
})

// router.get('/All', guestController.getAllGuests)


module.exports= router;