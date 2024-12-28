


const {successResponse, errorResponse} = require('../helpers/response');
const enums = require('../lib/enums');
const logger = require('../logger/logger');
const UserService = require('../services/service.user');


class UserController {


    static async signup(req, res, next) {
        try {
            const {body, } = req;
            const user = await UserService.signup(body);
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully signed up user::signup.controllers.user.js`);
            return res.status(enums.HTTP_CREATED).json(successResponse('user signed up successfully', user));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: signup failed::signup.controllers.user.js`);
            return next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const {body, user } = req;
            const response = await UserService.login(user);
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully logged in user::login.controllers.user.js`);
            return res.status(enums.HTTP_OK).json(successResponse(enums.USER_LOGIN_SUCCESSFULLY, response));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: signup failed::login.controllers.user.js`);
            return next(error);
        }
    }

    static async getUserDetails(req, res, next) {
        try {
            const {body, user } = req;
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully gotten a user details::getUserDetails.controllers.user.js`);
            delete user.password;
            return res.status(enums.HTTP_OK).json(successResponse(`user details fetched successfully`, user));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: getting user details failed::getUserDetails.controllers.user.js`);
            return next(error);
        }
    }

    static async inviteUser(req, res, next) {
        try {
            const {body, user } = req;
            
            logger.info(`${ enums.CURRENT_TIME_STAMP }, Info: successfully gotten a user details::getUserDetails.controllers.user.js`);
            delete user.password;
            return res.status(enums.HTTP_OK).json(successResponse(`user details fetched successfully`, user));
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, Info: getting user details failed::getUserDetails.controllers.user.js`);
            return next(error);
        }
    }



}

module.exports = UserController;