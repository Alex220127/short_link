import Schema from './UserSchema.js'
import UserController from './UserController.js'
import validateContract from '../middlewares/validateContract.js'
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js'

export default [
  {
    url: '/users',
    method: 'POST',
    handler: UserController.createUser,
    preHandler: async (request, reply, done) => await validateContract({ request, reply, done, contract: Schema.createUser })
  },
  {
    url: '/users/login',
    method: 'POST',
    handler: UserController.login,
    preHandler: async (request, reply, done) => await validateContract({ request, reply, done, contract: Schema.login })
  },
  {
    url: '/users/me',
    method: 'GET',
    handler: UserController.getMyUser,
    preHandler: async (request, reply, done) => {
      await authenticationMiddleware({ request, reply, done })
      await validateContract({ request, reply, done, contract: Schema.getMyUser })
    }
  }
]
