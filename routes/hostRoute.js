const express = require('express');
const { createHost, getAllHostes, getHostById, updateHostById } = require('../controllers/hostController.js');
const multer = require('multer');
const Host = require('../models/Host.js');
const bcrypt = require('bcrypt');
const path = require('path')


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


route.post('/create', Upload.single('host_picture'), async(req ,res) => {
    let host_picture = new Date + req.file.filename;
    let {host_name, email, password,host_location, host_about, host_neighbourhood, host_listings_count} = req.body;
    try {
        bcrypt.hash(password, 10, async(err, hashPass)=> {
            let data = await createHost(host_name, email, hashPass, host_location, host_about, host_picture, host_neighbourhood, host_listings_count);
        if (data) {
            res.status(201).send(data)
        }else res.sendStatus(400)
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
})
route.get('/updateUser/:id', updateHostById)



// route.put('/update/:id', (req,res)=>{  // use put when u want changa all data
//     let user = users.findIndex((value)=>{value.id == req.params.id});
//     upuser = {name: 'Ayman', dep: 'MERN'};
//     user.name = upuser.name
//     res.send(user)
// })
// route.delete('/delete/:id',(req,res) => {
//     let id = req.params.id;
//     let indx = users.findIndex((value)=> {return value.id == id});
//     console.log(indx);
//     if(indx != -1){
//         users.splice(indx, 1)
//         res.send('user deleted');
//         return
//     }
//     res.send('Not Found');
// })


module.exports = route;