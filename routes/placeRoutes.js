const express = require('express');
const placeController = require('../controllers/placeController');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ------------------------Upload file---------------------------

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..","/upload"));
    },
    filename: (req, file, callback) => {
        callback(null,file.originalname);
    }
})

const upload = multer({ storage: Storage });


/***********************************************************************************************/
// ------------------------------------------Creat Places------------------------------------------------
    router.post('/create-place', async (req, res) => {
        let place_picture = new Date
    try {
        const {place_name,description,neighborhood_overview,location,latitude,longitude,property_type,room_type,accommodates,bedrooms,beds,amenities,price,has_availability,license,instant_bookable,host_id,review_id,createdAt} = req.body;
        let data = await placeController.createPlaces(place_name,description,neighborhood_overview,location,latitude,longitude,property_type,room_type,accommodates,bedrooms,beds,amenities,price,has_availability,license,instant_bookable,host_id,review_id,createdAt,place_picture);
        if (data != "error") {
            res.send('creating Done...'+data);
            console.log(data);
            return data
        }
        else {
            res.status
            (403).send("not found");
        }
    }
    catch (e) {
        res.status(500).send('server error');
        console.log(e);
    }
}
)

/****************************************************************************/
// ----------------------------Shwo All Places------------------------------
router.get("/getAllPlaces", async (req, res) => {

    try {
        let data = await placeController.getAllPlaces();
        if (data != "error") {
            res.json({
                Places: data,
                msg: "ok",
                status: 200
            });
            console.log(data)
        }
        else {
            res.status(403).send("not found");
        }
    }
    catch (e) {
        res.status(500).send('server error');
        console.log(e)
    }

})

/**********************************************************************/
// ----------------------------update Places------------------------------
router.put('/:id',placeController.updatePlaces);

/**********************************************************************/
// ----------------------------delete Places------------------------------
router.delete('/:id',placeController.deletePlaces);








/**********************************************************/


module.exports = router;
