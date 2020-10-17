const uuid =require('uuid');


 exports.saveUser = (userParams )=>{
     const id = uuid.v4();
     const createUser ={id, ...userParams};
     users.push(createUser);
     return createUser;
 }

 exports.find = ()=>{
     return users;
 }
 exports.getUsers = async (req, res, next) => {
    
    const users = await UserModel.getAllContacts();
    res.status(200).send(users);
  };