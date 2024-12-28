const Joi = require('joi');



const createTask = Joi.object().keys({
    name: Joi.string().required(),
    project_id: Joi.number().required(),
    assignee_id: Joi.number().optional(),
    assigner_id: Joi.number().optional(),
    title: Joi.string().required(),
    description: Joi.string(),
    priority: Joi.string().required().valid("low", "medium", "high"),
});

const updateTask = Joi.object().keys({
    id: Joi.number().required(),
    name: Joi.string().optional(),
    status: Joi.string().optional().valid("todo", "in-progress", "test", "passed", "failed"),
});


const assignTask = Joi.object().keys({
    id: Joi.number().required(),
    assignee_id: Joi.number().optional(),
    assigner_id: Joi.number().optional(),
});






module.exports = {
    createTask,
    updateTask,
    assignTask,
    
}