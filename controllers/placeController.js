const Place = require("../models/Place");


    const createPlaces = async (_place_name, _description,_neighborhood_overview , _location, _latitude,_longitude ,_property_type,_room_type,_accommodates,_bedrooms,_beds,_amenities,_price,_has_availability,_license,_instant_bookable,_host_id,_review_id,_createdAt, _place_picture)=> {
        try {
            // let placeLength = await Place.find() ;
            let data = await Place.create({
                // place_id : placeLength.length +1,
                place_name:_place_name,
                description : _description, 
                neighborhood_overview: _neighborhood_overview, 
                location : _location, 
                latitude: _latitude, 
                longitude : _longitude, 
                property_type: _property_type,
                room_type: _room_type,
                accommodates: _accommodates,
                bedrooms: _bedrooms,
                beds: _beds,
                amenities: _amenities,
                price: _price,
                has_availability: _has_availability,
                license: _license,
                instant_bookable: _instant_bookable,
                host_id: _host_id,
                review_id: _review_id,
                createdAt: _createdAt,
                place_picture: _place_picture, 
                })
                if (data) {
                    return data
                }else console.log('Error in place data');
        } catch (error) {
            console.log(error.message);
        }
    
    }

const getAllPlaces = async () => {
    try {
        let data = await Place.find({});
        if (data) {
            console.log("Places", data);
            return data;
        } else {
            console.log("error");
        }
    } catch (e) {
        console.log(e);
    }
};

const updatePlaces =(req, res) => {
    Place.findByIdAndUpdate(req.params.id,{
        place_name: req.body.place_name,
        description: req.body.description,
        neighborhood_overview: req.body.neighborhood_overview,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        property_type: req.body.property_type,
        room_type: req.body.room_type,
        accommodates: req.body.accommodates,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        amenities: req.body.amenities,
        price: req.body.price,
        has_availability: req.body.has_availability,
        license: req.body.license,
        instant_bookable: req.body.instant_bookable,
        host_id: req.body.host_id,
        review_id: req.body.review_id,
        createdAt: req.body.createdAt,
        place_picture: req.body.place_picture,
    },{new:true})
    .then(data =>{
        res.send("update done ...." + data);
        return data;
    }).catch(err =>{
        console.log(err)
    })
};

const deletePlaces =(req, res) => {
    Place.findByIdAndDelete(req.params.id,{
        place_name: req.body.place_name,
        description: req.body.description,
        neighborhood_overview: req.body.neighborhood_overview,
        location: req.body.location,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        property_type: req.body.property_type,
        room_type: req.body.room_type,
        accommodates: req.body.accommodates,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        amenities: req.body.amenities,
        price: req.body.price,
        has_availability: req.body.has_availability,
        license: req.body.license,
        instant_bookable: req.body.instant_bookable,
        host_id: req.body.host_id,
        review_id: req.body.review_id,
        createdAt: req.body.createdAt,
        place_picture: req.body.place_picture,
    })
    .then(data =>{
        res.send("deleteng  done" + data);
    }).catch(err =>{
        console.log(err)
    })
};


module.exports = {createPlaces,getAllPlaces,updatePlaces,deletePlaces};
