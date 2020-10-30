const express = require("express");
const multer = require("multer");
const { Router } = require("express");
const router = Router();
const server = express();

// const images = multer({ dest: "public" });

// const { Router } = require("express");
//server.use("/public", express.static("public"));

// server.post("/", (req, res, next) => {
//   console.log("req.file", req);
//   res.send("hello");
// });
// server.listen(3000, () => {
//   console.log("Server Started Listening");
// });
// const router = Router();
// router.get("/", validate(signUpSchema), signUp);
//exports.multerRouter = router;
