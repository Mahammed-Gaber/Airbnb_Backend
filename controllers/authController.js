const Guest = require('../models/Guest');
const catchAsync = require('../utils/catchAsync');

// auth security
exports.signup = catchAsync( async(req ,res) => {
    let dataLength = await Guest.findOne({}, {guest_id : 1}).sort({guest_id: -1}).limit(1);
    let {_name, _email, _password,_pass_confirm, _guest_picture} = req.body;
    let newUser = await Guest.create({
        guest_id : dataLength.guest_id +1 ,
        guest_name : _name,
        email : _email,
        password: _password,
        PasswordConfirm : _pass_confirm,
        guest_picture_url: _guest_picture,
    });
    res.status(201).json({
        status: 'success',
        user : newUser
    })
});