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

const uploadPlaceImages = Upload.fields([
    {name : 'imageCover', maxCount: 1},
    {name : 'pictures_url', maxCount : 10}
])
const processingMultipleImages = (req, res, next) => {
    if (!req.files.pictures_url || !req.files.imageCover) {
        return res.status(400).json({ error: "No images found." });
    }
    // 1) Cover image
    console.log(req.files.pictures_url);
    let imageCover= req.files.imageCover[0].filename;

    // 2) Images
    const pictures_url = []
    let imags= req.files.pictures_url;
    imags.map(val => {
        pictures_url.push( val.filename )
    });

    req.body.imageCover = imageCover;
    req.body.pictures_url = pictures_url;

    next();
}

router.get("/getAllPlaces", placeController.getAllPlaces);
router.get('/:id',placeController.getPlaceById);

router.use(authHostController.protect)

router.post('/create-place',uploadPlaceImages, processingMultipleImages, placeController.createPlace);
router.put('/:id', uploadPlaceImages, processingMultipleImages, authHostController.restrictTo('host'), placeController.updatePlaces);
router.delete('/:id',authHostController.restrictTo('host', 'admin') ,placeController.deletePlaces);


module.exports = router;
