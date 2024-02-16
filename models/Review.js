import mongoose, { Schema } from "mongoose";

const reviewSchema = Schema({
    review_id : Number,
    comments : String,
    reviewer_id:{
        type: mongoose.Types.ObjectId,
        ref: 'Guest'
    },
    rating: {
        type: Number,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }, 
})

const Review = mongoose.model('Review', reviewSchema);
Review.createIndexes({ review_id : 1 });
module.exports = Review;
