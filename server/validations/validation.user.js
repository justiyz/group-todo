const Joi = require('joi');



const signup = Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    password: Joi.string().required().min(8),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
});

const login = Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().email().required(),
});


module.exports = {
    signup,
    login,
}