const Joi = require("joi");

const email = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'info', 'io']}}).min(5).max(50).required();
const username = Joi.string().min(4).max(50).required();
const password = Joi.string().min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]*$/).max(255).required();

const login_shcema = {
    username,
    password
}

const register_schema = {
    email,
    name: Joi.string().min(5).max(50).required(),
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(8).max(255).required(),
}

const reset_password_mail_schema = {
    email,
}

const reset_password_schema = {
    password,
    confirm_password: Joi.ref('password')
}

module.exports = {
    login_shcema,
    register_schema,
    reset_password_mail_schema,
    reset_password_schema
}