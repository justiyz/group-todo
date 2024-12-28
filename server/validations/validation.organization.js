const Joi = require('joi');




const addOrganization = Joi.object().keys({
    name: Joi.string().required(),
});



module.exports = {
    addOrganization,
}