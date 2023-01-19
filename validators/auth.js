const Joi = require("joi");

const login_schema = {
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/).max(255).required()
}

const registration_schema = {
    email: Joi.string().email().min(3).max(255).required(),
    name: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/).max(255).required(),
    username: Joi.string().min(3).max(50).required(),
}

module.exports = {
    login_schema,
    registration_schema,
}