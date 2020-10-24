const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

validate = (schema, reqPart = "body") => {
  return (req, res, next) => {
    const validationResult = schema.validate(req[reqPart]);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error.message);
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
  token: Joi.string(),
});
const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  subscription: Joi.string().required(),
  password: Joi.string().required(),
  token: Joi.string().required(),
});

const validateIdSchema = Joi.object({
  _id: Joi.objectId(),
});

module.exports = {
  updateContactSchema,
  createContactSchema,
  validate,
  validateIdSchema,
};
