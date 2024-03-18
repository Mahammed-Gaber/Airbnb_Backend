// save port and token in file config .env
require("dotenv").config();

const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const port = process.env.PORT;
const helmet =require('helmet');
const cookieParser = require("cookie-parser");


const hostRoute = require('./routes/hostRoute.js');
const guestRoute = require('./routes/guestRoute.js');
const placeRoute = require('./routes/placeRoutes.js');
const bookingRoute = require('./routes/bookingRoute.js');


// Connection with database
mongoose.connect('mongodb://127.0.0.1:27017/MERN').then(()=>{
    console.log('Database Connected...');
}).catch((err)=>{
    console.log(err);
})

// 1) GLOBAL MIDDLEWARE

//Body parser, reading data from body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Set security HTTP headers
app.use(helmet());

// Cookie parser
app.use(cookieParser());

// 2) ROUTES
app.use('/hosts' , hostRoute);
app.use('/guests', guestRoute);
app.use('/place', placeRoute);
app.use('/booking', bookingRoute);


app.listen(port, ()=> console.log(`app listinig in port ${port}`))