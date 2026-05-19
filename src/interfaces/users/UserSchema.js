import Joi from 'joi'

const headersDeviceSchema = Joi.object({
  'device-id': Joi.string().required()
}).required().unknown()

const authHeadersSchema = Joi.object({
  authorization: Joi.string().required()
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
  }).required(),
  login: Joi.object({
    headers: headersDeviceSchema,
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }).required()
  }).required(),
  getMyUser: Joi.object({
    headers: authHeadersSchema
  }).required()
}
