const express = require('express');
const multer = require('multer');
const path =require('path');
const guestController = require('../controllers/guestController');
const route = express.Router();

// Upload ur imgs 
const storeImage = multer.diskStorage({
    destination : (req, file, callback)=> {
        callback(null, path.join(__dirname, '..', 'UploadImg'))
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const Upload = multer( {storage: storeImage} );

// get All Guests
route.get('/guests', async (req , res) => {
    try {
        let data = await guestController.getAllGuests
        if (data) {
            res.status(200).send(data);
        }
    } catch (error) {
        console.log(error.message);
    }
})

// Add guest
route.post('/create', Upload.single('guest_picture'), async (req, res) => {
    let guest_picture = new Date + req.file.filename;
    try {
        let {name, email, password} = req.body;

        bcrypt.hash(password, 10, async (err, hashPass)=>{
        let data = await guestController.createGuest(name, email, hashPass, guest_picture);
        if (data) {
            res.status(201).send('ceated guest');
        }
        })
    } catch (error) {
        console.log(error);
    }
})



module.exports= route;