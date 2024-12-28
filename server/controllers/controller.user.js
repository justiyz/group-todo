


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



}

module.exports = UserController;