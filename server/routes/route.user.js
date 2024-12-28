const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controller.user');
const UserMiddleware = require('../middlewares/middleware.user')

const PayloadValidationModel = require('../middlewares/middleware.model');



router.post(
    '/signup',
    PayloadValidationModel.signup,
    UserMiddleware.checkIfEmailIsUnique,
    UserMiddleware.checkIfUsernameIsUnique,
    UserController.signup
);

// router.post('/login',
//     PayloadValidationModel.login,
//     UserMiddleware.comparePassword,
//     UserMiddleware.checkOtpVerificationRequestCount,
//     // AuthController.completeUserLoginRequest
// );


module.exports = router;