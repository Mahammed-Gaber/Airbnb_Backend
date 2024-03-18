const express = require('express');
const placeController = require('../controllers/placeController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const authHostController = require('../controllers/authHostController');

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



router.use(authHostController.protect)

router.post('/create-place',Upload.single('host_picture'), placeController.createPlace);
router.get("/getAllPlaces", placeController.getAllPlaces);
router.put('/:id', Upload.single('pictures_url') ,authHostController.restrictTo('host') ,placeController.updatePlaces);
router.delete('/:id',authHostController.restrictTo('host', 'admin') ,placeController.deletePlaces);


module.exports = router;
