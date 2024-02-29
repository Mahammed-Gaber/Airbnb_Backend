const express = require('express');
const { createHost, getAllHostes, getHostById, updateHostById, deleteHosts } = require('../controllers/hostController.js');
const multer = require('multer');
const Host = require('../models/Host.js');
const path = require('path');
const catchAsync = require('../utils/catchAsync.js');

const route = express.Router();
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

// we have to add a middleware to reject any fack request
route.param('id', (req,res,next,value)=> {
    // req.id = req.params.id;
    if(Number(value)) // id = value
        next();
    else
        res.status(400).send('invalide id');
})

route.get('/', getAllHostes)
route.get('/:id', getHostById)

route.post('/create', Upload.single('host_picture'), catchAsync(async(req ,res) => {
    let host_picture = new Date + req.file.filename;
    let {host_name, email, password,host_location, host_about, host_neighbourhood, host_listings_count} = req.body;
        let data = await createHost(host_name, email, password, host_location, host_about, host_picture, host_neighbourhood, host_listings_count);
        if (data) {
            res.status(201).send(data)
        }else res.sendStatus(400)
}))


route.get('/updateUser/:id', updateHostById)



/**********************************************************************/
// ----------------------------delete Hosts------------------------------
route.delete('/:id',deleteHosts);



module.exports = route;