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

module.exports = { getAllGuests }