const Guest = require('../models/Guest');
const catchAsync = require('../utils/catchAsync');
// using jwt
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}


// auth security
exports.signup = catchAsync( async(req ,res ,next) => {

    //1) get length all data, if at first time ant it not exist set count =0
    let dataLength = await Guest.findOne({}, {guest_id : 1}).sort({guest_id: -1}).limit(1);
    let count
    if (!dataLength) {
        count = dataLength;
        count =0;
    }

    //2) if everything is good create new user
    let {_name, _email, _password,_pass_confirm} = req.body;
    let newUser = await Guest.create({
        guest_id : count + 1 || dataLength.guest_id +1,
        guest_name : _name,
        email : _email,
        password: _password,
        PasswordConfirm : _pass_confirm,
        // guest_picture_url: _guest_picture,
    });

    //3) create a token and every token content Header, payload, signature
    const token = signToken(newUser._id)

    res.status(201).json({
        status: 'success',
        token,
        user : newUser
    })
});

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    //1) if email & password exict
    if (!email || !password) {
        return res.status(400).send('Please provide email and password');
    }
    console.log('first step done');
    
    //2) check if email exist and password correct
    const user = await Guest.findOne({email}).select('+password');
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))){
        return res.status(401).send('incorrect email or password');
    }

    // 3) everything okay send token
    const token = signToken(user._id);
    res.status(200).json({
        status : 'success',
        token
    })
})

// protect route
exports.protect = catchAsync(async(req, res, next) => {
    // 1) getting token and check if token excist
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) {
        return res.status(401).send('You are not logged in , Please login to get access')
    }

    // 2) verification token so decoded show payload data
    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
    } catch (error) {
        return res.status(500).send(error.message)
    }
    console.log(decoded);
    
    // 3) we have to check if user still exist
    const freshUser = await Guest.findById(decoded.id);
    if (!freshUser) {
        return res.status(400).send('user logging does no longer exist');
    }

    // 4) check if user change password after the token was issued

    

    next();
})