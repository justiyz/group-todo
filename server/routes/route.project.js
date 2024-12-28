const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controller.user');
const UserMiddleware = require('../middlewares/middleware.user');
const PayloadValidationModel = require('../middlewares/middleware.model');
const ProjectMiddleware = require('../middlewares/middleware.project');
const ProjectController = require('../controllers/controller.project');
const OrganizationMiddleware = require('../middlewares/middleware.organization');


router.post('/',
    UserMiddleware.validateUserAuthToken,
    PayloadValidationModel.createProject,
    OrganizationMiddleware.checkIfOrganizationExists,
    ProjectMiddleware.checkIfProjectnameIsUnique,
    ProjectController.createProject
);











module.exports = router;