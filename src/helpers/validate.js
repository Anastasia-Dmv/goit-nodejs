const Joi = require("joi");

validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).send(validationResult.error);
    }
    next();
  };
};

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});
module.exports = {
  updateContactSchema,
  createContactSchema,
  validate,
};
