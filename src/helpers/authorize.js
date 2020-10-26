// const { required } = require("joi");
//const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
//const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/users.model");
const { Unauthorized } = require("./errors/Unauthorized.error");

exports.authorize = async (req, res, next) => {
  try {
    console.log("req.headers", req.headers);
    const token = req.cookies;
    //const newToken = req.headers.authorization.split(" ")[1];
    console.log("token==========>", token);
    console.log("process.env.JWT_SECRET", process.env.JWT_SECRET);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload", payload);
    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Unauthorized();
    }

    req.user = user;
    console.log("user", user);
    next();
  } catch (err) {
    console.log("err", err);
    next(new Unauthorized("Token is not valid"));
  }
};
