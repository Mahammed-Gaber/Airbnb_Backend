const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
    place_name: {
        type:String,
        minLength: 10,
        required : [true, 'A Place must have a name'],
        trim : true
    },
    description:{
        type:String,
        minLength: 20,
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
    ratingsAverage : {
        type : Number,
        default : 4.5,
        min : [1, 'Rating must be above 1.0'],
        max : [5, 'Rating must be below 5.0']
    },
    ratingsQuantity : {
        type : Number,
        default : 0
    },
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

placeSchema.pre('find', function (next) {
    this.populate({
        path: 'host_id',
        select: 'host_name'
    });
    next();
});

const Place = mongoose.model('Place', placeSchema);
module.exports = Place