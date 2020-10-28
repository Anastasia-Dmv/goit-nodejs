const { Router } = require("express");
const { errorHandlingWrapper } = require("../helpers/utils");

const {
  validate,
  updateContactSchema,
  createContactSchema,
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
  validate(createContactSchema),
  errorHandlingWrapper(createContact)
);
router.get("/:contactId", errorHandlingWrapper(findContactById));
router.put(
  "/:contactId",
  validate(updateContactSchema),
  errorHandlingWrapper(updateContact)
);
router.delete("/:contactId", errorHandlingWrapper(deleteContactById));

exports.contactsRouter = router;
