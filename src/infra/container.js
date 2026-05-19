import User from './database/mongo/models/User.js'
import Token from './database/mongo/models/Token.js'
import Database from './database/mongo/index.js'
import UserRepository from './database/mongo/repositories/UserRepository.js'
import TokenRepository from './database/mongo/repositories/TokenRepository.js'

import HashService from '../app/services/auth/HashService.js'
import TokenService from '../app/services/auth/TokenService.js'
import PermissionService from '../app/services/auth/PermissionService.js'
import LoginUseCase from '../app/useCases/users/LoginUseCase.js'
import CreateUserUseCase from '../app/useCases/users/CreateUserUseCase.js'
import GetMyUserUseCase from '../app/useCases/users/GetMyUserUseCase.js'

const createContainer = () => {
  const database = new Database()
  const hashService = new HashService()
  const tokenService = new TokenService()
  const userRepository = new UserRepository({ model: User })
  const tokenRepository = new TokenRepository({ model: Token })
  const permissionService = new PermissionService()
  const loginUseCase = new LoginUseCase({ hashService, tokenService, userRepository, tokenRepository, permissionService })
  const getMyUserUseCase = new GetMyUserUseCase({ userRepository })
  const createUserUseCase = new CreateUserUseCase({ hashService, tokenService, userRepository, tokenRepository, permissionService })

  return {
    database,
    loginUseCase,
    tokenService,
    tokenRepository,
    getMyUserUseCase,
    createUserUseCase
  }
}

export default createContainer()
