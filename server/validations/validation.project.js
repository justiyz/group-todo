const Joi = require('joi');




const createProject = Joi.object().keys({
    name: Joi.string().required(),
    organization_id: Joi.number().required(),
    description: Joi.string().optional(),
});












module.exports = {
    createProject,
}