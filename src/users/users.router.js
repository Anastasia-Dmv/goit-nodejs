// const express = require('express');
// const router = express.Router();
 const Joi = require("joi");

  const {validate} =require("../helpers/validate");
const  {createUser, getAllContacts, findContactById}  = require('./users.controller');
//const {getAllContacts } = require('./users.controller');



const {Router}= require('express');


 const  router = Router();

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
})

router.post("/",validate(createUserSchema), createUser );

router.get("/", getAllContacts );

router.get("/:contactId", findContactById );


// module.exports = router;
exports.usersRouter = router;