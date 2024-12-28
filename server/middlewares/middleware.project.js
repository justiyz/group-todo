const ProjectDao = require("../dao/dao.project");
const enums = require("../lib/enums");
const logger = require("../logger/logger");





class ProjectMiddleware {


    static async checkIfProjectnameIsUnique(req, res, next) {
        try {

            const {body, user, organization_details} = req;
            const payload = body.name;
            const existing_project = await ProjectDao.getProjectByNameAndOrganizationId(payload, organization_details.id);
            if (existing_project) {
                logger.error(`${ enums.CURRENT_TIME_STAMP },:::Info: project name is not unique::checkIfProjectnameIsUnique.middlewares.organization.js`);
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('there is an account with that username already', enums.HTTP_BAD_REQUEST));
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: project name is unique::checkIfProjectnameIsUnique.middlewares.organization.js`);
            return next();            
        } catch (error) {
            return next(error);
        }
    }



}

module.exports = ProjectMiddleware;