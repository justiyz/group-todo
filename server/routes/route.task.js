const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controller.user');
const UserMiddleware = require('../middlewares/middleware.user')

const PayloadValidationModel = require('../middlewares/middleware.model');
const ProjectMiddleware = require('../middlewares/middleware.project');
const TaskMiddleware = require('../middlewares/middleware.task');
const TaskController = require('../controllers/controller.task');



router.post('/',
    UserMiddleware.validateUserAuthToken,
    PayloadValidationModel.createTask,
    ProjectMiddleware.checkIfProjectExists,
    TaskController.createTask
);

router.patch('/',
    UserMiddleware.validateUserAuthToken,
    PayloadValidationModel.updateTask,
    TaskMiddleware.checkIfTaskExists,
    TaskController.updateTask
);






module.exports = router;