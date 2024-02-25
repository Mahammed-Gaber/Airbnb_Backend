const Guest = require('../models/Guest');
const catchAsync = require('../utils/catchAsync');
// using jwt
const jwt = require('jsonwebtoken');

// auth security
exports.signup = catchAsync( async(req ,res ,next) => {
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

    // every token content Header, payload, signature
    const token = jwt.sign({ id : newUser._id }, process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })

    res.status(201).json({
        status: 'success',
        token,
        user : newUser
    })
});