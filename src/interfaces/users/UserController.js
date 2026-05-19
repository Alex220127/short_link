import EnumHttpCodes from '../../domain/enum/EnumHttpCodes.js'
import container from '../../infra/container.js'

const createUser = async (request, reply) => {
  try {
    const { data } = await container.createUserUseCase.execute({ body: request.body })

    return reply.status(EnumHttpCodes.CREATED).send(data)
  } catch (error) {
    console.log('>> Fail create user >> ', error)

    if (error.statusCode) {
      return reply.code(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}

export default {
  createUser
}
