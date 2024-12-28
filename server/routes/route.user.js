const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controller.user');
const UserMiddleware = require('../middlewares/middleware.user')

const PayloadValidationModel = require('../middlewares/middleware.model');



router.post('/signup',
    PayloadValidationModel.signup,
    UserMiddleware.checkIfEmailIsUnique,
    UserMiddleware.checkIfUsernameIsUnique,
    UserController.signup
);

router.post('/login',
    PayloadValidationModel.login,
    UserMiddleware.comparePassword,
    UserController.login
);

router.get('/one',
    UserMiddleware.validateUserAuthToken,
    UserController.getUserDetails
);


module.exports = router;