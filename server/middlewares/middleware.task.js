const TaskDao = require("../dao/dao.task");
const {errorResponse} = require("../helpers/response");
const enums = require("../lib/enums");
const logger = require("../logger/logger");





class TaskMiddleware{

    static async checkIfTaskExists(req, res, next) {
        try {

            const {params: {}} = req;
            const id = req.params.id || req.body.id;
            const task = await TaskDao.get(id);
            if (!task) {
                logger.error(`${ enums.CURRENT_TIME_STAMP },:::Info: task not found::checkIfTaskExists.middlewares.task.js`);
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('task not found', enums.HTTP_BAD_REQUEST));
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: task found::checkIfTaskExists.middlewares.task.js`);
            req.task_details = task;
            return next();            
        } catch (error) {
            return next(error);
        }
    }

    


}


module.exports = TaskMiddleware;