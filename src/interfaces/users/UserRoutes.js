import Schema from './UserSchema.js'
import UserController from './UserController.js'
import validateContract from '../middlewares/validateContract.js'

export default [
  {
    url: '/users',
    method: 'POST',
    handler: UserController.createUser,
    preHandler: (request, reply, done) => validateContract({ request, reply, done, contract: Schema.createUser })
  },
  {
    url: '/users/login',
    method: 'POST',
    handler: UserController.login,
    preHandler: (request, reply, done) => validateContract({ request, reply, done, contract: Schema.login })
  }
]
