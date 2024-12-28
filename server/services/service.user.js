

const UserDao = require('../dao/dao.user');
const Hash = require('../lib/lib.util.hash')



class UserService{

    static async signup(payload) {
        try {
            payload.password = await Hash.hashData(payload.password.trim());
            const new_user = UserDao.create(payload);
            return new_user;
        } catch (error) {
            throw error;
        }
    }


}

module.exports = UserService;