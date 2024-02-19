import { Router } from 'express';
import { createHost, getAllHostes, getHostById, updateHostById } from '../controllers/hostController.js';

const route = Router();

// we have to add a middleware to reject any fack request
route.param('id', (req,res,next,value)=> {
    // req.id = req.params.id;
    if(Number(value)) // id = value
        next();
    else
        res.status(400).send('invalide id');
})

route.get('/', getAllHostes)
route.get('/:id', getHostById)
route.post('/create', createHost)
route.get('/updateUser/:id', updateHostById)



// route.put('/update/:id', (req,res)=>{  // use put when u want changa all data
//     let user = users.findIndex((value)=>{value.id == req.params.id});
//     upuser = {name: 'Ayman', dep: 'MERN'};
//     user.name = upuser.name
//     res.send(user)
// })
// route.delete('/delete/:id',(req,res) => {
//     let id = req.params.id;
//     let indx = users.findIndex((value)=> {return value.id == id});
//     console.log(indx);
//     if(indx != -1){
//         users.splice(indx, 1)
//         res.send('user deleted');
//         return
//     }
//     res.send('Not Found');
// })


export default route;