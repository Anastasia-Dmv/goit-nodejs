// const { required } = require("joi");
//const jwt = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
//const jwt = require("jsonwebtoken");
const { UserModel } = require("../users/users.model");
const { Unauthorized } = require("./errors/Unauthorized.error");

exports.authorize = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(payload.userId);
    if (!user) {
      throw new Unauthorized();
    }

    req.user = user;

    next();
  } catch (err) {
    next(new Unauthorized("Token is not valid"));
  }
};
