

const OrganizationDao = require('../dao/dao.organization');
const {errorResponse} = require('../helpers/response');
const enums = require('../lib/enums');
const logger = require('../logger/logger');
const constants = require('../utils/constants');
const {TODO_ACCESS_TOKEN_SECRET, } = process.env;



class OrganizationMiddleware {


    static async checkIfOrganizationNameIsUnique(req, res, next) {
        try {

            const {body, user} = req;
            const payload = body.name;
            const existing_organization = await OrganizationDao.getOrganizationByNameAndUserId(payload, user.id);
            if (existing_organization) {
                logger.error(`${ enums.CURRENT_TIME_STAMP },:::Info: organization name is not unique::checkIfOrganizationNameIsUnique.middlewares.organization.js`);
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('you have an organization with that name, enter another name', enums.HTTP_BAD_REQUEST));
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: organization name is unique::checkIfOrganizationNameIsUnique.middlewares.organization.js`);
            return next();            
        } catch (error) {
            return next(error);
        }
    }

    static async checkIfOrganizationExists(req, res, next) {
        try {

            const {params: {}} = req;
            const id = req.params.id || req.body.organization_id;
            const organization = await OrganizationDao.get(id);
            if (!organization) {
                logger.error(`${ enums.CURRENT_TIME_STAMP },:::Info: organization not found::checkIfOrganizationNameIsUnique.middlewares.organization.js`);
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('organization not found', enums.HTTP_BAD_REQUEST));
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: organization found::checkIfOrganizationNameIsUnique.middlewares.organization.js`);
            req.organization_details = organization;
            return next();            
        } catch (error) {
            return next(error);
        }
    }


}


module.exports = OrganizationMiddleware;