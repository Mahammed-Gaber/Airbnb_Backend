const express = require('express');
const multer = require('multer');
const path =require('path');
const guestController = require('../controllers/guestController');
const route = express.Router();
const bcrypt = require('bcrypt');
const sendEmail = require('../nodeMailer')

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

// get All Guests
route.get('/showGuests', async (req , res) => {
    try {
        let data = await guestController.getAllGuests()
        if (data != "error") {
            // res.status(200).send(data);
            res.json({
                guests : data,
                msg: "ok",
                status: 200
            });
        }
    } catch (error) {
        console.log(error.message);
    }
})
// Register & Add guest
route.post('/register', Upload.single('guest_picture'), async (req, res) => {
    let guest_picture = new Date + req.file;
    try {
        let {name, email, password} = req.body;

        bcrypt.hash(password, 10, async (err, hashPass)=>{
        let data = await guestController.createGuest(name, email, hashPass, guest_picture);
        if (data) {
            sendEmail(email, 'Welcome to our site, thanks for Registeration')
            res.status(201).send('ceated guest');
        }else{
            res.sendStatus(400)
        }
        })
    } catch (error) {
        console.log(error);
    }
})

// update data
route.put('/update', (req, res) => {
    try {
        
    } catch (error) {
        
    }
})

// route.get('/All', guestController.getAllGuests)


module.exports= route;