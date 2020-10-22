// const express = require('express');
// const router = express.Router();
 const Joi = require("joi");

  const {validate} =require("../helpers/validate");
const  {createUser, getAllContacts}  = require('./users.controller');
//const {getAllContacts } = require('./users.controller');



const {Router}= require('express');

 const  router = Router();

const createUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
})
 router.get("/", getAllContacts );

router.post('/',validate(createUserSchema), createUser );



// module.exports = router;
exports.usersRouter = router;