

const knex = require("../database/connection.js");

class UserDao{

    static async all() {
        return knex('users');
    }
    
    static async get(id) {
        const results = await knex('users').where({ id });
        return results[0];
    }

    static async getUserByEmail(email) {
        const results = await knex('users').where({ email });
        return results[0];
    }

    static async getUserByUsername(username) {
        const results = await knex('users').where({ username });
        return results[0];
    }
    
    static async create(properties) {
        const results = await knex('users').insert({ ...properties }).returning('*');
        return results[0];
    }
    
    static async update(id, properties) {
        const results = await knex('users').where({ id }).update({ ...properties }).returning('*');
        return results[0];
    }
    
    // delete is a reserved keyword
    static async del(id) {
        const results = await knex('users').where({ id }).del().returning('*');
        return results[0];
    }
    
    static async clear() {
        return knex('users').del().returning('*');
}
    
}

module.exports = UserDao;
