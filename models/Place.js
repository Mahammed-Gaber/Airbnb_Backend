const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
    place_name: {
        type:String,
        minLength: 10,
        maxLength: 20,
        required : [true, 'A Place must have a name'],
        trim : true
    },
    description:{
        type:String,
        minLength: 20,
        maxLength: 100,
        required : [true, 'A Place must have a description'],
        trim : true
    },
    neighborhood_overview: {
        type : String,
        required : [true, 'A Place must have an overview'],
        trim : true
    },
    pictures_url: [String],
    imageCover : {
        type: String,
        required : [true, 'A Place must have a cover image']
    },
    location: {
        type:String,
        tirm: true
    },
    latitude: Number,
    longitude: Number,
    property_type: [{
        type:String,
        trim : true
        }],
    room_type: String,
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    amenities: [{
        type:String,
        tirm: true
        }],
    price: {
        type: Number,
        required : [true, 'A Place must have a price']
    },
    has_availability: String,
    license: String,
    instant_bookable: String,
    host_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Host',
        required : [true, 'A Place must belong to a Host']
    },
    startDates: [Date],
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Place = mongoose.model('Place', placeSchema);
module.exports = Place