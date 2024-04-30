const stripe = require('stripe')(process.env.STRIP_SECRET_KEY)
const Booking = require('../models/Booking');
const Place = require('../models/Place');
const catchAsync = require('../utils/catchAsync');


exports.getCheckoutSession = catchAsync(async(req, res, next) => {
    console.log(req.params);

    let place = await Place.findOne({_id : req.params.id});
    // console.log(place);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url : `${req.protocol}://${req.get('host')}/`,
        cancel_url : `http://localhost:5173/Accomodation`,
        customer_email: req.user.email,
        client_reference_id: req.params.placeId,
        line_items: [{
            price_data: {
                currency: 'usd',
                unit_amount: place.price,
                product_data: {
                    name: place.place_name,
                    description: place.description,
                    images: [`http://localhost:3000/images/${place.imageCover}`],
                },
            },
            quantity: 2
        }],
        mode: 'payment',
    })
    res.status(200).json({
        status: 'success',
        session
    })
    // next();
})

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

exports.myBooking = catchAsync(async(req, res, next)=> {
    // 1) find user and all places belongs to user from booking 
    const bookings = await Booking.find({guest : req.user._id});

    res.status(200).json({
        status : 'success',
        results: bookings.length,
        places : bookings
    })
})