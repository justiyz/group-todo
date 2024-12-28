const {errorResponse} = require('../helpers/response');

const UserValidation = require('../validations/validation.user')

const signup = (req, res, next) => {
    const {error, value} = UserValidation.signup.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(400).json(errorResponse(`${ error.details[0].message }`, 400));
    }
    req.validatedData = value;
    next();
};

const login = (req, res, next) => {
    const {error, value} = UserValidation.login.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(400).json(errorResponse(`${ error.details[0].message }`, 400));
    }
    req.validatedData = value;
    next();
};


module.exports = {
    signup,
    login,
}