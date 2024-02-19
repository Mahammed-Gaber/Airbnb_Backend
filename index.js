const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const helmet =require('helmet');

const hostRoute = require('./routes/hostRoute.js');
const guestRoute = require('./routes/guestRoute.js');
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

app.use('/users' , hostRoute);
app.use('/guest', guestRoute)



app.listen(port, ()=> console.log(`app listinig in port ${port}`))

