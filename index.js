// save port and token in file config .env
require("dotenv").config();

const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const helmet =require('helmet');


const hostRoute = require('./routes/hostRoute.js');
const guestRoute = require('./routes/guestRoute.js');
const placeRoute = require('./routes/placeRoutes.js');
const bookingRoute = require('./routes/bookingRoute.js');
// 1) const mongoose
const { connect } = require('mongoose');

// 2) connection with database
connect('mongodb://127.0.0.1:27017/MERN').then(()=>{
    console.log('Database Connected...');
}).catch((err)=>{
    console.log(err);
})

app.use(express.json()); // using when u send data as json data
app.use(express.urlencoded({extended: true})); // using when u send data by forms or application/x-www-form-urlencoded
app.use(helmet()); // to add more security your apps by setting various HTTP headers.

// we have to add a middleware to reject any fack request
app.param('id', (req,res,next,value)=> {
    if(Number(value))
        next();
    else
        res.status(400).send('id not number from middleware!');
})


app.use('/hosts' , hostRoute);
app.use('/guests', guestRoute);
app.use('/place', placeRoute);
app.use('/booking', bookingRoute);

app.listen(port, ()=> console.log(`app listinig in port ${port}`))


