import EnumMessage from '../../../domain/enum/EnumMessage.js'
import ForbiddenException from '../../../domain/exceptions/ForbiddenException.js'
import NotFoundException from '../../../domain/exceptions/NotFoundException.js'

const { APP_URL } = process.env

export default class LoginUseCase {
  constructor ({ hashService, tokenService, userRepository, tokenRepository, permissionService }) {
    this.hashService = hashService
    this.tokenService = tokenService
    this.userRepository = userRepository
    this.tokenRepository = tokenRepository
    this.permissionService = permissionService
  }

  execute = async ({ body, headers }) => {
    const user = await this.userRepository.get({ query: { email: body.email } })

    if (!user) {
      throw new NotFoundException({ message: EnumMessage.USER_NOT_FOUND })
    }

    const isSamePassword = this.hashService.compareHash({ hash: user.password, content: body.password })

    if (!isSamePassword) {
      throw new NotFoundException({ message: EnumMessage.USER_NOT_FOUND })
    }

    const tokenData = {
      iss: APP_URL,
      iat: new Date().getTime(),
      scope: user.profile,
      user_id: user._id,
      permissions: this.permissionService.getPermissions({ profile: user.profile })
    }

    const token = await this.tokenRepository.create({ entity: tokenData })
    tokenData.token_id = token._id

    const authToken = this.tokenService.signToken({ token: tokenData })

    const data = {
      access_token: authToken
    }

    const userUpdate = {
      $set: {
        last_access: new Date()
      },
      $addToSet: {
        devices: headers['device-id']
      }
    }

    await this.userRepository.update({ query: { _id: user._id }, update: userUpdate })

    return { data }
  }
}
