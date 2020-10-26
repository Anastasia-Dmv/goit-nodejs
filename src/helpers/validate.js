const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const validationResult = schema.validate(req[reqPart]);
    if (validationResult.error) {
      return res.status(400).json(validationResult.error.message);
    }
    next();
  };
};

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  subscription: Joi.string(),
  password: Joi.string(),
});
const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
});
const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  // subscription: {
  //   type: Joi.string().required(),
  //   enum: ["free", "pro", "premium"],
  //   default: "free",
  // },
  //token: Joi.string().required(),
});
const singInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
module.exports = {
  updateContactSchema,
  createContactSchema,
  validate,
  signUpSchema,
  singInSchema,
};
