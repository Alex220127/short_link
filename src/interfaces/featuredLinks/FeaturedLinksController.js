import container from '../../infra/container.js'
import EnumHttpCodes from '../../domain/enum/EnumHttpCodes.js'

const createFeaturedLink = async (request, reply) => {
  try {
    const { data } = await container.createFeaturedLinkUseCase.execute({ body: request.body, auth: request.auth })

    return reply.status(EnumHttpCodes.CREATED).send(data)
  } catch (error) {
    console.log('>> Fail create featured link >> ', error)

    if (error.statusCode) {
      return reply.code(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}

export default {
  createFeaturedLink
}
