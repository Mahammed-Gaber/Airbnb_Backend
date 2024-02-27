import { Schema } from 'mongoose';

const placeSchema = Schema({
    place_id: {
        type : Number,
        unique: true,
        default: 0
    },
    place_name: {
        type:String,
        minLength: 10,
        maxLength: 20
    },
    description:{
        type:String,
        minLength: 20,
        maxLength: 100
    },
    neighborhood_overview: String,
    picture_url: String,
    location: {
        type:String,
        minLength: 20,
    },
    latitude: Number,
    longitude: Number,
    property_type: [{
        type:String
        }],
    room_type: String,
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    amenities: [{
        type:String 
        }],
    price: String,
    has_availability: String,
    license: String,
    instant_bookable: String,
    host_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Host'
    },
    review_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Review'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
})

const Place = mongoose.model('Place', placeSchema);
Place.createIndexes({ place_id : 1 });
Place.createIndexes({ place_name : 1 });
export default Place