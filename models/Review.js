const mongoose = require('mongoose');
const Place = require('./Place');

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
    })
    next();
});

reviewSchema.statics.calcAverageRatings = async function (placeId){
    const stats = await this.aggregate([
        {
            $match : {place_id : placeId}
        },
        {
            $group : {
                _id : '$place_id',
                nRating : {$sum : 1},
                avgRating : {$avg : '$rating'}
            }
        }
    ]);

    await Place.findByIdAndUpdate(placeId, {
        ratingsQuantity : stats[0].nRating,
        ratingsAverage : stats[0].avgRating
    })
};

reviewSchema.post('save', function (){
    this.constructor.calcAverageRatings(this.place_id)
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
