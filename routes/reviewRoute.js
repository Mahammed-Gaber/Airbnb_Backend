const express = require("express");
const reviewController = require("../controllers/reviewController");
const authGuestController = require("../controllers/authGuestController");
const router = express.Router();

router.get("/", reviewController.getAllReview);
router.get("/reviewsplace", reviewController.getReviewsForPlace);
router.post("/addReview",
    authGuestController.protect,
    authGuestController.restrictTo('guest'),
    reviewController.createReview
);
router.post("/:id",
    authGuestController.protect,
    authGuestController.restrictTo('guest'),
    reviewController.updateReview
);

module.exports = router;
