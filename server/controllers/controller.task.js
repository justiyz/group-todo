


const {successResponse, errorResponse} = require("../helpers/response");
const enums = require("../lib/enums");
const logger = require("../logger/logger");
const TaskService = require("../services/service.task");



class TaskController {

    static async createTask(req, res, next) {
        try {
            const {body, user} = req;
            
            const response = await TaskService.createTask(body, user);
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully created a task::createTask.controllers.user.js`);

            return res.status(enums.HTTP_OK).json(successResponse(`task created successfully`, response));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: creating task failed::createTask.controllers.user.js`);
            return next(error);
        }
    }

    static async updateTask(req, res, next) {
        try {
            const {body, task_details} = req;
            
            const response = await TaskService.updateTask(body);
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully updated a task::updateTask.controllers.user.js`);

            return res.status(enums.HTTP_OK).json(successResponse(`task updated successfully`, response));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: updating task failed::updateTask.controllers.user.js`);
            return next(error);
        }
    }

    static async assignTask(req, res, next) {
        try {
            const {body, task_details} = req;
            
            const response = await TaskService.assignTask(body);
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully assigned a task::assignTask.controllers.user.js`);

            return res.status(enums.HTTP_OK).json(successResponse(`task assigned successfully`, response));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: assigning task failed::assignTask.controllers.user.js`);
            return next(error);
        }
    }



}


module.exports = TaskController;