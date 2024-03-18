const Host = require('../models/Host');
const catchAsync = require('../utils/catchAsync');

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn : process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ),
        httpOnly : true
    }
    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    res.cookie('jwt', token, cookieOptions);

    //Remove password to add more secure
    user.password = undefined;

    res.status(statusCode).json({
        status : 'success',
        token,
        data : {
            user
        }
    });
}

exports.signUp = catchAsync(async(req,res)=> {
    let {_host_name, _email, _Pass, _host_location, _host_about, _host_picture_url, _host_neighbourhood, _host_listings_count} = req.body;
    let newHost = await Host.create({
        host_name:_host_name,
        email : _email, 
        password: _Pass, 
        host_location : _host_location, 
        host_about: _host_about, 
        host_picture_url: _host_picture_url, 
        host_neighbourhood : _host_neighbourhood, 
        host_listings_count: _host_listings_count,
    });

    if (!newHost) {
        return res.status(400).send('Error on create Host!')
    }

    createSendToken(newHost, 201, res);
});

exports.login = catchAsync(async(req, res, next) => {
    const {email, password} = req.body;
    //1) if email & password exict
    if (!email || !password) {
        return res.status(400).send('Please provide email and password');
    }

    //2) check if email exist and password correct
    const user = await Host.findOne({email}).select('password');
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))){
        return res.status(401).send('incorrect email or password');
    }

    // 3) everything okay send token via cookies
    createSendToken(user, 201, res);
})

exports.protect = catchAsync(async(req, res, next) => {
    // 1) getting token and check if token exist
    let token;
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1]
    // }
    if(req.cookies.jwt) {
        token = req.cookies.jwt
    };

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
    const freshUser = await Host.findById(decoded.id);
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
};
