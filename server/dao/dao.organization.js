

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
    
}

module.exports = OrganizationDao;
