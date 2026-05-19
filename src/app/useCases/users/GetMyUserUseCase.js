import EnumMessage from '../../../domain/enum/EnumMessage.js'
import NotFoundException from '../../../domain/exceptions/NotFoundException.js'

export default class GetMyUserUseCase {
  constructor ({ idService, userRepository }) {
    this.idService = idService
    this.userRepository = userRepository
  }

  execute = async ({ auth }) => {
    const user = await this.userRepository.get({ query: { _id: auth.credentials.user_id } })

    if (!user) {
      throw new NotFoundException({ message: EnumMessage.USER_NOT_FOUND })
    }

    return { data: user }
  }
}
