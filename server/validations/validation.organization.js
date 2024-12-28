const Joi = require('joi');




const addOrganization = Joi.object().keys({
    name: Joi.string().required(),
});

const idParams = Joi.object().keys({
    id: Joi.string().required(),
});

const fetchAllOrgaizations = Joi.object().keys({
    search: Joi.string().optional(),
    page: Joi.number().positive().optional(),
    per_page: Joi.number().positive().optional(),
  });


module.exports = {
    addOrganization,
    idParams,
    fetchAllOrgaizations,
}