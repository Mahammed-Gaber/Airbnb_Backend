// save port and token in file config .env
require("dotenv").config();

const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const port = process.env.PORT;
const helmet =require('helmet');
const cookieParser = require("cookie-parser");
const cors = require('cors')


const hostRoute = require('./routes/hostRoute.js');
const guestRoute = require('./routes/guestRoute.js');
const placeRoute = require('./routes/placeRoutes.js');
const bookingRoute = require('./routes/bookingRoute.js');
const reviewRoute = require('./routes/reviewRoute.js');


// Connection with database
mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log('Database Connected...');
}).catch((err)=>{
    console.log(err);
})

// 1) GLOBAL MIDDLEWARE

//Body parser, reading data from body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Set security HTTP headers
// app.use(helmet());
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

// Cookie parser
app.use(cookieParser());

app.use(cors())
app.use(express.static("imgs"));
app.use("/images", express.static("./images"));

// 2) ROUTES
// app.use((req,res, next)=> {
//     // console.log(req);
//     console.log(req.protocol);
//     next()
// })
app.use('/hosts' , hostRoute);
app.use('/guests', guestRoute);
app.use('/place', placeRoute);
app.use('/booking', bookingRoute);
app.use('/reviews', reviewRoute)

app.listen(port, ()=> console.log(`app listinig in port ${port}`))
