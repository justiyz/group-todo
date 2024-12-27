const express = require('express');
const router = express.Router();



router.post(
    '/signup',
    PayloadValidationModel.signup,
    UserMiddleware.validateUnAuthenticatedUser('validate'),
    AuthMiddleware.checkOtpVerificationRequestCount,
    AuthController.signup
);


module.exports = router;