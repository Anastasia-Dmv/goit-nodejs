const {
  errorHandlingWrapper,
  listOfContacts,
  getContactById,
   removeContact,
   addContact,
   findAndUpdateContact
} = require("../users/users.model");




exports.createUser = async (req, res, next)=>{
  const newUser =  await errorHandlingWrapper(addContact(req.body))
res.status(201).json(newUser);
}


 exports.getAllContacts = async (req, res, next)=>{

      const users =  await errorHandlingWrapper(listOfContacts);
    
       res.status(200).send(users);
 }
exports.findContactById = async (req, res, next) => { 
  const { contactId } = req.params;
  const  contact =  await  errorHandlingWrapper(getContactById(contactId));
  console.log('contact', contact)
  if(!contact){
    return res.status(404).send('Contact not found ')
  }
 res.status(200).send(contact);
}



 exports.updateContact = async (req, res, next)=>{
  const { contactId } = req.params;
  const  updatedContact =  await  errorHandlingWrapper(findAndUpdateContact(contactId, req.body));
  if(!updatedContact){
    return res.status(404).send('Not found')
  }
   return res.status(200).send(updatedContact)
 }


 exports.deleteContactById = async (req, res, next)=>{
 const { contactId } = req.params;
 const  contact =  await  errorHandlingWrapper(getContactById(contactId));
 if(!contact){
  return res.status(404).send('Not found')
}
  await  errorHandlingWrapper(removeContact(contactId))
 return   res.status(200).send("Contact deleted");
 }
