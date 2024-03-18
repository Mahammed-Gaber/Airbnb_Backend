const Booking = require('../models/Booking');
const Place = require('../models/Place');
const catchAsync = require('../utils/catchAsync');


// exports.getCheckoutSession = catchAsync(async(req, res, next) => {

//     next();
// })

exports.createBookingCheckout = catchAsync(async(req, res, next) => {
    const {place, guest, price} = req.query;
    const {arrival_date, departure_date} = req.body;

    if (!place && !guest && !price && !arrival_date && !departure_date) return next();

    let newBooking = await Booking.create({place, guest, price, arrival_date, departure_date})
    if (!newBooking) {
        res.sendStatus(400);
    }
    res.status(201).json({
        status: 'success',
        booking : newBooking
    })
    next()
})

exports.myPlaces = catchAsync(async(req, res, next)=> {
    // 1) find user and all places belongs to user from booking 
    const bookings = await Booking.find({guest : req.user._id});

    // 2)find places by IDs
    const placeIDs = bookings.map(el => el.place);

    // const places =await Place.find({_id : {$in: placeIDs}});
    const places = await Place.find().where('_id').in(placeIDs)
    
    res.status(200).json({
        status : 'success',
        results: places.length,
        places : places
    })
})