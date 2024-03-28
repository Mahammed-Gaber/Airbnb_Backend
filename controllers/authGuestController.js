const Guest = require('../models/Guest');
const sendEmail = require('../nodeMailer');
const catchAsync = require('../utils/catchAsync');

const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
};

// Send token via cookie
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // const cookieOptions = {
    //     expires : new Date(
    //         Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    //         ),
    //     httpOnly : false
    // }
    // if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    // res.cookie('jwt', token , cookieOptions)
    // console.log(res.headers);
    
    res.setHeader('Authorization', `Bearer ${token}`);
    // Remove password from data 
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        date : {
            user
        }
    });

    // let message = '<h2>welcome in our Site</h2>';
    // let text = 'You can now booking and show more places'
    // sendEmail(user.email, message, text)
}

exports.signup = catchAsync( async(req ,res) => {
    //1) if everything is good create new user
    // let guest_picture_url = new Date + req.file.filename
    let newUser = await Guest.create(req.body);

    if (!newUser) {
        return res.status(400).send('Error in create User')
    };

    createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    //1) if email & password exict
    if (!email || !password) {
        return res.status(400).send('Please provide email and password');
    }

    //2) check if email exist and password correct
    const user = await Guest.findOne({email}).select('password');
    if (!user || !(await user.correctPassword(password, user.password))){
        return res.status(401).send('incorrect email or password');
    }

    // 3) everything okay send token via cookies
    createSendToken(user, 201, res);
})

// protect route
exports.protect = catchAsync(async(req, res, next) => {
    // 1) getting token and check if token exist
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    // if(req.cookies.jwt){
    //     token = req.cookies.jwt
    // };

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

    // 3) we have to check if user still exist
    const freshUser = await Guest.findById(decoded.id);
    if (!freshUser) {
        return res.status(400).send('user logging does no longer exist');
    }

    // 4) check if user change password after the token was issued
    if(freshUser.changedPasswordAfter(freshUser.passwordChangedAt, decoded.iat)){
        return res.status(401).send('User resently changed password! Please login again.')
    };

    req.user = freshUser;
    next();
})

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('You do not have permission to perform this action!')
        }
        next();
    }
}

exports.forgotPassword = catchAsync(async(req, res, next) => {
    // 1) Get user from email
    const user = await Guest.findOne({email : req.body.email})
    if (!user) {
        res.status(404).send('There is no user with email address.')
    }
    
    // 2) Generate the random reset Token

});

exports.resetPassword = (req, res, next) => {

}