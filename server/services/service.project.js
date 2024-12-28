

const ProjectDao = require('../dao/dao.project');
const enums = require('../lib/enums');
const logger = require('../logger/logger');



class ProjectService {

    static async createProject(body) {
        try {
            const payload = {name: body.name, organization_id: body.organization_id, description: body.description};
            const new_project = await ProjectDao.create(payload);
            return new_project;
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, creating organization failed::createOrganization.service.user.js`, error.message);
            throw error;
        }
    }









}

module.exports = ProjectService;