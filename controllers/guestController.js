import {Guest} from '../models/Guest'

const guestSchema = Schema({
    guest_id: Number,
    guest_name : {
        type: String,
        required: true,
        unique: true
    },
    email: String,
    password:{
        type : String
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

//CreateGuest       //don't miss add verification & identity_verified after
const createGuest = async (_name, _email, _password, _guest_picture) => {
    try {
        let dataLength = await Guest.find();
        let data = await Guest.create({
            guest_id : dataLength.length,
            guest_name : _name,
            email : _email,
            password: _password,
            guest_picture_url: _guest_picture,
            if (data) {
                return data;
            }
        }) 
    } catch (error) {
        console.log(error.message);
    }
}

//DeleteGuest

//GetGuestById

//UpdataGuest

//GetAllGuests

const getAllGuests = async ()=> {
    try {
        let data = await Guest.find({});
        if (data) {
            return data;
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports= {createGuest, getAllGuests, }