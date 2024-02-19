// const Schema=  from 'mongoose';
const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
    guest_id: {
        type : Number,
        unique: true,
        default: 0
    },
    guest_name : {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    password:{
        type : String
    },
    guest_since: {
        type: Date,
        default: Date.now
    },
    guest_picture_url: String,
    guest_verifications: [{
        type: String
    }],
    guest_identity_verified: String
})

const Guest = mongoose.model('Guests', guestSchema);
Guest.createIndexes({ guest_id : 1 });
module.exports= Guest