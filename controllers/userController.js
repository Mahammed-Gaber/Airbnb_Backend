
/*************** Controller in Design pattern MVC ***************/

// DataBase
const users = [
    {name: 'mahammed', dep: 'MERN', id: 1},
    {name: 'ali', dep: 'SDF', id: 2},
    {name: 'ahmed', dep: 'SDF', id: 3},
    {name: 'hassan', dep: 'MERN', id: 4},
    {name: 'hossam', dep: 'SDF', id: 5},
    {name: 'asmaa', dep: 'MERN', id: 6},
]

const getAllUsers = (req, res)=>{
    // res.set('headers', '*')
    res.status(200).send(users);
}

const getUserById = (req, res) => {
    let id = req.params.id;
    console.log(req.params);
    let user = users.find((value, index, arr) => {return value.id == id});
    if(user)
        res.status(200).send(user);
    else
        res.sendStatus(204)
}

const createUser = (req, res)=> {
    req.body.id = users.length+1;
    users.push(req.body);
    res.json(req.body);
}

const updateUserById = (req,res)=> {
    req.params.id
    let user = users.find((value)=> {return value.id == req.params.id})
    upuser = {name: 'Ayman', dep: ['SDF', 'MEARN']};
    user.name = upuser.name;
    user.dep = upuser.dep;
    console.log(user);
    res.status(201).send(user)
    // here in first time it status is 201,
    // in the second time in the same user it status is 304,
    // search why that happend and what mean 304 ?
}


export {getAllUsers, getUserById, createUser, updateUserById};