const {errorResponse} = require('../helpers/response');
const enums = require('../lib/enums');

const UserValidation = require('../validations/validation.user');
const OrganizationValidation = require('../validations/validation.organization');
const ProjectValidation = require('../validations/validation.project');
const TaskValidation = require('../validations/validation.task');

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

const idParams = (req, res, next) => {
    const {error, value} = OrganizationValidation.idParams.validate(req.params, {allowUnknown: false});
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};

const fetchAllOrganizaztions = (req, res, next) => {
    const { error, value } = OrganizationValidation.fetchAllOrgaizations.validate(req.query, { allowUnknown: false });
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};

const createProject = (req, res, next) => {
    const {error, value} = ProjectValidation.createProject.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};

const createTask = (req, res, next) => {
    const {error, value} = TaskValidation.createTask.validate(req.body, {allowUnknown: false});
    if (error) {
        return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(`${ error.details[0].message }`, enums.HTTP_BAD_REQUEST));
    }
    req.validatedData = value;
    next();
};

const updateTask = (req, res, next) => {
    const {error, value} = TaskValidation.updateTask.validate(req.body, {allowUnknown: false});
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
    idParams,
    fetchAllOrganizaztions,
    createProject,
    createTask,
    updateTask,
}