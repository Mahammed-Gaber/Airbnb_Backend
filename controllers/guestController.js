const Guest = require('../models/Guest');
const catchAsync = require('../utils/catchAsync');


const getAllGuests = catchAsync(async (req , res , next) => {
            let data = await Guest.find();
            if (data) {
                res.status(200).json({
                    status : 'success',
                    data: {
                        guest : data,
                    },
                });
            }
    })

const updateGuest =catchAsync(async(req, res) => {
    if (!req.params._id) return res.status(404).send('User ID not found');
    let update = await Guest.findByIdAndUpdate(req.params.id,{
        guest_name: req.body.guest_name,
        email: req.body.email,
        password: req.body.password,
        guest_picture_url: req.body.guest_picture_url,
    },{new:true})
    if (!update) {
        res.status(400).send('User not found or data not true');
    }
    res.status(200).send('User Updated successsfully!');
});

const deleteGuest = catchAsync( async(req, res) => {
    // 1) check if id exist
    if (!req.params._id) return res.status(404).send('User ID not found');
    // 2) delete user
    let deletedUser = await Guest.findByIdAndDelete(req.params._id)
    if (!deletedUser) {
        res.status(400).send('User not found or data not true');
    }
    // 3)everything ok, send done
    res.status(204).send('User deleted successsfully!');
});

module.exports = { getAllGuests, updateGuest, deleteGuest }