const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/users.model");
const { Unauthorized } = require("./errors/Unauthorized.error");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, " ../../../.env  ") });

exports.authorize = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    const authHeader = req.headers.authorization;
    token = authHeader.replace("Bearer ", "");
  } else {
    token = req.cookies.token;
  }
  console.log("token", token);
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload=====?????", payload);
  } catch (err) {
    return res.status(401).send("Authorization failed");
  }
  console.log("payload======>", payload);
  const user = await UserModel.findById(payload.userId);

  req.user = user;

  next();
};
// exports.authorize = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     let payload;
//     try {
//       payload = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//       return res.status(401).json("Authorization failed");
//     }
//     const user = await UserModel.findById(payload.userId);
//     if (!user) throw new Unauthorized();
//     req.user = user;
//     next();
//   } catch (err) {
//     next(new Unauthorized("Token is not valid"));
//   }
// };
