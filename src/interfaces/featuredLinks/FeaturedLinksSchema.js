import Joi from 'joi'

const authHeadersSchema = Joi.object({
  authorization: Joi.string().required()
}).required().unknown()

export default {
  createFeaturedLink: Joi.object({
    headers: authHeadersSchema,
    body: Joi.object({
      code: Joi.string().required(),
      active: Joi.boolean().required(),
      ends_at: Joi.date().required(),
      initial_points: Joi.number().required()
    }).required()
  }).required()
}

