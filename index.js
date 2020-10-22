
const { crudServer } = require("./src/server");
crudServer.start();


// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, ".env") });

// const express = require("express");
// const Joi = require("joi");
// const app = express();
// const morgan = require("morgan");
// const cors = require("cors");
// const { join } = require("path");

// app.use(express.json());
// const PORT = process.env.PORT || 3000;
// // PORT = 3000;
// app.get("/hello", (req, res, next) => {
//   console.log("req.body", req.body);
//   res.send("hello world!!!");
// });

// app.get(
//   "/weather",




//   (req, res, next) => {
//     const weatherRules = Joi.object({
//       lat: Joi.string().required(),
//       lon: Joi.string().required(),
//     });
//     const validationResult = weatherRules.validate(req.query);

//     if (validationResult.error) {
//       return res.status(400).send(validationResult.error);
//     }
//     next();
//   },
//   (req, res, next) => {
//     console.log("res.query", req.query);
//     res.json({ weather: "test" });
//   }
// );
// app.listen(PORT, () => {
//   console.log("Started", PORT);
// });
// const {n
//   hof,
//   listOfContacts,
//   getContactById,
//   removeContact,
//   addContact,
// } = require("./contacts");

// const PORT = process.env.PORT || 3000;

// var router = express.Router();

// router.get("/", (req, res) => {
//   //handle root
// });

// app.listen(PORT, (err) => {
//   if (err) {
//     return console.log("ERROR", err);
//   }
//   console.log(`Server has been started on port ${PORT}`);
// });

// // app.use(express.urlencoded());
// // app.use(express.json());
// app
//   .route("/api/contacts")
//   .get("/api/contacts", (req, res) => {})
//   .post("/api/contacts", (req, res) => {});

// app
//   .route("/api/contacts/:contactId")
//   .get((req, res) => {})
//   .delete((req, res) => {})
//   .patch((req, res) => {});
