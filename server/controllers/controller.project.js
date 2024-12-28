const {successResponse, errorResponse} = require("../helpers/response");
const enums = require("../lib/enums");
const logger = require("../logger/logger");
const ProjectService = require("../services/service.project");



class ProjectController {

    static async createProject(req, res, next) {
        try {
            const {body, user} = req;
            
            const response = await ProjectService.createProject(body);
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully created a project::createProject.controllers.user.js`);

            return res.status(enums.HTTP_OK).json(successResponse(`project created successfully`, response));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: creating project failed::createProject.controllers.user.js`);
            return next(error);
        }
    }

    static async getProjectDetails(req, res, next) {
        try {
            const {user, project_details } = req;
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully gotten project details::getOrganizationDetails.controllers.user.js`);
            return res.status(enums.HTTP_OK).json(successResponse(`project details fetched successfully`, project_details));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: getting project details failed::getOrganizationDetails.controllers.user.js`);
            return next(error);
        }
    }


}

module.exports = ProjectController;