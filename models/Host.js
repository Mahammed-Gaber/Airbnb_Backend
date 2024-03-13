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
        select : false
    },
    passwordConfirm : {
        type : String,
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
    }
})

hostSchema.pre('save', async(next) => {
    if (!this.isModified('password')) return next;
    this.password = bcrypt.hash('password', 10);

    // to hashing pass
    this.password = await bcrypt.hash( this.password , 10);

    // to delete password confirm field
    this.passwordConfirm = undefined;
    next();
});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host