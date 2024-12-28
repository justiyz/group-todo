


const knex = require("../database/connection.js");


class TaskDao{

    static async all() {
        return knex('tasks');
    }
    
    static async get(id) {
        const results = await knex('tasks').where({ id });
        return results[0];
    }
    
    static async create(properties) {
        const results = await knex('tasks').insert({ ...properties }).returning('*');
        return results[0];
    }
    
    static async update(id, properties) {
        const results = await knex('tasks').where({ id }).update({ ...properties }).returning('*');
        return results[0];
    }
    
    // delete is a reserved keyword
    static async del(id) {
        const results = await knex('tasks').where({ id }).del().returning('*');
        return results[0];
    }
    
    static async clear() {
        return knex('tasks').del().returning('*');
    }
    
    static async getTaskByNameAndOrganizationId(name, organization_id) {
        const results = await knex('tasks').where({ name, organization_id });
        return results[0];
    }
    
}

module.exports = TaskDao;

