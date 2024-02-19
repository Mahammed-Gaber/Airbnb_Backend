import { Schema } from "mongoose";

const reservationSchema = Schema({
    reservation_id: {
        type : Number,
        unique: true,
        default: 0
    },
    place_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Place',
    },
    guest_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Guest',
    },
    reservation_date: {
        type: Date,
        default: Date.now,
    },
    arrival_date: {
        type: Date,
        required: true
    },
    departure_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['reserved', 'paid', 'cancelled'],
        default: 'reserved'
    },
    amount: {
        type: Number
    },
    additional_info : String,
     // +add email => lib load mailer
});


