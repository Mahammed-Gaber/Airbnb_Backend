import {Guest} from '../models/Guest'


//CreateGuest

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