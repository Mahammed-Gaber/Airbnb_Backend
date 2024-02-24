const Guest = require('../models/Guest');


exports.signup = async (req, res, next) => {
    const newGuest = Guest.create(req.body)
}