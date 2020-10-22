const { userModel } = require("./users.model");
const {
  hof,
  listOfContacts,
//   getContactById,
//   removeContact,
   addContact,
} = require("../users/users.model");




exports.createUser =  (req, res, next)=>{
  const newUser = hof(addContact(req.body))
res.status(201).send(newUser);
}
// async function getAllContacts(req, res, next) {

//     const users = await hof(listOfContacts);
//     res.status(200).send(users);

// //      res.status(200).send();
// //      const newUser = saveUser(req.body);
// //      res.status(201).send(newUser);
//  }

 exports.getAllContacts =  (req, res, next)=>{

      const users =   hof(listOfContacts);
    //  console.log('users', users);
    //  res.status(200).send(users);
       res.status(200).json(users);
 }

// module.exports ={
//   getAllContacts
// }