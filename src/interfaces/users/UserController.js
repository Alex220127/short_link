import EnumHttpCodes from '../../domain/enum/EnumHttpCodes.js'
import container from '../../infra/container.js'

const createUser = async (request, reply) => {
  try {
    const { data } = await container.createUserUseCase.execute({ body: request.body, headers: request.headers })

    return reply.status(EnumHttpCodes.CREATED).send(data)
  } catch (error) {
    console.log('>> Fail create user >> ', error)

    if (error.statusCode) {
      return reply.code(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}

const login = async (request, reply) => {
  try {
    const { data } = await container.loginUseCase.execute({ body: request.body, headers: request.headers })

    return reply.status(EnumHttpCodes.CREATED).send(data)
  } catch (error) {
    console.log('>> Fail login >> ', error)

    if (error.statusCode) {
      return reply.code(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}

const getMyUser = async (request, reply) => {
  try {
    const { data } = await container.getMyUserUseCase.execute({ auth: request.auth })

    return reply.status(EnumHttpCodes.OK).send(data)
  } catch (error) {
    console.log('>> Fail get user info >> ', error)

    if (error.statusCode) {
      return reply.code(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}

export default {
  login,
  getMyUser,
  createUser
}
