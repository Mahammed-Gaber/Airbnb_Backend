const Host = require("../models/Host");
const catchAsync = require('../utils/catchAsync');


const getAllHostes = catchAsync(async(req, res)=>{
        let hosts = await Host.find({});
        if (!hosts) return res.status(404).send('Error on get Hosts');

        res.status(200).json({
            status : 'success',
            results : hosts.length,
            data : hosts
        });
})

const getHostById = catchAsync(async(req, res) => {
    if (!req.params.id) return res.status(404).send('User ID not found');

    let host = await Host.findById(req.params.id);
    if (!host) return res.status(404).send('User not found!');
    res.status(200).json({
        status: 'success',
        data: host
    })
});

const updateHostById  = catchAsync(async(req, res) => {
    const newHost = await Host.findByIdAndUpdate(req.params.id,{
        host_name: req.body.host_name,
        host_location: req.body.host_location,
        host_about: req.body.host_about,
        host_neighbourhood: req.body.host_neighbourhood,
        host_listings_count: req.body.host_listings_count,
        host_picture: req.body.host_picture,
    },{
        new:true,
        runValidatours : true
    });

    if(!newHost) return res.status(400).send('Error on Updata Host');

    res.status(200).json({
        status : 'success',
        data : newHost
    })
});

const deleteHost = catchAsync(async(req, res) => {
    if (!req.params.id) return res.status(404).send('User ID not found');

    let deleteUser = await Host.findByIdAndDelete(req.params.id);

    if (!deleteUser) return res.status(404).send('User not found!');

    res.sendStatus(204);
});


module.exports = {getAllHostes, getHostById, updateHostById, deleteHost};