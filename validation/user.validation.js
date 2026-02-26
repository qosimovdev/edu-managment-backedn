const Joi = require("joi");

exports.validateRegister = (data) => {
    const schema = Joi.object({
        fullName: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data, { abortEarly: false });
};