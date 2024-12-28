


const {successResponse, errorResponse} = require('../helpers/response');
const enums = require('../lib/enums');
const UserService = require('../services/service.user')


class UserController {


    static async signup(req, res, next) {
        try {
            const {body, } = req;
            const user = await UserService.signup(body);
            return res.status(enums.HTTP_CREATED).json(successResponse('user signed up successfully', user));
        } catch (error) {
            return next(error);
        }
    }



}

module.exports = UserController;