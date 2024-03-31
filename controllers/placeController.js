const Place = require("../models/Place");
const catchAsync = require("../utils/catchAsync");


const createPlace = catchAsync(async(req, res)=> {
    let {place_name, description,neighborhood_overview, imageCover, pictures_url,location,
        latitude,longitude ,property_type,room_type, accommodates,bedrooms,
        beds,amenities,price,has_availability,license,instant_bookable,startDates} = req.body;

    let newPlace = await Place.create({
        place_name: place_name,
        description: description,
        neighborhood_overview: neighborhood_overview,
        pictures_url: pictures_url,
        imageCover : imageCover,
        location: location,
        latitude: latitude,
        longitude: longitude,
        property_type: property_type,
        room_type: room_type,
        accommodates: accommodates,
        bedrooms: bedrooms,
        beds: beds,
        amenities: amenities,
        price: price,
        has_availability: has_availability,
        license: license,
        instant_bookable: instant_bookable,
        host_id: req.user._id,
        startDates: startDates,
    });

    if(!newPlace) return res.status(400).send('Error on create Place');

    res.status(201).json({
        status : 'success',
        data : {
            newPlace
        }
    })
});

const getAllPlaces = catchAsync(async(req, res) => {
    //BUILD QUERY
    // 1A) Filtering
    let queryObj = {...req.query};
    let excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 2A) Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g , match => `$${match}`);

    let query = Place.find(JSON.parse(queryString));

    // 1) Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query =  query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }

    // 2) Field limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        console.log(fields);
        query= query.select(fields);
    }else{
        query = query.select('-__v');
    }

    // 3) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 20;
    const skip = (page - 1) * limit;

    query.skip(skip).limit(limit);

    if(req.query.page) {
        const numPlaces = await Place.countDocuments();
        if (skip> numPlaces) {
            return res.status(404).send('This Page does not exist!')
        }
    }

    // Execute Query
    let places = await query;

    if (!places) return res.status(400).send('Error on get all Places')

    res.status(200).json({
        status : 'success',
        results : places.length,
        places : places
    })
});

const updatePlaces = catchAsync(async(req, res) => {
    const updatePlace = await Place.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidatours : true
    });

    if (!updatePlace) return res.sendStatus(400);

    res.status(200).json({
        status : 'success',
        data : updatePlace
    });
});

const deletePlaces = catchAsync(async(req, res) => {
    if (!req.params.id) return res.status(404).send('Place ID not found');

    let deletedPlace = await Place.findByIdAndDelete(req.params.id);

    if (!deletedPlace) return res.sendStatus(404);

    res.sendStatus(204);
});


module.exports = {createPlace,getAllPlaces,updatePlaces,deletePlaces};
