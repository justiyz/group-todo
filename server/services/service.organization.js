

const OrganizationDao = require('../dao/dao.organization');
const enums = require('../lib/enums');
const logger = require('../logger/logger');
const dayjs = require('dayjs');



class OrganizationService {

    static async createOrganization(body, user) {
        try {
            const payload = {name: body.name, owner_id: user.id};
            const new_user = await OrganizationDao.create(payload);    
            return new_user;
        } catch (error) {
            logger.error(`${ enums.CURRENT_TIME_STAMP }, creating organization failed::createOrganization.service.user.js`, error.message);
            throw error;
        }
    }

    static async getOrganizations(query) {
        try {
            const { owner_id, search, page = 1, per_page = 10 } = query;

            const { total_count, rows } = await OrganizationDao.findAndCountAll({ owner_id, search, page, per_page });
    
            const total_pages = Math.ceil(total_count / per_page);
    
            return {
                page: parseInt(page, 10),
                total_count,
                total_pages,
                organizations: rows,
            };
        } catch (error) {
            logger.error(`${enums.CURRENT_TIME_STAMP}, getting organizations failed::getOrganizations.service.organization.js`, error.message);
            throw error;
        }
    }
    



}

module.exports = OrganizationService;