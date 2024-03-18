const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    comments : String,
    reviewer_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Guest',
        required : [true, 'Review must belong to a Guest!']
    },
    place_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Place',
        required : [true, 'Review must belong to a Place!']
    },
    rating: {
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
