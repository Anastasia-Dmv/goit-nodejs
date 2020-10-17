const { userModel } = require("./users.model");
const {
  hof,
  listOfContacts,
//   getContactById,
//   removeContact,
//   addContact,
} = require("../../contacts");

 exports.getAllContacts = async (req, res, next)=>{
    const users = await hof(listOfContacts);
    res.status(200).send(users);

//      res.status(200).send();
//      const newUser = saveUser(req.body);
//      res.status(201).send(newUser);
 }

//  exports.getUsers = (req, res, next)=>{

//      const users = hof(listOfContacts);
//      res.status(200).send(users);
//  }