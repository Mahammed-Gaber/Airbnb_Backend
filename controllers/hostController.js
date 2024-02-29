const Host = require("../models/Host");


const createHost = async (_host_name, _email, _Pass, _host_location, _host_about, _host_picture_url, _host_neighbourhood, _host_listings_count)=> {
    try {
        let hostLength = await Host.find({}, {host_id : 1}).sort({ host_id: -1}).limit(1)
        let data = await Host.create({
            host_id : hostLength +1,
            host_name:_host_name,
            email : _email, 
            password: _Pass, 
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

//Get All Hosts
const getAllHostes =async (req, res)=>{
    // res.set('headers', '*')
    try {
        let data = await Host.find({});
        console.log(data);
        if (data) {
            res.status(200).json({
                status : 'success',
                hosts : data
            })
        }else console.log('Error in Host Data');
        res.status(200).send(users);
    } catch (error) {
        console.log(error.message);
    }
}

// git host by ID
const getHostById = async(req, res) => {
    try {
        let {id} = req.params;
        let host = await Host.findOne({host_id : id});
        if(host)
            res.status(200).send(user);
        else
            res.sendStatus(204)
    } catch (error) {
        console.log(error.message);
    }
}


/******************************************************* */
// -----------------------update Hosts---------------------------------
const updateHostById  = async(req, res) => {
    await Host.findByIdAndUpdate(req.params.id,{
        host_name: req.body.host_name,
        email: req.body.email,
        password: req.body.password,
        host_location: req.body.host_location,
        host_about: req.body.host_about,
        host_neighbourhood: req.body.host_neighbourhood,
        host_listings_count: req.body.host_listings_count,
        host_picture: req.body.host_picture,
    },{new:true})
    .then(data =>{
        res.send("update done ...." + data);
        return data;
    }).catch(err =>{
        console.log(err)
    })
};

/******************************************************* */
// -----------------------delete Hosts---------------------------------

const deleteHosts =async (req, res) => {
    await Host.findByIdAndDelete(req.params.id,{
        email: req.body.email
    })
    .then(data =>{
        res.send("deleteng  done" + data);
    }).catch(err =>{
        console.log(err)
    })
};


module.exports = {getAllHostes, getHostById, createHost, updateHostById, deleteHosts};