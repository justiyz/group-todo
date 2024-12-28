




const knex = require("../database/connection.js");


class ProjectDao{

    static async all() {
        return knex('projects');
    }
    
    static async get(id) {
        const results = await knex('projects').where({ id });
        return results[0];
    }

    static async getUserByEmail(email) {
        const results = await knex('projects').where({ email });
        return results[0];
    }

    static async getUserByUsername(username) {
        const results = await knex('projects').where({ username });
        return results[0];
    }
    
    static async create(properties) {
        const results = await knex('projects').insert({ ...properties }).returning('*');
        return results[0];
    }
    
    static async update(id, properties) {
        const results = await knex('projects').where({ id }).update({ ...properties }).returning('*');
        return results[0];
    }
    
    // delete is a reserved keyword
    static async del(id) {
        const results = await knex('projects').where({ id }).del().returning('*');
        return results[0];
    }
    
    static async clear() {
        return knex('projects').del().returning('*');
    }
    
    static async getProjectByNameAndOrganizationId(name, organization_id) {
        const results = await knex('projects').where({ name, organization_id });
        return results[0];
    }
    
}

module.exports = ProjectDao;

