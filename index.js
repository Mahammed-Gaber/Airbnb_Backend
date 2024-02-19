import express, { urlencoded, json} from 'express';
const app = express();
const port = process.env.PORT || 5050;
import helmet from 'helmet';

import hostRoute from './routes/hostRoute.js';

// 1) import mongoose
import { connect } from 'mongoose';
// 2) connection with database
connect('mongodb://127.0.0.1:27017/MERN').then(()=>{
    console.log('Database Connected...');
}).catch((err)=>{
    console.log(err);
})


// // 3) create schema
// const userSchema = new Schema({
//     userName: String,
//     email: String,
//     password: String
// })
// 4) create model
// const User = model('users', userSchema);
// export default User;


app.use(json()); // using when u send data as json data
app.use(urlencoded({extended: true})); // using when u send data by forms or application/x-www-form-urlencoded
app.use(helmet()); // secure your apps by setting various HTTP headers.

app.use('/users' , hostRoute)



app.listen(port, ()=> console.log(`app listinig in port ${port}`))

