exports.validate =(schema)=>{
    return  (req, res, next)=>{
        // const weatherRules = Joi.object({
        //     lat: Joi.string().required(),
        //     lon: Joi.string().required(),
        //   });
          const validationResult = schema.validate(req.body);
      
          if (validationResult.error) {
            return res.status(400).send(validationResult.error);
          }
          next();

    }

}