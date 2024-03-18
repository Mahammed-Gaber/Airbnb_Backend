const express = require('express');
const multer = require('multer');
const path =require('path');
const router = express.Router();
const hostController = require('../controllers/hostController');
const authHostController = require('../controllers/authHostController');

// Upload Image
const storeImage = multer.diskStorage({
    destination : (req, file, callback)=> {
        callback(null, path.join(__dirname, '..', 'images'))
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
})
const Upload = multer( {storage: storeImage} );

router.post('/signup', Upload.single('host_picture_url'), authHostController.signUp);
router.post('/login', authHostController.login);

router.use(authHostController.protect);

router.get('/', hostController.getAllHostes);
router.get('/:id', hostController.getHostById);
router.get('/:id', hostController.updateHostById);
router.delete('/:id',hostController.deleteHost);


module.exports = router;