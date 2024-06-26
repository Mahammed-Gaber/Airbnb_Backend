const Guest = require('../models/Guest');
const catchAsync = require('../utils/catchAsync');


const getAllGuests = catchAsync(async (req , res) => {
    let guests = await Guest.find();
    console.log(guests);
    if (!guests) return res.status(404).send('Not Guests found!');
    res.status(200).json({
        status : 'success',
        results : guests.length,
        data: {
        guests : guests
        }
    });
});

const updateGuest =catchAsync(async(req, res) => {
    if (!req.params.id) return res.status(404).send('User ID not found');

    let update = await Guest.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidatours : true
    });

    if (!update) return res.status(400).send('User not found or data not true');

    res.status(200).send('Updated successsfully!');
});

const deleteGuest = catchAsync( async(req, res) => {
    // 1) check if id exist
    if (!req.params.id) return res.status(404).send('User ID not found');

    // 2) delete user
    let deletedUser = await Guest.findByIdAndDelete(req.params.id)
    if (!deletedUser) return res.status(404).send('User not found!');

    // 3)everything ok, send done
    res.sendStatus(204);
});

module.exports = { getAllGuests, updateGuest, deleteGuest }