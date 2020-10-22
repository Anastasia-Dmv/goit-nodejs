//const { userModel, getContactById } = require("./users.model");
const {
  hof,
  listOfContacts,
  getContactById,
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

//      res.status(200).send();
//      const newUser = saveUser(req.body);
//      res.status(201).send(newUser);
//  }

 exports.getAllContacts = async (req, res, next)=>{

      const users =  await hof(listOfContacts);
    //  console.log('users', users);
    //  res.status(200).send(users);
       res.status(200).send(users);
 }
exports.findContactById = async (req, res, next)=>{
  const { contactId } = req.params;
  const  contact =  await  hof(getContactById(contactId));
  console.log('contact', contact)
  if(!contact|| contact === undefined){
    return res.status(404).send('Contact not found ')
  }
return res.status(200).send(contact);
}
// module.exports ={
//   getAllContacts
// }