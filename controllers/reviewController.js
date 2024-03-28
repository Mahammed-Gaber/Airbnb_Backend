const Review = require("../models/Review");
const catchAsync = require("../utils/catchAsync");


exports.getAllReview = catchAsync(async(req, res) => {
    const reviews = await Review.find();

    res.status(200).json({
        status : 'success',
        results : reviews.length,
        reviews : reviews
    })
})

exports.getReviewsForPlace = catchAsync(async(req, res) => {
    const place_id = req.query.place_id;
    const reviews = await Review.find().where('place_id').equals(place_id);

    res.status(200).json({
        status : 'success',
        results : reviews.length,
        reviews : reviews
    })
})

exports.createReview = catchAsync(async(req, res)=> {
    const newReview = await Review.create(req.body)

    res.status(201).json({
        status : 'success',
        review : newReview
    })
})
