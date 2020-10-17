const {Router}= require('express');
const { getAllContacts } = require('./users.controller');
const  router = Router();

router.get("/api/contacts", getAllContacts  );
exports.usersRouter = router;