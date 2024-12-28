
const UserDao = require('../dao/dao.user');
const {errorResponse} = require('../helpers/response');
const enums = require('../lib/enums');



class UserMiddleware {

    static async checkIfEmailIsUnique(req, res, next) {
        try {

            const {body} = req;
            const payload = body.email;
            const user = await UserDao.getUserByEmail(payload);
            if (user) {
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('there is an account with that email already', enums.HTTP_BAD_REQUEST));
            }
            return next();            
        } catch (error) {
            return next(error);
        }
    }


    static async checkIfUsernameIsUnique(req, res, next) {
        try {

            const {body} = req;
            const payload = body.username;
            const user = await UserDao.getUserByUsername(payload);
            if (user) {
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('there is an account with that username already', enums.HTTP_BAD_REQUEST));
            }
            return next();            
        } catch (error) {
            return next(error);
        }
    }


    static async comparePassword(req, res, next) {
        try {
            const {body: {password}, user, } = req;
            const userPasswordDetails = await UserDao.fetchUserPassword(user.user_id);

            const passwordValid = await Hash.compareData(password, userPasswordDetails.password);
            logger.info(`${ enums.CURRENT_TIME_STAMP }, ${ user.user_id }:::Info: successfully returned compared passwords response comparePassword.middlewares.auth.js`);
            if (passwordValid) {
                logger.info(`${ enums.CURRENT_TIME_STAMP }, ${ user.user_id }:::Info: login password matches::comparePassword.middlewares.auth.js`);
                return next();
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP }, ${ user.user_id }:::Info: login password does not match comparePassword.middlewares.auth.js`);
            return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(enums.INVALID_PHONE_NUMBER_OR_PASSWORD, enums.HTTP_BAD_REQUEST));
        } catch (error) {
            error.label = enums.COMPARE_PASSWORD_MIDDLEWARE;
            logger.error(`comparing incoming and already set password in the DB failed:::${ enums.COMPARE_PASSWORD_MIDDLEWARE }`, error.message);
            return next(error);
        }
    };










}


module.exports = UserMiddleware;