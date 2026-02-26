const Joi = require("joi");

exports.validateLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(data, { abortEarly: false });
};