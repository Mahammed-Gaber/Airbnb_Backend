import express, { urlencoded, json} from 'express';
const app = express();
import helmet from 'helmet';
import userRoute from './routes/userRoute.js';
// const Ajv = require('ajv'); // schema validator
// const ajv = new Ajv()
const port = process.env.PORT || 5050;




// 1) import mongoose
import { connect, Schema, model } from 'mongoose';
// 2) connection with database
connect('mongodb://127.0.0.1/MERN').then(()=>{
    console.log('Database Connected...');
}).catch((err)=>{
    console.log(err);
})

// 3) create schema
const userSchema = new Schema({
    userName: String,
    email: String,
    password: String
})

// 4) create model
const User = model('users', userSchema);

export default User;

// const findUser = User.findOne({userName: 'Ahmed'}).exec();
// findUser.then((data)=> {
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// })

// User.find().then(console.log).catch(console.log)

// app.use((req, res, next)=>{
//     res.sendStatus(503) // we can use it in case fixing server
//     // sendStatus it contain end connection not next
    // console.log(res.sendStatus(503));
// })
// Http Methods
// Get endpoint
// app.get('/', (req, res)=> {
//     res.send('Welcome to my App')
// })
// app.get('/home', (req, res)=> {
//     res.send('Hello From Back');
// })
// app.post('/', (req, res)=> {
//     res.send('hii from post endpoind method');
// })

app.use(urlencoded({extended: true})); // using when u send data by forms or application/x-www-form-urlencoded
app.use(json()); // using when u send data as json data

app.use('/api', express.static('public'));
app.use(helmet()); // secure your apps by setting various HTTP headers.

app.use('/users' , userRoute)


app.listen(port, ()=> console.log(`app listinig in port ${port}`))

