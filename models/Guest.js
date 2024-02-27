const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');


const guestSchema = mongoose.Schema({
    guest_id: {
        type : Number,
        unique: true,
        default: 6
    },
    guest_name : {
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
    password:{
        type : String,
        required : [true, 'Please provide a valid password'],
        minlength : 8
    },
    PasswordConfirm : {
        type : String,
        required : [true, 'Please confirm your password'],
        validate : {
            validator : function (pass) {
                return pass === this.password
            },
            message : 'Password is not the same'
        }
    },
    guest_since: {
        type: Date,
        default: Date.now
    },
    guest_picture_url: String,
    guest_verifications: [{
        type: String
    }],
    guest_identity_verified: String
})


guestSchema.pre('save', async function (next){

    // it run if password is modified to hash it
    if(!this.isModified('password')) return next;

    // to hashing pass
    this.password = await bcrypt.hash('password', 10);

    // to delete password confirm field
    this.PasswordConfirm = undefined;
    next()
})

const Guest = mongoose.model('Guest', guestSchema);
Guest.createIndexes({ guest_id : 1 });
module.exports= Guest