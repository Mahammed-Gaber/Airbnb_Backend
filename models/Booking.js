const mongoose = require('mongoose')

const BookingSchema = mongoose.Schema({
    place: {
        type: mongoose.Types.ObjectId,
        ref: 'Place',
        required: [true, 'Booking must belong to a Place!']
    },
    guest: {
        type: mongoose.Types.ObjectId,
        ref: 'Guest',
        required : [true, 'Booking must belong to a Guest!']
    },
    price: {
        type: Number,
        required : [true, 'Booking must have a Price!']
    },
    arrival_date: {
        type: Date,
        required : [true, 'Booking must have an arrival date!']
    },
    departure_date: {
        type: Date,
        required : [true, 'Booking must have a depature date!']
    },
    paid: {
        type: Boolean,
        default: true
    },
    booking_since: {
        type: Date,
        default: Date.now(),
    }
});

BookingSchema.pre('find', function (next) {
    this.populate({
        path: 'place',
        select : 'place_name imageCover'
    })
    next()
});

//Update the index to find duplicate reservations with the same date for the same place
BookingSchema.index({ place: 1, arrival_date: 1, departure_date: 1 }, { unique: true });

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
