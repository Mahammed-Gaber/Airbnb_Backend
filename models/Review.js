const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review : {
        type: String,
        required : [true, 'Review can not be embty!']
    },
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
        min : 1,
        max : 5
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});


reviewSchema.pre('find', function (next) {
    this.populate({
        path: 'reviewer_id',
        select: 'guest_name'
    }).populate({
        path : 'place_id',
        select : 'place_name price'
    });
    next();
});


const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
