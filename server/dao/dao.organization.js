

const knex = require("../database/connection.js");

class OrganizationDao{

    static async all() {
        return knex('organizations');
    }
    
    static async get(id) {
        const results = await knex('organizations').where({ id });
        return results[0];
    }

    static async getOrganizationByName(name) {
        const results = await knex('organizations').where({ name });
        return results[0];
    }

    static async getOrganizationByNameAndUserId(name, id) {
        const results = await knex('organizations').where({ name, owner_id: id });
        return results[0];
    }

    static async getOrganizationByUserId(id) {
        const results = await knex('organizations').where({ id });
        return results[0];
    }
    
    static async create(properties) {
        const results = await knex('organizations').insert({ ...properties }).returning('*');
        return results[0];
    }
    
    static async update(id, properties) {
        const results = await knex('organizations').where({ id }).update({ ...properties }).returning('*');
        return results[0];
    }
    
    // delete is a reserved keyword
    static async del(id) {
        const results = await knex('organizations').where({ id }).del().returning('*');
        return results[0];
    }
    
    static async clear() {
        return knex('organizations').del().returning('*');
    }
    

    static async findAndCountAll(query) {
        const { owner_id, search, page = 1, per_page = 10 } = query;
        const offset = (page - 1) * per_page;
    
        const baseQuery = knex('organizations').where({ owner_id });    
        if (search) {
            baseQuery.where('name', 'ILIKE', `%${search}%`);
        }    
        const total_count = await baseQuery.clone().count('* as total').first().then(result => parseInt(result.total, 10));
        const rows = await baseQuery
            .select('*')
            .offset(offset)
            .limit(per_page)
            .orderBy('name', 'ASC');
    
        return {
            total_count,
            rows,
        };
    }
    
    
    
}

module.exports = OrganizationDao;
