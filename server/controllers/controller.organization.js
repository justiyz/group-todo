const {successResponse, errorResponse} = require("../helpers/response");
const enums = require("../lib/enums");
const logger = require("../logger/logger");
const OrganizationService = require("../services/service.organization");



class OrganizationController{

    static async addOrganization(req, res, next) {
        try {
            const {body, user} = req;
            
            const response = await OrganizationService.createOrganization(body, user);
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully gotten a user details::getUserDetails.controllers.user.js`);

            return res.status(enums.HTTP_OK).json(successResponse(`organization created successfully`, response));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: getting user details failed::getUserDetails.controllers.user.js`);
            return next(error);
        }
    }

    static async getOrganizationDetails(req, res, next) {
        try {
            const {user, organization_details } = req;
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully gotten organization details::getOrganizationDetails.controllers.user.js`);
            return res.status(enums.HTTP_OK).json(successResponse(`organization details fetched successfully`, organization_details));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: getting organization details failed::getOrganizationDetails.controllers.user.js`);
            return next(error);
        }
    }

    static async getOrganizations(req, res, next) {
        try {
            const {query, user} = req;
            query.owner_id = user.id
            const { page, total_count, total_pages, organizations } = await OrganizationService.getOrganizations(query);
    
            logger.info(`${enums.CURRENT_TIME_STAMP}, ${user.id} Info: successfully fetched organizations and count from the DB getOrganizations.controller.organization.js`);
    
            const data = { page, total_count, total_pages, organizations };
            return res.status(enums.HTTP_OK).json(successResponse(`Successfully fetched organizations.`, data));
        } catch (error) {
            logger.error(`${req.user.id}, trying to fetch organizations failed:::getOrganizations.controller.organization.js`, error.message);
            next(error);
        }
    }
    



}



module.exports = OrganizationController;