import Guest from '../models/Guest'



//CreateGuest
//don't miss add verification & identity_verified after
const createGuest = async (_name, _email, _password, _guest_picture) => {
    try {
        let dataLength = await Guest.find();
        let data = await Guest.create({
            guest_id : dataLength.length +1 ,
            guest_name : _name,
            email : _email,
            password: _password,
            guest_picture_url: _guest_picture,
        })
        if (data) {
            return data;
        }else
        console.log('error in guest data');
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
        }else
        console.log('error in guest data');
    } catch (error) {
        console.log(error.message);
    }
}

export {createGuest, getAllGuests }