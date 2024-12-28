const {errorResponse} = require('../helpers/response');
const enums = require('../lib/enums');

const UserValidation = require('../validations/validation.user');
const OrganizationValidation = require('../validations/validation.organization');

const signup = (req, res, next) => {
    const {error, value} = UserValidation.signup.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};

const login = (req, res, next) => {
    const {error, value} = UserValidation.login.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};

const inviteUser = (req, res, next) => {
    const {error, value} = UserValidation.login.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};


const addOrganization = (req, res, next) => {
    const {error, value} = OrganizationValidation.addOrganization.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};

module.exports = {
    signup,
    login,
    inviteUser,
    addOrganization,
}