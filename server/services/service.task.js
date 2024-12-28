
const TaskDao = require('../dao/dao.task');
const enums = require('../lib/enums');
const logger = require('../logger/logger');
const constants = require('../utils/constants');



class TaskService {

    static async createTask(body) {
        try {
            const payload = {
                name: body.name, project_id: body.project_id, status: constants.TODO, priority: body.priority,
                description: body.description, title: body.title
            };
            const new_task = await TaskDao.create(payload);
            return new_task;
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, creating task failed::createOrganization.service.user.js`, error.message);
            throw error;
        }
    }









}

module.exports = TaskService;