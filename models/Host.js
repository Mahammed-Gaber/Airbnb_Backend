const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');


const hostSchema = mongoose.Schema({
    host_name : {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required : [true, 'Please provide your email'],
        unique : true,
        lowercase : true,
        validate : [validator.isEmail , 'Please provide a valid email']
    },
    role : {
        type : String,
        default : 'host'
    },
    password:{
        type : String,
        required : [true, 'Please provide a valid password'],
        minlength : 8,
        // if we wan't show password to client or in show data
        select : false,
        lowercase : true,
    },
    passwordConfirm : {
        type : String,
        lowercase : true,
        required : [true, 'Please confirm your password'],
        validate : {
            validator : function (pass) {
                return pass === this.password
            },
            message : 'Password is not the same'
        }
    },
    host_location: {
        type: String,
        maxLength: 20,
    },
    host_about: {
        type: String,
        minLength: 10,
        maxLength: 200
    },
    host_picture_url: String,
    host_neighbourhood: String,
    host_listings_count: Number,
    host_verifications: [{
        type: String,
        default: 'email'
    }],
    host_identity_verified: {
        type : Boolean
    },
    host_since: {
        type: Date,
        default: Date.now
    },
    passwordChangedAt : Date,
})

hostSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next;
    this.password = bcrypt.hash(this.password, 10);

    // to hashing pass
    this.password = await bcrypt.hash( this.password , 10);

    // to delete password confirm field
    this.passwordConfirm = undefined;
    next();
});

hostSchema.methods.correctPassword = async(candedatePassword, userPassword)=> {
    return await bcrypt.compare(candedatePassword, userPassword);
}

// add method check if password changed
hostSchema.methods.changedPasswordAfter = (passwordChangedAt,JWTTiemstamp) => {
    if (passwordChangedAt) {
        const changedTimestamp = parseInt(passwordChangedAt.getTime() /1000, 10)
        return changedTimestamp > JWTTiemstamp;
    }
    return false;
}

const Host = mongoose.model('Host', hostSchema);

module.exports = Host