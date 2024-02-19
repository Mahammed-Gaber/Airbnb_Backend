import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import path from 'path';
import { createGuest, getAllGuests } from '../controllers/guestController';
const route = Router();

// Upload ur imgs 
const storeImage = diskStorage({
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
        let data = await getAllGuests
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
        let data = await createGuest(name, email, hashPass, guest_picture);
        if (data) {
            res.status(201).send('ceated guest');
        }
        })
    } catch (error) {
        console.log(error);
    }
})



export default route;