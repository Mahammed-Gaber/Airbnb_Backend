import { Router } from 'express';
import { createUser, getAllUsers, getUserById, updateUserById } from '../controllers/userController.js';

const router = Router();

router.param('id', (req,res,next,value)=> {
    // req.id = req.params.id;
    if(Number(value)) // id = value
        next();
    else
        res.status(400).send('invalide id');
})

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/create', createUser)
router.get('/updateUser/:id', updateUserById)



router.put('/update/:id', (req,res)=>{  // use put when u want changa all data
    let user = users.findIndex((value)=>{value.id == req.params.id});
    upuser = {name: 'Ayman', dep: 'MERN'};
    user.name = upuser.name
    res.send(user)
})
router.delete('/delete/:id',(req,res) => {
    let id = req.params.id;
    let indx = users.findIndex((value)=> {return value.id == id});
    console.log(indx);
    if(indx != -1){
        users.splice(indx, 1)
        res.send('user deleted');
        return
    }
    res.send('Not Found');
})


export default router;