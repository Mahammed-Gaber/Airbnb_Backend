const mongoose = require('mongoose')

const BookingSchema = mongoose.Schema({
    booking_id: {
        type : Number,
        unique: true,
        default: 2
    },
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
        // required: true
    },
    departure_date: {
        type: Date,
        // required: true
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

BookingSchema.pre('/^find/', (next) => {
    this.populate('guest').populate({
        path: 'place',
        select: 'name'
    })
})


const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
