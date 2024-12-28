

const UserDao = require('../dao/dao.user');
const enums = require('../lib/enums');
const Hash = require('../lib/lib.util.hash');
const logger = require('../logger/logger');
const dayjs = require('dayjs');



class UserService{

    static async signup(payload) {
        try {
            payload.password = await Hash.hashData(payload.password.trim());
            const new_user = await UserDao.create(payload);
            if (new_user.password) delete new_user.password;
    
            return new_user;
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, signup failed::signup.service.user.js`, error.message);
            throw error;
        }
    }
    

    static async login(user) {
        try {
            const token = await Hash.generateAuthToken(user);
            logger.info(`${ enums.CURRENT_TIME_STAMP },${ user.id }::: Info: successfully generated access token login.service.user.js`);

            const tokenExpiration = await JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString()).exp;
            logger.info(`${ enums.CURRENT_TIME_STAMP }, ${ user.id }:::Info: successfully fetched token expiration time login.service.user.js`);
            const myDate = new Date(tokenExpiration * 1000);
            const tokenExpireAt = dayjs(myDate);
            logger.info(`${ enums.CURRENT_TIME_STAMP }, ${ user.id }:::Info: successfully converted time from epoch time to a readable format login.service.user.js`);

            delete user.password;
            const loggedInUser = user;
            loggedInUser.token = token;
            loggedInUser.token_expire_at = tokenExpireAt;
            return loggedInUser;
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, login user failed::login.service.user.js`, error.message);
            throw error;
        }
    };


}

module.exports = UserService;