import EnumMessage from '../../../domain/enum/EnumMessage.js'
import BusinessException from '../../../domain/exceptions/BusinessException.js'

const { APP_URL } = process.env

export default class CreateUserUseCase {
  constructor ({ hashService, tokenService, userRepository, tokenRepository, permissionService }) {
    this.hashService = hashService
    this.tokenService = tokenService
    this.userRepository = userRepository
    this.tokenRepository = tokenRepository
    this.permissionService = permissionService
  }

  execute = async ({ body, headers }) => {
    body.password = this.hashService.createHash({ content: body.password })
    body.devices = [ headers['device-id'] ]
    const userData = await this.userRepository.create({ entity: body })

    if (!userData) {
      throw new BusinessException({ message: EnumMessage.ERROR_CREATE_USER })
    }

    const tokenData = {
      iss: APP_URL,
      iat: new Date().getTime(),
      scope: userData.profile,
      user_id: userData._id,
      permissions: this.permissionService.getPermissions({ profile: userData.profile })
    }

    const token = await this.tokenRepository.create({ entity: tokenData })
    tokenData.token_id = token._id

    const authToken = this.tokenService.signToken({ token: tokenData })

    const data = {
      access_token: authToken
    }

    return { data }
  }
}
