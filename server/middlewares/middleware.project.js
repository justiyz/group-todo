const ProjectDao = require("../dao/dao.project");
const {errorResponse} = require("../helpers/response");
const enums = require("../lib/enums");
const logger = require("../logger/logger");





class ProjectMiddleware {


    static async checkIfProjectnameIsUnique(req, res, next) {
        try {

            const {body, user, organization_details} = req;
            const payload = body.name;
            const existing_project = await ProjectDao.getProjectByNameAndOrganizationId(payload, organization_details.id);
            if (existing_project) {
                logger.error(`${ enums.CURRENT_TIME_STAMP },:::Info: project name is not unique::checkIfProjectnameIsUnique.middlewares.project.js`);
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('there is an account with that username already', enums.HTTP_BAD_REQUEST));
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: project name is unique::checkIfProjectnameIsUnique.middlewares.project.js`);
            return next();            
        } catch (error) {
            return next(error);
        }
    }

    static async checkIfProjectExists(req, res, next) {
        try {

            const {params: {}} = req;
            const id = req.params.id || req.body.project_id;
            const project = await ProjectDao.get(id);
            if (!project) {
                logger.error(`${ enums.CURRENT_TIME_STAMP },:::Info: project not found::checkIfProjectExists.middlewares.project.js`);
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('project not found', enums.HTTP_BAD_REQUEST));
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: project found::checkIfProjectExists.middlewares.project.js`);
            req.project_details = project;
            return next();            
        } catch (error) {
            return next(error);
        }
    }



}

module.exports = ProjectMiddleware;