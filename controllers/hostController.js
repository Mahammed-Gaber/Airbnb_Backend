const Host = require("../models/Host");



//Get All Hosts
const getAllHostes = (req, res)=>{
    // res.set('headers', '*')
    try {
        let data = Host.find({});
        if (data) {
            return data
        }else console.log('Error in Host Data');
        res.status(200).send(users);
    } catch (error) {
        console.log(error.message);
    }
}

// git host by ID
const getHostById = (req, res) => {
    try {
        let {id} = req.params;
        let host = Host.findOne({host_id : id});
        if(host)
            res.status(200).send(user);
        else
            res.sendStatus(204)
    } catch (error) {
        console.log(error.message);
    }
}


const createHost = async (_host_name, _email, _hashPass, _host_location, _host_about, _host_picture_url, _host_neighbourhood, _host_listings_count)=> {
    try {
        let hostLength = await Host.find({}, {host_id : 1}).sort({ host_id: -1}).limit(1)
        let data = await Host.create({
            host_id : hostLength +1,
            host_name:_host_name,
            email : _email, 
            password: _hashPass, 
            host_location : _host_location, 
            host_about: _host_about, 
            host_picture_url: _host_picture_url, 
            host_neighbourhood : _host_neighbourhood, 
            host_listings_count: _host_listings_count,
            })
            if (data) {
                return data
            }else console.log('Error in host data');
    } catch (error) {
        console.log(error.message);
    }
}

const updateHostById = (req,res)=> {
    const id = req.params.id * 1
    let user = users.find(value => {return value.id === id})
    upuser = {name: 'Ayman', dep: ['SDF', 'MEARN']};
    user.name = upuser.name;
    user.dep = upuser.dep;
    console.log(user);
    res.status(201).send(user)
    // here in first time it status is 201,
    // in the second time in the same user it status is 304,
    // search why that happend and what mean 304 ?
}


module.exports = {getAllHostes, getHostById, createHost, updateHostById};