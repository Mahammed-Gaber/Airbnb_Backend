const mongoose = require("mongoose");

const hostSchema = mongoose.Schema({
    host_id: {
        type : Number,
        unique: true,
        default: 0
    },
    host_name : {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    password:{
        type : String
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
    host_identity_verified: String,
    host_since: {
        type: Date,
        default: Date.now
    }
})

const Host = mongoose.model('Host', hostSchema);
Host.createIndexes({ host_id: 1 });
Host.createIndexes({ host_name: 1 });
module.exports = Host