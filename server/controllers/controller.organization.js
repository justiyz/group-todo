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


}



module.exports = OrganizationController;