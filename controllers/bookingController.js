const Booking = require('../models/Booking');
const Place = require('../models/Place');
const catchAsync = require('../utils/catchAsync');


exports.getCheckoutSession = catchAsync(async(req, res, next) => {

    next();
})

exports.createBookingCheckout = catchAsync(async(req, res, next) => {
    const {place, guest, price} = req.query;

    if (!place && !guest && !price) return next();

    let newBooking = await Booking.create({place, guest, price})
    if (!newBooking) {
        res.send('bad')
    }
    res.status(201).json({
        status: 'success',
        message : 'created successfully'
    })
    next()
})

exports.myPlaces = catchAsync(async(req, res, next)=> {
    // 1) find user and all places belongs to user from booking 
    const bookings = await Booking.find({guest : req.user._id});

    // 2)find places by ids
    const placeIDs = bookings.map(el => el.place);
    const places =await Place.find({_id : {$in: placeIDs}});

    res.status(200).json({
        status : 'success',
        places : places
    })
})