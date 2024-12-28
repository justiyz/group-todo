const Joi = require('joi');



const signup = Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    password: Joi.string().required().min(8),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
});

const login = Joi.object({
    password: Joi.string().min(8).required().messages({
        'string.min': 'Password must be at least 8 characters long.',
        'any.required': 'Password is required.'
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'Email must be a valid email address.'
    }),
    username: Joi.string().optional().messages({
        'string.base': 'Username must be a string.'
    })
})
.xor('email', 'username')
.messages({
    'object.missing': 'Either email or username is required.'
});

const inviteUser = Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string().email().required(),
});



module.exports = {
    signup,
    login,
    inviteUser,
}