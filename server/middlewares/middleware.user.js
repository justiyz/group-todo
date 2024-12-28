
const UserDao = require('../dao/dao.user');
const {errorResponse} = require('../helpers/response');
const enums = require('../lib/enums');
const logger = require('../logger/logger');
const Hash = require('../lib/lib.util.hash');
const constants = require('../utils/constants');
const {TODO_ACCESS_TOKEN_SECRET, } = process.env;



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
            const {body: {password, email, username},  } = req;
            const user = email ? await UserDao.getUserByEmail(email) : await UserDao.getUserByUsername(username);
            if (!user) {
                logger.error(`${ enums.CURRENT_TIME_STAMP },:::Info: user not found::comparePassword.middlewares.auth.js`);
                return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse('user not found', enums.HTTP_BAD_REQUEST));
            }

            const passwordValid = Hash.compareData(password, user.password);
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: successfully returned compared passwords response comparePassword.middlewares.auth.js`);
            if (passwordValid) {
                logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: login password matches::comparePassword.middlewares.auth.js`);
                req.user = user;
                return next();
            }
            logger.info(`${ enums.CURRENT_TIME_STAMP },:::Info: login password does not match comparePassword.middlewares.auth.js`);
            return res.status(enums.HTTP_BAD_REQUEST).json(errorResponse(enums.INVALID_LOGIN_OR_DETAILS, enums.HTTP_BAD_REQUEST));
        } catch (error) {
            error.label = enums.COMPARE_PASSWORD_MIDDLEWARE;
            logger.error(`comparing incoming and already set password in the DB failed:::${ enums.COMPARE_PASSWORD_MIDDLEWARE }`, error.message);
            return next(error);
        }
    };


    static async validateUserAuthToken(req, res, next) {
        try {
            let token = req.headers.authorization;
            if (!token) {
                logger.info(` Info: successfully decoded that no authentication token was sent with the headers validateUserAuthToken.user.middlewares.js`);
                return res.status(enums.HTTP_UNAUTHORIZED).json(errorResponse(enums.NO_TOKEN, enums.HTTP_UNAUTHORIZED));
            }
            if (!token.startsWith(constants.BEARER_PREFIX)) {
                return res.status(enums.HTTP_UNAUTHORIZED).json(errorResponse(enums.INVALID_TOKEN, enums.HTTP_UNAUTHORIZED));
            }
            if (token.startsWith(constants.BEARER_PREFIX)) {
                token = token.slice(7, token.length);
                logger.info(`Info: successfully extracts token validateUserAuthToken.user.middlewares.js`);
            }
            const decoded = Hash.verifyToken(token, TODO_ACCESS_TOKEN_SECRET);
            logger.info(`${ decoded.id }:::Info: successfully decoded authentication token sent using the authentication secret. validateUserAuthToken.user.middlewares.js`);
            if (decoded.message) {
                if (decoded.message === 'jwt expired') {
                    return res.status(enums.HTTP_UNAUTHORIZED).json(errorResponse(enums.SESSION_EXPIRED, enums.HTTP_UNAUTHORIZED));
                }
                logger.info(`${ decoded.id }:::Info: successfully decoded authentication token has a message which is an error message. validateUserAuthToken.user.middlewares.js`);
                return res.status(enums.HTTP_UNAUTHORIZED).json(errorResponse(` ${ decoded.message }.`, enums.HTTP_UNAUTHORIZED));
            }
            const user = await UserDao.get(decoded.id);
            logger.info(` ${ decoded.id }:::Info: successfully fetched the user details using the decoded user id. validateUserAuthToken.user.middlewares.js`);

            req.user = user;
            return next();
        } catch (error) {
            logger.error(`Validating the user auth token sent failed:::UserAuthMiddleware::validateUserAuthToken`, error.message);
            return next(error);
        }
    };










}


module.exports = UserMiddleware;