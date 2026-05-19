import Joi from 'joi'

const headersDeviceSchema = Joi.object({
  device_id: Joi.string().required()
}).required().unknown()

export default {
  createUser: Joi.object({
    headers: headersDeviceSchema,
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      profile: Joi.string().required().valid('user'),
      password: Joi.string().required(),
      active: Joi.number().required()
    }).required()
  }).required()
}
