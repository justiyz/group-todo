const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controller.user');
const OrganizationController = require('../controllers/controller.organization');
const UserMiddleware = require('../middlewares/middleware.user');
const PayloadValidationModel = require('../middlewares/middleware.model');
const OrganizationMiddleware = require('../middlewares/middleware.organization');



router.post('/',
    UserMiddleware.validateUserAuthToken,
    PayloadValidationModel.addOrganization,
    OrganizationMiddleware.checkIfOrganizationNameIsUnique,
    OrganizationController.addOrganization
);

router.get('/:id',
    UserMiddleware.validateUserAuthToken,
    PayloadValidationModel.idParams,
    OrganizationMiddleware.checkIfOrganizationExists,
    OrganizationController.getOrganizationDetails
);

router.get('/',
    UserMiddleware.validateUserAuthToken,
    PayloadValidationModel.fetchAllOrganizaztions,
    OrganizationController.getOrganizations
);







module.exports = router;