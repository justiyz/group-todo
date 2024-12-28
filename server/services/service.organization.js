

const OrganizationDao = require('../dao/dao.organization');
const logger = require('../logger/logger');
const dayjs = require('dayjs');



class OrganizationService {

    static async createOrganization(body, user) {
        try {
            console.log('GOT HERE 1')
            console.log('USER DETAILS ============================> ', user)
            const payload = {name: body.name, owner_id: user.id};
            const new_user = await OrganizationDao.create(payload);    
            return new_user;
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, creating organization failed::createOrganization.service.user.js`, error.message);
            throw error;
        }
    }



}

module.exports = OrganizationService;