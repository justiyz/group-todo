


const {successResponse, errorResponse} = require("../helpers/response");
const enums = require("../lib/enums");
const logger = require("../logger/logger");
const TaskService = require("../services/service.task");



class TaskController {

    static async createTask(req, res, next) {
        try {
            const {body, user} = req;
            
            const response = await TaskService.createTask(body);
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully created a task::createTask.controllers.user.js`);

            return res.status(enums.HTTP_OK).json(successResponse(`task created successfully`, response));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: creating task failed::createTask.controllers.user.js`);
            return next(error);
        }
    }



}


module.exports = TaskController;