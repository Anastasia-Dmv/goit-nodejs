const { Router } = require("express");
const Joi = require("joi");
const { errorHandlingWrapper } = require("../helpers/utils");

const {
  validate,
  updateContactSchema,
  createContactSchema,
  validateIdSchema,
} = require("../helpers/validate");
const {
  createContact,
  getAllContacts,
  findContactById,
  updateContact,
  deleteContactById,
} = require("./contacts.controller");

const router = Router();

router.route("/api/contacts");

router.get("/", errorHandlingWrapper(getAllContacts));

router.post(
  "/",
  validate(createContactSchema, "params"),
  errorHandlingWrapper(createContact)
);

router.get(
  "/:contactId",
  // validate(validateIdSchema, "params"),
  errorHandlingWrapper(findContactById)
);

router.put(
  "/:contactId",
  //validate(validateIdSchema, "params"),
  validate(updateContactSchema),
  errorHandlingWrapper(updateContact)
);

router.delete(
  "/:contactId",
  //validate(validateIdSchema, "params"),
  errorHandlingWrapper(deleteContactById)
);

exports.usersRouter = router;
